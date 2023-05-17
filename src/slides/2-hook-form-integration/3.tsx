import CodeBlock from "~src/lib/components/CodeBlock";
import Stack from "~src/lib/components/Stack";
import Text from "~src/lib/components/Text";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import $ from "./index.module.css";
import { useEffect, useRef } from "react";
import { type } from "~src/lib/utils/type";
import { wait } from "~src/lib/utils/wait";

export default function Slide() {
  const schema = z
    .object({
      password: z.string().min(8).max(32),
      confirmPassword: z.string().min(8).max(32),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match!",
      path: ["confirmPassword"],
    });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  watch();

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!formRef.current) return;

      setValue("password", "");
      setValue("confirmPassword", "");
      await type(setValue, "password", "zaq1@WSX");
      await type(setValue, "confirmPassword", "zaq12wsx");
      await wait(1000);
      formRef.current.requestSubmit();
      console.log(errors);
      await wait(3000);
      setValue("password", "");
      setValue("confirmPassword", "");
      await type(setValue, "password", "xsw2!QAZ");
      await type(setValue, "confirmPassword", "xsw2!QAZ");
      await wait(1000);
      formRef.current.requestSubmit();

      console.log(errors);
    }, 10000);
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
const schema = z
.object({
    password: z.string().min(8).max(32),
    confirmPassword: z.string().min(8).max(32),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
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
        <Stack fill vertical style={{ minWidth: "50rem" }}>
          <Stack fill bg centered vertical>
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
            <form
              ref={formRef}
              className={$.form}
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className={$.label} htmlFor="password">
                password
              </label>
              <input
                disabled
                className={$.input}
                type="text"
                {...register("password")}
              />
              <label className={$.label} htmlFor="confirmPassword">
                confirm password
              </label>
              <input
                disabled
                type="text"
                className={$.input}
                {...register("confirmPassword")}
              />
            </form>
          </Stack>
          <Stack fill bg centered vertical>
            {isSubmitted &&
              (!errors.confirmPassword ? (
                <p>Passwords match!</p>
              ) : (
                <p>{errors.confirmPassword?.message ?? ""}</p>
              ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
