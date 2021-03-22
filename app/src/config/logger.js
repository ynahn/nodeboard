const { message } = require("statuses");
const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf, label, simple, colorize } = format;

const pringFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
  file: combine(
    label({
      label: "백엔드 맛보기",
    }),
    //   colorize(),
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd",
    }),
    pringFormat
  ),
  console: combine(colorize(), simple()),
};

const opts = {
  file: new transports.File({
    filename: "access.log",
    dirname: "./logs",
    level: "info",
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: "info",
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

//개발용과 배포용 다루는 방법
if (process.env.NODE_ENV !== "production") {
  logger.add(opts.console);
}

logger.stream = {
  write: (message) => logger.info(message),
};
module.exports = logger;
