import { Component } from "../types/Component";
import { Viewport } from "../managers/DisplayManager";
import * as PIXI from "pixi.js";

export class GameBackground extends Component {
  postConstruct() {
    const sprite = new PIXI.Sprite(PIXI.Texture.from("background"));
    this.addChild(sprite);
    sprite.anchor.set(0.5);
  }

  public resize(viewport: Viewport): void {}
}
