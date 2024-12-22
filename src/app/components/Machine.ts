import { SpinMediator } from "../mediators/SpinMediator";
import { Component } from "../types/Component";
import { Viewport } from "../managers/DisplayManager";

export class Machine extends Component {
  init() {
    const spinMediator = this.game.getDependency(SpinMediator);
    this.game
      .getDependency(SpinMediator)
      .updateIsSpinning(!spinMediator.isSpinning.value);
  }

  public resize(viewport: Viewport): void {}
}
