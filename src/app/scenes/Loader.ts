import { ResourceManager } from "../managers/ResourceManager";
import { Main } from "../scenes/Main";
import { gsap } from "gsap";

import { Game } from "../Game";
import { Scene } from "../types/Scene";
import { DisplayOrientation, Viewport } from "../managers/DisplayManager";

export class LoaderStage extends Scene {
  public init() {
    this.game.resource.once("loadComplete", this.onLoadComplete, this);
  }

  private onLoadComplete(): void {
    console.log("Creating Main scene...");
    this.game.stage.createScene("Main", new Main(this.game, "MainGame"));
    console.log("Main scene created successfully");
    this.game.stage.goToScene("Main", true);
  }

  resize(viewport: Viewport) {}
  public dispose() {
    this.game.resource.off("loadcomplete");
  }
}
