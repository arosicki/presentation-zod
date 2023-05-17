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
// client.mjs

import { 
  clientEnv,
  clientSchema,
  clientEnvMapping,
} from './schema.mjs';

export const formatErrors = (
  errors,
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value)
        return \`\${name}: \${value._errors.join(", ")}\n\`;
    })
    .filter(Boolean);
      `}
        />
        <CodeBlock
          language="ts"
          code={`
const _clientEnv = clientSchema.safeParse(clientEnv);
  
if (!_clientEnv.success) {
  console.error(
    'Invalid environment variables:',
    ...formatErrors(_clientEnv.error.format()),
  );
  throw new Error('Invalid environment variables');
}

export const env = _clientEnv.data;

        `}
        />
      </Stack>
    </Stack>
  );
}
