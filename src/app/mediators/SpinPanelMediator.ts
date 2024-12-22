import { AsyncBehaviorSubject } from "../types/AsyncBehaviorSubject";

export class SpinPanelMediator {
  public spinButtonDisabled: AsyncBehaviorSubject<boolean> =
    new AsyncBehaviorSubject<boolean>(false);

  async isSpinButtonDisabled(value: boolean) {
    await this.spinButtonDisabled.next(value);
  }
}
