<script lang="ts">
  import type Item from "../lib/Item"
  import Solution from "./Solution.svelte"
  import solve from "../lib/solver"

  let numberOfInterest: number = 42
  let solutions: Array<Item> = []
  let checkedItems: number = 0
  let calculationRunning: boolean = false

  $: calculateSolutions(numberOfInterest)

  function calculateSolutions(input: any): void {
    const numberOfInterest = Number(input)
    if (!Number.isInteger(numberOfInterest)) {
      solutions = []
      checkedItems = 0
    }

    if (numberOfInterest < 1) {
      solutions = []
      checkedItems = 0
    }

    calculationRunning = true
    solutions = []
    checkedItems = 0

    setTimeout(() => {
      const result = solve(numberOfInterest)

      solutions = result.solutions
      checkedItems = result.checkedItems

      calculationRunning = false
    }, 1)
  }
</script>

<main>
  <h1>Beltmatic Calculator</h1>

  <input type="text" placeholder="number" bind:value={numberOfInterest} />

  {#if calculationRunning}
    <div>Calculating...</div>
  {/if}

  {#if checkedItems > 0}
    <div>Numbers checked: {checkedItems}</div>
  {/if}

  <div>
    {#each solutions as solution}
      <Solution item={solution} />
    {/each}
  </div>
</main>

<style>
  div {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: column;
  }

  input {
    font-size: x-large;
    height: 3rem;
    width: 10rem;
    text-align: center;
    border-radius: 1rem;
    border: 1px solid black;
  }
</style>
