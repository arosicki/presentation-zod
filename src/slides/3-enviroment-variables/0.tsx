import Stack from "$components/Stack";
import Text from "$components/Text";
import image from "./image.jpg";

export default function Slide() {
  return (
    <Stack fill vertical>
      <Text variant="title">Environment Variables are hard...</Text>
      <Stack centered fill>
        <img src={image} alt="" style={{ width: 920 }} loading="eager" />
      </Stack>
    </Stack>
  );
}
