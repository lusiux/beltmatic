<script lang="ts">
  import type Item from "../lib/Item"
  import Solution from "./Solution.svelte"
  import solve from "../lib/solver"

  let numberOfInterest = 2197

  $: solutions = calculateSolutions(numberOfInterest)

  function calculateSolutions(input: any): Array<Item> {
    const numberOfInterest = Number(input)
    if (!Number.isInteger(numberOfInterest)) {
      return []
    }

    if (numberOfInterest < 1) {
      return []
    }

    return solve(numberOfInterest)
  }
</script>

<main>
  <h1>Beltmatic</h1>

  <input type="text" placeholder="number" bind:value={numberOfInterest} />

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
