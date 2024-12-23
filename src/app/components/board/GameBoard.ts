import { Reel } from "./Reel";
import { Viewport } from "../../managers/DisplayManager";
import * as PIXI from "pixi.js";
import { GameSymbol, SymbolGrid } from "./GameSymbol";

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
  private _reels: Reel[] = [];
  private _symbols: GameSymbol[][] = [];

  public createReels() {
    for (let i = 0; i < 3; i++) {
      const reel = new Reel(i);
      reel.position.x = i * 320;
      this._reels.push(reel);
      this.addChild(reel);
      this._symbols.push(reel.symbols);
    }
  }

  public async startSpin(stoppingSymbols: string[][]): Promise<void> {
    const promises = [];
    this._reels.forEach((reel, index) =>
      promises.push(reel.startSpin(stoppingSymbols[index]))
    );
    await Promise.all(promises);
  }

  public showWin(winLines: SymbolGrid[][]) {
    winLines.forEach((winLine) => {
      winLine.forEach((grid) => {
        const symbol = this.getSymbol(grid);
        symbol.connect();
      });
    });
    this._symbols.flat().forEach((symbol) => symbol.dim());
  }

  public resize(viewport: Viewport): void {
    this.position.set(
      viewport.width / viewport.scale / 2 - (320 * 3) / 2,
      viewport.height / viewport.scale / 2 - 450
    );
  }

  getSymbol(grid: SymbolGrid): GameSymbol | undefined {
    const column = this._symbols[grid.column];
    console.log("COLUMNN", column);
    return column ? column[grid.row] : undefined;
  }
}
