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

type UserPayload = any
type UserService = {
  createUser: (userPayload: UserPayload) => Promise<void>
  updateUser: (userPayload: UserPayload) => Promise<void>
}
declare const userService: UserService

type NoteId = string
type Note = {
  id: NoteId
  content: string
  deleted?: boolean
}
type NoteRepository = {
  delete: (noteId: NoteId) => Promise<void>
  fetch: (noteId: NoteId) => Promise<Note>
  save: (note: Note) => Promise<void>
}
declare const noteRepository: NoteRepository

type TempManager = {
  deleteOlder: (date: Date) => Promise<void>
  hasOlder: (date: Date) => Promise<boolean>
}

declare const tempManager: TempManager
