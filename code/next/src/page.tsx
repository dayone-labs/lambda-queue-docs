'use client'
import { pushToQueue } from './actions'

export const Page = () => {
  return (
    <div>
      <button onClick={() => pushToQueue()}>Press to Push!</button>
    </div>
  )
}

export default Page
