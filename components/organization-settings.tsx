'use client'

import { useMemo, useState } from 'react'
import {
  Bell,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Ellipsis,
  GitBranch,
  LayoutGrid,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings2,
  Shield,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const organizations = [
  { name: 'Acme Inc.', slug: 'acme-inc', members: 24, plan: 'Pro', initials: 'AI', color: 'bg-primary' },
  { name: 'Northstar Labs', slug: 'northstar', members: 8, plan: 'Starter', initials: 'NL', color: 'bg-chart-3' },
  { name: 'Paperplane', slug: 'paperplane', members: 3, plan: 'Free', initials: 'PP', color: 'bg-chart-4' },
]

const members = [
  { name: 'Olivia Rhye', email: 'olivia@acme.inc', role: 'Owner', status: 'Active', initials: 'OR' },
  { name: 'Phoenix Baker', email: 'phoenix@acme.inc', role: 'Admin', status: 'Active', initials: 'PB' },
  { name: 'Lana Steiner', email: 'lana@acme.inc', role: 'Member', status: 'Active', initials: 'LS' },
  { name: 'Demi Wilkinson', email: 'demi@acme.inc', role: 'Member', status: 'Active', initials: 'DW' },
  { name: 'Candice Wu', email: 'candice@acme.inc', role: 'Viewer', status: 'Invited', initials: 'CW' },
  { name: 'Natali Craig', email: 'natali@acme.inc', role: 'Member', status: 'Active', initials: 'NC' },
]

const teams = [
  { name: 'Design', description: 'Product design and research', members: 6, initials: 'DS' },
  { name: 'Engineering', description: 'Build and ship the product', members: 12, initials: 'EN' },
  { name: 'Marketing', description: 'Growth, brand and communications', members: 4, initials: 'MK' },
]

const invitations = [
  { organization: 'Brightline Studio', email: 'you@example.com', role: 'Member', sent: 'Sep 8, 2026', initials: 'BS' },
  { organization: 'Orbit Systems', email: 'you@example.com', role: 'Admin', sent: 'Sep 2, 2026', initials: 'OS' },
]

function PageButton({ page, active, onClick }: { page: number; active?: boolean; onClick: () => void }) {
  return <PaginationItem><PaginationLink isActive={active} onClick={onClick} className="cursor-pointer">{page}</PaginationLink></PaginationItem>
}

function SidebarContent({ active, setActive }: { active: string; setActive: (value: string) => void }) {
  const primary = [
    { label: 'Overview', icon: LayoutGrid },
    { label: 'Organisations', icon: Building2 },
    { label: 'Teams', icon: GitBranch },
    { label: 'Invitations', icon: Bell },
  ]
  const secondary = [
    { label: 'Members', icon: Users },
    { label: 'Settings', icon: Settings2 },
  ]
  return <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
    <div className="flex h-16 items-center gap-3 px-5"><div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"><Shield className="size-4" /></div><span className="font-semibold tracking-tight">Northstar</span></div>
    <div className="px-3"><DropdownMenu><DropdownMenuTrigger className="flex h-auto w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-sidebar-accent"><span className="flex items-center gap-2"><Avatar className="size-7"><AvatarFallback className="bg-sidebar-primary text-xs text-sidebar-primary-foreground">AI</AvatarFallback></Avatar><span className="flex flex-col items-start"><span className="font-medium">Acme Inc.</span><span className="text-xs text-sidebar-foreground/60">Pro plan</span></span></span><ChevronDown className="size-4 text-sidebar-foreground/50" /></DropdownMenuTrigger><DropdownMenuContent align="start" className="w-60"><DropdownMenuItem onClick={() => toast.success('Organisation switched')}>Acme Inc. <Badge variant="secondary" className="ml-auto">Current</Badge></DropdownMenuItem><DropdownMenuItem onClick={() => toast.success('Organisation switched')}>Northstar Labs</DropdownMenuItem><DropdownMenuItem onClick={() => toast.success('Organisation switched')}>Paperplane</DropdownMenuItem><Separator className="my-1" /><DropdownMenuItem><Plus data-icon="inline-start" />Create organisation</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
    <nav className="flex flex-1 flex-col gap-6 px-3 py-6"><div className="flex flex-col gap-1">{primary.map(({ label, icon: Icon }) => <Button key={label} variant="ghost" onClick={() => setActive(label)} className={`justify-start gap-3 px-3 ${active === label ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent'}`}><Icon data-icon="inline-start" />{label}{label === 'Invitations' && <Badge variant="secondary" className="ml-auto">2</Badge>}</Button>)}</div><div className="flex flex-col gap-1"><p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40">Workspace</p>{secondary.map(({ label, icon: Icon }) => <Button key={label} variant="ghost" onClick={() => setActive(label)} className={`justify-start gap-3 px-3 ${active === label ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent'}`}><Icon data-icon="inline-start" />{label}</Button>)}</div></nav>
    <div className="border-t border-sidebar-border p-3"><Button variant="ghost" className="w-full justify-start gap-3 px-3 text-sidebar-foreground/70"><CircleHelp data-icon="inline-start" />Help & support</Button><Button variant="ghost" className="w-full justify-start gap-3 px-3 text-sidebar-foreground/70"><Avatar className="size-7"><AvatarFallback className="bg-sidebar-accent text-xs">OR</AvatarFallback></Avatar><span className="flex-1 text-left"><span className="block text-sm text-sidebar-foreground">Olivia Rhye</span><span className="block text-xs text-sidebar-foreground/50">olivia@acme.inc</span></span><Ellipsis className="size-4" /></Button></div>
  </div>
}

export function OrganizationSettings() {
  const [active, setActive] = useState('Settings')
  const [tab, setTab] = useState('general')
  const [orgName, setOrgName] = useState('Acme Inc.')
  const [orgSlug, setOrgSlug] = useState('acme-inc')
  const [memberPage, setMemberPage] = useState(1)
  const [teamPage, setTeamPage] = useState(1)
  const [invites, setInvites] = useState(invitations)
  const [inviteEmail, setInviteEmail] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const paginatedMembers = useMemo(() => members.slice((memberPage - 1) * 4, memberPage * 4), [memberPage])
  const paginatedTeams = useMemo(() => teams.slice((teamPage - 1) * 2, teamPage * 2), [teamPage])
  const handleSave = () => toast.success('Organisation settings saved', { description: 'Your changes are now live.' })
  const nav = <SidebarContent active={active} setActive={(value) => { setActive(value); setMobileOpen(false) }} />

  return <div className="min-h-screen bg-muted/30 text-foreground"><aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-sidebar lg:block">{nav}</aside><Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetContent side="left" className="w-72 p-0">{nav}</SheetContent></Sheet><div className="lg:pl-64"><header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-8"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}><Menu /><span className="sr-only">Open navigation</span></Button><div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex"><span>Acme Inc.</span><ChevronRight className="size-4" /><span className="text-foreground">Settings</span></div></div><div className="flex items-center gap-3"><Button variant="ghost" size="icon"><Search /><span className="sr-only">Search</span></Button><Button variant="ghost" size="icon"><Bell /><span className="sr-only">Notifications</span></Button><Avatar className="size-8"><AvatarFallback className="bg-primary text-xs text-primary-foreground">OR</AvatarFallback></Avatar></div></header><main className="mx-auto max-w-6xl px-4 py-8 sm:px-8"><div className="mb-8"><p className="mb-2 text-sm font-medium text-primary">Workspace settings</p><h1 className="text-3xl font-semibold tracking-tight text-balance">Organisation settings</h1><p className="mt-2 max-w-2xl text-muted-foreground leading-6">Manage your organisation, members, teams and access preferences.</p></div><div className="grid gap-8 lg:grid-cols-[180px_1fr]"><aside className="hidden lg:block"><nav className="flex flex-col gap-1">{[['general','General'],['members','Members'],['teams','Teams'],['invitations','Invitations'],['danger','Danger zone']].map(([value,label]) => <Button key={value} variant="ghost" onClick={() => setTab(value)} className={`justify-start ${tab === value ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}>{label}{value === 'invitations' && <Badge variant="secondary" className="ml-auto">2</Badge>}</Button>)}</nav></aside><div className="min-w-0"><Tabs value={tab} onValueChange={setTab}><TabsList className="mb-6 flex h-auto w-full justify-start gap-1 overflow-x-auto bg-transparent p-0 lg:hidden"><TabsTrigger value="general">General</TabsTrigger><TabsTrigger value="members">Members</TabsTrigger><TabsTrigger value="teams">Teams</TabsTrigger><TabsTrigger value="invitations">Invitations</TabsTrigger><TabsTrigger value="danger">Danger zone</TabsTrigger></TabsList><TabsContent value="general" className="mt-0 flex flex-col gap-6"><Card><CardHeader><CardTitle>General information</CardTitle><CardDescription>Update your organisation identity and URL.</CardDescription></CardHeader><CardContent className="flex flex-col gap-5"><div className="flex items-center gap-4"><Avatar className="size-14 rounded-xl"><AvatarFallback className="rounded-xl bg-primary text-primary-foreground">AI</AvatarFallback></Avatar><Button variant="outline" size="sm">Change logo</Button></div><div className="grid gap-5 sm:grid-cols-2"><div className="flex flex-col gap-2"><Label htmlFor="org-name">Organisation name</Label><Input id="org-name" value={orgName} onChange={(e) => setOrgName(e.target.value)} /></div><div className="flex flex-col gap-2"><Label htmlFor="org-slug">Organisation slug</Label><Input id="org-slug" value={orgSlug} onChange={(e) => setOrgSlug(e.target.value)} /><p className="text-xs text-muted-foreground">northstar.app/{orgSlug}</p></div></div><div className="flex justify-end"><Button onClick={handleSave}>Save changes</Button></div></CardContent></Card><Card><CardHeader><CardTitle>Your organisations</CardTitle><CardDescription>Organisations you can access with this account.</CardDescription></CardHeader><CardContent className="flex flex-col gap-2">{organizations.map((org) => <div key={org.slug} className="flex items-center gap-3 rounded-lg border p-3"><Avatar className="size-9"><AvatarFallback className={`${org.color} text-xs text-primary-foreground`}>{org.initials}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><p className="font-medium">{org.name}</p><p className="text-sm text-muted-foreground">{org.members} members · {org.plan} plan</p></div>{org.slug === orgSlug ? <Badge variant="secondary"><Check data-icon="inline-start" />Current</Badge> : <Button variant="outline" size="sm" onClick={() => toast.success(`Switched to ${org.name}`)}>Switch</Button>}</div>)}</CardContent></Card></TabsContent><TabsContent value="members" className="mt-0"><Card><CardHeader className="flex flex-row items-start justify-between gap-4"><div><CardTitle>Organisation members</CardTitle><CardDescription>People with access to Acme Inc.</CardDescription></div><Dialog><DialogTrigger asChild><Button><Plus data-icon="inline-start" />Invite member</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Invite a member</DialogTitle><DialogDescription>Send an invitation to join your organisation.</DialogDescription></DialogHeader><div className="flex flex-col gap-2 py-4"><Label htmlFor="invite-email">Email address</Label><Input id="invite-email" type="email" placeholder="colleague@example.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} /></div><DialogFooter><Button onClick={() => { setInviteEmail(''); toast.success('Invitation sent') }} disabled={!inviteEmail}>Send invitation</Button></DialogFooter></DialogContent></Dialog></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Member</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead className="w-10" /></TableRow></TableHeader><TableBody>{paginatedMembers.map((member) => <TableRow key={member.email}><TableCell><div className="flex items-center gap-3"><Avatar className="size-8"><AvatarFallback className="text-xs">{member.initials}</AvatarFallback></Avatar><div><p className="font-medium">{member.name}</p><p className="text-xs text-muted-foreground">{member.email}</p></div></div></TableCell><TableCell><Select defaultValue={member.role.toLowerCase()} onValueChange={() => toast.success('Member role updated')}><SelectTrigger className="w-28"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="owner">Owner</SelectItem><SelectItem value="admin">Admin</SelectItem><SelectItem value="member">Member</SelectItem><SelectItem value="viewer">Viewer</SelectItem></SelectContent></Select></TableCell><TableCell><Badge variant={member.status === 'Active' ? 'secondary' : 'outline'}>{member.status}</Badge></TableCell><TableCell><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><Ellipsis /><span className="sr-only">Member actions</span></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => toast.success('Member removed')}>Remove member</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell></TableRow>)}</TableBody></Table><Pagination className="mt-5 justify-end"><PaginationContent><PaginationItem><PaginationPrevious onClick={() => setMemberPage(Math.max(1, memberPage - 1))} className="cursor-pointer" /></PaginationItem><PageButton page={1} active={memberPage === 1} onClick={() => setMemberPage(1)} /><PageButton page={2} active={memberPage === 2} onClick={() => setMemberPage(2)} /><PaginationItem><PaginationNext onClick={() => setMemberPage(Math.min(2, memberPage + 1))} className="cursor-pointer" /></PaginationItem></PaginationContent></Pagination></CardContent></Card></TabsContent><TabsContent value="teams" className="mt-0"><Card><CardHeader className="flex flex-row items-start justify-between"><div><CardTitle>Teams</CardTitle><CardDescription>Groups that help organise your members.</CardDescription></div><Button onClick={() => toast.success('Team creation started')}><Plus data-icon="inline-start" />Create team</Button></CardHeader><CardContent className="flex flex-col gap-3">{paginatedTeams.map((team) => <div key={team.name} className="flex items-center gap-3 rounded-lg border p-4"><Avatar className="size-10 rounded-lg"><AvatarFallback className="rounded-lg bg-accent text-xs">{team.initials}</AvatarFallback></Avatar><div className="flex-1"><p className="font-medium">{team.name}</p><p className="text-sm text-muted-foreground">{team.description}</p></div><Badge variant="outline">{team.members} members</Badge><Button variant="ghost" size="icon"><Ellipsis /><span className="sr-only">Team actions</span></Button></div>)}<Pagination className="justify-end"><PaginationContent><PaginationItem><PaginationPrevious onClick={() => setTeamPage(1)} className="cursor-pointer" /></PaginationItem><PageButton page={1} active={teamPage === 1} onClick={() => setTeamPage(1)} /><PageButton page={2} active={teamPage === 2} onClick={() => setTeamPage(2)} /><PaginationItem><PaginationNext onClick={() => setTeamPage(2)} className="cursor-pointer" /></PaginationItem></PaginationContent></Pagination></CardContent></Card></TabsContent><TabsContent value="invitations" className="mt-0"><Card><CardHeader><CardTitle>Invitations</CardTitle><CardDescription>Invitations you&apos;ve received to join organisations.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3">{invites.length ? invites.map((invite) => <div key={invite.organization} className="flex flex-wrap items-center gap-3 rounded-lg border p-4"><Avatar className="size-10"><AvatarFallback>{invite.initials}</AvatarFallback></Avatar><div className="min-w-48 flex-1"><p className="font-medium">{invite.organization}</p><p className="text-sm text-muted-foreground">Invited as {invite.role} · {invite.sent}</p></div><div className="flex gap-2"><Button size="sm" onClick={() => { setInvites(invites.filter((item) => item.organization !== invite.organization)); toast.success(`Joined ${invite.organization}`) }}>Accept</Button><Button size="sm" variant="outline" onClick={() => { setInvites(invites.filter((item) => item.organization !== invite.organization)); toast.success('Invitation declined') }}><X data-icon="inline-start" />Decline</Button></div></div>) : <div className="py-10 text-center text-sm text-muted-foreground">No pending invitations.</div>}</CardContent></Card></TabsContent><TabsContent value="danger" className="mt-0"><Card className="border-destructive/30"><CardHeader><CardTitle className="text-destructive">Danger zone</CardTitle><CardDescription>Irreversible and destructive actions for this organisation.</CardDescription></CardHeader><CardContent className="divide-y"><div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium">Leave organisation</p><p className="text-sm text-muted-foreground">You will lose access to all organisation resources.</p></div><AlertDialog><AlertDialogTrigger asChild><Button variant="outline">Leave organisation</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Leave Acme Inc.?</AlertDialogTitle><AlertDialogDescription>You will need to be invited again to regain access. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => toast.success('You left the organisation')}>Leave organisation</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div><div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium">Delete organisation</p><p className="text-sm text-muted-foreground">Permanently delete this organisation and all its data.</p></div><AlertDialog><AlertDialogTrigger asChild><Button variant="destructive"><Trash2 data-icon="inline-start" />Delete organisation</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete Acme Inc.?</AlertDialogTitle><AlertDialogDescription>This permanently deletes your organisation, members, teams and all associated data.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => toast.success('Organisation deletion requested')}>Delete organisation</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div></CardContent></Card></TabsContent></Tabs></div></div></main></div></div>
}

export default OrganizationSettings
