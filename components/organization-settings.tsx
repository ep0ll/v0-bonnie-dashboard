'use client'

import { useMemo, useState } from 'react'
import {
  Activity,
  Bell,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Cloud,
  Download,
  Ellipsis,
  Filter,
  GitBranch,
  GitCommit,
  LayoutGrid,
  Menu,
  MoreHorizontal,
  Rocket,
  Search,
  Server,
  Settings2,
  Shield,
  Terminal,
  Users,
  Workflow,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { BuildDetailTabs } from '@/components/build-detail-tabs'

const builds = [
  { id: '#1842', repo: 'northstar/web', branch: 'main', commit: 'a8f3c21', message: 'Ship organisation permissions', status: 'Success', actor: 'Olivia Rhye', duration: '2m 18s', environment: 'Production', created: '8 min ago', team: 'Web' },
  { id: '#1841', repo: 'northstar/api', branch: 'release/2.4', commit: '0bd19aa', message: 'Add invitation policy checks', status: 'Running', actor: 'Phoenix Baker', duration: '1m 04s', environment: 'Preview', created: '12 min ago', team: 'Platform' },
  { id: '#1840', repo: 'northstar/web', branch: 'feat/audit-log', commit: 'f43b920', message: 'Audit log filters', status: 'Failed', actor: 'Lana Steiner', duration: '44s', environment: 'Preview', created: '26 min ago', team: 'Web' },
  { id: '#1839', repo: 'northstar/worker', branch: 'main', commit: 'c11a7e4', message: 'Refresh build cache', status: 'Success', actor: 'Demi Wilkinson', duration: '1m 52s', environment: 'Production', created: '42 min ago', team: 'Infrastructure' },
  { id: '#1838', repo: 'northstar/web', branch: 'main', commit: 'bd92ee1', message: 'Update settings navigation', status: 'Success', actor: 'Olivia Rhye', duration: '2m 06s', environment: 'Production', created: '1 hr ago', team: 'Web' },
]

const health = [
  { day: 'Mon', success: 84, failed: 6 }, { day: 'Tue', success: 92, failed: 4 }, { day: 'Wed', success: 88, failed: 7 },
  { day: 'Thu', success: 96, failed: 3 }, { day: 'Fri', success: 91, failed: 5 }, { day: 'Sat', success: 78, failed: 2 }, { day: 'Sun', success: 86, failed: 4 },
]
const usage = [
  { time: '00:00', cpu: 34, memory: 52 }, { time: '04:00', cpu: 28, memory: 48 }, { time: '08:00', cpu: 61, memory: 64 },
  { time: '12:00', cpu: 74, memory: 71 }, { time: '16:00', cpu: 58, memory: 68 }, { time: '20:00', cpu: 46, memory: 59 },
]

function StatusBadge({ status }: { status: string }) {
  const classes: Record<string, string> = {
    Success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    Running: 'border-sky-200 bg-sky-50 text-sky-700',
    Failed: 'border-rose-200 bg-rose-50 text-rose-700',
  }
  return <Badge variant="outline" className={classes[status] ?? ''}><span className="mr-1.5 size-1.5 rounded-full bg-current" />{status}</Badge>
}

function DashboardSearch({ onOpenBuild }: { onOpenBuild: () => void }) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => builds.filter((build) => `${build.id} ${build.message} ${build.repo} ${build.commit}`.toLowerCase().includes(query.toLowerCase())).slice(0, 3), [query])
  return <div className="relative hidden md:block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && results[0]) { onOpenBuild(); setQuery('') } }} placeholder="Search builds, commits..." className="w-72 pl-9" />{query && <div className="absolute top-12 z-30 w-full rounded-lg border bg-popover p-1 shadow-xl">{results.map((build) => <button type="button" key={build.id} onClick={() => { onOpenBuild(); setQuery('') }} className="flex w-full flex-col gap-1 rounded-md px-3 py-2 text-left hover:bg-muted"><span className="text-sm font-medium">{build.message}</span><span className="text-xs text-muted-foreground">{build.id} · {build.repo} · {build.commit}</span></button>)}</div>}</div>
}

function Sidebar({ active, onNavigate }: { active: string; onNavigate: (value: string) => void }) {
  const delivery = [['Overview', LayoutGrid], ['Builds', Rocket], ['Deployments', Cloud], ['Environments', Server], ['Pipelines', Workflow]] as const
  const workspace = [['Organisations', Building2], ['Teams', GitBranch], ['Members', Users], ['Settings', Settings2]] as const
  const content = <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground"><div className="flex h-16 items-center gap-3 px-5"><div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"><Shield className="size-4" /></div><span className="font-semibold">Northstar</span></div><div className="px-3"><button type="button" onClick={() => toast.success('Acme Inc. selected')} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-sidebar-accent"><Avatar className="size-7"><AvatarFallback className="bg-sidebar-primary text-xs text-sidebar-primary-foreground">AI</AvatarFallback></Avatar><span><span className="block text-sm font-medium">Acme Inc.</span><span className="block text-xs text-sidebar-foreground/60">Pro plan</span></span></button></div><nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-6"><NavGroup label="Delivery" items={delivery} active={active} onNavigate={onNavigate} /><NavGroup label="Workspace" items={workspace} active={active} onNavigate={onNavigate} /></nav><div className="border-t border-sidebar-border p-3"><Button variant="ghost" className="w-full justify-start gap-3 px-3 text-sidebar-foreground/70"><CircleHelp data-icon="inline-start" />Help & support</Button><Button variant="ghost" className="w-full justify-start gap-3 px-3 text-sidebar-foreground/70"><Avatar className="size-7"><AvatarFallback className="bg-sidebar-accent text-xs">OR</AvatarFallback></Avatar><span className="truncate">Olivia Rhye</span><Ellipsis className="ml-auto size-4" /></Button></div></div>
  return <><aside className="hidden h-screen w-64 shrink-0 lg:block">{content}</aside><Sheet><SheetTrigger render={<Button variant="outline" size="icon" className="fixed left-4 top-4 z-20 lg:hidden" aria-label="Open navigation"><Menu /></Button>} /><SheetContent side="left" className="w-72 p-0"><SheetTitle className="sr-only">Navigation</SheetTitle>{content}</SheetContent></Sheet></>
}

function NavGroup({ label, items, active, onNavigate }: { label: string; items: readonly (readonly [string, React.ComponentType<{ className?: string }>])[]; active: string; onNavigate: (value: string) => void }) {
  return <div className="flex flex-col gap-1"><p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40">{label}</p>{items.map(([name, Icon]) => <Button key={name} variant="ghost" onClick={() => onNavigate(name)} className={`justify-start gap-3 px-3 ${active === name ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent'}`}><Icon data-icon="inline-start" />{name}{name === 'Builds' && <Badge variant="secondary" className="ml-auto">3</Badge>}</Button>)}</div>
}

function Overview({ onNavigate }: { onNavigate: (value: string) => void }) {
  return <div className="flex flex-col gap-6"><Header eyebrow="Delivery centre" title="CI/CD overview" description="Monitor build health, delivery speed, and runner resources across your organisation." action={<Button onClick={() => onNavigate('Builds')}><Rocket data-icon="inline-start" />View build history</Button>} /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[['Build success rate', '96.8%', '+4.2%', 'Compared with last month'], ['Builds this month', '1,284', '+18.6%', '312 more than August'], ['Avg. build time', '2m 14s', '-12.4%', 'Faster than last month'], ['Failed builds', '41', '-8.1%', '3.2% of all builds']].map(([label, value, trend, note]) => <Card key={label}><CardContent className="p-5"><div className="flex items-center justify-between"><p className="text-sm font-medium text-muted-foreground">{label}</p><Activity className="size-4 text-muted-foreground" /></div><div className="mt-4 flex items-baseline gap-2"><p className="text-2xl font-semibold tabular-nums">{value}</p><span className="text-xs font-semibold text-emerald-600">{trend}</span></div><p className="mt-1 text-xs text-muted-foreground">{note}</p></CardContent></Card>)}</div><div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]"><Card><CardHeader><div className="flex items-center justify-between"><div><CardTitle>Build success and failure</CardTitle><CardDescription>Last 7 days, grouped by outcome</CardDescription></div><Badge variant="secondary">96.8% healthy</Badge></div></CardHeader><CardContent><ChartContainer config={{ success: { label: 'Successful', color: 'var(--chart-2)' }, failed: { label: 'Failed', color: 'var(--chart-5)' } }} className="h-64 w-full"><BarChart accessibilityLayer data={health}><CartesianGrid vertical={false} /><XAxis dataKey="day" tickLine={false} axisLine={false} /><YAxis hide domain={[0, 100]} /><ChartTooltip content={<ChartTooltipContent />} /><Bar dataKey="success" fill="var(--color-success)" radius={4} /><Bar dataKey="failed" fill="var(--color-failed)" radius={4} /></BarChart></ChartContainer></CardContent></Card><Card><CardHeader><CardTitle>Runner resources</CardTitle><CardDescription>Average CPU and memory usage</CardDescription></CardHeader><CardContent><ChartContainer config={{ cpu: { label: 'CPU', color: 'var(--chart-3)' }, memory: { label: 'Memory', color: 'var(--chart-4)' } }} className="h-64 w-full"><LineChart accessibilityLayer data={usage}><CartesianGrid vertical={false} /><XAxis dataKey="time" tickLine={false} axisLine={false} /><YAxis hide domain={[0, 100]} /><ChartTooltip content={<ChartTooltipContent />} /><Line dataKey="cpu" type="monotone" stroke="var(--color-cpu)" strokeWidth={2} dot={false} /><Line dataKey="memory" type="monotone" stroke="var(--color-memory)" strokeWidth={2} dot={false} /></LineChart></ChartContainer></CardContent></Card></div><Card><CardHeader><div className="flex items-center justify-between"><div><CardTitle>Recent builds</CardTitle><CardDescription>Latest activity across repositories</CardDescription></div><Button variant="ghost" size="sm" onClick={() => onNavigate('Builds')}>See all <ChevronRight data-icon="inline-end" /></Button></div></CardHeader><CardContent className="p-0"><div className="divide-y">{builds.slice(0, 4).map((build) => <button type="button" key={build.id} onClick={() => onNavigate('Build detail')} className="flex w-full flex-col gap-3 p-4 text-left hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 items-center gap-3"><div className="rounded-md bg-muted p-2"><GitCommit className="size-4" /></div><div className="min-w-0"><p className="truncate text-sm font-medium">{build.message}</p><p className="truncate text-xs text-muted-foreground">{build.repo} · {build.branch} · {build.commit}</p></div></div><div className="flex items-center gap-3 pl-11 sm:pl-0"><StatusBadge status={build.status} /><span className="text-xs text-muted-foreground">{build.duration}</span></div></button>)}</div></CardContent></Card></div>
}

function Header({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) { return <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-sm font-medium text-primary">{eyebrow}</p><h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p></div>{action}</div> }

function Builds({ onNavigate }: { onNavigate: (value: string) => void }) {
  const [query, setQuery] = useState('')
  const [team, setTeam] = useState('all')
  const [status, setStatus] = useState('all')
  const filtered = builds.filter((build) => `${build.id} ${build.repo} ${build.message} ${build.commit} ${build.actor}`.toLowerCase().includes(query.toLowerCase()) && (team === 'all' || build.team === team) && (status === 'all' || build.status === status))
  return <div className="flex flex-col gap-6"><Header eyebrow="Delivery centre" title="Build history" description="Search, filter, and inspect every build across your organisation." action={<Button onClick={() => toast.success('Build queued')}><Rocket data-icon="inline-start" />New build</Button>} /><div className="grid gap-4 sm:grid-cols-3"><Metric label="Queued" value="3" note="Across 2 pipelines" /><Metric label="Running" value="1" note="Started 12 min ago" /><Metric label="Success rate" value="96.8%" note="+4.2% vs last month" /></div><Card><CardHeader><div className="flex flex-col gap-1"><div className="flex items-center gap-2"><CardTitle>All builds</CardTitle><Badge variant="secondary">{filtered.length} results</Badge></div><CardDescription>Filter by team, status, or searchable build metadata.</CardDescription></div><div className="grid gap-2 sm:flex"><div className="relative min-w-0 flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search builds, commits, actors..." className="pl-9 sm:w-72" /></div><Select value={team} onValueChange={(value) => setTeam(value ?? 'all')}><SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Team" /></SelectTrigger><SelectContent><SelectItem value="all">All teams</SelectItem><SelectItem value="Web">Web</SelectItem><SelectItem value="Platform">Platform</SelectItem><SelectItem value="Infrastructure">Infrastructure</SelectItem></SelectContent></Select><Select value={status} onValueChange={(value) => setStatus(value ?? 'all')}><SelectTrigger className="w-full sm:w-32"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All status</SelectItem><SelectItem value="Success">Success</SelectItem><SelectItem value="Running">Running</SelectItem><SelectItem value="Failed">Failed</SelectItem></SelectContent></Select></div></CardHeader><CardContent className="p-0"><div className="hidden overflow-x-auto md:block"><Table><TableHeader><TableRow><TableHead>Build</TableHead><TableHead>Status</TableHead><TableHead>Team</TableHead><TableHead>Actor</TableHead><TableHead>Environment</TableHead><TableHead>Duration</TableHead><TableHead className="w-10" /></TableRow></TableHeader><TableBody>{filtered.map((build) => <TableRow key={build.id} className="cursor-pointer" onClick={() => onNavigate('Build detail')}><TableCell><div className="flex items-center gap-3"><div className="rounded-md bg-muted p-2"><GitCommit className="size-4" /></div><div><p className="font-medium">{build.message}</p><p className="text-xs text-muted-foreground">{build.id} · {build.repo} · {build.branch} · {build.commit}</p></div></div></TableCell><TableCell><StatusBadge status={build.status} /></TableCell><TableCell>{build.team}</TableCell><TableCell>{build.actor}</TableCell><TableCell>{build.environment}</TableCell><TableCell className="tabular-nums">{build.duration}</TableCell><TableCell><MoreHorizontal className="size-4 text-muted-foreground" /></TableCell></TableRow>)}</TableBody></Table></div><div className="divide-y md:hidden">{filtered.map((build) => <button type="button" key={build.id} onClick={() => onNavigate('Build detail')} className="flex w-full flex-col gap-3 p-4 text-left hover:bg-muted/50"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-medium">{build.message}</p><p className="mt-1 text-xs text-muted-foreground">{build.id} · {build.repo} · {build.commit}</p></div><StatusBadge status={build.status} /></div><div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground"><span>{build.team}</span><span>{build.environment}</span><span>{build.duration}</span><span>{build.created}</span></div></button>)}</div></CardContent></Card></div>
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) { return <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p><p className="mt-1 text-xs text-muted-foreground">{note}</p></CardContent></Card> }

export default function OrganizationSettings() {
  const [active, setActive] = useState('Overview')
  const [notifications, setNotifications] = useState(false)
  const navigate = (value: string) => setActive(value)
  const main = active === 'Overview' ? <Overview onNavigate={navigate} /> : active === 'Builds' ? <Builds onNavigate={navigate} /> : active === 'Build detail' ? <BuildDetail onNavigate={navigate} /> : <Overview onNavigate={navigate} />
  return <div className="flex min-h-screen bg-background"><Sidebar active={active} onNavigate={navigate} /><div className="min-w-0 flex-1"><header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8"><div className="flex min-w-0 items-center gap-3 pl-12 lg:pl-0"><DashboardSearch onOpenBuild={() => navigate('Build detail')} /><span className="hidden text-sm text-muted-foreground md:block">{active}</span></div><div className="flex items-center gap-2"><Button variant="outline" size="icon" onClick={() => { setNotifications(!notifications); toast.success(notifications ? 'Notifications marked read' : 'You have 2 new notifications') }} aria-label="Notifications"><Bell /><span className="sr-only">Notifications</span></Button><Avatar className="size-8"><AvatarFallback>OR</AvatarFallback></Avatar></div></header>{notifications && <div className="border-b bg-muted/30 px-4 py-3 text-sm text-muted-foreground sm:px-6 lg:px-8">2 new notifications: build #1841 is running and #1840 needs attention.</div>}<main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">{main}</main></div></div>
}

function BuildDetail({ onNavigate }: { onNavigate: (value: string) => void }) { return <div className="flex flex-col gap-6"><div><Button variant="ghost" size="sm" onClick={() => onNavigate('Builds')} className="mb-3 -ml-3"><ChevronLeft data-icon="inline-start" />Back to builds</Button><div className="flex flex-wrap items-center gap-3"><h1 className="text-2xl font-semibold sm:text-3xl">Build #1842</h1><StatusBadge status="Success" /></div><p className="mt-2 text-sm text-muted-foreground">northstar/web · main · a8f3c21 · 8 minutes ago</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Duration" value="2m 18s" note="12% faster than average" /><Metric label="Environment" value="Production" note="iad1 runner" /><Metric label="Triggered by" value="Olivia Rhye" note="Manual push" /><Metric label="Artifacts" value="12" note="184 MB total" /></div><BuildDetailTabs /></div>
}
