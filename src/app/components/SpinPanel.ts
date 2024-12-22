import { Component } from "../types/Component";
import { Viewport } from "../managers/DisplayManager";
import { Button } from "../types/Button";
import { SpinCommand } from "../commands/SpinCommand";

export class SpinPanel extends Component {
  private _spinButton: Button;

  postConstruct() {
    this._spinButton = this.createSpinButton();
  }

  private createSpinButton() {
    const button = new Button("btn_spin");
    this.addChild(button);
    button.on("buttonClick", () => {
      this.game.runCommand(SpinCommand);
    });

    return button;
  }

  public resize(viewport: Viewport): void {
    this._spinButton.position.set(600, 600);
  }
}
