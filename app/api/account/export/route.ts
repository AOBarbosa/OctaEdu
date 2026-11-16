import { db } from '@/lib/server/db';
import { unauthorized } from '@/lib/server/http';
import { toPlan } from '@/lib/server/mappers';
import { getSessionUser } from '@/lib/server/session';

export async function GET() {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const [plans, resources, sessions] = await Promise.all([
    db.plan.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'asc' } }),
    db.resource.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'asc' } }),
    db.session.findMany({
      where: { userId: user.id },
      select: { createdAt: true, expiresAt: true },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  const payload = {
    exportadoEm: new Date().toISOString(),
    conta: {
      nome: user.name,
      email: user.email,
      escola: user.school,
      disciplina: user.subject,
      criadaEm: user.createdAt.toISOString(),
      atualizadaEm: user.updatedAt.toISOString(),
      termoAceito: { versao: user.termsVersion, em: user.termsAcceptedAt.toISOString() },
    },
    planos: plans.map(toPlan),
    materiais: resources.map((r) => ({
      id: r.id,
      tecnica: r.techniqueId,
      titulo: r.title,
      descricao: r.description,
      tipo: r.type,
      link: r.url,
      arquivo: r.fileName,
      tamanhoBytes: r.fileSize,
      publico: r.isPublic,
      criadoEm: r.createdAt.toISOString(),
    })),
    sessoesAtivas: sessions.map((s) => ({
      criadaEm: s.createdAt.toISOString(),
      expiraEm: s.expiresAt.toISOString(),
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': 'attachment; filename="meus-dados-octaedu.json"',
      'Cache-Control': 'private, no-store',
    },
  });
}
