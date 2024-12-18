import { BehaviorSubject } from "rxjs";

export class SpinMediator {
  public isSpinning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public spinCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  updateIsSpinning(value: boolean): void {
    this.isSpinning.next(value);
  }

  updateSpinCount(value: number): void {
    this.spinCount.next(value);
  }
}
