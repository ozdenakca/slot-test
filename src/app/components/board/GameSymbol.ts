import * as PIXI from "pixi.js";
import { SYMBOLS } from "./GameBoard";

export class GameSymbol extends PIXI.Sprite {
  private _index;
  constructor(index: number) {
    super(PIXI.Texture.from(SYMBOLS[index]));
  }

  public set index(value) {
    if (value != this._index) {
      this._index = value;
      this.texture = PIXI.Texture.from(SYMBOLS[value]);
    }
  }
}
