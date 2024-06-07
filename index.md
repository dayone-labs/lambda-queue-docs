---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "LambdaQueue"
  text: "Documentation"
  tagline: "Schedules and queues without infrastructure"
  actions:
    - theme: brand
      text: Quick Start 
      link: /quickstart
    - theme: alt
      text: Client SDKs
      link: /sdk
    - theme: alt
      text: Examples
      link: /examples
    - theme: alt
      text: API & Documentation
      link: /doc

features:
  - title: Send reminders
    details: Notify user about upcoming event in your app a week, day or minutes before.
    linkText: Show code
    link: /examples/reminders
    size: 33%
  - title: Implement delayed delete
    details: Quickly implement a delete function with un-delete option using delayed queue.
    linkText: Show code
    link: /examples/delete
  - title: Send monthly invoices 
    details: Schedule a task executed monthly to make sure you send out invoices to clients
    linkText: Show code
    link: /examples/invoices
  - title: Execute periodic cleanups
    details: Setup CRON jobs to call your API in predefined intervals
    linkText: Show code
    link: /examples
---

## Introduction

LambdaQueue is a serverless platform to handle all your asynchronous jobs and schedules.
With our SDKs you should be up and running in minutes, without any databases and backend services.
On serverless, or on your self hosted backend.

Here is a quick sample of how your code might look like when using our SDKs.

::: code-group
<<< @/code/express/src/basic.ts [Express.js]
:::

Make sure to check out **[examples](/examples)** section for more real life examples and use-cases.

## How to navigate the docs

Our documentation is split in few sections to help you navigate around. If you're just starting
up you should probably visit it all in following order:

- [Quick Start](/quickstart) - setup your language SDK and required ENV variables.
- [Examples](/examples) - check out common use-cases and how you might implement them.
- [API & Docs](/docs) - details about available options and APIs.

You might also want to check out [Security](/docs/security) section to get a grasp on
how LambdaQueue ensures that only you can access your endpoints and data.
How to encrypt your messages, so anyone else can't access them (not even our tech support).
And how to decrypt them in our [Admin UI](https://app.lambdaqueue.com) on demand, when you're debugging your application.

You might also be interested in our [Sandbox](/docs/sandbox) server, that you can use
for development or to play with our SDKs.
