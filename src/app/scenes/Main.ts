import "pixi-spine";
import { Scene } from "../types/Scene";
import { DisplayOrientation } from "../managers/DisplayManager";
import * as PIXI from "pixi.js";

export class Main extends Scene {
  public init() {
    const sprite = new PIXI.Sprite(PIXI.Texture.from("background"));
    this.addChild(sprite);
    sprite.anchor.set(0.5);
  }

  relayout(orientation: DisplayOrientation) {}

  public dispose() {}
}
