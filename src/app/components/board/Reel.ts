import { gsap } from "gsap";
import * as PIXI from "pixi.js";
import { GameSymbol } from "./GameSymbol";

const ROW = 4;
const S_HEIGHT = 300;
const BORDER_Y = (ROW / 2 + 1) * S_HEIGHT;
const TOTAL_HEIGHT = (ROW + 1) * S_HEIGHT;
const SPEED = 0.05;
const MAX_PROGRESS = 3;
const MIN_DEC_SPEED_FACTOR = 0.04;
const BOUNCE_DURATION = 0.3;
const DISPLAY_SYMBOLS = [0, 1, 2, 3, 4]; // first 3 visible

export class Reel extends PIXI.Container {
  private _progress: number;
  private _symbols: GameSymbol[] = [];
  private _stopping: boolean = false;
  private updateTicker: PIXI.Ticker; // New ticker instance for updates

  constructor() {
    super();
    this.init();
    this.updateTicker = new PIXI.Ticker(); // Initialize the new ticker
  }

  private init() {
    const spinMask = new PIXI.Graphics()
      .beginFill(0xffffff, 1)
      .drawRect(0, 0, 300, 900)
      .endFill();
    this.mask = spinMask;
    this.addChild(spinMask);
    for (let i = 0; i < 5; i++) {
      const symbol = new GameSymbol(1);
      symbol.position.y = i * S_HEIGHT;
      this._symbols.push(symbol);
      this.addChild(symbol);
    }
    this._progress = 0;
  }

  public startSpin() {
    this.updateTicker.add(this.spin, this); // Add the spin method to the ticker
    this.updateTicker.start(); // Start the new ticker
  }

  private spin() {
    if (this.progress > MAX_PROGRESS) {
      this.updateTicker.stop(); // Stop the ticker
      this.decelerate(Math.ceil(this.progress) - this.progress);
    } else {
      this.progress += SPEED; // Update progress for spinning
    }
  }

  public stop(symbols: number[], onComplete: () => void) {
    // This method will stop the reel based on the provided symbols
    this._stopping = true;
    this._symbols.forEach((symbol, index) => {
      if (index < symbols.length) {
        symbol.index = symbols[index]; // Update symbol's index when stopping
      }
    });

    // Trigger the completion callback after the stopping animation
    gsap.to(this, {
      progress: MAX_PROGRESS,
      duration: BOUNCE_DURATION,
      onComplete: () => {
        onComplete(); // Call the onComplete callback after the stopping animation completes
      },
    });
  }

  private decelerate(rProgress: number) {
    let dProgress = rProgress + 1; // delta progress
    const tProgress = dProgress + this.progress; // target progress
    let dFactor = 3.5; // decreasing factor
    let bounceFunc = function () {
      if (dProgress <= 1) {
        // last tour lets set the display symbols
        this._stopping = true;
      }
      let dSpeed = dProgress / dFactor; // decreasing speed
      dSpeed = Math.max(dSpeed, MIN_DEC_SPEED_FACTOR); // slow down but dont stop
      dProgress -= dSpeed;
      this.progress += dSpeed;
      if (this.progress >= tProgress + MIN_DEC_SPEED_FACTOR) {
        // we moved too much, lets bounce back
        this.updateTicker.stop(); // Stop the ticker
        gsap.to(this, BOUNCE_DURATION, {
          progress: tProgress,
          onComplete: () => {
            this._stopping = false;
            this._progress = 0;
            for (let i = 0; i < 5; i++) {
              // Reset positions
              this._symbols[i].position.y = i * S_HEIGHT;
            }
          },
        });
      }
    }.bind(this);

    this.updateTicker.add(bounceFunc, this); // Add the bounce function to the ticker
  }

  public dispose() {
    this.updateTicker.stop(); // Stop the ticker
  }

  public get progress() {
    return this._progress;
  }

  public set progress(value: number) {
    let deltaY = (value - this._progress) * TOTAL_HEIGHT;
    this._progress = value;
    for (let i = 4; i >= 0; i--) {
      this._symbols[i].position.y += deltaY;
      if (this._symbols[i].position.y >= BORDER_Y - 2) {
        this._symbols[i].position.y =
          this._symbols[i].position.y - TOTAL_HEIGHT;
        if (this._stopping) {
          this._symbols[i].index = DISPLAY_SYMBOLS[i];
        } else {
          this._symbols[i].index = Math.floor(Math.random() * 13);
        }
      }
    }
  }
}
