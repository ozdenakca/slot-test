import { SpinMediator } from "../mediators/SpinMediator";
import { Component } from "../types/Component";
import { Viewport } from "../managers/DisplayManager";
import { Inject } from "../utils/inject";
import { SpinCommand } from "../commands/SpinCommand";
import { waitForSec } from "../utils/waitForSec";
import { MACHINE_STATES, MachineMediator } from "../mediators/MachineMediator";

export class SpinPanel extends Component {
  postConstruct() {
    this.createSpinButton();
  }

  private createSpinButton() {}

  public resize(viewport: Viewport): void {}
}
