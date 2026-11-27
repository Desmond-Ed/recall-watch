import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  DATABASE_URL: z.string().min(1).optional(),
  TEST_DATABASE_URL: z.string().min(1).optional(),
  OPENFDA_API_KEY: z.string().min(1).optional(),
});

export type Config = z.infer<typeof envSchema>;

function withoutBlanks(source: Record<string, string | undefined>): Record<string, string> {
  const cleaned: Record<string, string> = {};
  for (const [key, value] of Object.entries(source)) {
    if (value !== undefined && value.trim() !== '') {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

export function loadConfig(source: Record<string, string | undefined> = process.env): Config {
  const result = envSchema.safeParse(withoutBlanks(source));
  if (!result.success) {
    const problems = result.error.issues.map(
      (issue) => `- ${issue.path.map(String).join('.') || '(root)'}: ${issue.message}`,
    );
    throw new Error(`Invalid environment configuration:\n${problems.join('\n')}`);
  }
  return result.data;
}
