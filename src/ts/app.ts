const addNoteBtn: HTMLButtonElement = document.querySelector('.nav-buttons__add-btn')!;
const deleteAllNotesBtn: HTMLButtonElement = document.querySelector('.nav-buttons__delete-all-btn')!;
const saveNoteBtn: HTMLButtonElement = document.querySelector('.note-panel__buttons-save')!;
const cancelNoteBtn: HTMLButtonElement = document.querySelector('.note-panel__buttons-cancel')!;
const deleteNoteBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.note-header__delete-note')!;

const notePanel: HTMLDivElement = document.querySelector('.note-panel')!;
const notePanelCategory: HTMLSelectElement = document.querySelector('.note-panel__category')!;
const notePanelTextarea: HTMLSelectElement = document.querySelector('.note-panel__text')!;
const notePanelError: HTMLParagraphElement = document.querySelector('.note-panel__error')!;

let selectedCategory, noteID: number | string;

const openNotePanel = () => {
	notePanel.classList.remove('note-panel--hidden');
};

const closeNotePanel = () => {
	notePanel.classList.add('note-panel--hidden');
	notePanelError.classList.add('note-panel__error--hidden');
	notePanelTextarea.value = '';
	notePanelCategory.selectedIndex = 0;
};
const handleNote = () => {
	if (
		notePanelTextarea.value !== '' &&
		Number(notePanelCategory.options[notePanelCategory.selectedIndex].value) !== 0
	) {
		createNote();
		notePanelError.classList.add('note-panel__error--hidden');
	} else {
		notePanelError.classList.remove('note-panel__error--hidden');
	}
};

const createNote = () => {
	const noteArea: HTMLDivElement = document.querySelector('.note-area')!;
	const newNote: HTMLDivElement = document.createElement('div');
	const noteHeader: HTMLDivElement = document.createElement('div');

	newNote.classList.add('note');
	newNote.setAttribute('data-id', noteID);

	newNote.append(noteHeader);
	noteArea.append(newNote);
};

addNoteBtn.addEventListener('click', openNotePanel);
cancelNoteBtn.addEventListener('click', closeNotePanel);
saveNoteBtn.addEventListener('click', handleNote);
