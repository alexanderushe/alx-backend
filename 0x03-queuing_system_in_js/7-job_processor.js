import kue from 'kue';

// Array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

const sendNotification = (phoneNumber, message, job, done) => {
  job.progress(0, 100);

  if (blacklistedNumbers.includes(phoneNumber)) {
    const errorMessage = `Phone number ${phoneNumber} is already blacklisted`;
    done(new Error(errorMessage));
  } else {
    job.progress(50, 100);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

    setTimeout(() => {
        done();
    }, 2000); //simulates 2 second job
  }
};

// Create a Kue queue for push_notification_code_2
const queue = kue.createQueue();

// Set concurrency to 2 to process two jobs at a time
queue.process('push_notification_code_2', 2, (job, done) => {
  // Extract data from the job
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function
  sendNotification(phoneNumber, message, job, done);
});
