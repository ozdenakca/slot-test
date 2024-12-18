export function Inject(key: string) {
  return function (target: any, context: ClassFieldDecoratorContext): void {
    if (context.kind !== "field") {
      throw new Error("@Inject can only be used on class fields.");
    }

    context.addInitializer(function () {
      (this as any)[context.name] = DependencyContainer.resolve(key);
    });
  };
}

export class DependencyContainer {
  private static dependencies = new Map<string, any>();

  static register<T>(key: string, implementation: T): void {
    this.dependencies.set(key, implementation);
  }

  static resolve<T>(key: string): T {
    const dependency = this.dependencies.get(key);
    if (!dependency) {
      throw new Error(`Dependency "${key}" not found`);
    }
    return dependency;
  }
}
