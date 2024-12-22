// AsyncBehaviorSubject.ts
import { BehaviorSubject } from "rxjs";

export class AsyncBehaviorSubject<T> extends BehaviorSubject<T> {
  private activePromises: Promise<void>[] = [];

  watch(callback: (value: T) => void | Promise<void>) {
    this.subscribe(async (value) => {
      const result = callback(value);
      if (result instanceof Promise) {
        this.activePromises.push(result);
        try {
          await result;
        } finally {
          const index = this.activePromises.indexOf(result);
          if (index > -1) {
            this.activePromises.splice(index, 1);
          }
        }
      }
    });
  }

  async next(value: T): Promise<void> {
    super.next(value);
    await Promise.all(this.activePromises);
  }
}
