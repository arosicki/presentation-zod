import CodeBlock from "~src/lib/components/CodeBlock";
import Stack from "~src/lib/components/Stack";
import Text from "~src/lib/components/Text";
import { ZodError, z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import $ from "./index.module.css";
import { useEffect, useRef } from "react";
import { type } from "~src/lib/utils/type";
import { wait } from "~src/lib/utils/wait";

export default function Slide() {
  const schema = z.object({
    email: z
      .string()
      .email()
      .endsWith("wearetriple.com", "Email must have Triple domain name!"),
    company: z
      .string()
      .includes("Triple", { message: "Company must be Triple!" }),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  watch();

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!formRef.current) return;

      setValue("email", "");
      setValue("company", "");
      await type(setValue, "email", "bob@wearetriple.com");
      await type(setValue, "company", "Triple");
      await wait(1000);
      formRef.current.requestSubmit();
      console.log(errors);
      await wait(3000);
      setValue("email", "");
      setValue("company", "");
      await type(setValue, "email", "bob@oke.pl");
      await type(setValue, "company", "OKE Poland");
      await wait(1000);
      formRef.current.requestSubmit();

      console.log(errors);
    }, 12000);
    return () => {
      clearInterval(interval);
    };
  }, [formRef]);

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
} = useForm({
  resolver: zodResolver(schema),
});
      `}
        />
        <Stack fill vertical style={{ minWidth: "50rem" }}>
          <Stack fill bg centered vertical>
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
            <form
              ref={formRef}
              className={$.form}
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className={$.label} htmlFor="email">
                email
              </label>
              <input
                disabled
                className={$.input}
                type="email"
                {...register("email")}
              />
              <label className={$.label} htmlFor="company">
                company
              </label>
              <input
                disabled
                type="text"
                className={$.input}
                {...register("company")}
              />
            </form>
          </Stack>
          <Stack fill bg centered vertical>
            {isSubmitted &&
              (!errors.email && !errors.company ? (
                <p>You are from Triple!</p>
              ) : (
                <>
                  <p>{errors.email?.message ?? ""}</p>
                  <p>{errors.company?.message ?? ""}</p>
                </>
              ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
