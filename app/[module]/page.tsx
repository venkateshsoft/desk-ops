import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { moduleMeta } from "@/lib/modules";
import ModuleView from "@/components/module-view";

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  if (!moduleMeta[module]) notFound();
  const [tickets, teams, users, escalations, incidents, problems, changes, actions, services, audits] = await Promise.all([
    prisma.ticket.findMany({ orderBy: { updatedAt: "desc" }, take: 80, include: { team: true, assignee: true } }),
    prisma.team.findMany({ include: { _count: { select: { tickets: true } } } }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
    prisma.escalation.findMany({ orderBy: { createdAt: "desc" }, include: { ticket: true }, take: 50 }),
    prisma.majorIncident.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.problem.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.change.findMany({ orderBy: { windowStart: "asc" } }),
    prisma.operationalAction.findMany({ orderBy: { dueDate: "asc" }, include: { owner: true } }),
    prisma.service.findMany({ include: { _count: { select: { tickets: true } } } }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 30 })
  ]);
  return <ModuleView module={module} meta={moduleMeta[module]} data={{ tickets, teams, users, escalations, incidents, problems, changes, actions, services, audits }} />;
}
