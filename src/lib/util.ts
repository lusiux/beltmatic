import { OPS } from "./types"

export function logWithBase(number: number, base: number) {
  return Math.log10(number) / Math.log10(base)
}

export function sameOperands(
  array1: { op: OPS; operand: number }[],
  array2: { op: OPS; operand: number }[],
): boolean {
  // Check if the arrays have the same length
  if (array1.length !== array2.length) {
    return false
  }

  // Create frequency counters for each array
  const frequencyCounter1: { [key: number]: number } = {}
  const frequencyCounter2: { [key: number]: number } = {}

  // Populate frequency counters
  for (const element of array1) {
    const identifier = element.operand
    frequencyCounter1[identifier] = (frequencyCounter1[identifier] || 0) + 1
  }

  for (const element of array2) {
    const identifier = element.operand
    frequencyCounter2[identifier] = (frequencyCounter2[identifier] || 0) + 1
  }

  // Compare frequency counters
  for (const key in frequencyCounter1) {
    if (frequencyCounter1[key] !== frequencyCounter2[key]) {
      return false
    }
  }

  return true
}

export function areArraysEqualUnordered(
  array1: { op: OPS; operand: number }[],
  array2: { op: OPS; operand: number }[],
): boolean {
  // Check if the arrays have the same length
  if (array1.length !== array2.length) {
    return false
  }

  if (
    array1.some((element) => element.op === OPS.EXPONENTIATE) ||
    array2.some((element) => element.op === OPS.EXPONENTIATE)
  ) {
    return false
  }

  const array1Mult = array1.filter(
    (element) => element.op === OPS.MULTIPLY || element.op === OPS.NOP,
  )
  const array2Mult = array2.filter(
    (element) => element.op === OPS.MULTIPLY || element.op === OPS.NOP,
  )

  if (!sameOperands(array1Mult, array2Mult)) {
    return false
  }

  const array1Add = array1.filter((element) => element.op === OPS.ADD)
  const array2Add = array2.filter((element) => element.op === OPS.ADD)

  if (!sameOperands(array1Add, array2Add)) {
    return false
  }

  const array1Sub = array1.filter((element) => element.op === OPS.SUBTRACT)
  const array2Sub = array2.filter((element) => element.op === OPS.SUBTRACT)

  if (!sameOperands(array1Sub, array2Sub)) {
    return false
  }

  return true
}

export function isNearlyInteger(
  number: number,
  tolerance: number = 1e-9,
): boolean {
  return Math.abs(number - Math.round(number)) < tolerance
}

export function getSymbolForOp(op: OPS): string {
  switch (op) {
    case OPS.NOP:
      return ""
    case OPS.ADD:
      return "+"
    case OPS.SUBTRACT:
      return "-"
    case OPS.MULTIPLY:
      return "*"
    case OPS.DIVIDE:
      return "/"
    case OPS.EXPONENTIATE:
      return "^"
  }
  return ""
}

export function getPrimeFactors(num: number): number[] {
  const primeFactors: number[] = []

  if (num < 2) {
    return []
  }

  // Check for the number of 2s that divide num
  while (num % 2 === 0) {
    primeFactors.push(2)
    num = num / 2
  }

  // num must be odd at this point, so we can skip even numbers
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    // While i divides num, add i and divide num
    while (num % i === 0) {
      primeFactors.push(i)
      num = num / i
    }
  }

  // This condition is to handle the case when num is a prime number
  // greater than 2
  if (num > 2) {
    primeFactors.push(num)
  }

  return primeFactors
}
