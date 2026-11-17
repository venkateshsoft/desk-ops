import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
const schema = z.object({ title: z.string().min(3), priority: z.enum(["P1", "P2", "P3", "P4"]).default("P3") });
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Title must be at least 3 characters." }, { status: 400 });
  const team = await prisma.team.findFirst({ where: { level: "L1" } });
  const count = await prisma.ticket.count();
  const ticket = await prisma.ticket.create({ data: { ticketNo: `INC-${10001 + count}`, title: parsed.data.title, description: "Created from DeskOps quick capture.", type: "Incident", category: "Uncategorised", subcategory: "Standard", application: "Service Portal", customer: "Internal", priority: parsed.data.priority, severity: parsed.data.priority === "P1" ? "Critical" : "Medium", impact: "Department", urgency: parsed.data.priority === "P1" ? "Immediate" : "Normal", status: "NEW", level: "L1", teamId: team?.id, slaTargetMins: parsed.data.priority === "P1" ? 240 : parsed.data.priority === "P2" ? 480 : 1440 } });
  await prisma.auditLog.create({ data: { actor: "DeskOps user", action: "CREATE", entity: "Ticket", entityId: ticket.id, details: `Created ${ticket.ticketNo}` } });
  return NextResponse.json({ ticket }, { status: 201 });
}
