type AppEvent = {
	id: string
	user: string
	date: Date
	title: string
}

type Customer = {
	id: string
	name: string
	email: string
	timezone?: string
}

type EmailService = {
	sendEventNotification: (event: AppEvent) => Promise<void>
}
declare const emailService: EmailService

type PaymentService = {
	sendInvoice: (customerId: string) => Promise<void>
}
declare const paymentService: PaymentService
