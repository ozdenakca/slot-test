import { Effect } from "../types/Command";

export class EnableUIEffect extends Effect {
  async run(): Promise<void> {
    console.log("Enable UI");
  }
}
