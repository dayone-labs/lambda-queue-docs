import lq from '@dayone-labs/lambda-queue-express'
import { subDays, subWeeks } from 'date-fns'

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

lq.schedule('0 2 * * *', {
	queue: cleanupTemp,
	//Key is mandatory here, as we don't want to reschedule the same job multiple times
	key: 'cleanupTemp',
})

lq.schedule('0 3 * * *', {
	queue: validateCleanup,
	//Key is mandatory here, as we don't want to reschedule the same job multiple times
	key: 'validateCleanup',
})

//Queue is an Express router, just mount it with app.use(queue)
export const route = lq.compose(cleanupTemp, validateCleanup)
export default {
	route,
}
