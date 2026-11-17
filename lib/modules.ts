export const moduleMeta: Record<string, { title: string; eyebrow: string; description: string }> = {
  tickets: { title: "Ticket Management", eyebrow: "Operations", description: "Create, triage, assign and progress the service desk queue." },
  sla: { title: "SLA Monitoring", eyebrow: "Operations", description: "Monitor breach exposure, response performance and SLA risk." },
  incidents: { title: "Major Incidents", eyebrow: "Operations", description: "Coordinate critical incidents, commanders, communications and PIRs." },
  escalations: { title: "Escalation Management", eyebrow: "Operations", description: "Track escalated tickets, owners and next-update commitments." },
  performance: { title: "Team Performance", eyebrow: "Performance", description: "Review workload, resolution quality and service-level outcomes by team." },
  aging: { title: "Backlog & Aging", eyebrow: "Performance", description: "Focus the daily backlog review on aging and dependency risk." },
  problems: { title: "Problem Management", eyebrow: "Performance", description: "Manage recurring incidents, root causes and permanent corrective actions." },
  changes: { title: "Change Management", eyebrow: "Performance", description: "Coordinate upcoming changes and operational impact visibility." },
  governance: { title: "Operational Governance", eyebrow: "Governance", description: "Manage BCP/DR, reviews, risks and compliance actions." },
  reports: { title: "Management Reports", eyebrow: "Governance", description: "Prepare management-ready operational reports from current data." },
  actions: { title: "Action Tracker", eyebrow: "Governance", description: "Drive accountable follow-up across incidents, reviews and audits." },
  admin: { title: "Administration", eyebrow: "Governance", description: "Review teams, services, users, audit events and import readiness." }
};
export const modulePath = (label: string) => ({ "Ticket Management":"tickets", "SLA Monitoring":"sla", "Major Incidents":"incidents", "Escalation Management":"escalations", "Team Performance":"performance", "Backlog & Aging":"aging", "Problem Management":"problems", "Change Management":"changes", "Operational Governance":"governance", Reports:"reports", "Action Tracker":"actions", Administration:"admin" } as Record<string,string>)[label] ?? "";
