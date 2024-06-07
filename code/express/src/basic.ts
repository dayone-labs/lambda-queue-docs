import lq from '@dayone-labs/lambda-queue-express'
import express from 'express'

const app = express()
const queue = lq.queue('/queue', async (event: { name: string }) => {
	console.log(`Hello from queue, ${event.name}!`)
})

app.use(queue)
app.use(express.json())
app.post('/hello', async (req, res) => {
	await queue.push({ name: req.body.name })
	res.send('OK')
})
app.listen(4444, () => console.log('Listening on port 4444'))
