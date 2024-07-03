'use server'
import { welcomeQueue } from './welcome-queue'

export const pushToQueue = async () => {
  await welcomeQueue.push({ name: 'John Doe', age: 30 })
}
