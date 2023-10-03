export class Difficulty {
  static LOW = new Difficulty('low', 1)
  static MEDIUM = new Difficulty('medium', 2)
  static HIGH = new Difficulty('high', 3)

  constructor(public name: string, public priority: number) {}

  toJSON() {
    return {
      name: this.name,
      priority: this.priority
    }
  }

  static getDifficultyByPriority(priority: number): Difficulty {
    return [this.LOW, this.MEDIUM, this.HIGH].filter(
      (dif) => dif.priority == priority
    )[0]
  }
}
