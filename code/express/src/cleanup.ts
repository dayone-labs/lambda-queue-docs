import lq from '@dayone-labs/lambda-queue-express'
import { subDays, subWeeks } from 'date-fns'
import './models'

const cleanupTemp = lq.queue('/cleanupTemp', async () => {
	//Don't await on this async call to run it in the background
	const aDayAgo = subDays(new Date(), 1)
	tempManager.deleteOlder(aDayAgo)
})

const validateCleanup = lq.queue('/validateCleanup', async () => {
	const weekAgo = subWeeks(new Date(), 1)
	const hasOlderThanWeek = await tempManager.hasOlder(weekAgo)
	if (hasOlderThanWeek) {
		throw new Error('Older than a week data still exists')
	}
})

lq.schedule(
	'0 2 * * *',
	{},
	{ queue: cleanupTemp, key: 'cleanupTemp', skipExisting: true }
)
lq.schedule(
	'0 3 * * *',
	{},
	{ queue: validateCleanup, key: 'validateCleanup', skipExisting: true }
)

//Queue is an Express router, just mount it with app.use(queue)
export const route = lq.compose(cleanupTemp, validateCleanup)
export default {
	route,
}
