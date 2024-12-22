import { Effect } from "../types/Command";

export class ShowWinEffect extends Effect {
  async run(): Promise<void> {
    console.log("win is showing");
  }
}
