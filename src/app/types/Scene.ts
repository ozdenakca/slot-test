import { Game } from "../Game";
import * as PIXI from "pixi.js";
import { IResizable, Viewport } from "../managers/DisplayManager";

export abstract class Scene extends PIXI.Container implements IResizable {
  protected game: Game;

  constructor(game: Game, name: string = "Stage") {
    super();
    this.game = game;
    this.name = name;
    this.game.display.registerResizable(this);
  }

  public abstract init(...args: any[]): void;
  public abstract resize(viewport: Viewport): void;

  public destroy(): void {
    this.game.display.unregisterResizable(this);
    super.destroy();
  }
}
