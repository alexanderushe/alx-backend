import kue from 'kue';


const jobs = [
    {
      phoneNumber: '4153518780',
      message: 'This is the code 1234 to verify your account'
    },
    {
      phoneNumber: '4153518781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153518743',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153538781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153118782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4159518782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4158718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153818782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4154318781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4151218782',
      message: 'This is the code 4321 to verify your account'
    }
  ];

const queue = kue.createQueue();

jobs.forEach((jobData) => {
  const notification = queue.create('push_notification_code_2', jobData);

  notification.on('enqueue', () => {
    console.log(`Notification job created: ${notification.id}`);
  }).on('complete', () => {
    console.log(`Notification job ${notification.id} completed`);
      // Remove the job from the queue after completion
    notification.remove(() => {
        console.log(`Removed completed job ${notification.id}`)
    });
  }).on('failed', (errorMessage) => {
    console.log(`Notification job ${notification.id} failed: ${errorMessage}`);
  }).on('progress', (progress, data) => {
    console.log(`Notification job ${notification.id} ${progress}% complete`);
  })

  notification.save();
});
