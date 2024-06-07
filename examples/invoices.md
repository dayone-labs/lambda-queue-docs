# Monthly Invoices Example

In this example we will create a schedule for each customer, to push an invoice generation job
to queue at midnight each 1st day of month. We'll also add a queue processor to call our
application payment service to generate and send out invoice to client.

## Architectural overview

We create an **individual schedule for each client**, so if for whatever reason we fail to
process queue item (infrastructure issues, bugs in code, etc...) it would not
prevent other invoices from being sent. Each schedule will just push one item per month to
our queue and it will handle the rest.

We will create our schedules to execute **in timezone of our client**,
so clients get it on his start of the day. Not when a new month starts on our server.

Each time a new client subscribes to our app, we can now just call `scheduleInvoice` and when client
resigns or changes to free plan we just `deleteInvoiceSchedule` and invoices are no longer sent.

Thanks to having a separate schedule for each client, we can also easily investigate problems, select
different invoicing periods per client, pause and resume individual clients, etc.

## Code example

::: code-group
<<< @/code/express/src/invoices.ts [Express.js]
:::

## Remarks

> [!IMPORTANT]
> Don't worry about malicious clients calling your `/generate-invoice` endpoint.
> LambdaQueue **signs each request** with your personal secret key and validates each call if you're
> using our client libraries. Check out your language [SDK](/sdk) documentation for more information.
>
> 🔴 If you're **not using our SDKs** though, make sure you check `x-lq-signature` header and validate
> signature.

> [!TIP]
> When scheduling periodic jobs it sometimes makes sense to execute them in client
> specific timezone. If no timezone was selected, we'll execute your schedules
> in UTC.
