import bcrypt from 'bcryptjs';

const BCRYPT_COST = 12;

// Hash fixo usado quando o e-mail não existe, para o tempo de resposta não revelar contas cadastradas.
const DUMMY_HASH = '$2b$12$s3ob8EGLIaZRTuCr4Dblt.9SyGoJbXOA.iSg.3vorXYM3osw1qhc2';

export function hashPassword(password: string) {
  return bcrypt.hash(password, BCRYPT_COST);
}

export async function verifyPassword(password: string, passwordHash: string | null | undefined) {
  const matches = await bcrypt.compare(password, passwordHash ?? DUMMY_HASH);
  return Boolean(passwordHash) && matches;
}
