import { Component } from "../types/Component";
import { Viewport } from "../managers/DisplayManager";
import { Button } from "../types/Button";
import { SpinCommand } from "../commands/SpinCommand";
import { SpinPanelMediator } from "../mediators/SpinPanelMediator";
import { Inject } from "../utils/inject";

export class SpinPanel extends Component {
  @Inject(SpinPanelMediator)
  private _spinPanelMediator: SpinPanelMediator;

  private _spinButton: Button;

  postConstruct() {
    this._spinButton = this.createSpinButton();
    this._spinPanelMediator.spinButtonDisabled.watch((value) => {
      this._spinButton.disabled = value;
    });
  }

  private createSpinButton() {
    const button = new Button("btn_spin");
    this.addChild(button);
    button.on("buttonClick", () => {
      button.disabled = true;
      this.game.runCommand(SpinCommand);
    });

    return button;
  }

  public resize(viewport: Viewport): void {
    this._spinButton.position.set(600, 600);
  }
}
