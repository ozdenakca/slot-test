import { MACHINE_STATES, MachineMediator } from "../mediators/MachineMediator";
import { Effect } from "../types/Command";
import { Inject } from "../utils/inject";

export class ShowWinEffect extends Effect {
  @Inject(MachineMediator)
  private _machineMediator: MachineMediator;

  async run(): Promise<void> {
    await this._machineMediator.updateMachineState(MACHINE_STATES.WIN);
  }
}
