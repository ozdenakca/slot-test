import "pixi-spine";
import { Scene } from "../types/Scene";
import { DisplayOrientation } from "../managers/DisplayManager";
import * as PIXI from "pixi.js";

export class Main extends Scene {
  public init() {
    const sprite = new PIXI.Sprite(PIXI.Texture.from("brain"));
    this.addChild(sprite);
  }

  relayout(orientation: DisplayOrientation) {}

  public dispose() {}
}
