import { loadContent } from '@/lib/server/content';
import { unauthorized } from '@/lib/server/http';
import { getSessionUser } from '@/lib/server/session';

// Conteúdo do Octalysis (Core Drives, objetivos, técnicas, atividades e
// Objetos de Aprendizagem), carregado no banco por `pnpm db:content`.
export async function GET() {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  return Response.json({ content: await loadContent() });
}
