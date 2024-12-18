import * as PIXI from "pixi.js";
import "@pixi-spine/all-3.8"; // Import Spine plugin

// Extend Window interface to include PIXI and Spine
declare global {
  interface Window {
    PIXI: any; // Using 'any' to avoid type conflicts with Spine
    Game: any;
  }
}

// Assign PIXI to window
window.PIXI = PIXI;

// Import and initialize game
import { Game } from "./app/Game";
const game: Game = new Game();

// Make game globally accessible
window.Game = game;
