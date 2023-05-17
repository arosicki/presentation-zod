import Stack from "~src/lib/components/Stack";
import Text from "~src/lib/components/Text";

export default function Slide() {
  return (
    <Stack fill vertical centered>
      <Text variant="mega-title">JavaScript</Text>
      <Text variant="mega-title">Schema Validation</Text>
      <Text variant="mega-title">and how to use it?</Text>
    </Stack>
  );
}
