import { ResourceManager } from "../managers/ResourceManager";
import { Main } from "../scenes/Main";
import { gsap } from "gsap";

import { Game } from "../Game";
import { Scene } from "../types/Scene";
import { DisplayOrientation, Viewport } from "../managers/DisplayManager";

export class LoaderStage extends Scene {
  public init() {}

  resize(viewport: Viewport) {}
  public dispose() {
    this.game.resource.off("loadcomplete");
  }
}
