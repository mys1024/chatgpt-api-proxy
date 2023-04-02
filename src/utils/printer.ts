import { colors } from "../deps.ts";

const timeString = (date: Date = new Date()) => {
  return date.toISOString();
};

export const info = (message: string) => {
  console.info(
    colors.gray(timeString()),
    colors.white(colors.bgBlue(" INFO ")),
    message,
  );
};

export const warn = (message: string) => {
  console.warn(
    colors.gray(timeString()),
    colors.black(colors.bgYellow(" WARN ")),
    message,
  );
};

export const error = (message: string) => {
  console.error(
    colors.gray(timeString()),
    colors.white(colors.bgRed(" ERR  ")),
    message,
  );
};

export const log = (message: string) => {
  console.log(
    colors.gray(timeString()),
    colors.black(colors.bgWhite(" LOG  ")),
    message,
  );
};

const printer = {
  info,
  warn,
  error,
  log,
};

export default printer;
