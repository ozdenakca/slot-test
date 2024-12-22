import { BehaviorSubject } from "rxjs";

export class AsyncBehaviorSubject<T> extends BehaviorSubject<T> {
  private activePromises: Promise<void>[] = [];

  watch(callback: (value: T) => Promise<void>) {
    this.subscribe(async (value) => {
      const promise = callback(value);
      this.activePromises.push(promise);

      try {
        await promise;
      } finally {
        const index = this.activePromises.indexOf(promise);
        if (index > -1) {
          this.activePromises.splice(index, 1);
        }
      }
    });
  }

  async next(value: T): Promise<void> {
    super.next(value);
    await Promise.all(this.activePromises);
  }
}
