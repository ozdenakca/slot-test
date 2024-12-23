import { BehaviorSubject } from "rxjs";

export class AsyncBehaviorSubject<T> extends BehaviorSubject<T> {
  private activeSubscriptions: Map<number, Promise<void>> = new Map();
  private subscriptionCounter: number = 0;

  watch(callback: (value: T) => void | Promise<void>): void {
    const subscriptionId = this.subscriptionCounter++;

    this.subscribe(async (value) => {
      try {
        const result = callback(value);
        if (result instanceof Promise) {
          this.activeSubscriptions.set(subscriptionId, result);
          await result;
        }
      } finally {
        this.activeSubscriptions.delete(subscriptionId);
      }
    });
  }

  async next(value: T): Promise<void> {
    super.next(value);

    if (this.activeSubscriptions.size > 0) {
      await Promise.all(Array.from(this.activeSubscriptions.values()));
    }
  }

  getCurrentPromises(): Promise<void>[] {
    return Array.from(this.activeSubscriptions.values());
  }
}
