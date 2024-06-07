import lq from '@dayone-labs/lambda-queue-express'
import { subDays, subMinutes } from 'date-fns'
import './models'

const dayBeforeQueue = lq.queue('/reminder1d', async (event: AppEvent) => {
	await emailService.sendEventNotification(event)
})
const minutesBeforeQueue = lq.queue('/reminder15m', async (event: AppEvent) => {
	await emailService.sendEventNotification(event)
})

const onNewEvent = async (event: AppEvent) => {
	await Promise.all([
		dayBeforeQueue.push(event, {
			key: event.id,
			on: subDays(event.date, 1),
		}),
		minutesBeforeQueue.push(event, {
			key: event.id,
			on: subMinutes(event.date, 15),
		}),
	])
}

const onEventUpdate = onNewEvent
const onEventDelete = async (event: AppEvent) => {
	await Promise.all([
		dayBeforeQueue.deleteByKey(event.id),
		minutesBeforeQueue.deleteByKey(event.id),
	])
}

export const route = lq.compose(dayBeforeQueue, minutesBeforeQueue)
//Queue is an Express router, just mount it with app.use(queue)
//You can then call on* functions whenever your data changes
export default {
	route,
	onNewEvent,
	onEventUpdate,
	onEventDelete,
}
