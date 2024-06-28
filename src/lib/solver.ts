import Item from "./Item"
import { OPS } from "./types"
import { areArraysEqualUnordered, getPrimeFactors, isNearlyInteger } from "./util"
import WorkQueue from "./WorkQueue"

const extractableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16]
const highestExtractableNumber = Math.max(...extractableNumbers)
const multiplyNumbers = extractableNumbers.filter((num) => num !== 1).reverse()

const exponentiateNumbers = multiplyNumbers

function isMineable(number: number) {
  return extractableNumbers.some((extractableNumber) => extractableNumber === number)
}

function addNeighbouringNumbersToWorkQueue(workQueue: WorkQueue<Item>, target: Item) {
  workQueue.add(target)
  extractableNumbers.forEach((extractableNumber) => {
    workQueue.add(target.clone().performOperation(OPS.ADD, extractableNumber))
    workQueue.add(target.clone().performOperation(OPS.SUBTRACT, extractableNumber))
  })
}

function filterOutItemsWithPrimeNumbersHigherThanHighestExtractableNumber(workQueue: WorkQueue<Item>, item: Item) {
  const factors = getPrimeFactors(item.getCurrentNumber())
  if (factors.some((num) => num > highestExtractableNumber)) {
    return
  }
  workQueue.add(item)
}

let solutions: Array<Item> = []

function foundSolution(item: Item) {
  const solutionAlreadyExists = solutions.some((solution) => areArraysEqualUnordered(solution.getOperations(), item.getOperations()))
  if (solutionAlreadyExists) {
    return
  }

  solutions.push(item)
}

function processItems(workQueue: WorkQueue<Item>, item: Item) {
  if (item.getCurrentNumber() < 1) {
    return
  }

  if (isMineable(item.getCurrentNumber())) {
    foundSolution(item.performOperation(OPS.NOP, item.getCurrentNumber()))
    return
  }

  const startItemCount = workQueue.length()

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

  if (workQueue.length() === startItemCount) {
    addNeighbouringNumbersToWorkQueue(workQueue, item)
  }
}

function solve(numberOfInterest: number): { solutions: Array<Item>; checkedItems: number } {
  const workQueue = new WorkQueue<Item>()
  solutions = []
  let checkedItems = 0

  const target = new Item(numberOfInterest)

  addNeighbouringNumbersToWorkQueue(workQueue, target)
  workQueue.process(filterOutItemsWithPrimeNumbersHigherThanHighestExtractableNumber)

  if (workQueue.length() === 0) {
    // console.log("Simple algorithm will not work")
    addNeighbouringNumbersToWorkQueue(workQueue, target)
  }

  do {
    // console.log({ queuelength: workQueue.length() })
    checkedItems += workQueue.length()
    workQueue.process(processItems)
  } while (workQueue.length() > 0 && solutions.length < 5)

  return { solutions, checkedItems }
}

export default solve
