import { gsap } from "gsap";
import { GameSymbol } from "./GameSymbol";
import * as PIXI from "pixi.js";
import { waitForSec } from "../../utils/waitForSec";

const ROW = 4;
const S_HEIGHT = 300;
const BORDER_Y = (ROW / 2 + 1) * S_HEIGHT;
const TOTAL_HEIGHT = (ROW + 1) * S_HEIGHT;
const SPIN_DURATION = 1.2; // Duration for initial spin
const DECELERATION_DURATION = 0.4; // Duration for deceleration
const BOUNCE_DURATION = 0.15;

export class Reel extends PIXI.Container {
  private _symbols: GameSymbol[] = [];
  private _displaySymbols: string[] = [];
  private _currentTween?: gsap.core.Tween;
  private _stopping = false;
  private _id: number;

  constructor(id: number) {
    super();
    this._id = id;
    this.init();
  }

  private init() {
    const spinMask = new PIXI.Graphics()
      .beginFill(0xffffff, 1)
      .drawRect(0, 0, 300, 900)
      .endFill();
    this.mask = spinMask;
    this.addChild(spinMask);

    for (let i = 0; i < 5; i++) {
      const symbol = new GameSymbol(1, this._id, i);
      symbol.position.y = i * S_HEIGHT;
      this._symbols.push(symbol);
      this.addChild(symbol);
    }
  }

  public async startSpin(stoppingSymbols: string[]): Promise<void> {
    this._displaySymbols = stoppingSymbols;
    this._stopping = false;
    this.resetPositions();
    if (this._currentTween) {
      this._currentTween.kill();
    }
    this._progress = 0;
    return new Promise((resolve) => {
      this._currentTween = gsap.to(this, {
        progress: 3 + (this._id * 0.3) / 3,
        duration: SPIN_DURATION + (this._id * 0.3) / SPIN_DURATION,
        ease: "none",
        onComplete: () => {
          this.startDeceleration(resolve);
        },
      });
    });
  }

  set stopping(value: boolean) {}

  private startDeceleration(resolve: (value: void) => void) {
    const targetProgress = Math.ceil(this.progress) + 1;
    this._currentTween = gsap.to(this, {
      progress: targetProgress,
      duration: DECELERATION_DURATION,
      ease: "power1.out",
      onUpdate: async () => {
        if (targetProgress - this.progress <= 1) {
          this._stopping = true;
        }
      },
      onComplete: () => {
        this.setFinalSymbols();
        this._currentTween = gsap.to(this, {
          progress: targetProgress,
          duration: BOUNCE_DURATION,
          ease: "bounce.out",
          onComplete: () => {
            this.finishSpin();
            resolve();
          },
        });
      },
    });
  }

  private setFinalSymbols() {
    for (let i = 0; i < this._symbols.length; i++) {
      if (this._displaySymbols[i]) {
        this._symbols[i].setType(this._displaySymbols[i]);
      }
      this._symbols[i].position.y = i * S_HEIGHT;
    }
  }

  private finishSpin() {
    this._stopping = false;
    this._progress = 0;
    this.setFinalSymbols();
  }

  private resetPositions() {
    for (let i = 0; i < this._symbols.length; i++) {
      this._symbols[i].position.y = i * S_HEIGHT;
    }
  }

  public dispose() {
    if (this._currentTween) {
      this._currentTween.kill();
    }
    this.destroy({ children: true });
  }

  private _progress = 0;

  public get progress(): number {
    return this._progress;
  }

  public set progress(value: number) {
    const deltaY = (value - this._progress) * TOTAL_HEIGHT;
    this._progress = value;

    for (let i = 4; i >= 0; i--) {
      this._symbols[i].position.y += deltaY;
      if (this._symbols[i].position.y >= BORDER_Y - 2) {
        this._symbols[i].position.y -= TOTAL_HEIGHT;
        if (this._stopping && this._displaySymbols[i]) {
          this._symbols[i].setType(this._displaySymbols[i]);
        } else {
          this._symbols[i].index = Math.floor(Math.random() * 13);
        }
      }
    }
  }

  public resize(width: number, height: number): void {
    // Implement resize logic if needed
  }

  get symbols(): GameSymbol[] {
    return this._symbols;
  }
}
