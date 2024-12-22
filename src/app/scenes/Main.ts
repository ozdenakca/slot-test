import "pixi-spine";
import { Scene } from "../types/Scene";
import { Viewport } from "../managers/DisplayManager";
import * as PIXI from "pixi.js";
import { Machine } from "../components/Machine";

export class Main extends Scene {
  public init() {
    const sprite = new PIXI.Sprite(PIXI.Texture.from("background"));
    this.addChild(sprite);
    sprite.anchor.set(0.5);

    const machine = new Machine(this.game, 0, 0);
    this.addChild(machine);
  }

  resize(viewport: Viewport) {}

  public dispose() {}
}
