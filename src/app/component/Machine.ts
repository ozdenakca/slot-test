import * as PIXI from "pixi.js";
import { Inject } from "../utils/inject";
import { SpinMediator } from "../mediators/SpinMediator";

export class Machine extends PIXI.Container {
  @Inject("SpinMediator")
  private _spinMediator: SpinMediator;

  constructor() {
    super();
    this._spinMediator.isSpinning.subscribe((value: boolean) => {
      console.log("ISSpinning", value);
    });
  }
}
