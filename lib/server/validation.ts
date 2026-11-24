import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '../password-rules';

// A existência dos IDs de conteúdo é conferida no banco por findInvalidContentRef
// (lib/server/content.ts), depois desta validação de formato.
const contentId = z.string().trim().min(1).max(100);

const name = z.string().trim().min(1, 'Informe seu nome.').max(120, 'Nome muito longo.');
const email = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, 'E-mail muito longo.')
  .pipe(z.email('O formato do e-mail é inválido.'));
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, 'Texto muito longo.')
    .optional()
    .transform((value) => value || null);
const password = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres.`)
  .max(128, 'Senha muito longa.');
const techniqueId = contentId;

export const registerSchema = z.object({
  name,
  email,
  password,
  school: optionalText(120),
  subject: optionalText(120),
  acceptTerms: z.literal(true, 'É preciso aceitar o Termo de Uso e a Política de Privacidade.'),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().max(254),
  password: z.string().max(128),
});

export const accountUpdateSchema = z.object({
  name,
  email,
  school: optionalText(120),
  subject: optionalText(120),
});

export const accountDeleteSchema = z.object({
  password: z.string().max(128),
});

export const planTechniquesSchema = z
  .array(
    z.object({
      techniqueId,
      customNotes: z.string().trim().max(2000, 'Anotação muito longa.').optional(),
    }),
  )
  .max(100);

export const planSchema = z.object({
  title: z.string().trim().min(1, 'O nome do plano é obrigatório.').max(150, 'Nome do plano muito longo.'),
  subject: z.string().trim().min(1, 'A disciplina é obrigatória.').max(150, 'Disciplina muito longa.'),
  targetAudience: z.string().trim().max(150, 'Público-alvo muito longo.'),
  description: optionalText(2000),
  selectedObjectiveIds: z.array(contentId).max(50),
  selectedDriverIds: z.array(z.number().int()).max(8),
  selectedTechniques: planTechniquesSchema,
});

export const resourceSchema = z
  .object({
    techniqueId,
    title: z.string().trim().min(1, 'Informe um título para o material.').max(150, 'Título muito longo.'),
    description: z.string().trim().max(1000, 'Descrição muito longa.'),
    type: z.enum(['link', 'file']),
    url: z
      .string()
      .trim()
      .max(2000, 'Link muito longo.')
      .pipe(z.url({ protocol: /^https?$/, error: 'Informe um link válido começando com http:// ou https://.' }))
      .optional(),
    isPublic: z.boolean(),
  })
  .refine((data) => data.type === 'file' || Boolean(data.url), {
    message: 'Informe o link do material.',
    path: ['url'],
  });

export type PlanInput = z.infer<typeof planSchema>;
