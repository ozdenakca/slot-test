import { Effect } from "../types/Command";

export class DisableUIEffect extends Effect {
  async run(): Promise<void> {
    console.log("Disable UI");
  }
}
