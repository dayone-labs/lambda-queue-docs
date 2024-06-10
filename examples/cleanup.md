# Periodic Cleanup Example

This is a simple example that periodically calls your application
to do a cleanup of old data, or temp storage. It's a very common
use case for cron jobs.

## Architectural overview

In this example we schedule a simple job to delete temporary data older than one day.
It will execute each day somewhere at night when we have lowest traffic.

This task is not critical and can take a while, so we won't wait for it to finish and immediately
return that it has succeeded. If it fails we'll re-run it the next day anyway.

To make sure that one of these succeed we add another job that will check, if we have
data older than 1 week in the database and fail if it ever returns true.

## Code example

::: code-group
<<< @/code/express/src/cleanup.ts [Express.js]
:::

## Remarks

::: tip

Keep in mind, that LambdaQueue request might timeout. If your cleanup jobs take more than few seconds and
you await on the request till the end it might mark the job as failed and retry.

Right now there's no easy way to get long running jobs in LambdaQueue. We're still working on it
and plan on adding means to handle these (ACK/NACK for long running jobs on your backend or scriptlets
to handle all logic on LambdaQueue servers). Check out our [Roadmap](https://dayone-labs.notion.site/LambdaQueue-Roadmap-23da2d4416e84d008bdc4c31cbc1b9ec)
to track progress on these.

:::
