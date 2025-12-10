import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import Transport from 'winston-transport';

// Define log context type
type LogContext = Record<string, unknown>;

const logTransports: Transport[] = [
  new transports.Console({
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message} ${info.context ? JSON.stringify(info.context) : ''}`)
    )
  })
];

const _logger: WinstonLogger = createLogger({
  level: 'info', // Default logging level
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: logTransports
});

// Helper functions for logging
export const logError = async (error: Error, context?: LogContext) => {
  _logger.error(error.message, { stack: error.stack, ...context });
};

export const logInfo = async (message: string, context?: LogContext) => {
  _logger.info(message, context);
};

export const logWarning = async (message: string, context?: LogContext) => {
  _logger.warn(message, context);
};

export const logDebug = async (message: string, context?: LogContext) => {
  _logger.debug(message, context);
};

export const logHttp = async (message: string, context?: LogContext) => {
  _logger.http(message, context);
};