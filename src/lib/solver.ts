import Item from "./Item"
import { OPS } from "./types"
import {
  areArraysEqualUnordered,
  getPrimeFactors,
  isNearlyInteger,
} from "./util"
import WorkQueue from "./WorkQueue"

const extractableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16]
const multiplyNumbers = extractableNumbers.filter((num) => num !== 1).reverse()
const maxMultiplyNumber = 15
const exponentiateNumbers = multiplyNumbers.filter((num) => num !== 2)

function generateNumbersToCheck(workQueue: WorkQueue<Item>, target: number) {
  const item = new Item(target)
  const factors = getPrimeFactors(item.getCurrentNumber())
  if (!factors.some((num) => num > maxMultiplyNumber)) {
    workQueue.add(item)
  }
  // console.log({ number: item.getCurrentNumber(), factors })

  extractableNumbers.forEach((extractableNumber) => {
    const item = new Item(target).performOperation(OPS.ADD, extractableNumber)
    if (item.getCurrentNumber() > 0) {
      const factors = getPrimeFactors(item.getCurrentNumber())
      if (!factors.some((num) => num > maxMultiplyNumber)) {
        workQueue.add(item)
      }
      // console.log({ number: item.getCurrentNumber(), factors })
      // workQueue.add(item)
    }
  })
  extractableNumbers.forEach((extractableNumber) => {
    const item = new Item(target).performOperation(
      OPS.SUBTRACT,
      extractableNumber,
    )
    const factors = getPrimeFactors(item.getCurrentNumber())
    if (!factors.some((num) => num > maxMultiplyNumber)) {
      workQueue.add(item)
    }
    // console.log({ number: item.getCurrentNumber(), factors })
    // console.log({number: item.getCurrentNumber(), factors: getPrimeFactors(item.getCurrentNumber())})
    // workQueue.add(item)
  })
}

let solutions: Array<Item> = []

function foundSolution(item: Item) {
  const solutionAlreadyExists = solutions.some((solution) =>
    areArraysEqualUnordered(solution.getOperations(), item.getOperations()),
  )
  if (solutionAlreadyExists) {
    return
  }

  solutions.push(item)
}

function processItems(workQueue: WorkQueue<Item>, item: Item) {
  for (const number of extractableNumbers) {
    if (item.getCurrentNumber() === number) {
      foundSolution(item.clone().performOperation(OPS.NOP, number))
      return
    }
  }

  for (const factor of multiplyNumbers) {
    const nextNumber = item.getCurrentNumber() / factor
    if (isNearlyInteger(nextNumber)) {
      workQueue.add(item.clone().performOperation(OPS.MULTIPLY, factor))
    }
  }

  for (const exponent of exponentiateNumbers) {
    const nextNumber = Math.pow(item.getCurrentNumber(), 1 / exponent)
    if (isNearlyInteger(nextNumber)) {
      workQueue.add(item.clone().performOperation(OPS.EXPONENTIATE, exponent))
    }
  }
}

function solve(numberOfInterest: number): Array<Item> {
  const workQueue = new WorkQueue<Item>()
  solutions = []

  generateNumbersToCheck(workQueue, numberOfInterest)
  // console.log({ queuelength: workQueue.length() })
  do {
    // console.log({queuelength: workQueue.length()})
    // if ( workQueue.length() === 6 ) {
    //  workQueue.print()
    // }
    workQueue.process(processItems)
  } while (workQueue.length() > 0 && solutions.length < 5)

  return solutions
}

export default solve
