import { SymbolGrid } from "../components/board/GameSymbol";

type SpinData = {
  board: string[][];
};

export class SpinMediator {
  private _spinData: SpinData;
  private _wins: SymbolGrid[][];

  loadSpin(spinData: SpinData) {
    this._spinData = spinData;
    this._wins = this.calculateWin(spinData.board);
  }

  get board() {
    return this._spinData.board;
  }

  get wins() {
    return this._wins;
  }

  private calculateWin(reels: string[][]): SymbolGrid[][] {
    const matches: SymbolGrid[][] = [];
    for (let row0 = 0; row0 < reels[0].length; row0++) {
      const symbol = reels[0][row0];
      for (let row1 = 0; row1 < reels[1].length; row1++) {
        if (reels[1][row1] === "wild" || reels[1][row1] === symbol) {
          for (let row2 = 0; row2 < reels[2].length; row2++) {
            if (reels[2][row2] === symbol) {
              matches.push([
                { column: 0, row: row0 },
                { column: 1, row: row1 },
                { column: 2, row: row2 },
              ]);
            }
          }
        }
      }
    }
    return matches;
  }
}
