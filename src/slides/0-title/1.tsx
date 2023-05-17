import CodeBlock from "~src/lib/components/CodeBlock";
import Stack from "~src/lib/components/Stack";
import Text from "~src/lib/components/Text";

export default function Slide() {
  return (
    <Stack fill vertical>
      <Text variant="mega-title">First things first</Text>
      <Stack fill centered>
        <CodeBlock
          language="ts"
          code={`
      npm i zod
      `}
        />
      </Stack>
    </Stack>
  );
}
