import { Game } from "../Game";
import { Container } from "pixi.js";

export abstract class Scene extends Container {
  protected game: Game;
  constructor(game: Game, name: string = "Stage") {
    super();
    this.game = game;
  }
  public abstract init(...args: any[]): void;
  public abstract dispose(...args: any[]): void;
}
