export function Inject(classType: new (...args: any[]) => any) {
  return function (target: any, context: ClassFieldDecoratorContext) {
    if (context.kind !== "field") {
      throw new Error("@Inject can only be used on class fields");
    }

    context.addInitializer(function () {
      // This will run after the class is constructed
      Object.defineProperty(this, context.name, {
        get() {
          return DependencyContainer.resolve(classType.name);
        },
        enumerable: true,
        configurable: true,
      });
    });
  };
}

export class DependencyContainer {
  private static mediators: Map<string, any> = new Map();
  private static commands: Map<string, any> = new Map();
  private static effects: Map<string, any[]> = new Map();
  private static components: Map<string, any> = new Map();
  private static isInitialized = false;

  public static registerMediator(mediator: new (...args: any[]) => any): void {
    if (this.isInitialized) {
      throw new Error("Cannot register after initialization");
    }
    const instance = new mediator();
    this.mediators.set(mediator.name, instance);
  }

  public static registerCommand(
    command: new (...args: any[]) => any,
    effects: (new (...args: any[]) => any)[]
  ): void {
    if (this.isInitialized) {
      throw new Error("Cannot register after initialization");
    }
    const commandInstance = new command();
    this.commands.set(command.name, commandInstance);

    const effectInstances = effects.map((effect) => new effect());
    this.effects.set(command.name, effectInstances);
  }

  public static registerComponent(
    component: new (...args: any[]) => any,
    ...args: any[]
  ): void {
    if (this.isInitialized) {
      throw new Error("Cannot register after initialization");
    }
    const instance = new component(...args);
    this.components.set(component.name, instance);
  }

  public static resolve<T>(key: string): T {
    const instance =
      this.mediators.get(key) ||
      this.commands.get(key) ||
      this.components.get(key);

    if (!instance) {
      throw new Error(`No registration found for key: ${key}`);
    }
    return instance as T;
  }

  public static initialize(): void {
    // First set initialized to true so components can resolve dependencies
    this.isInitialized = true;

    // Initialize mediators first (they should not depend on anything)
    this.mediators.forEach((mediator) => {
      if ("postConstruct" in mediator) {
        mediator.postConstruct();
      }
    });

    // Initialize commands and their effects next
    this.commands.forEach((command, key) => {
      const effects = this.effects.get(key);
      if (effects && "setEffects" in command) {
        command.setEffects(effects);
      }
    });

    // Initialize components last
    this.components.forEach((component) => {
      if ("postConstruct" in component) {
        component.postConstruct();
      }
    });
  }
}
