import { DisplayManager } from "./managers/DisplayManager";
import { SceneManager } from "./managers/SceneManager";
import { LoaderStage } from "./scenes/Loader";
import { ResourceManager } from "./managers/ResourceManager";
import { SpinMediator } from "./mediators/SpinMediator";
import { DependencyContainer } from "./utils/inject";

export interface Mediator {
  notify(sender: object, event: string): void;
}

export const TYPES = {
  Mediator: Symbol.for("Mediator"),
};

export class Game {
  private _display: DisplayManager;
  private _stage: SceneManager;
  private _resource: ResourceManager;
  private _loader: LoaderStage;
  private static _instance: Game;

  constructor() {
    Game._instance = this;
    this.init();
  }

  private init() {
    this._stage = new SceneManager(this);
    this._display = new DisplayManager(this._stage.main);
    this._display.create();
    this._resource = new ResourceManager();
    this._loader = new LoaderStage(this, "LoaderScene");
    this._resource.loadAssets();
    this._stage.createScene("LoaderStage", this._loader);
    this._stage.goToScene("LoaderStage", true);
    DependencyContainer.register("SpinMediator", new SpinMediator());
  }

  public static get instance(): Game {
    return Game._instance;
  }

  public get stage(): any {
    return this._stage;
  }

  public get display(): any {
    return this._display;
  }
  public get resource(): any {
    return this._resource;
  }
}
