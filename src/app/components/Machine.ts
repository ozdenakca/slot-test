import { SpinMediator } from "../mediators/SpinMediator";
import { Component } from "../types/Component";
import { Viewport } from "../managers/DisplayManager";
import { Inject } from "../utils/inject";
import { SpinCommand } from "../commands/SpinCommand";

export class Machine extends Component {
  @Inject(SpinMediator)
  private _spinMediator: SpinMediator;

  postConstruct() {
    this.game.runCommand(SpinCommand);
  }

  public resize(viewport: Viewport): void {}
}
