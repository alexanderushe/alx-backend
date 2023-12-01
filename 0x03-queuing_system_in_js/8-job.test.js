import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job'; // Update the path based on your file structure

describe('createPushNotificationsJobs', () => {
  let queue;

  before(() => {
    // Set up the queue and enter test mode
    queue = kue.createQueue({ redis: { port: 6379, host: '127.0.0.1' } }); // Update with your Redis configuration
    queue.testMode.enter();
  });

  after(() => {
    // Clear the queue and exit test mode
    queue.testMode.exit();
  });

  it('displays an error message if jobs is not an array', () => {
    // Use chai assertions to check if the error is thrown
    expect(() => createPushNotificationsJobs('invalid', queue)).to.throw('Jobs is not an array');
  });

  it('creates jobs and logs correct messages', (done) => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 5678 to verify your account' },
    ];

    // Call the function
    createPushNotificationsJobs(jobs, queue);

    // Check the queue for the expected jobs
    queue.testMode.jobs.length.should.equal(2);

    // Process the jobs (simulate the job processing)
    queue.testMode.jobs.forEach((job) => {
      queue.process('push_notification_code_3', (job, done) => {
        // Simulate job completion
        done();
      });
    });

    // Wait for processing to complete
    setTimeout(() => {
      // Check if the jobs were completed
      queue.testMode.jobs.forEach((job) => {
        job.state.should.equal('complete');
      });

      done();
    }, 100);
  });
});
