import { Game } from "../Game";
import * as PIXI from "pixi.js";
import { IResizable, Viewport } from "../managers/DisplayManager";

export abstract class Component extends PIXI.Container implements IResizable {
  protected game: Game;

  constructor(game: Game, x: number, y: number) {
    super();
    this.game = game;
    this.position.set(x, y);
    this.game.display.registerResizable(this);
    this.init();
  }

  public abstract init(): void;
  public abstract resize(viewport: Viewport): void;

  public destroy(): void {
    this.game.display.unregisterResizable(this);
    super.destroy();
  }
}
