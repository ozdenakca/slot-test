import { Events } from "../Events";
import { EventEmitter } from "eventemitter3";
import { Application, Container, Ticker } from "pixi.js";

const SIZE = [2000, 1500];
const RATIO = SIZE[0] / SIZE[1];

export enum DisplayOrientation {
  PORTRAIT,
  LANDSCAPE,
}

export class DisplayManager extends EventEmitter {
  private _app: Application;
  private _mainContainer: Container;
  private resolution: number = 1;

  constructor(mainContainer: Container) {
    super();
    this._mainContainer = mainContainer;
  }

  public create() {
    this._app = new Application({
      width: 2048,
      height: 1536,
      backgroundColor: 0x333f48,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    globalThis.__PIXI_APP__ = this._app;

    Ticker.shared.maxFPS = 60;
    Ticker.shared.add((delta) => {
      this.emit(Events.UPDATE, delta);
      this.emit(Events.FPS, delta);
    });

    document.body.appendChild(this._app.view as HTMLCanvasElement);

    window.addEventListener(Events.RESIZE, this.onResize.bind(this), false);
    this.onResize();

    this._mainContainer.name = "MainContainer";
    this._app.stage.addChild(this._mainContainer);
  }

  private onResize(): void {
    const design = { width: 2048, height: 1536 };

    const scaleXa = window.innerWidth / design.width;
    const scaleYa = window.innerHeight / design.height;

    const scale = Math.min(scaleXa, scaleYa);

    this._app.renderer.resize(window.innerWidth, window.innerHeight);

    const posX = window.innerWidth;
    const posY = window.innerHeight;

    this._mainContainer.scale.set(scale / this.resolution);
    this._mainContainer.position.set(posX * 0.5, posY * 0.5);
  }

  public get app(): Application {
    return this._app;
  }
}
