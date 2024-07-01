# Express/Connect Integration Example

Easiest way to use LambdaQueue in your Express (or any other connect type middleware) application is to use our `connect` SDK.

Start by installing the package:

```bash
npm add @dayone-labs/lambda-queue-connect
```

> [!INFO]
> We take care to make our client libraries as slim as possible.
> Don't be afraid of dependency hell when installing our SDKs.
> We have exactly 0 dependencies.

Below you can find a minimal code example on how to push and handle queue items
using Express.js app router.

## Code example

Here's a small sample application that pushes arbitrary data to queue using Connect SDK.

<<< @/code/express/src/basic.ts
