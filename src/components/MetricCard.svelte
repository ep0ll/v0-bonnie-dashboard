<script lang="ts">
  export let label: string
  export let value: string
  export let change: string
  export let note: string
  export let tone: 'up' | 'down' = 'up'
</script>
<div class="card"><span class="subtle">{label}</span><div class="kpi-value">{value}</div><div class:down={tone === 'down'} class="trend">{change} <span class="subtle">{note}</span></div></div>
