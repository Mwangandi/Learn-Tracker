import type {
  ProjectId, ProjectMeta, DayPlan, WeekPlan, MonthPlan, QuarterPlan,
} from '@/types'

// ─────────────────────────────────────────────────────────────────
// PROJECT REGISTRY
// ─────────────────────────────────────────────────────────────────
export const PROJECTS: ProjectMeta[] = [
  {
    id:       'zoho',
    name:     'Zoho One',
    emoji:    '🚀',
    tagline:  'CRM, Books, Desk & Certification',
    accent:   '#00e5a0',
    accentBg: 'rgba(0,229,160,0.09)',
  },
  {
    id:       'flutter',
    name:     'Flutter Dev',
    emoji:    '🐦',
    tagline:  'Cross-platform mobile & web apps',
    accent:   '#54c5f8',
    accentBg: 'rgba(84,197,248,0.09)',
  },
  {
    id:       'frappe',
    name:     'Frappe Dev',
    emoji:    '🌿',
    tagline:  'ERPNext, custom apps & Frappe framework',
    accent:   '#a3e635',
    accentBg: 'rgba(163,230,53,0.09)',
  },
]

// ─────────────────────────────────────────────────────────────────
// ZOHO ONE — seed schedule (12 weeks / 60 days / 3 months)
// ─────────────────────────────────────────────────────────────────
type RawDay = [week: number, day: number, dayName: string, focus: string, tasks: string, deliverable: string]

const ZOHO_DAYS_RAW: RawDay[] = [
  [1,1,'Mon','CRM','Create Zoho One trial · Configure company info, business hours, fiscal year, currency (KES) · Explore Admin Panel',"Doc: 'How Zoho Organisation Structure Works'"],
  [1,2,'Tue','CRM','Create 5 test users · Configure Roles, Profiles, Permissions','Permission Matrix Spreadsheet'],
  [1,3,'Wed','CRM','Enable CRM, Books, Desk apps · Explore app switching · Study user provisioning','Apps enabled & linked'],
  [1,4,'Thu','CRM','Study MFA, IP restrictions, data sharing settings · Learn data ownership rules','Security settings documented'],
  [1,5,'Fri','CRM','Draw system architecture diagram: User → CRM → Books → Desk → Analytics','Architecture diagram'],
  [2,6,'Mon','CRM','Study CRM modules: Leads, Contacts, Accounts, Deals, Activities','Module relationship diagram'],
  [2,7,'Tue','CRM','Build Construction Company CRM: custom fields, pipeline stages, deal stages','Construction CRM demo ready'],
  [2,8,'Wed','CRM','Conditional fields, layout rules, required fields, data validation','Custom layouts configured'],
  [2,9,'Thu','CRM','Auto-assign leads, territory rules, email notifications','Lead assignment rules live'],
  [2,10,'Fri','CRM','Import sample CSV, deduplicate, clean formatting','Clean imported dataset'],
  [3,11,'Mon','CRM','Create 5 workflow automations: lead created, deal stage change, follow-up reminders','5 automations live'],
  [3,12,'Tue','CRM','Create email templates: Welcome email, Follow-up, Quotation','3 email templates ready'],
  [3,13,'Wed','CRM','Build Blueprint: Qualification → Site Visit → Proposal → Negotiation → Closed','Blueprint configured'],
  [3,14,'Thu','CRM','Create embedded lead form, simulate website capture, test automation trigger','Web form & trigger live'],
  [3,15,'Fri','CRM','Create reports: Sales funnel, Conversion rate, Revenue forecast, Rep performance','4 reports + dashboard'],
  [4,16,'Mon','CRM','Study Deluge syntax basics · Write simple function: auto-update field','First custom function written'],
  [4,17,'Tue','CRM','Create webhook · Test with external request (simulate API call)','Webhook tested'],
  [4,18,'Wed','CRM','Install CRM mobile app · Test real-world usage','Mobile testing notes'],
  [4,19,'Thu','CRM','Role-level field restriction, sharing rules, territory management','Security rules documented'],
  [4,20,'Fri','CRM','Write discovery checklist, implementation plan, timeline template','Mock Implementation Document'],
  [5,21,'Mon','Books','Configure taxes (VAT 16%), set base currency, add bank account','Books org configured'],
  [5,22,'Tue','Books','Customize Chart of Accounts, create expense categories, map income accounts','COA complete'],
  [5,23,'Wed','Books','Create invoices, recurring invoices, payment terms, late fee automation','Invoice templates live'],
  [5,24,'Thu','Books','Add vendors, record bills, reconcile sample payments','Vendor bills reconciled'],
  [5,25,'Fri','Books','Upload bank statement, match transactions, adjust discrepancies','Bank reconciliation done'],
  [6,26,'Mon','Integration','Enable CRM–Books sync, test contact creation','Sync enabled'],
  [6,27,'Tue','Integration','Convert deal to invoice, track payment status','Deal → Invoice flow live'],
  [6,28,'Wed','Integration','Compare CRM vs Books revenue reporting','Revenue comparison report'],
  [6,29,'Thu','Integration','Automate invoice trigger when deal closes','Cross-app automation live'],
  [6,30,'Fri','Integration','Write full lifecycle doc: Lead → Deal → Invoice → Payment','Finance flow document'],
  [7,31,'Mon','Desk','Email integration, configure support channels','Desk configured'],
  [7,32,'Tue','Desk','Configure status rules and escalation rules for ticket lifecycle','Ticket lifecycle rules set'],
  [7,33,'Wed','Desk','Set SLA: 24-hour response rule, escalation notification','SLA rules live'],
  [7,34,'Thu','Desk','Create help articles, categorize knowledge base','Knowledge base populated'],
  [7,35,'Fri','Desk','Build reports: ticket volume, agent performance','Desk reports done'],
  [8,36,'Mon','Integration','Link CRM accounts, sync customers to Desk','Customer sync live'],
  [8,37,'Tue','Integration','Convert deal to support ticket, test customer lifecycle','Deal → Support flow live'],
  [8,38,'Wed','Integration','Explore unified Customer 360 view','Customer 360 notes'],
  [8,39,'Thu','Integration','Simulate: Customer buys → needs support → escalates','Full process simulation done'],
  [8,40,'Fri','Integration','Review and refine full integrated system','Optimisation notes doc'],
  [9,41,'Mon','CRM','Business process mapping for NGO use case','NGO process map'],
  [9,42,'Tue','CRM','Build NGO demo CRM system','NGO demo system'],
  [9,43,'Wed','CRM','Business process mapping for Retail shop use case','Retail process map'],
  [9,44,'Thu','CRM','Build Retail demo CRM system','Retail demo system'],
  [9,45,'Fri','CRM','Review both demo systems, document key differences','2 industry demo docs'],
  [10,46,'Mon','CRM','Polish advanced dashboards — Sales, Finance, Support','Dashboard v2'],
  [10,47,'Tue','CRM','Build cross-module analytics report','Cross-module report'],
  [10,48,'Wed','CRM','Test all automations end-to-end','Automation QA log'],
  [10,49,'Thu','CRM','Peer / self-review of all deliverables','Review checklist'],
  [10,50,'Fri','CRM','Gap analysis — identify weak areas before cert study','Gap analysis document'],
  [11,51,'Mon','Cert','Review CRM Modules (Leads, Contacts, Accounts, Deals)','Module notes'],
  [11,52,'Tue','Cert','Review Automations, Blueprints, Workflows','Automation notes'],
  [11,53,'Wed','Cert','Take full mock test #1 — review all wrong answers','Mock test #1 score'],
  [11,54,'Thu','Cert','Take full mock test #2 — focus on weak areas','Mock test #2 score'],
  [11,55,'Fri','Cert','Final revision — flashcards, key concepts recap','Revision notes'],
  [12,56,'Mon','Cert','Last-day revision · Rest & prepare mentally','Ready for exam'],
  [12,57,'Tue','Cert','🎯 TAKE CRM CERTIFICATION EXAM','📜 Certification achieved'],
  [12,58,'Wed','Cert','Post-exam review — document learnings','Post-cert learnings doc'],
  [12,59,'Thu','Cert','Q2 Planning — outline next quarter goals','Q2 plan draft'],
  [12,60,'Fri','Cert','Celebrate & share Q1 achievements 🎉','Portfolio / LinkedIn post'],
]

const ZOHO_WEEK_GOALS: Record<number, string> = {
  1:'Zoho One System Foundation', 2:'CRM Data Model Deep Dive',
  3:'CRM Automation Mastery',     4:'CRM Advanced + Integration',
  5:'Zoho Books Foundation',      6:'CRM + Books Integration',
  7:'Zoho Desk Setup',            8:'CRM + Desk Integration',
  9:'Industry Demo Systems',      10:'Advanced Dashboards & Reporting',
  11:'Certification Study',       12:'Certification Exam',
}
const ZOHO_WEEK_FOCUS: Record<number, string> = {
  1:'CRM',2:'CRM',3:'CRM',4:'CRM',5:'Books',6:'Integration',
  7:'Desk',8:'Integration',9:'CRM',10:'CRM',11:'Cert',12:'Cert',
}

// ─────────────────────────────────────────────────────────────────
// FLUTTER — starter skeleton (user fills in via Planner)
// ─────────────────────────────────────────────────────────────────
const FLUTTER_WEEK_GOALS: Record<number, string> = {
  1:'Dart Language Fundamentals',    2:'Flutter Basics & Widgets',
  3:'State Management (Provider)',   4:'Navigation & Routing',
  5:'Networking & REST APIs',        6:'Local Storage & SQLite',
  7:'UI Polish & Custom Widgets',    8:'Platform Channels (native)',
  9:'Firebase Integration',          10:'Testing & Debugging',
  11:'App Store / Play Store Deploy', 12:'Portfolio Project',
}
const FLUTTER_WEEK_FOCUS: Record<number, string> = {
  1:'Dart',2:'Flutter',3:'State',4:'Navigation',5:'Networking',6:'Storage',
  7:'UI',8:'Native',9:'Firebase',10:'Testing',11:'Deploy',12:'Portfolio',
}
const DAY_NAMES = ['Mon','Tue','Wed','Thu','Fri']

// ─────────────────────────────────────────────────────────────────
// FRAPPE — starter skeleton
// ─────────────────────────────────────────────────────────────────
const FRAPPE_WEEK_GOALS: Record<number, string> = {
  1:'Frappe Framework Fundamentals',  2:'DocType Design & Scripting',
  3:'Frappe Forms & Controllers',     4:'Reports & Print Formats',
  5:'ERPNext Core Modules',           6:'Customisation & Hooks',
  7:'REST API & Webhooks',            8:'Custom App Architecture',
  9:'Workflows & Notifications',      10:'Testing & Deployment',
  11:'ERPNext Advanced Configuration', 12:'Capstone Custom App',
}
const FRAPPE_WEEK_FOCUS: Record<number, string> = {
  1:'Framework',2:'DocType',3:'Forms',4:'Reports',5:'ERPNext',6:'Hooks',
  7:'API',8:'Custom App',9:'Workflows',10:'Deploy',11:'Config',12:'Capstone',
}

// ─────────────────────────────────────────────────────────────────
// BUILDERS
// ─────────────────────────────────────────────────────────────────

function weekToMonth(wk: number) { return Math.ceil(wk / 4) }
function weekToQuarter(wk: number) { return Math.ceil(wk / 12) }

export function buildInitialDays(pid: ProjectId): DayPlan[] {
  if (pid === 'zoho') {
    return ZOHO_DAYS_RAW.map(([week, day, dayName, focus, tasks, deliverable]) => ({
      id: `zoho-d${day}`,
      projectId: 'zoho',
      week, quarter: 1,
      month: weekToMonth(week),
      dayNumber: day,
      dayName, focusArea: focus, tasks, deliverable,
      status: 'To Do', notes: '', hours: '', keyLearning: '', blockers: '', date: '',
    }))
  }

  const weekGoals = pid === 'flutter' ? FLUTTER_WEEK_GOALS : FRAPPE_WEEK_GOALS
  const weekFocus = pid === 'flutter' ? FLUTTER_WEEK_FOCUS : FRAPPE_WEEK_FOCUS
  const days: DayPlan[] = []
  let dayNum = 1
  for (let wk = 1; wk <= 12; wk++) {
    for (let di = 0; di < 5; di++) {
      days.push({
        id: `${pid}-d${dayNum}`,
        projectId: pid,
        week: wk, quarter: 1,
        month: weekToMonth(wk),
        dayNumber: dayNum,
        dayName: DAY_NAMES[di],
        focusArea: weekFocus[wk] ?? '',
        tasks: `Day ${di + 1} of ${weekGoals[wk] ?? `Week ${wk}`}`,
        deliverable: '',
        status: 'To Do', notes: '', hours: '', keyLearning: '', blockers: '', date: '',
      })
      dayNum++
    }
  }
  return days
}

export function buildInitialWeeks(pid: ProjectId): WeekPlan[] {
  const goals = pid === 'zoho' ? ZOHO_WEEK_GOALS : pid === 'flutter' ? FLUTTER_WEEK_GOALS : FRAPPE_WEEK_GOALS
  const focus = pid === 'zoho' ? ZOHO_WEEK_FOCUS : pid === 'flutter' ? FLUTTER_WEEK_FOCUS : FRAPPE_WEEK_FOCUS
  return Array.from({ length: 12 }, (_, i) => {
    const wk = i + 1
    return {
      id: `${pid}-w${wk}`,
      projectId: pid,
      weekNumber: wk,
      quarter: weekToQuarter(wk),
      month: weekToMonth(wk),
      goal: goals[wk] ?? `Week ${wk}`,
      focusArea: focus[wk] ?? '',
      notes: '',
    }
  })
}

const MONTH_COLORS = ['#10b981', '#f97316', '#a855f7']
const MONTH_TITLES: Record<ProjectId, string[]> = {
  zoho:    ['CRM Foundation', 'Books, Desk & Integration', 'Advanced & Certification'],
  flutter: ['Dart & Flutter Basics', 'State, Navigation & Data', 'Firebase, Deploy & Portfolio'],
  frappe:  ['Framework & DocTypes', 'ERPNext & Customisation', 'API, Testing & Capstone'],
}

export function buildInitialMonths(pid: ProjectId): MonthPlan[] {
  return [1, 2, 3].map(m => ({
    id: `${pid}-m${m}`,
    projectId: pid,
    monthNumber: m,
    quarter: 1,
    title: MONTH_TITLES[pid][m - 1] ?? `Month ${m}`,
    objective: '',
    keyMilestones: '',
    color: MONTH_COLORS[m - 1],
  }))
}

export function buildInitialQuarters(pid: ProjectId): QuarterPlan[] {
  return [{
    id: `${pid}-q1`,
    projectId: pid,
    quarterNumber: 1,
    title: `Q1 ${PROJECTS.find(p => p.id === pid)?.name ?? ''} Learning`,
    objective: '',
    successMetrics: '',
  }]
}
