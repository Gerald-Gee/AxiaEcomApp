// utils/cron.js
import cron from 'node-cron';

/**
 * Schedule a cron job
 * @param {string} schedule - The cron schedule pattern (e.g. "* * * * *")
 * @param {Function} task - The function to run on schedule
 * @param {Object} options - Cron job options (default: scheduled + UTC timezone)
 */
export const scheduleCron = (
  schedule,
  task,
  options = { scheduled: true, timezone: 'UTC' }
) => {
  cron.schedule(schedule, task, options);
};
