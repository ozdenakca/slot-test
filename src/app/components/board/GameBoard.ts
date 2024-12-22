import { Reel } from "./Reel";
import { Viewport } from "../../managers/DisplayManager";
import * as PIXI from "pixi.js";
import { Component } from "../../types/Component";

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

export class GameBoard extends Component {
  private reels: Reel[] = [];
  private currentStoppingReel = 0;

  public createReels() {
    for (let i = 0; i < 3; i++) {
      const reel = new Reel(this.game);
      reel.position.x = i * 320;
      this.reels.push(reel);
      this.addChild(reel);
    }
  }

  public async startSpin(stoppingSymbols: string[][]): Promise<void> {
    this.currentStoppingReel = 0;
    console.log("REEELSS", this.reels.length);
    this.reels.forEach((reel, index) =>
      reel.startSpin(stoppingSymbols[index], index * 0.2)
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  private convertSymbolsToIndices(symbols: string[]): number[] {
    return symbols.map((symbol) => SYMBOLS.indexOf(symbol));
  }

  public resize(viewport: Viewport): void {
    this.position.set(
      viewport.width / viewport.scale / 2 - (320 * 3) / 2,
      viewport.height / viewport.scale / 2 - 450
    );
  }
}
