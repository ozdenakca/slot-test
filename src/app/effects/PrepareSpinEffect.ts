import { SYMBOLS } from "../components/board/GameBoard";
import { SpinMediator } from "../mediators/SpinMediator";
import { Effect } from "../types/Command";
import { Inject } from "../utils/inject";

export class PrepareSpinEffect extends Effect {
  @Inject(SpinMediator)
  private _spinMediator: SpinMediator;

  async run(): Promise<void> {
    const board = [
      ["zombie", "brain", "skull"], // First reel
      ["wild", "zombie", "eye"], // Second reel
      ["bonus", "zombie_guy", "zombie"], // Third reel
    ];
    this._spinMediator.loadSpin({
      board: board,
    });
  }

  private generateRandomBoard(): string[][] {
    const board: string[][] = [];
    for (let col = 0; col < 3; col++) {
      const column: string[] = [];
      for (let row = 0; row < 3; row++) {
        const randomIndex = Math.floor(Math.random() * SYMBOLS.length);
        column.push(SYMBOLS[randomIndex]);
      }
      board.push(column);
    }
    return board;
  }
}
