import { SpinMediator } from "../mediators/SpinMediator";
import { Component } from "../types/Component";
import { Viewport } from "../managers/DisplayManager";
import { Inject } from "../utils/inject";
import { SpinCommand } from "../commands/SpinCommand";
import { waitForSec } from "../utils/waitForSec";
import { MACHINE_STATES, MachineMediator } from "../mediators/MachineMediator";

export class Machine extends Component {
  @Inject(MachineMediator)
  private _machineMediator: MachineMediator;

  @Inject(SpinMediator)
  private _spinMediator: SpinMediator;

  postConstruct() {
    this._machineMediator.machineState.watch(async (value) => {
      switch (value) {
        case MACHINE_STATES.SPIN:
          this.spin();
          break;
        case MACHINE_STATES.WIN:
          this.showWin();
          break;
      }
      if (value) {
        await this.spin();
      }
    });
  }

  async spin() {
    // const { board } = this._spinMediator;
    await waitForSec(3);
    console.log("spin is ending");
  }

  async showWin() {
    await waitForSec(3);
    console.log("win shown");
  }

  public resize(viewport: Viewport): void {}
}
