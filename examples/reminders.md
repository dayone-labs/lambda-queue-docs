# Reminders Example

Code below is showing how to schedule 2 reminders that should be sent to user
before some event in our app occurs. We'll also show how to remove or update
these when user updates event. All this without storing any LambdaQueue related data in your app.

## Architectural overview

We will use **2 separate queues** and a **common key**, so we can further delay, remove or update notifications without need to persist
any queue item IDs in our application. This way we we'll limit codebase changes to minimum.

Pushing event with **same key into a queue will overwrite current** items. We can take advantage of that
to update items whenever something changes.

When notifications are no longer needed, we can just delete them by app specific key (event.id in this case)

## Code example

::: code-group
<<< @/code/express/src/reminders.ts [Express.js]
:::

## Remarks

> [!TIP]
> 🤔 A nice pattern can be to have an application global event bus that will notify whenever an event update happened.
> You could then just listen on these and modify queues as needed, without touching business logic.
