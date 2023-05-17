import { UseFormSetValue } from "react-hook-form";

export const type = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>,
  inputId: string,
  text: string,
  interval = 70
) =>
  new Promise<void>((resolve) => {
    setValue(inputId, "");
    let idx = 0;
    const intervalId = setInterval(() => {
      if (idx == text.length) {
        clearInterval(intervalId);
        return resolve();
      }
      setValue(inputId, text.slice(0, idx + 1));
      idx++;
    }, interval);
  });
