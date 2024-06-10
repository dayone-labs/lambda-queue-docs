import lq from '@dayone-labs/lambda-queue-express'
import { hoursToMilliseconds } from 'date-fns'
import './models'

const deleteNoteQueue = lq.queue(
	'/deleteNote',
	async (event: { noteId: NoteId }) => {
		await noteRepository.delete(event.noteId)
	},
	//Delete for real after 24 hours
	{ delay: hoursToMilliseconds(24) }
)

const deleteNote = async (noteId: NoteId) => {
	const note = await noteRepository.fetch(noteId)
	//Mark as deleted, so it won't show up in UI
	note.deleted = true
	noteRepository.save(note)
	await deleteNoteQueue.push({ noteId }, { key: noteId })
}
const undeleteNote = async (noteId: NoteId) => {
	const note = await noteRepository.fetch(noteId)
	//Remove from queue, so it's not deleted
	await deleteNoteQueue.deleteByKey(noteId)
	//Remove deleted flag, so it will show up in UI again
	note.deleted = false
	noteRepository.save(note)
}

//Queue is an Express router, just mount it with app.use(queue)
export default {
	route: deleteNoteQueue,
	deleteNote,
	undeleteNote,
}
