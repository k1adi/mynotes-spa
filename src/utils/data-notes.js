const noteObject = {
  id: '',
  label: 1,
  title: '',
  body: '',
  archived: '',
};

let notes = [
  {
    id: 'notes-1',
    label: 3,
    title: 'Babel',
    body: 'Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.',
    createdAt: '2022-04-14T04:27:34.572Z',
    updatedAt: '',
    archived: false,
  },
  {
    id: 'notes-2',
    label: 4,
    title: 'Functional Component',
    body: 'Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.',
    createdAt: '2022-04-14T04:27:34.572Z',
    updatedAt: '',
    archived: false,
  },
  {
    id: 'notes-3',
    label: 3,
    title: 'Modularization',
    body: 'Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.',
    createdAt: '2022-04-14T04:27:34.572Z',
    updatedAt: '',
    archived: false,
  },
  {
    id: 'notes-4',
    label: 4,
    title: 'Lifecycle',
    body: 'Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ',
    createdAt: '2022-04-14T04:27:34.572Z',
    updatedAt: '',
    archived: false,
  },
  {
    id: 'notes-5',
    label: 3,
    title: 'ESM',
    body: 'ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.',
    createdAt: '2022-04-14T04:27:34.572Z',
    updatedAt: '',
    archived: false,
  },
  {
    id: 'notes-6',
    label: 5,
    title: 'Module Bundler',
    body: 'Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  }
];

const getAllNote = () => {
  return notes;
};

const findNote = (id) => {
  const foundedNote = notes.find((note) => note.id === id);
  return foundedNote;
};

function getActiveNotes() {
  const activeNotes = notes.filter((note) => !note.archived);
  return activeNotes;
}

function getArchivedNotes() {
  const archivedNotes = notes.filter((note) => note.archived);
  return archivedNotes;
}

const searchNote = (notes, keyword, label) => {
  let filteredNote = notes;

  if (keyword.length && keyword.trim()) {
    filteredNote = filteredNote.filter(note => note.title.toLowerCase().includes(keyword.toLowerCase()));
  }

  if (label) {
    filteredNote = filteredNote.filter(note => note.label == label);
  }

  return filteredNote;
};

const addNote = ({ label, title, body }) => {
  notes = [...notes, { 
    id: String(+new Date()),
    label: Number(label),
    title,
    body,
    archived: false, 
    createdAt: new Date().toISOString(), 
    updatedAt: '' 
  }];
};
const toggleArchiveNote = (id) => {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: !note.archived };
    }
    return note;
  });
};

const editNotes = ({ id, label, title, body, archived, currentNote }) => {
  const updatedNote = {
    ...currentNote,
    id: id,
    label: Number(label),
    title,
    body, 
    archived,
    updatedAt: new Date().toISOString()
  };

  notes = [...notes.filter(note => note.id !== id), updatedNote];
};

const deleteNote = (id) => {
  notes = notes.filter(note => note.id !== id);
};

const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return new Date(date).toLocaleDateString('en-US', options);
};

function convertTitle(string) {
  // eslint-disable-next-line no-useless-escape
  string = string.replace(/[.,;<>\/?\\|[\]{}"`'!@#$%^&*()_+=~]/g, ' ');
  string = string.replace(/\s+/g, '+');

  return string;
}

export { 
  noteObject, 
  notes, 
  getAllNote,
  getActiveNotes,
  getArchivedNotes,
  findNote, 
  searchNote, 
  addNote, 
  toggleArchiveNote,
  editNotes, 
  deleteNote, 
  showFormattedDate, 
  convertTitle 
};