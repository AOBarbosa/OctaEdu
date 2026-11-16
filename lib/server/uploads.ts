import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

interface FileSignature {
  mime: string;
  ext: string;
  matches: (bytes: Buffer) => boolean;
}

const startsWith = (bytes: Buffer, signature: number[], offset = 0) =>
  signature.every((value, index) => bytes[offset + index] === value);

const ascii = (text: string) => [...text].map((char) => char.charCodeAt(0));

const SIGNATURES: FileSignature[] = [
  { mime: 'application/pdf', ext: '.pdf', matches: (b) => startsWith(b, ascii('%PDF-')) },
  { mime: 'image/png', ext: '.png', matches: (b) => startsWith(b, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]) },
  { mime: 'image/jpeg', ext: '.jpg', matches: (b) => startsWith(b, [0xff, 0xd8, 0xff]) },
  { mime: 'image/gif', ext: '.gif', matches: (b) => startsWith(b, ascii('GIF8')) },
  { mime: 'image/webp', ext: '.webp', matches: (b) => startsWith(b, ascii('RIFF')) && startsWith(b, ascii('WEBP'), 8) },
];

const STORED_NAME_PATTERN = /^[0-9a-f-]{36}\.(pdf|png|jpg|gif|webp)$/;

export class UploadError extends Error {}

export async function saveUpload(file: File) {
  if (file.size === 0) throw new UploadError('O arquivo está vazio.');
  if (file.size > MAX_UPLOAD_BYTES) throw new UploadError('O arquivo deve ter no máximo 10 MB.');

  const bytes = Buffer.from(await file.arrayBuffer());
  const signature = SIGNATURES.find((s) => s.matches(bytes));
  if (!signature) throw new UploadError('Envie apenas PDF ou imagem (PNG, JPG, GIF ou WEBP).');

  const storedFileName = `${randomUUID()}${signature.ext}`;
  await mkdir(uploadDir(), { recursive: true });
  await writeFile(resolveStoredPath(storedFileName), bytes);

  return { storedFileName, mime: signature.mime, size: bytes.length };
}

export async function readUpload(storedFileName: string) {
  return readFile(resolveStoredPath(storedFileName));
}

export async function deleteUpload(storedFileName: string) {
  await rm(resolveStoredPath(storedFileName), { force: true });
}

export function safeDownloadName(fileName: string) {
  const cleaned = fileName.replace(/[^\p{L}\p{N}._ -]/gu, '_').trim();
  return cleaned || 'arquivo';
}

function uploadDir() {
  return path.resolve(process.env.UPLOAD_DIR ?? './uploads');
}

function resolveStoredPath(storedFileName: string) {
  if (!STORED_NAME_PATTERN.test(storedFileName)) throw new UploadError('Arquivo inválido.');
  return path.join(uploadDir(), storedFileName);
}
