import { SpinMediator } from "../mediators/SpinMediator";
import { Effect } from "../types/Command";
import { Inject } from "../utils/inject";

export class SpinEffect extends Effect {
  @Inject(SpinMediator)
  private _spinMediator: SpinMediator;

  async run(): Promise<void> {
    this._spinMediator.updateIsSpinning(true);
    console.log("spinning");
  }
}
