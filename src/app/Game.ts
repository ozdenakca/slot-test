import { DisplayManager } from "./managers/DisplayManager";
import { SceneManager } from "./managers/SceneManager";
import { LoaderStage } from "./scenes/Loader";
import { ResourceManager } from "./managers/ResourceManager";
import { SpinMediator } from "./mediators/SpinMediator";
import { DependencyContainer } from "./utils/inject";
import { Machine } from "./components/Machine";
import { SpinCommand } from "./commands/SpinCommand";
import { PrepareSpinEffect } from "./effects/PrepareSpinEffect";
import { DisableUIEffect } from "./effects/DisableUIEffect";
import { SpinEffect } from "./effects/SpinEffect";
import { Command } from "./types/Command";

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
    this.initManagers();
    this.initLoading();
    this.addDependecies();
  }

  private addDependecies() {
    DependencyContainer.registerMediator(SpinMediator);
    DependencyContainer.registerCommand(SpinCommand, [
      PrepareSpinEffect,
      DisableUIEffect,
      SpinEffect,
    ]);
    DependencyContainer.registerComponent(Machine, this, 100, 100);
    DependencyContainer.initialize();
  }

  private initManagers() {
    this._stage = new SceneManager(this);
    this._display = new DisplayManager(this._stage.main);
    this._resource = new ResourceManager();
    this._display.create();
  }

  private initLoading() {
    this._resource.loadAssets();
    this._loader = new LoaderStage(this, "LoaderScene");
    this._stage.createScene("LoaderStage", this._loader);
    this._stage.goToScene("LoaderStage", true);
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

  getDependency<T>(type: new (...args: any[]) => T): T {
    return DependencyContainer.resolve(type.name) as T;
  }

  public async runCommand<T extends Command>(
    commandClass: new (...args: any[]) => T,
    ...args: any[]
  ): Promise<void> {
    const command = DependencyContainer.resolve<T>(commandClass.name);
    await command.execute(...args);
  }
}
