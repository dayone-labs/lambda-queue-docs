# NextJS Integration Example

Easiest way to use LambdaQueue in your NextJS application is to use our `serverless` SDK.
It's with any hosting provider, but has some options auto-detection for Vercel and Netlify.

Start by installing the package:

```bash
npm add @dayone-labs/lambda-queue-serverless
```

> [!INFO]
> We take care to make our client libraries as slim as possible.
> Don't be afraid of dependency hell when installing our SDKs.
> We have exactly 0 dependencies.

Below you can find a minimal code example on how to push and handle queue items
using NextJS app router.

## Code example

Here's a small sample application that pushes arbitrary data to queue using NextJS SDK.

::: code-group
<<< @/code/next/src/route.ts
<<< @/code/next/src/page.tsx
<<< @/code/next/src/actions.ts
:::