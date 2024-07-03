import { welcomeQueue } from './welcome-queue'

//Queue is a route handler, just expose it as POST
export const POST = welcomeQueue
//Remember to expose HEAD so we can validate endpoint
export const HEAD = welcomeQueue
