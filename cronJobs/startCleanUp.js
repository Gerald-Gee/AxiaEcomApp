// cronJobs/startCleanUp.js
import User from '../schemas/userSchema.js';
import { scheduleCron } from '../utils/cron.js';
import { sendMail } from '../utils/sendEmail.js';

/**
 * Deletes unverified users after a set period
 */
export const startCleanUp = () => {
  scheduleCron('* * * * *', async () => {
    console.log('Running cleanup: removing unverified users...');
    const lastSixHours = new Date(Date.now() - 6 * 60 * 60 * 1000);

    try {
      const result = await User.deleteMany({
        isVerified: false,
        createdAt: { $lt: lastSixHours }
      });
      console.log(`Deleted ${result.deletedCount} unverified users`);
    } catch (error) {
      console.error('Cleanup failed:', error);
    }
  });
};

/**
 * Sends reminder emails to unverified users
 */
export const sendMailReminder = () => {
  scheduleCron('0 0 * * *', async () => {
    console.log('Running reminder email job...');
    try {
      const unverifiedUsers = await User.find({
        isVerified: false,
        createdAt: { $lt: new Date(Date.now() - 6 * 60 * 60 * 1000) }
      });

      console.log(`Found ${unverifiedUsers.length} unverified users`);

      for (const user of unverifiedUsers) {
        const mailObj = {
          mailFrom: `Ecommm <${process.env.EMAIL_USER}>`,
          mailTo: user.email,
          subject: 'Verify your account',
          body: `
            <h1>Welcome to Ecommm, <strong>${user.username}</strong></h1>
            <p>Please verify your account by clicking the link below:</p>
            <a href="http://localhost:3000/api/otp/verify?otp=${user.otp}">Verify</a>
          `
        };
        await sendMail(mailObj);
      }
    } catch (error) {
      console.error('Reminder emails failed:', error);
    }
  });
};
