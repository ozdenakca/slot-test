import { gsap } from "gsap";
import { GameSymbol } from "./GameSymbol";
import { Component } from "../../types/Component";
import { Game } from "../../Game";
import { Events } from "../../Events";
import { Viewport } from "../../managers/DisplayManager";
import * as PIXI from "pixi.js";
import { waitForSec } from "../../utils/waitForSec";

const ROW = 4;
const S_HEIGHT = 300;
const BORDER_Y = (ROW / 2 + 1) * S_HEIGHT;
const TOTAL_HEIGHT = (ROW + 1) * S_HEIGHT;
const SPEED = 0.05;
const MAX_PROGRESS = 3;
const MIN_DEC_SPEED_FACTOR = 0.04;
const BOUNCE_DURATION = 0.3;

export class Reel extends Component {
  private _progress = 0;
  private _symbols: GameSymbol[] = [];
  private _stopping = false;
  private _displaySymbols: string[] = [];

  constructor(game: Game) {
    super(game);
    this.init();
  }

  private init() {
    const spinMask = new PIXI.Graphics()
      .beginFill(0xffffff, 1)
      .drawRect(0, 0, 300, 900)
      .endFill();
    this.mask = spinMask;
    this.addChild(spinMask);

    // Create 5 symbols stacked vertically
    for (let i = 0; i < 5; i++) {
      const symbol = new GameSymbol(1);
      symbol.position.y = i * S_HEIGHT;
      this._symbols.push(symbol);
      this.addChild(symbol);
    }
  }

  public async startSpin(stoppingSymbols: string[], delay: number) {
    this._displaySymbols = stoppingSymbols;
    this.resetPositionsAndProgress();
    this.game.display.on(Events.UPDATE, this.spin, this);
  }

  private spin = () => {
    if (this.progress > MAX_PROGRESS) {
      this.game.display.off(Events.UPDATE, this.spin, this);
      const remainder = Math.ceil(this.progress) - this.progress;
      this.decelerate(remainder);
    } else {
      this.progress += SPEED;
    }
  };

  private decelerate(rProgress: number) {
    let dProgress = rProgress + 1;
    const tProgress = this.progress + dProgress;

    const onUpdate = () => {
      if (dProgress <= 1) {
        this._stopping = true;
      }

      let dSpeed = dProgress / 3.5;
      dSpeed = Math.max(dSpeed, MIN_DEC_SPEED_FACTOR);
      dProgress -= dSpeed;
      this.progress += dSpeed;
      if (this.progress >= tProgress + MIN_DEC_SPEED_FACTOR) {
        this.game.display.off(Events.UPDATE, onUpdate, this);

        gsap.to(this, {
          duration: BOUNCE_DURATION,
          progress: tProgress,
          onComplete: () => {
            this.finishSpin();
          },
        });
      }
    };
    this.game.display.on(Events.UPDATE, onUpdate, this);
    onUpdate();
  }

  private finishSpin() {
    this._stopping = false;
    this._progress = 0;

    for (let i = 0; i < this._symbols.length; i++) {
      this._symbols[i].position.y = i * S_HEIGHT;
    }
  }

  public dispose() {
    this.game.display.off(Events.UPDATE, this.spin, this);
  }

  private resetPositionsAndProgress() {
    this._progress = 0;
    for (let i = 0; i < this._symbols.length; i++) {
      this._symbols[i].position.y = i * S_HEIGHT;
    }
  }

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

  public resize(viewport: Viewport): void {
    // if you need dynamic resizing, implement here
  }
}
