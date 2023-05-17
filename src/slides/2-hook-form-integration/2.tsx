import CodeBlock from "~src/lib/components/CodeBlock";
import type { SubmitHandler } from "react-hook-form";
import Stack from "~src/lib/components/Stack";
import Text from "~src/lib/components/Text";

export default function Slide() {
  return (
    <Stack fill vertical>
      <Text variant="title">What do I validate?</Text>
      <Stack fill centered>
        <CodeBlock
          language="ts"
          code={`
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    email: z.string().email()
      .endsWith("@wearetriple.com",
       "Email must have Triple domain!"),
    company: z.string()
      .includes("Triple",
       { message: "Company must be Triple!" }),
  });

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormValues>({
  resolver: zodResolver(schema),
});
      `}
        />
        <CodeBlock
          language="ts"
          code={`
import type { SubmitHandler } from "react-hook-form";

type FormValues = z.infer<typeof schema>;

type FormValues = {
    email: string;
    company: string;
}

const onSubmit: SubmitHandler<FormValues> = 
    (data) => console.log(data);
            `}
        />
      </Stack>
    </Stack>
  );
}
