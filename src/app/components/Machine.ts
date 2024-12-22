import { SpinMediator } from "../mediators/SpinMediator";
import { Component } from "../types/Component";
import { Viewport } from "../managers/DisplayManager";
import { Inject } from "../utils/inject";
import { SpinCommand } from "../commands/SpinCommand";
import { waitForSec } from "../utils/waitForSec";

export class Machine extends Component {
  @Inject(SpinMediator)
  private _spinMediator: SpinMediator;

  postConstruct() {
    this._spinMediator.isSpinning.watch(async (value) => {
      if (value) {
        await this.spin();
      }
    });
    this.game.runCommand(SpinCommand);
  }

  async spin() {
    await waitForSec(3);
    console.log("spin is ending");
  }

  public resize(viewport: Viewport): void {}
}
