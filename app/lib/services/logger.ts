// Simple console-based logger for serverless environments
type LogContext = Record<string, unknown>;

export const logError = (error: Error, context?: LogContext) => {
  console.error('[ERROR]', error.message, { stack: error.stack, ...context });
};

export const logInfo = (message: string, context?: LogContext) => {
  console.log('[INFO]', message, context || '');
};

export const logWarning = (message: string, context?: LogContext) => {
  console.warn('[WARN]', message, context || '');
};

export const logDebug = (message: string, context?: LogContext) => {
  console.debug('[DEBUG]', message, context || '');
};

export const logHttp = (message: string, context?: LogContext) => {
  console.log('[HTTP]', message, context || '');
};