import CodeBlock from "~src/lib/components/CodeBlock";
import Stack from "~src/lib/components/Stack";
import Text from "~src/lib/components/Text";
import image from "./image.png";

export default function Slide() {
  return (
    <Stack fill vertical>
      <Text variant="mega-title">First things first</Text>
      <Stack fill vertical centered>
        <CodeBlock
          language="ts"
          code={`
          npm i zod
          `}
        />
        <img style={{ width: 700 }} loading="eager" src={image} alt="" />
      </Stack>
    </Stack>
  );
}
