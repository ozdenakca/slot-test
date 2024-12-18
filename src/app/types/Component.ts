import { Game } from "../Game";
import * as PIXI from "pixi.js";

export abstract class Component extends PIXI.Container {
  protected game: Game;

  constructor(game: Game, x: number, y: number) {
    super();
    this.game = game;
    this.position.set(x, y);
  }

  public abstract dispose(): void;
}
