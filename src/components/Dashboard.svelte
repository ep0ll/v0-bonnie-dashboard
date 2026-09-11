<script lang="ts">
  import { Bell, GitBranch, Menu, Search, Settings, ShieldCheck, Users, Zap } from '@lucide/svelte'
  import OrganisationSwitcher from './OrganisationSwitcher.svelte'
  import MetricCard from './MetricCard.svelte'
  import BuildHistory from './BuildHistory.svelte'
  import ActivityList from './ActivityList.svelte'
  let menuOpen = false
  let query = ''
  let active = 'Overview'
  const nav = [
    { label: 'Overview', icon: Zap }, { label: 'Builds', icon: GitBranch }, { label: 'Teams', icon: Users },
    { label: 'Organisation', icon: ShieldCheck }, { label: 'Settings', icon: Settings },
  ]
  const builds = [
    { id: '#build-1842', branch: 'main', message: 'Refine billing report cards', actor: 'AM', team: 'Platform', status: 'success', duration: '2m 14s', time: '8 min ago' },
    { id: '#build-1841', branch: 'feat/invites', message: 'Add granular team permissions', actor: 'JK', team: 'Core', status: 'success', duration: '1m 48s', time: '22 min ago' },
    { id: '#build-1840', branch: 'fix/auth-cookies', message: 'Handle preview session origin', actor: 'RK', team: 'Platform', status: 'failed', duration: '38s', time: '1 hr ago' },
    { id: '#build-1839', branch: 'release/v2.8', message: 'Ship organisation settings', actor: 'AM', team: 'Growth', status: 'running', duration: '—', time: '2 hrs ago' },
  ]
  const navTo = (label: string) => { active = label; menuOpen = false }
</script>

<div class="shell">
  <aside class:open={menuOpen} class="sidebar">
    <div class="brand"><span class="brand-mark">B</span><span>bonnie</span></div>
    <OrganisationSwitcher />
    <nav class="nav" aria-label="Primary navigation"><span class="nav-label">Workspace</span>{#each nav as item}<button class:active={active === item.label} class="nav-item" on:click={() => navTo(item.label)}><svelte:component this={item.icon} size={16} />{item.label}</button>{/each}</nav>
    <div class="sidebar-footer">Plan: Scale · 72% credits used</div>
  </aside>
  <main class="main">
    <header class="topbar"><div class="topbar-title"><button class="icon-btn mobile-toggle" aria-label="Open navigation" on:click={() => menuOpen = !menuOpen}><Menu size={17} /></button><div><h1>{active}</h1><span>Acme Cloud / Workspace</span></div></div><div class="top-actions"><label class="search"><Search size={15} /><input bind:value={query} placeholder="Search workspace" aria-label="Search workspace" /></label><button class="icon-btn" aria-label="Notifications"><Bell size={16} /></button></div></header>
    <section class="content">
      <p class="eyebrow">{active === 'Overview' ? 'Operations centre' : 'Workspace view'}</p><h2 class="page-heading">{query ? `Results for “${query}”` : active === 'Overview' ? 'Build with confidence.' : `${active} workspace`}</h2><p class="subtle">A calm, shared view of delivery health, team velocity, and the work moving through your organisation.</p>
      <div class="grid kpi-grid"><MetricCard label="Build success rate" value="96.8%" change="↑ 4.2%" note="compared with last month" /><MetricCard label="Builds this month" value="1,284" change="↑ 18.6%" note="vs last month" /><MetricCard label="Median duration" value="2m 08s" change="↓ 12s" note="faster this month" /><MetricCard label="Credits remaining" value="28.4k" change="7 days left" note="in current cycle" tone="down" /></div>
      <div class="grid two-col"><section class="card"><div class="card-header"><div><h2>Build health</h2><p>Successful and failed builds over the last 7 days</p></div><span class="status success">Live</span></div><div class="bar-chart">{#each [84,92,88,96,91,78,86] as value, i}<div class="bar-group"><i class="bar" style={`height:${value}%`}></i><i class="bar fail" style={`height:${100-value}%`}></i></div>{/each}</div><div class="bar-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></section><section class="card"><div class="card-header"><div><h2>Runner resources</h2><p>Organisation-wide utilisation</p></div><span class="subtle">Updated now</span></div><div class="metric-list"><div class="metric-row"><span>CPU utilisation</span><strong>68%</strong><div class="meter"><i style="width:68%"></i></div></div><div class="metric-row"><span>Memory utilisation</span><strong>54%</strong><div class="meter"><i style="width:54%"></i></div></div><div class="metric-row"><span>Cache efficiency</span><strong>82%</strong><div class="meter"><i style="width:82%"></i></div></div></div></section></div>
      <div class="grid two-col"><section class="card"><div class="card-header"><div><h2>Build history</h2><p>Latest builds across all teams</p></div><button class="icon-btn" aria-label="Build settings"><Settings size={15} /></button></div><div class="table-wrap"><table><thead><tr><th>Build</th><th>Team</th><th>Status</th><th>Duration</th><th>Started</th></tr></thead><tbody>{#each builds as build}{#if !query || `${build.id} ${build.branch} ${build.message} ${build.team}`.toLowerCase().includes(query.toLowerCase())}<tr><td><strong>{build.id}</strong><br /><span class="subtle">{build.branch} · {build.message}</span></td><td>{build.team}</td><td><span class={`status ${build.status}`}>{build.status}</span></td><td>{build.duration}</td><td>{build.time}</td></tr>{/if}{/each}</tbody></table></div></section><section class="card"><div class="card-header"><div><h2>Recent activity</h2><p>Across your organisation</p></div></div><div class="activity"><div class="activity-item"><span class="activity-dot"></span><div><strong>Alex updated billing settings</strong><span>Organisation · 12 minutes ago</span></div></div><div class="activity-item"><span class="activity-dot"></span><div><strong>Jordan joined the Core team</strong><span>Team membership · 42 minutes ago</span></div></div><div class="activity-item"><span class="activity-dot"></span><div><strong>Build #1840 failed</strong><span>Authentication suite · 1 hour ago</span></div></div></div></section></div>
    </section>
  </main>
</div>
