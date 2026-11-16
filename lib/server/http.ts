import { z } from 'zod';

export function jsonError(status: number, message: string) {
  return Response.json({ error: message }, { status });
}

export const unauthorized = () => jsonError(401, 'Faça login para continuar.');
export const notFound = () => jsonError(404, 'Não encontrado.');

/** Lê e valida o corpo JSON. Retorna os dados ou a resposta de erro pronta. */
export async function readJson<T extends z.ZodType>(
  request: Request,
  schema: T,
): Promise<{ data: z.infer<T>; error?: never } | { data?: never; error: Response }> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { error: jsonError(400, 'Requisição inválida.') };
  }
  return validate(schema, body);
}

export function validate<T extends z.ZodType>(
  schema: T,
  value: unknown,
): { data: z.infer<T>; error?: never } | { data?: never; error: Response } {
  const result = schema.safeParse(value);
  if (!result.success) {
    return { error: jsonError(400, result.error.issues[0]?.message ?? 'Dados inválidos.') };
  }
  return { data: result.data };
}
