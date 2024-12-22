export class DependencyContainer {
  private static container: Map<string, any> = new Map();
  private static isInitialized = false;

  public static register<T>(key: string, instance: T): void {
    this.container.set(key, instance);
  }

  public static resolve<T>(key: string): T {
    if (!this.isInitialized) {
      throw new Error(
        "Trying to resolve dependency before initialization is complete"
      );
    }
    const instance = this.container.get(key);
    if (!instance) {
      throw new Error(`No registration found for key: ${key}`);
    }
    return instance as T;
  }

  public static initialize(): void {
    this.isInitialized = true;
  }
}
