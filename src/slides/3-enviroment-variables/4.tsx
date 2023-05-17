import Stack from "$components/Stack";
import Text from "$components/Text";
import CodeBlock from "~src/lib/components/CodeBlock";

export default function Slide() {
  return (
    <Stack fill vertical>
      <Text variant="title">Import or not to import</Text>
      <Stack fill centered>
        <CodeBlock
          language="ts"
          code={`
// next.config.mjs

import { env as _c } from './src/env/client.mjs';
import { env as _s } from './src/env/server.mjs';
      `}
        />
      </Stack>
    </Stack>
  );
}
