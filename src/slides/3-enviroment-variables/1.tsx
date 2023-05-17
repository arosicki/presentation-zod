import Stack from "$components/Stack";
import Text from "$components/Text";
import CodeBlock from "~src/lib/components/CodeBlock";

export default function Slide() {
  return (
    <Stack fill vertical>
      <Text variant="title">Environment Variables are hard...</Text>
      <Stack fill centered>
        <CodeBlock
          language="ts"
          code={`
// schema.mjs

export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),
  WEB_PUSH_PRIVATE_KEY: z.string(),
});

export const clientSchema = z.object({
  NEXT_PUBLIC_EXTERNAL_API_URL: z.string().url(),
  NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY: z.string(),
  NEXT_PUBLIC_MAP_URL: z.string().url(),
});

export const clientEnvMapping = {
  NEXT_PUBLIC_EXTERNAL_API_URL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  NEXT_PUBLIC_MAP_URL: process.env.NEXT_PUBLIC_MAP_URL,
};
      `}
        />
      </Stack>
    </Stack>
  );
}
