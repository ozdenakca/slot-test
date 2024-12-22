import { Reel } from "./Reel";
import { Viewport } from "../../managers/DisplayManager";
import * as PIXI from "pixi.js";
import { AsyncBehaviorSubject } from "../../types/AsyncBehaviorSubject";

export const SYMBOLS = [
  "a",
  "bonus",
  "brain",
  "eye",
  "freespin",
  "j",
  "k",
  "q",
  "skull",
  "wild",
  "zombie",
  "zombie_girl",
  "zombie_guy",
];

export class GameBoard extends PIXI.Container {
  private reels: Reel[] = [];
  private currentStoppingReel = 0;

  constructor() {
    super();
    this.createReels();
  }

  private createReels() {
    for (let i = 0; i < 3; i++) {
      const reel = new Reel();
      reel.position.x = i * 320;
      this.reels.push(reel);
      this.addChild(reel);
    }
  }

  public async startSpin(stoppingSymbols: string[][]): Promise<void> {
    this.currentStoppingReel = 0;

    // Start spinning all reels
    this.reels.forEach((reel) => reel.startSpin());

    // Wait for a short duration before starting to stop each reel
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Stop each reel in sequence
    for (let i = 0; i < this.reels.length; i++) {
      await this.stopReel(i, this.convertSymbolsToIndices(stoppingSymbols[i]));
    }
  }

  private convertSymbolsToIndices(symbols: string[]): number[] {
    return symbols.map((symbol) => SYMBOLS.indexOf(symbol));
  }

  private stopReel(reelIndex: number, symbols: number[]): Promise<void> {
    return new Promise((resolve) => {
      this.reels[reelIndex].stop(symbols, () => {
        resolve(); // Resolve the promise after the reel has stopped
      });
    });
  }

  public resize(viewport: Viewport): void {
    this.position.set(
      viewport.width / viewport.scale / 2 - (320 * 3) / 2,
      viewport.height / viewport.scale / 2 - 450
    );
  }
}
