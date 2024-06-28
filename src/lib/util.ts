import { OPS } from "./types"

export function logWithBase(number: number, base: number) {
  return Math.log10(number) / Math.log10(base)
}

export function isNearlyInteger(number: number, tolerance: number = 1e-9): boolean {
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

export function areArraysEqual<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) {
    return false
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }

  return true
}

export function getUniqueElements<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}
