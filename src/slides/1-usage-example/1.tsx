import CodeBlock from "~src/lib/components/CodeBlock";
import Stack from "~src/lib/components/Stack";
import Text from "~src/lib/components/Text";
import { ZodError, z } from "zod";

export default function Slide() {
  const eventSchema = z.object({
    name: z.string(),
    starts_at: z.date().min(new Date("01-01-2023")),
    ends_at: z.date(),
    address: z.string(),
    type: z.enum(["open", "closed"]),
    ticket_url: z
      .string()
      .url()
      .startsWith("https://", {
        message: "Provided url must be secure!  (╯°□°）╯︵ ┻━┻",
      })
      .optional(),
  });

  let err = "No Error!";

  try {
    eventSchema.parse({
      name: "OUR awesome event",
      starts_at: new Date(),
      ends_at: new Date(),
      address: "123 Main St",
      type: "open",
      ticket_url: "http://app.wearetriple.com/",
    });
  } catch (e) {
    err = (e as ZodError).issues.map((i) => i.message).join("\n");
  }

  return (
    <Stack fill vertical>
      <Text variant="title">How do I validate?</Text>
      <Stack fill centered>
        <CodeBlock
          language="ts"
          code={`
import { z } from "zod";

const eventSchema = z.object({
  name: z.string(),
  starts_at: z.date(),
  ends_at: z.date(),
  address: z.string(),
  type: z.enum(["open", "closed"]),
  ticket_url: z
    .string()
    .url()
    .startsWith("https://", {
      message: "Provided url must be secure!  (╯°□°）╯︵ ┻━┻",
    })
    .optional(),
});
      `}
        />
        <Stack vertical fill centered>
          <CodeBlock
            language="ts"
            code={`
const event = eventSchema.parse({
  name: "OUR awesome event",
  starts_at: new Date(),
  ends_at: new Date(),
  address: "123 Main St",
  type: "open",
  ticket_url: "http://app.wearetriple.com/",
});
      `}
          />
          <Stack fill bg centered>
            {err}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
