const addNoteBtn: HTMLButtonElement = document.querySelector('.nav-buttons__add-btn')!;
const deleteAllNotesBtn: HTMLButtonElement = document.querySelector('.nav-buttons__delete-all-btn')!;
const saveNoteBtn: HTMLButtonElement = document.querySelector('.note-panel__buttons-save')!;
const cancelNoteBtn: HTMLButtonElement = document.querySelector('.note-panel__buttons-cancel')!;

const notePanel: HTMLDivElement = document.querySelector('.note-panel')!;
const notePanelCategory: HTMLSelectElement = document.querySelector('.note-panel__category')!;
const notePanelTextarea: HTMLSelectElement = document.querySelector('.note-panel__text')!;
const notePanelError: HTMLParagraphElement = document.querySelector('.note-panel__error')!;

let selectedCategory: string, noteID: number = 0;


const openNotePanel = () => {
	notePanel.classList.remove('note-panel--hidden');
};

const closeNotePanel = () => {
	notePanel.classList.add('note-panel--hidden');
	notePanelError.classList.add('note-panel__error--hidden');
	notePanelTextarea.value = '';
	notePanelCategory.selectedIndex = 0;
};

const addNote = () => {
	if (
		notePanelTextarea.value !== '' &&
		Number(notePanelCategory.options[notePanelCategory.selectedIndex].value) !== 0
	) {
		selectValue();
		createNote();
		notePanelError.classList.add('note-panel__error--hidden');
	} else {
		notePanelError.classList.remove('note-panel__error--hidden');
	}
};

const createNote = () => {
	const newNote: HTMLDivElement = document.createElement('div');
	const noteHeader: HTMLDivElement = document.createElement('div');
	const noteHeaderTitle: HTMLHeadingElement = document.createElement('h3');
	const noteHeaderDeleteBtn: HTMLButtonElement = document.createElement('button');
	const noteBody: HTMLDivElement = document.createElement('div');

	newNote.classList.add('note');

	noteHeaderTitle.classList.add('note-header__title');
	noteHeaderTitle.textContent = `${selectedCategory}`;

	noteHeaderDeleteBtn.classList.add('note-header__delete-note');
	noteHeaderDeleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i> Delete`;

	noteHeader.classList.add('note-header');
	noteHeader.append(noteHeaderTitle);
	noteHeader.append(noteHeaderDeleteBtn);

	noteBody.classList.add('note-body');
	noteBody.textContent = notePanelTextarea.value;

	newNote.append(noteHeader);
	newNote.append(noteBody);
	newNote.addEventListener('click', deleteNote);

	checkColor(newNote);
	appendNotes(newNote);

	notePanelTextarea.value = '';
	notePanelCategory.selectedIndex = 0;
	notePanel.classList.add('note-panel--hidden');
};

const appendNotes = (newNote: HTMLDivElement) => {
	const noteArea: HTMLDivElement = document.querySelector('.note-area')!;

	localStorage.setItem(`note-${noteID}`, newNote.toString());
	noteArea.append(newNote);
};

const deleteNote = (e: Event) => {
	const currentNote = e.currentTarget as HTMLDivElement;

	currentNote.remove();
};

const selectValue = () => {
	selectedCategory = notePanelCategory.options[notePanelCategory.selectedIndex].text;
};

const checkColor = (note: HTMLDivElement) => {
	switch (selectedCategory) {
		case 'Shopping':
			note.classList.add('note--shopping');
			break;

		case 'Work':
			note.classList.add('note--work');
			break;

		case 'Gym':
			note.classList.add('note--gym');
			break;

		case 'Personal':
			note.classList.add('note--personal');
			break;

		case 'Other':
			note.classList.add('note--other');
			break;
	}
};

const deleteAllNotes = () => {
	const allNotes: NodeListOf<HTMLDivElement> = document.querySelectorAll('.note');

	allNotes.forEach(note => note.remove());
};

addNoteBtn.addEventListener('click', openNotePanel);
cancelNoteBtn.addEventListener('click', closeNotePanel);
saveNoteBtn.addEventListener('click', addNote);
deleteAllNotesBtn.addEventListener('click', deleteAllNotes);
