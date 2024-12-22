import { BehaviorSubject } from "rxjs";
import { AsyncBehaviorSubject } from "../types/AsyncBehaviorSubject";

export class SpinMediator {
  public isSpinning: AsyncBehaviorSubject<boolean> =
    new AsyncBehaviorSubject<boolean>(false);
  public spinCount: AsyncBehaviorSubject<number> =
    new AsyncBehaviorSubject<number>(0);

  async updateIsSpinning(value: boolean) {
    console.log("VALUEE", value);
    await this.isSpinning.next(value);
  }

  updateSpinCount(value: number): void {
    this.spinCount.next(value);
  }
}
