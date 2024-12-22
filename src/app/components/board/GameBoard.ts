import { Reel } from "./Reel";
import { Viewport } from "../../managers/DisplayManager";
import * as PIXI from "pixi.js";

export class GameBoard extends PIXI.Container {
  private reels: Reel[] = [];
  private currentStoppingReel = 0;
  private isSpinning = false;

  constructor() {
    super();
    this.createReels();
  }

  private createReels() {
    for (let i = 0; i < 3; i++) {
      const reel = new Reel(i);
      reel.position.x = i * 320;
      this.reels.push(reel);
      this.addChild(reel);
    }
  }

  public async startSpin(): Promise<void> {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.currentStoppingReel = 0;

    // Start all reels spinning
    this.reels.forEach((reel) => reel.spin());

    // Generate stopping symbols for 3x3 grid
    const stoppingSymbols = this.generateStoppingSymbols();

    // Wait for initial spin time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Stop reels one by one
    for (let i = 0; i < this.reels.length; i++) {
      await this.stopReel(i, stoppingSymbols[i]);
      // Wait between reel stops
      if (i < this.reels.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    this.isSpinning = false;
  }

  private generateStoppingSymbols(): number[][] {
    const symbols: number[][] = [];

    // Generate for each reel
    for (let i = 0; i < 3; i++) {
      const reelSymbols: number[] = [];
      // Generate 3 symbols for each reel
      for (let j = 0; j < 3; j++) {
        reelSymbols.push(Math.floor(Math.random() * 13));
      }
      symbols.push(reelSymbols);
    }

    return symbols;
  }

  private stopReel(reelIndex: number, symbols: number[]): Promise<void> {
    return new Promise((resolve) => {
      this.reels[reelIndex].stop(symbols, resolve);
    });
  }

  public resize(viewport: Viewport): void {
    this.position.set(
      viewport.width / viewport.scale / 2 - (320 * 3) / 2,
      viewport.height / viewport.scale / 2 - 450
    );
  }
}
