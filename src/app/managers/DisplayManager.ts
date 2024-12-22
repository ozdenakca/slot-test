import { EventEmitter } from "eventemitter3";
import * as PIXI from "pixi.js";
import { Events } from "../Events";

const SIZE = [2000, 1500];
const RATIO = SIZE[0] / SIZE[1];

export enum DisplayOrientation {
  PORTRAIT,
  LANDSCAPE,
}

export interface IResizable {
  resize(bounds: Viewport): void;
}

// types/Viewport.ts
export interface Viewport {
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  scale: number;
  designWidth: number;
  designHeight: number;
}

export class DisplayManager extends EventEmitter {
  private _app: PIXI.Application;
  private _mainContainer: PIXI.Container;
  private _resolution: number = 1;
  private _viewport: Viewport;
  private _resizableComponents: Set<IResizable> = new Set();
  private readonly DESIGN = { width: 2048, height: 1536 };

  constructor(mainContainer: PIXI.Container) {
    super();
    this._mainContainer = mainContainer;
    this._viewport = this.createViewport();
  }

  public create() {
    this._app = new PIXI.Application({
      width: this.DESIGN.width,
      height: this.DESIGN.height,
      backgroundColor: 0x000,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    globalThis.__PIXI_APP__ = this._app;

    PIXI.Ticker.shared.maxFPS = 60;
    PIXI.Ticker.shared.add((delta) => {
      this.emit(Events.UPDATE, delta);
      this.emit(Events.FPS, delta);
    });

    document.body.appendChild(this._app.view as HTMLCanvasElement);

    window.addEventListener(Events.RESIZE, this.onResize.bind(this), false);
    this.onResize();

    this._mainContainer.name = "MainContainer";
    this._app.stage.addChild(this._mainContainer);
  }

  private createViewport(): Viewport {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scaleX = windowWidth / this.DESIGN.width;
    const scaleY = windowHeight / this.DESIGN.height;
    const scale = Math.min(scaleX, scaleY);

    return {
      width: windowWidth,
      height: windowHeight,
      top: -this.DESIGN.height / 2,
      bottom: this.DESIGN.height / 2,
      left: -this.DESIGN.width / 2,
      right: this.DESIGN.width / 2,
      scale: scale,
      designWidth: this.DESIGN.width,
      designHeight: this.DESIGN.height,
    };
  }

  private onResize(): void {
    this._viewport = this.createViewport();

    this._app.renderer.resize(this._viewport.width, this._viewport.height);

    this._mainContainer.scale.set(this._viewport.scale / this._resolution);
    this._mainContainer.position.set(
      this._viewport.width * 0.5,
      this._viewport.height * 0.5
    );

    this._resizableComponents.forEach((component) => {
      component.resize(this._viewport);
    });

    this.emit(Events.VIEWPORT_RESIZE, this._viewport);
  }

  public registerResizable(component: IResizable): void {
    this._resizableComponents.add(component);
    component.resize(this._viewport);
  }

  public unregisterResizable(component: IResizable): void {
    this._resizableComponents.delete(component);
  }

  public getWorldPosition(x: number, y: number): PIXI.Point {
    const viewportX = (x - this._viewport.width / 2) / this._viewport.scale;
    const viewportY = (y - this._viewport.height / 2) / this._viewport.scale;
    return new PIXI.Point(viewportX, viewportY);
  }

  public getScreenPosition(worldX: number, worldY: number): PIXI.Point {
    const screenX = worldX * this._viewport.scale + this._viewport.width / 2;
    const screenY = worldY * this._viewport.scale + this._viewport.height / 2;
    return new PIXI.Point(screenX, screenY);
  }

  public get viewport(): Viewport {
    return this._viewport;
  }

  public get app(): PIXI.Application {
    return this._app;
  }
}
