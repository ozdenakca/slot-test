export abstract class Effect {
  abstract run(...args: any[]): Promise<void>;
}

export abstract class Command {
  private effects: Effect[] = [];

  public setEffects(effects: Effect[]): void {
    this.effects = effects;
  }

  public async execute(...args: any[]): Promise<void> {
    // Run the command's own logic
    await this.run(...args);

    // Then run all effects in sequence
    for (const effect of this.effects) {
      await effect.run(...args);
    }
  }

  protected abstract run(...args: any[]): Promise<void>;
}
