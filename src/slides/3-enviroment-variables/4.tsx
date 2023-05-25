import Stack from "$components/Stack";
import Text from "$components/Text";
import CodeBlock from "~src/lib/components/CodeBlock";
import img from "./image2.jpg";

export default function Slide() {
  return (
    <Stack fill vertical>
      <Text variant="title">Import or not to import</Text>
      <Stack fill centered vertical>
        <CodeBlock
          language="ts"
          code={`
          // next.config.mjs
          
import { env } from './src/env/server.mjs';
          `}
        />
        <img src={img} alt="" style={{ width: 700 }} loading="eager" />
      </Stack>
    </Stack>
  );
}
