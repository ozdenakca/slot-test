import { SpinPanelMediator } from "../mediators/SpinPanelMediator";
import { Effect } from "../types/Command";
import { Inject } from "../utils/inject";

export class DisableUIEffect extends Effect {
  @Inject(SpinPanelMediator)
  private _spinPanelMediator: SpinPanelMediator;

  async run(): Promise<void> {
    this._spinPanelMediator.isSpinButtonDisabled(true);
  }
}
