import "pixi-spine";
import { Scene } from "../types/Scene";
import { Viewport } from "../managers/DisplayManager";
import * as PIXI from "pixi.js";
import { Machine } from "../components/Machine";
import { Inject } from "../utils/inject";
import { GameBackground } from "../components/GameBackground";
import { SpinPanel } from "../components/SpinPanel";

export class Main extends Scene {
  @Inject(GameBackground)
  private _gameBackground: GameBackground;

  @Inject(SpinPanel)
  private _spinPanel: SpinPanel;

  @Inject(Machine)
  private _machine: Machine;

  public init() {
    this.addChild(this._gameBackground);
    this.addChild(this._spinPanel);
    this.addChild(this._machine);
    this._machine.position.set(-600, -600);
  }

  resize(viewport: Viewport) {}

  public dispose() {}
}
