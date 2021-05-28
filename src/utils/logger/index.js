const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, prettyPrint } = format;
//const application = require('config').get('name');
//const loggerLevel = require('config').get('logger.level');

const custFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "debug",
  defaultMeta: { service: "application" },
  format: combine(
    format.colorize(),
    label({ label: "application" }),
    timestamp(),
    custFormat,
  ),
  transports: [new transports.Console()]
});

module.exports = logger;
