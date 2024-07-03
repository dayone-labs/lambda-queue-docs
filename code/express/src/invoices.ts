import lq from '@dayone-labs/lambda-queue-express'
import './models'

const queue = lq.queue(
  '/generate-invoice',
  async (event: { customerId: string }) => {
    await paymentService.sendInvoice(event.customerId)
  }
)

const scheduleInvoice = async (customer: Customer) => {
  await lq.schedule(
    '@monthly',
    { customerId: customer.id },
    {
      queue: queue.queue,
      key: `monthly-invoice-${customer.id}`,
      target: queue.target,
      timezone: customer.timezone,
    }
  )
}
const deleteInvoiceSchedule = async (customer: Customer) => {
  await lq.deleteScheduleByKey(`monthly-invoice-${customer.id}`)
}

//Queue is an Express router, just mount it with app.use(queue)
export default {
  route: queue,
  scheduleInvoice,
  deleteInvoiceSchedule,
}
