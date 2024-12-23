import * as PIXI from "pixi.js";
import { SYMBOLS } from "./GameBoard";

export type SymbolGrid = {
  column: number;
  row: number;
};

export class GameSymbol extends PIXI.Sprite {
  private _index;
  private _grid: SymbolGrid = {
    column: 0,
    row: 0,
  };
  private _isConnected: boolean = false;

  constructor(index: number, column: number, row: number) {
    super(PIXI.Texture.from(SYMBOLS[index]));
    this._grid.column = column;
    this._grid.row = column;
  }

  public set index(value) {
    this._isConnected = false;
    if (value != this._index) {
      this._index = value;
      this.texture = PIXI.Texture.from(SYMBOLS[value]);
      this.stopDim();
    }
  }

  setType(value: string) {
    this._isConnected = false;
    this.texture = PIXI.Texture.from(value);
    this.stopDim();
  }

  connect() {
    this._isConnected = true;
  }

  dim(tintColor: number = 0x666666, dimAlpha: number = 0.8) {
    if (!this._isConnected) {
      this.tint = tintColor;
      this.alpha = dimAlpha;
    }
  }

  stopDim() {
    this.tint = 0xffffff;
    this.alpha = 1;
  }

  get grid() {
    return this._grid;
  }
}
