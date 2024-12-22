import { SpinMediator } from "../mediators/SpinMediator";
import { Component } from "../types/Component";
import { Viewport } from "../managers/DisplayManager";
import { Inject } from "../utils/inject";
import { SpinCommand } from "../commands/SpinCommand";
import { waitForSec } from "../utils/waitForSec";
import { MACHINE_STATES, MachineMediator } from "../mediators/MachineMediator";
import { GameBoard } from "./board/GameBoard";

export class Machine extends Component {
  @Inject(MachineMediator)
  private _machineMediator: MachineMediator;

  @Inject(SpinMediator)
  private _spinMediator: SpinMediator;

  private _gameBoard: GameBoard;

  postConstruct() {
    this._gameBoard = new GameBoard();
    this._machineMediator.machineState.watch(async (value) => {
      switch (value) {
        case MACHINE_STATES.SPIN:
          this.spin();
          break;
        case MACHINE_STATES.WIN:
          this.showWin();
          break;
      }
    });
    this.addChild(this._gameBoard);
  }

  async spin() {
    this._gameBoard.startSpin();
    // const { board } = this._spinMediator;
    await waitForSec(3);
    console.log("spin is ending");
  }

  async showWin() {
    await waitForSec(3);
    console.log("win shown");
  }

  public resize(viewport: Viewport): void {}
}
