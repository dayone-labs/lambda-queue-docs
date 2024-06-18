import { queue } from '@dayone-labs/lambda-queue-serverless'

type Payload = {
	name: string
	age: number
}
export const welcomeQueue = queue(
	'/lq/queue', //Pass route that it will be served at❗
	async (job: Payload) => {
		console.log(`Hi ${job.name}, you are ${job.age} years old!`)
	}
)

//Queue is a route handler, just expose it as POST
export const POST = welcomeQueue
//Remember to expose HEAD so we can validate endpoint
export const HEAD = welcomeQueue
