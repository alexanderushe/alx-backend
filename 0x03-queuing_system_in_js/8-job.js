import kue from 'kue';

const queue = kue.createQueue();

const createPushNotificationsJobs = (jobs, queue) => {
    //check if jobs is an array
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs is not an array');
    }

    //create a job for each object in jobs array
    jobs.forEach((jobData) => {
        const notification = queue.create('push_notification_code_3', jobData);

        notification
        .on('enqueue', () => {
            console.log(`Notification job created: ${notification.id}`);
        })
        .on('complete', () => {
            console.log(`Notification job ${notification.id} completed`);
            //remove the job from the queueu after completion
            notification.remove(() => {
                console.log(`Removed completed job ${notification.id}`);
            });
        })
        .on('failed', (err) => {
            console.log(`Notification job ${notification.id} failed: ${err}`);
        })
        .on('progress', (progress) => {
            console.log(`Notification job ${notification.id} ${progress}% completed`);
        });
        notification.save();
    });
}

module.exports = createPushNotificationsJobs;