import { Game } from "../Game";
import * as PIXI from "pixi.js";
import { IResizable, Viewport } from "../managers/DisplayManager";

export abstract class Component extends PIXI.Container implements IResizable {
  protected game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
    this.game.display.registerResizable(this);
  }

  public postConstruct() {
    this.game.display.registerResizable(this);
  }
  public abstract resize(viewport: Viewport): void;

  public destroy(): void {
    this.game.display.unregisterResizable(this);
    super.destroy();
  }
}
