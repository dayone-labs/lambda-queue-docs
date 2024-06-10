# Webhooks Example

This example shows how to handle external service webhooks in our application. In most of the cases
external services expect your webhook handling code to be fast and failsafe. What you're expected
to do is to enqueue handling of the webhook somewhere in your database/queueing system
and handle asynchronously. With LambdaQueue you can just forward webhook payload to one of our
queues and handle it later.

## Architectural overview

We will forward each webhook event type to separate queue. The only reason to return error to
webhook caller would be if LambdaQueue refused to queue item. All application level errors will be handled
in LambdaQueue processing code.

## Code example

::: code-group
<<< @/code/express/src/webhooks.ts [Express.js]
:::

## Remarks

> [!INFO]
> 👋 Webhooks can sometimes overwhelm applications or get lost when app has a downtime.
> We are working on creating an **external webhook handling API**. You then would only need to handle
> items from LambdaQueue in asynchronous way. Get in touch with us to let us know
> if you would like to test it out.
