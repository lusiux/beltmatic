import { OPS, type Solution } from "./types"
import { getUniqueElements, isNearlyInteger } from "./util"

export default class Item {
  private number: number
  private ops: string
  private operations: Array<{ op: OPS; operand: number }> = []
  private usedNumbers: Array<number> = []

  constructor(private target: number) {
    this.number = target
    this.ops = `= ${target}`

    if (target != Math.round(target)) {
      console.log({ target })
    }
  }

  public performOperation(op: OPS, operand: number): Item {
    this.operations.unshift({ op, operand })
    if (op === OPS.NOP) {
      this.ops = `${operand} ${this.ops}`
    } else if (op === OPS.ADD) {
      this.ops = `+ ${operand} ${this.ops}`
      this.number -= operand
    } else if (op === OPS.SUBTRACT) {
      this.ops = `- ${operand} ${this.ops}`
      this.number += operand
    } else if (op === OPS.MULTIPLY) {
      this.ops = `* ${operand} ${this.ops}`
      this.number /= operand
      if (isNearlyInteger(this.number)) {
        this.number = Math.round(this.number)
      }
    } else if (op === OPS.EXPONENTIATE) {
      this.ops = `^ ${operand} ${this.ops}`
      this.number = Math.pow(this.number, 1 / operand)
      if (isNearlyInteger(this.number)) {
        this.number = Math.round(this.number)
      }
    } else {
      throw new Error("not implemented")
    }

    return this
  }

  public getCurrentNumber(): number {
    return this.number
  }

  public getTarget(): number {
    return this.target
  }

  public getOperations(): Array<{ op: OPS; operand: number }> {
    return this.operations
  }

  public clone(): Item {
    const newItem = new Item(this.target)
    newItem.number = this.number
    newItem.ops = this.ops.repeat(1)
    newItem.operations = [...this.operations]

    return newItem
  }

  public toSolution(): Solution {
    return {
      ops: this.ops,
    }
  }

  public getUsedNumbers(): Array<number> {
    if (this.usedNumbers.length === 0) {
      this.usedNumbers = this.operations.map((operation) => operation.operand).sort((a, b) => a - b)
    }
    return this.usedNumbers
  }

  public getUniqueUsedNumbers(): Array<number> {
    if (this.usedNumbers.length === 0) {
      this.usedNumbers = this.operations.map((operation) => operation.operand).sort((a, b) => a - b)
    }
    return getUniqueElements(this.usedNumbers)
  }
}
