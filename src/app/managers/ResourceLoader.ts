import * as PIXI from "pixi.js";
import { EventEmitter } from "eventemitter3";

export class ResourceLoader extends EventEmitter {
  private loader: PIXI.Loader;
  private assets = [
    { name: "background", url: "assets/background.jpg" },
    { name: "symbols", url: "assets/slotSymbols.json" },
    { name: "coin", url: "assets/coin.png" },
  ];

  constructor() {
    super();
    this.loader = new PIXI.Loader();
  }

  public async loadAssets(): Promise<void> {
    try {
      this.assets.forEach((asset) => {
        console.log(`Adding asset: ${asset.name} - ${asset.url}`);
        this.loader.add(asset.name, asset.url);
      });

      this.loader.onProgress.add((loader) => {
        console.log(`Loading: ${loader.progress}%`);
      });

      await new Promise<void>((resolve, reject) => {
        this.loader.load((loader, resources) => {
          console.log("All assets loaded:", resources);
          this.emit("loadComplete");
          resolve();
        });

        this.loader.onError.add((error) => {
          console.error("Error loading assets:", error);
          this.emit("loadError", error);
          reject(error);
        });
      });
    } catch (error) {
      console.error("Error loading assets:", error);
      this.emit("loadError", error);
      throw error;
    }
  }

  public getTexture(name: string): PIXI.Texture | undefined {
    const resource = this.loader.resources[name];
    return resource ? resource.texture : undefined;
  }

  public destroy(): void {
    // Destroy loaded resources
    this.assets.forEach((asset) => {
      const resource = this.loader.resources[asset.name];
      if (resource) {
        resource.texture?.destroy(true);
        delete this.loader.resources[asset.name];
      }
    });

    this.loader.reset();
    this.removeAllListeners();
  }
}
