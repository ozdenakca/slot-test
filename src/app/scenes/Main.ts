import "pixi-spine";
import { Scene } from "../types/Scene";
import { DisplayOrientation } from "../managers/DisplayManager";
import * as PIXI from "pixi.js";
import { Inject } from "../utils/inject";
import { SpinMediator } from "../mediators/SpinMediator";
import { Machine } from "../component/Machine";

export class Main extends Scene {
  @Inject("SpinMediator")
  private _spinMediator: SpinMediator;

  public init() {
    const sprite = new PIXI.Sprite(PIXI.Texture.from("background"));
    this.addChild(sprite);
    sprite.anchor.set(0.5);

    const machine = new Machine();
    this.addChild(machine);

    setInterval(() => {
      this._spinMediator.updateIsSpinning(!this._spinMediator.isSpinning.value);
    }, 3000);
  }

  relayout(orientation: DisplayOrientation) {}

  public dispose() {}
}
