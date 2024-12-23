import { AsyncBehaviorSubject } from "../types/AsyncBehaviorSubject";

export enum MACHINE_STATES {
  SPIN,
  WIN,
  IDLE,
}

export class MachineMediator {
  public machineState: AsyncBehaviorSubject<MACHINE_STATES> =
    new AsyncBehaviorSubject<MACHINE_STATES>(MACHINE_STATES.IDLE);
  public spinCount: AsyncBehaviorSubject<number> =
    new AsyncBehaviorSubject<number>(0);

  async updateMachineState(value: MACHINE_STATES) {
    await this.machineState.next(value);
  }
}
