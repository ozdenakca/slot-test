import { gsap } from "gsap";
import { Viewport } from "../../managers/DisplayManager";
import { GameSymbol } from "./GameSymbol";
import * as PIXI from "pixi.js";

const ROW = 3;
const S_HEIGHT = 300;
const TOTAL_SYMBOLS = ROW + 2;
const BORDER_Y = (ROW / 2 + 1) * S_HEIGHT;
const TOTAL_HEIGHT = (ROW + 1) * S_HEIGHT;
const SPEED = 0.05;
const MAX_PROGRESS = 3;
const MIN_DEC_SPEED_FACTOR = 0.04;
const BOUNCE_DURATION = 0.3;

export class Reel extends PIXI.Container {
  private _progress: number = 0;
  private _symbols: GameSymbol[] = [];
  private _stopping: boolean = false;
  private _stopSymbols: number[] = [];
  private _reelIndex: number;
  private _spinning: boolean = false;
  private _onComplete?: () => void;

  constructor(reelIndex: number) {
    super();
    this._reelIndex = reelIndex;
    this.init();
  }

  private init() {
    const spinMask = new PIXI.Graphics()
      .beginFill(0xffffff, 1)
      .drawRect(0, 0, 300, S_HEIGHT * ROW)
      .endFill();
    this.mask = spinMask;
    this.addChild(spinMask);

    for (let i = 0; i < TOTAL_SYMBOLS; i++) {
      const symbol = new GameSymbol(Math.floor(Math.random() * 13));
      symbol.position.y = i * S_HEIGHT;
      this._symbols.push(symbol);
      this.addChild(symbol);
    }
  }

  public spin() {
    this._spinning = true;
    this._stopping = false;
    this._progress = 0;
    gsap.ticker.add(this.update);
  }

  public stop(symbols: number[], onComplete?: () => void) {
    this._stopSymbols = symbols;
    this._onComplete = onComplete;
    this._stopping = true;
  }

  private update() {
    if (!this._spinning) return;

    if (!this._stopping) {
      if (this._progress > MAX_PROGRESS) {
        this.decelerate(Math.ceil(this._progress) - this._progress);
      } else {
        this.progress += SPEED;
      }
    }
  }

  private decelerate(rProgress: number) {
    let dProgress = rProgress + 1;
    const tProgress = dProgress + this.progress;
    let dFactor = 3.5;

    if (dProgress <= 1) {
      this._stopping = true;
    }

    let dSpeed = dProgress / dFactor;
    dSpeed = Math.max(dSpeed, MIN_DEC_SPEED_FACTOR);
    dProgress -= dSpeed;
    this.progress += dSpeed;

    if (this.progress >= tProgress + MIN_DEC_SPEED_FACTOR) {
      gsap.ticker.remove(this.update);
      gsap.to(this, BOUNCE_DURATION, {
        progress: tProgress,
        onComplete: () => {
          this._spinning = false;
          this._stopping = false;
          this._progress = 0;

          for (let i = 0; i < TOTAL_SYMBOLS; i++) {
            this._symbols[i].position.y = i * S_HEIGHT;
          }

          if (this._onComplete) {
            this._onComplete();
            this._onComplete = undefined;
          }
        },
      });
    }
  }

  public get progress() {
    return this._progress;
  }

  public set progress(value: number) {
    let deltaY = (value - this._progress) * TOTAL_HEIGHT;
    this._progress = value;

    for (let i = TOTAL_SYMBOLS - 1; i >= 0; i--) {
      this._symbols[i].position.y += deltaY;
      if (this._symbols[i].position.y >= BORDER_Y - 2) {
        this._symbols[i].position.y =
          this._symbols[i].position.y - TOTAL_HEIGHT;

        if (this._stopping && this._stopSymbols.length === ROW) {
          const visibleIndex = (i + TOTAL_SYMBOLS - 1) % ROW;
          this._symbols[i].index = this._stopSymbols[visibleIndex];
        } else {
          this._symbols[i].index = Math.floor(Math.random() * 13);
        }
      }
    }
  }

  public resize(viewport: Viewport): void {}
}
