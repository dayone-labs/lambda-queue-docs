# Delayed Delete Example

In this example we implement a delayed delete functionality with un-delete option.
This way we get rid of user data for real, so we are GDPR compliant and don't risk leaking
something that user thought he has deleted. While also giving him 1 day to undo his action in case
he has deleted something by accident.

## Architectural overview

We will use a `deleted` flag on our entity to hide if from UI. We need to filter them out
in all the places we fetch entities. Real deletion of item will be **pushed to the `deleteNote` queue**
and processed in 24 hours. If in the meantime user decides to undo his action we remove `deleted` flag
and **remove item from queue by key**.

## Code example

::: code-group
<<< @/code/express/src/delete.ts [Express.js]
:::

## Remarks

::: tip

Another common pattern to handle deleted items is to, instead of using `deleted` flag,
move items to `deleted_notes` table or collection and move it back when un-deleted.
This has few advantages over the flag:

- Real data is not polluted with deleted items, improving query performance.
- There's no need to filter out deleted items in application logic.
- You can skip deleted items from long term backups.
- A different storage strategy can be used for deleted and live items (table partitions, cheaper storage, etc.)

:::
