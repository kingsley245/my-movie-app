// logger.js
const winston = require('winston');
const path = require('path');

const logPath = path.join(__dirname, 'logs', 'app.log');

// Ensure the logs folder exists
require('fs').mkdirSync(path.dirname(logPath), { recursive: true });

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
    )
  ),
  transports: [new winston.transports.File({ filename: logPath })]
});

module.exports = logger;
