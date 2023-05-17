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
// server.mjs

import { formatErrors } from './client.mjs';
import { clientEnv, serverSchema } from './schema.mjs';
          
const _serverEnv = serverSchema.safeParse(process.env);

if (!_serverEnv.success) {
console.error(
    'Invalid environment variables:\n',
    ...formatErrors(_serverEnv.error.format()),
);
throw new Error('Invalid environment variables');
}

export const env = { ..._serverEnv.data, ...clientEnv };
      `}
        />
        <Stack fill centered bg style={{ minWidth: "50%" }}>
          Invalid environment variables:
          <br /> DATABASE_URL: Required
          <br />
          WEB_PUSH_PRIVATE_KEY: Required
        </Stack>
      </Stack>
    </Stack>
  );
}
