<script lang="ts">
  import type Item from "../lib/Item"
  import { OPS } from "../lib/types"
  import { getSymbolForOp } from "../lib/util"

  export let item: Item

  function getOperationClass(operation: OPS): string {
    switch (operation) {
      case OPS.NOP:
        return "NOP"
      case OPS.ADD:
        return "ADD"
      case OPS.SUBTRACT:
        return "SUBTRACT"
      case OPS.MULTIPLY:
        return "MULTIPLY"
      case OPS.DIVIDE:
        return "DIVIDE"
      case OPS.EXPONENTIATE:
        return "EXPONENTIATE"
    }
    return "NOP"
  }
</script>

<div class="solution">
  {#each item.getOperations() as operation}
    <div class="operation {getOperationClass(operation.op)}">
      {getSymbolForOp(operation.op)}
    </div>
    <div class="operand">
      {operation.operand}
    </div>
  {/each}
  <div class="operation">=</div>
  <div class="operand">
    {item.getTarget()}
  </div>
</div>

<style>
  div.solution {
    display: flex;
    place-items: center;
  }

  div.operand {
    min-width: 3rem;
    height: 3.5rem;
    margin: 0.2rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    background-color: #bd1925;
    font-size: x-large;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem 0.5rem;
  }

  div.operation {
    min-width: 3rem;
    height: 3.5rem;
    margin: 0.2rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    background-color: #3e4af0;
    font-size: x-large;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem 0.5rem;
  }

  div.NOP {
    display: none;
  }

  div.ADD {
    background-color: #188f00;
  }

  div.SUBTRACT {
    background-color: #9e1ec2;
  }

  div.MULTIPLY {
    background-color: #404df1;
  }

  div.DIVIDE {
    background-color: #be5d17;
  }

  div.EXPONENTIATE {
    background-color: #885500;
  }
</style>
