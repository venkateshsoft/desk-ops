import { prisma } from "@/lib/prisma";
import Dashboard from "@/components/dashboard";
import ModuleLauncher from "@/components/module-launcher";

export default async function Home() {
  const [total, open, resolved, pending, breached, risk, critical, tickets, teamStats] = await Promise.all([
    prisma.ticket.count(),
    prisma.ticket.count({ where: { status: { in: ["NEW", "ASSIGNED", "IN_PROGRESS", "PENDING_USER", "PENDING_VENDOR", "PENDING_CHANGE", "ESCALATED", "REOPENED"] } } }),
    prisma.ticket.count({ where: { status: { in: ["RESOLVED", "CLOSED"] } } }),
    prisma.ticket.count({ where: { status: { in: ["PENDING_USER", "PENDING_VENDOR", "PENDING_CHANGE"] } } }),
    prisma.ticket.count({ where: { slaBreached: true } }),
    prisma.ticket.count({ where: { slaBreached: false, status: { in: ["NEW", "ASSIGNED", "IN_PROGRESS", "ESCALATED"] } } }),
    prisma.ticket.count({ where: { priority: { in: ["P1", "P2"] }, status: { notIn: ["CLOSED", "RESOLVED"] } } }),
    prisma.ticket.findMany({ orderBy: { updatedAt: "desc" }, take: 8, include: { team: true, assignee: true } }),
    prisma.team.findMany({ include: { _count: { select: { tickets: true } } } })
  ]);
  const response = await prisma.ticket.findMany({ where: { firstResponseAt: { not: null } }, select: { createdAt: true, firstResponseAt: true }, take: 1000 });
  const avgResponse = response.length ? Math.round(response.reduce((n,t) => n + ((t.firstResponseAt?.getTime() ?? 0)-t.createdAt.getTime())/60000, 0) / response.length) : 0;
  return <><ModuleLauncher /><Dashboard data={{ total, open, resolved, pending, breached, risk, critical, avgResponse, tickets, teamStats }} /></>;
}
