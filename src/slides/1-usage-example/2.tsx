import CodeBlock from "~src/lib/components/CodeBlock";
import Stack from "~src/lib/components/Stack";
import Text from "~src/lib/components/Text";
import { ZodError, z } from "zod";

export default function Slide() {
  const personSchema = z.object({
    name: z.string({ invalid_type_error: "Name should be a string!" }),
    surname: z.string({ required_error: "Surname is required!" }),
    description: z
      .string()
      .min(3, "Description should have at least 3 characters!")
      .emoji(
        "You can only use emojis to describe yourself! ┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻"
      ),
  });

  let errs: string[] = [];

  try {
    personSchema.parse({
      name: 9e8,
      description: "Me",
    });
  } catch (e) {
    errs = (e as ZodError).issues.map((i) => i.message);
  }

  return (
    <Stack fill vertical>
      <Text variant="title">How do I validate?</Text>
      <Stack fill vertical centered>
        <CodeBlock
          language="ts"
          code={`
import { z } from "zod";

const personSchema = z.object({
  name: z.string({ invalid_type_error: "Name should be a string!" }),
  surname: z.string({ required_error: "Surname is required!" }),
  description: z
    .string()
    .min(3, "Description should have at least 3 characters!")
    .emoji(
      "You can only use emojis to describe yourself! ┻━┻ ︵ヽ(\`Д´)ﾉ︵ ┻━┻"
    ),
});
      `}
        />
        <Stack fill>
          <CodeBlock
            language="ts"
            code={`
const personSchema = Person.parse({
  name: 9E8,
  description: "Me",
});
      `}
          />
          <Stack style={{ minWidth: "70rem" }} fill bg centered vertical>
            {errs.map((err) => (
              <p>{err}</p>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
