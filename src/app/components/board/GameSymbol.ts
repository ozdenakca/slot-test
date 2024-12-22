const SYMBOLS = [
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

import * as PIXI from "pixi.js";

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
