import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
const schema = z.object({ status: z.enum(["NEW","ASSIGNED","IN_PROGRESS","PENDING_USER","PENDING_VENDOR","PENDING_CHANGE","ESCALATED","RESOLVED","CLOSED","REOPENED"]).optional(), assigneeId: z.string().nullable().optional(), teamId: z.string().nullable().optional() });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const body = schema.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: "Invalid ticket update" }, { status: 400 });
  const before = await prisma.ticket.findUnique({ where: { id } }); if (!before) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  const ticket = await prisma.ticket.update({ where: { id }, data: body.data });
  await prisma.ticketHistory.create({ data: { ticketId: id, actor: "DeskOps user", field: Object.keys(body.data).join(","), fromValue: `${before.status}`, toValue: `${ticket.status}` } });
  await prisma.auditLog.create({ data: { actor: "DeskOps user", action: "UPDATE", entity: "Ticket", entityId: id, details: JSON.stringify(body.data) } });
  return NextResponse.json({ ticket });
}
