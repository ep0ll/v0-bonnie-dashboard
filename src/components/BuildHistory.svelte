<script lang="ts">
  import { Settings } from '@lucide/svelte'
  export let query = ''
  const builds = [
    { id: '#build-1842', branch: 'main', message: 'Refine billing report cards', team: 'Platform', status: 'success', duration: '2m 14s', time: '8 min ago' },
    { id: '#build-1841', branch: 'feat/invites', message: 'Add granular team permissions', team: 'Core', status: 'success', duration: '1m 48s', time: '22 min ago' },
    { id: '#build-1840', branch: 'fix/auth-cookies', message: 'Handle preview session origin', team: 'Platform', status: 'failed', duration: '38s', time: '1 hr ago' },
    { id: '#build-1839', branch: 'release/v2.8', message: 'Ship organisation settings', team: 'Growth', status: 'running', duration: '—', time: '2 hrs ago' },
  ]
  $: filtered = builds.filter((build) => !query || `${build.id} ${build.branch} ${build.message} ${build.team}`.toLowerCase().includes(query.toLowerCase()))
</script>
<section class="card"><div class="card-header"><div><h2>Build history</h2><p>Latest builds across all teams</p></div><button class="icon-btn" aria-label="Build settings"><Settings size={15} /></button></div><div class="table-wrap"><table><thead><tr><th>Build</th><th>Team</th><th>Status</th><th>Duration</th><th>Started</th></tr></thead><tbody>{#each filtered as build}<tr><td><strong>{build.id}</strong><br /><span class="subtle">{build.branch} · {build.message}</span></td><td>{build.team}</td><td><span class={`status ${build.status}`}>{build.status}</span></td><td>{build.duration}</td><td>{build.time}</td></tr>{/each}</tbody></table></div></section>
