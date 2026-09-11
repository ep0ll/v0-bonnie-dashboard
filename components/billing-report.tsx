'use client'

import { useState } from 'react'
import { ArrowDownToLine, CreditCard, Download, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const usage = [
  { month: 'May', credits: 38 }, { month: 'Jun', credits: 44 }, { month: 'Jul', credits: 51 },
  { month: 'Aug', credits: 47 }, { month: 'Sep', credits: 62 }, { month: 'Oct', credits: 55 },
]
const transactions = [
  { id: 'inv_01HQ8', date: 'Sep 01, 2026', description: 'Pro plan renewal', amount: '$249.00', status: 'Paid' },
  { id: 'inv_01HP2', date: 'Aug 01, 2026', description: 'Pro plan renewal', amount: '$249.00', status: 'Paid' },
  { id: 'inv_01HN7', date: 'Jul 01, 2026', description: 'Pro plan renewal', amount: '$249.00', status: 'Paid' },
  { id: 'inv_01HM3', date: 'Jun 01, 2026', description: 'Pro plan renewal', amount: '$249.00', status: 'Paid' },
]

export function BillingReport() {
  const [showAll, setShowAll] = useState(false)
  const visibleTransactions = showAll ? transactions : transactions.slice(0, 3)
  return <div className="flex flex-col gap-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-sm font-medium text-primary">Workspace</p><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Billing & credits</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Track your organisation&apos;s credit balance, usage trends, and payment history.</p></div><Button variant="outline" onClick={() => toast.success('Billing portal opened')}><CreditCard data-icon="inline-start" />Manage billing</Button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Credits remaining</p><p className="mt-2 text-3xl font-semibold tabular-nums">4,280</p><p className="mt-1 text-xs text-muted-foreground">of 10,000 monthly credits</p><Progress value={57.2} className="mt-4" /></CardContent></Card><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Projected renewal</p><p className="mt-2 text-3xl font-semibold tabular-nums">Oct 01</p><p className="mt-1 text-xs text-muted-foreground">19 days remaining</p></CardContent></Card><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Usage this month</p><div className="mt-2 flex items-center gap-2"><p className="text-3xl font-semibold tabular-nums">5,720</p><Badge variant="secondary" className="gap-1"><TrendingUp data-icon="inline-start" />12.4%</Badge></div><p className="mt-1 text-xs text-muted-foreground">Compared with last month</p></CardContent></Card><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Plan</p><p className="mt-2 text-3xl font-semibold">Pro</p><p className="mt-1 text-xs text-muted-foreground">$249 / month · 10k credits</p></CardContent></Card></div>
    <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]"><Card><CardHeader><CardTitle>Credit usage</CardTitle><CardDescription>Organisation-wide consumption over the last 6 months.</CardDescription></CardHeader><CardContent><ChartContainer config={{ credits: { label: 'Credits used', color: 'var(--chart-2)' } }} className="h-64 w-full"><AreaChart accessibilityLayer data={usage} margin={{ left: 4, right: 8, top: 8 }}><CartesianGrid vertical={false} /><XAxis dataKey="month" tickLine={false} axisLine={false} /><YAxis hide /><ChartTooltip content={<ChartTooltipContent />} /><Area dataKey="credits" type="monotone" fill="var(--color-credits)" fillOpacity={0.18} stroke="var(--color-credits)" strokeWidth={2} /></AreaChart></ChartContainer></CardContent></Card><Card><CardHeader><CardTitle>Credit allocation</CardTitle><CardDescription>How your current cycle is being used.</CardDescription></CardHeader><CardContent className="flex flex-col gap-5"><Allocation label="Builds" value="3,420" percent={60} /><Allocation label="Deployments" value="1,430" percent={25} /><Allocation label="Preview environments" value="870" percent={15} /><div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">You&apos;re on track to use 8,190 credits this cycle.</div></CardContent></Card></div>
    <Card><CardHeader><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><CardTitle>Transaction history</CardTitle><CardDescription>Invoices and payments for Acme Inc.</CardDescription></div><Button variant="outline" size="sm" onClick={() => toast.success('Invoice export started')}><Download data-icon="inline-start" />Export CSV</Button></div></CardHeader><CardContent><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader><TableBody>{visibleTransactions.map((transaction) => <TableRow key={transaction.id}><TableCell className="font-mono text-xs">{transaction.id}</TableCell><TableCell className="whitespace-nowrap">{transaction.date}</TableCell><TableCell>{transaction.description}</TableCell><TableCell><Badge variant="secondary" className="text-emerald-700">{transaction.status}</Badge></TableCell><TableCell className="text-right font-medium">{transaction.amount}</TableCell></TableRow>)}</TableBody></Table></div><div className="mt-4 flex justify-center"><Button variant="ghost" size="sm" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : 'View all transactions'}<ArrowDownToLine data-icon="inline-end" /></Button></div></CardContent></Card>
  </div>
}
function Allocation({ label, value, percent }: { label: string; value: string; percent: number }) { return <div className="flex flex-col gap-2"><div className="flex items-center justify-between text-sm"><span>{label}</span><span className="font-medium tabular-nums">{value} <span className="text-muted-foreground">({percent}%)</span></span></div><Progress value={percent} /></div> }

