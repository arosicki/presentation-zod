import CodeBlock from "~src/lib/components/CodeBlock";
import Stack from "~src/lib/components/Stack";
import Text from "~src/lib/components/Text";

export default function Slide() {
  return (
    <Stack fill vertical>
      <Text variant="mega-title">What do I validate?</Text>
      <Stack fill centered>
        <CodeBlock
          language="bash"
          code={`
npm i @hookform/resolvers react-hook-form
      `}
        />
      </Stack>
    </Stack>
  );
}
