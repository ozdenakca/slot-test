import { MACHINE_STATES, MachineMediator } from "../mediators/MachineMediator";
import { SpinMediator } from "../mediators/SpinMediator";
import { Effect } from "../types/Command";
import { Inject } from "../utils/inject";

export class SpinEffect extends Effect {
  @Inject(MachineMediator)
  private _machineMediator: MachineMediator;

  async run(): Promise<void> {
    await this._machineMediator.updateMachineState(MACHINE_STATES.SPIN);
  }
}
