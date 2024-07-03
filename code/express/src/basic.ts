import lq from '@dayone-labs/lambda-queue-connect'
import express from 'express'

const app = express()
const queue = lq.queue('/some-queue', async (event: { name: string }) => {
  return { message: `Hello, ${event.name}!` }
})

app.use(queue)
app.use(express.json())
app.post('/hello', async (req, res) => {
  await queue.push({ name: req.body.name })
  res.send('OK')
})
app.listen(4444, () => console.log('Listening on port 4444'))
