import lq from '@dayone-labs/lambda-queue-express'
import express from 'express'
import './models'

const router = express.Router()

const userCreatedQueue = lq.queue('/userCreated', async (event: UserPayload) =>
	userService.createUser(event)
)
const userUpdatedQueue = lq.queue('/userUpdated', async (event: UserPayload) =>
	userService.updateUser(event)
)

//Just push different webhook events to separate queues, we'll handle them later
router.post('/webhook', async (req, res) => {
	const event = req.body
	try {
		if (event.type === 'user.created') {
			await userCreatedQueue.push(event)
			res.send('OK')
		} else if (event.type === 'user.updated') {
			await userUpdatedQueue.push(event)
			res.send('OK')
		}
	} catch (e) {
		res.status(500).send(e.message)
	}
})

//Queue is an Express router, just mount it with app.use(queue)
router.use(userCreatedQueue)
router.use(userUpdatedQueue)
export default {
	route: router,
}
