import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import 'winston-daily-rotate-file'; // Required for DailyRotateFile transport
import Transport from 'winston-transport'; // Import base Transport type

// Define log context type
type LogContext = Record<string, unknown>;

// Determine if running in Node.js runtime AND not in production (for file logging)
// File logging doesn't work on Vercel's serverless environment due to ephemeral filesystem
const isNodeJsRuntime = process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV !== 'production';

const logTransports: Transport[] = [
  new transports.Console({
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message} ${info.context ? JSON.stringify(info.context) : ''}`)
    )
  })
];

// Add file transport only if in Node.js runtime and not in production
if (isNodeJsRuntime) {
  try {
    logTransports.push(
      new transports.DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: format.combine(
          format.timestamp(),
          format.json()
        )
      })
    );
  } catch (err) {
    console.error('Failed to initialize winston-daily-rotate-file:', err);
  }
}

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