# LambdaQueue Overview

In this section we dive into how LambdaQueue works, how we ensure
that our requests are secure and really from our servers.

## How It Works

LambdaQueue is a serverless queue and schedule manager. It's making sure
your code is executed on selected time and that it's retried multiple times
before giving up. Thus relieving you from baking retries or scheduling
into your own service. There are 2 very important things to notice
when working with LambdaQueue:

* **Code is still executed on your servers (serverless platform)**
* **LambdaQueue has to be able to reach your application from outside**

> [!INFO]
> This is true for basic HTTP jobs and schedules. When we'll have **Scriptlets** ready.
> Yo'll be also able to execute long running jobs on our infrastructure.
> This will relieve you from **timeouts** and price spikes from your serverless providers.

### What is a Job Handler

When you use our SDK and create a job handler what you really do, is you create
a HTTP endpoint wrapped with our tooling to ensure security and handle
mundane serialization/deserialization/API tasks. **You have to expose this endpoint**
to the public, so our servers can call it. Our SDK makes sure this endpoint **is secured**,
so only your jobs can call it.

### Flow of LambdaQueue Job

1. You create a job handler (this only exposes an endpoint).
2. You push job using `queue.push` call.
3. Our servers store provided data and configuration.
4. Our job scheduler decides if job should be executed now or postponed.
5. When job is ready it will be pushed to our workers.
6. Workers execute the job (calling your handler) over HTTP.
    * If call fails, it will be rescheduled for retry.
    * If retry count was exceeded job will be stored history as failure.
    * If job succeeded it will be stored in history as success.
7. Result of the call is stored in history.

### Schedules

Schedules are always connected with a queue, that will be executing scheduled jobs.
A schedule will make sure that on given date a new job is pushed to configured queue.
It will be created with options and payload passed to the schedule. **You can have
as many schedules as you want** pushing to the same queue.

One thing to keep in mind is that if you update schedule, it will only
affect future jobs. Jobs already pushed to queue will not be altered.

### Unique key

Jobs and Schedules in LambdaQueue can have an optional `key` property
provided when you create them. From your application perspective it's
almost the same as their `identity`. You can use it to update or delete
the item. We make sure that `key` is kept unique across queue or all your
schedules, and update items instead of creating duplicates if you push
two with same `key`.

You can use this property to model few interesting use cases:

* Manipulate queue items without storing any new data in your database.
  * Cancel queued items by queue name and your domain specific IDs.
  * Reschedule delayed items without storing their IDs.
  * Update schedules based on your database identifiers.
* Don't need to check if schedule exists, it won't be recreated
  * Just try to recreate it on each application start (great for serverless)
  * Push any required items on application start and nothing will be changed

Just keep in mind, that after item with given `key` is processed, you can push
a new one with the same `key`. **Only unprocessed items are checked for duplicates**.

## Security

We take care to make sure your queue APIs and account is secure. Especially:

* You're only allowed to use `HTTPS` endpoint in queues, so your security keys don't leak due to insecure transport.
* All your API calls have to be authenticated with one of the tokens generated in admin panel.
* Before your endpoint is used as queue handler, we do a validation call with http `HEAD` request and validate
if response is signed with your secret. Only then we allow items to be executed.
* Validation results are cached, so give it few minutes after you update your secret. Successful validation
is cached for longer, so you might not see validation calls for some time, but we'll re-check it from time to time.
* Every call from LambdaQueue to your service is signed using your secret. Signature includes body checksum and timestamp
so you are sure that it was not modified by any third party in traffic.
* Our SDKs take care of all that, so you just need to provide actual queue handler. All signature handling is handled by the SDK.