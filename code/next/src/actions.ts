'use server'
import { welcomeQueue } from './queue/route'

export const pushToQueue = async () => {
	await welcomeQueue.push({ name: 'John Doe', age: 30 })
}
