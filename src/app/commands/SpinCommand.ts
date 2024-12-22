import { Command } from "../types/Command";

export class SpinCommand extends Command {
  protected async run(): Promise<void> {
    console.log("Spin command running");
  }
}
