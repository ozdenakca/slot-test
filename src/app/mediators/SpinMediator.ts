type SpinData = {
  board: string[];
};

export class SpinMediator {
  private _spinData: SpinData;

  loadSpin(spinData: SpinData) {
    this._spinData = spinData;
  }

  get board() {
    return this._spinData.board;
  }

  private calculateWin() {}
}
