export enum ButtonState {
  IDLE = "out",
  HOVER = "over",
  DOWN = "down",
  DISABLED = "disabled",
}

import * as PIXI from "pixi.js";
import { AsyncBehaviorSubject } from "./AsyncBehaviorSubject";

export class Button extends PIXI.Container {
  protected background: PIXI.Sprite;
  protected state = new AsyncBehaviorSubject<ButtonState>(ButtonState.IDLE);
  private baseTextureName: string;

  constructor(textureName: string) {
    super();

    this.interactive = true;
    this.buttonMode = true;
    this.baseTextureName = textureName;

    this.background = new PIXI.Sprite();
    this.background.anchor.set(0.5);
    this.addChild(this.background);

    this.state.watch((newState) => this.updateTexture(newState));

    this.on("pointerdown", () => this.state.next(ButtonState.DOWN));
    this.on(
      "pointerup",
      () => !this.disabled && this.state.next(ButtonState.IDLE)
    );
    this.on("pointerupoutside", () => this.state.next(ButtonState.IDLE));
    this.on("pointerout", () => this.state.next(ButtonState.IDLE));
    this.on(
      "pointerover",
      () => !this.disabled && this.state.next(ButtonState.HOVER)
    );
    this.on("click", () => !this.disabled && this.emit("buttonClick"));

    this.updateTexture(ButtonState.IDLE);
  }

  protected updateTexture(state: ButtonState): void {
    const textureName = `${this.baseTextureName}_${state}`;
    this.background.texture = PIXI.Texture.from(textureName);
  }

  get disabled(): boolean {
    return this.state.value === ButtonState.DISABLED;
  }

  set disabled(value: boolean) {
    if (value) {
      this.state.next(ButtonState.DISABLED);
      this.interactive = false;
      this.buttonMode = false;
    } else {
      this.state.next(ButtonState.IDLE);
      this.interactive = true;
      this.buttonMode = true;
    }
  }
}
