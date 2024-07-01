# REST API Reference

> [!WARNING]
> 🔴 It's easy and secure to use our REST APIs **for pushing and scheduling** items.
> Nevertheless securely handling calls from LambdaQueue in your queue handlers
> **is tricky**. You **must** validate our signatures and **provide verification endpoint**.
> Please use one of our [SDKs](/docs/sdk) or request one for your language. It will make your
> life much easier.

If you still want to handle all code by yourself, here you can find examples on how to securely
handle calls from LambdaQueue:

* Check [our client library `decode`](https://github.com/dayone-labs/lambda-queue-client/blob/main/js/src/global-client.ts#L200) function for
an example on how to check request yourself.

* Check [our client library `generateEndpointValidationKey`](https://github.com/dayone-labs/lambda-queue-client/blob/main/js/src/global-client.ts#L200) function for
an example on how to validate your endpoint manually.

## General notes

LambdaQueue will support arbitrary payloads in queue items. Because of that, everything that's not
a payload is passed in HTTP custom headers starting with `x-lq-`. It might be not something that you're used to,
but this way you can use regular HTTP clients and libraries to communicate with our servers without limiting yourself
to JSON or other standard payloads.



> [!TIP]
> If you plan to call APIs with CURL or XH, start by exporting your access token in shell. It will make things much easier:
>
> `export LQ_TOKEN=_api_access_token_`

> [!WARNING]
> 🚧 **Work in progress** - not all APIs are documented yet. Let us know if you're using REST API in your project.
> So we can prioritize it's documentation.

## Push item to queue

This will create queues on demand. No need to create a queue up-front.

**Endpoint:**

```sh 
POST https://api.lambdaqueue.com/api/v1/queues/{queue_name}/items 
```

**Payload:** Actual payload of the queue item

**Headers:**

```sh
Content-Type: String (Required) #Type of provided payload (will be forwarded to target)
x-lq-target: String (Required) #Target URL - url we'll call with your payload when processing item
x-lq-delay: Number #Delay processing of this item for X milliseconds
x-lq-on: String #ISO-8601 Date format - delay item until this date
x-lq-key: String #Unique key you can use to reference this item later (to delete or update it)
```

**Result:**
Newly created queue item as JSON

**Example:**

:::code-group

```sh [CURL]
curl -X POST -H "Authorization: Bearer $LQ_TOKEN" \
  -H "Content-Type: application/json" \
  -H "x-lq-target: http://lq-test:9999/ok" \
  -d '{ "test_key": "test_value" }' \
  https://api.lambdaqueue.com/api/v1/queues/test-queue/items
```

```sh [XH]
xh POST https://api.lambdaqueue.com/api/v1/queues/test-queue/items \
  Authorization:"Bearer $LQ_TOKEN" \
  "x-lq-target":"http://lq-test:9999/ok" \ 
  test_key="test_value"
```

:::

## List all queues

This will list queues for all items that are currently queued or were queued
in saved history, along with paused/running state

**Endpoint:**

```sh 
GET https://api.lambdaqueue.com/api/v1/queues/
```

**Result:**
List of all queues as JSON

**Example:**

:::code-group

```sh [CURL]
curl -X GET -H "Authorization: Bearer $LQ_TOKEN" \
  https://api.lambdaqueue.com/api/v1/queues
```

```sh [XH]
xh https://api.lambdaqueue.com/api/v1/queues \
  Authorization:"Bearer $LQ_TOKEN" 
```

:::
