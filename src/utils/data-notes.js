const noteObject = {
  id: '',
  label: null,
  title: '',
  richText: '',
  plainText: '',
  archived: '',
};

const getInitialData = () => ([
  {
    id: 1705470126711,
    label: 1,
    title: 'Apa Itu HTML',
    richText: 'HTML (Hypertext Markup Language) adalah fondasi dari setiap halaman web. Artikel ini memberikan pengantar singkat untuk pemula, membahas struktur dasar HTML, elemen umum, dan cara memulai membuat halaman web sederhana.',
    plainText: 'HTML (Hypertext Markup Language) adalah fondasi dari setiap halaman web. Artikel ini memberikan pengantar singkat untuk pemula, membahas struktur dasar HTML, elemen umum, dan cara memulai membuat halaman web sederhana.',
    createdAt: '2023-11-11T04:27:34.572Z',
    updatedAt: '2023-11-11T04:27:34.572Z',
    archived: true,
  },
  {
    id: 1705470126712,
    label: 2,
    title: 'Membuat Tampilan Menarik',
    richText: 'CSS (Cascading Style Sheets) memungkinkan desain web yang menarik. Dalam catatan ini, kita akan membahas dasar-dasar CSS, termasuk selektor, properti gaya, dan cara menerapkannya untuk meningkatkan estetika halaman web.',
    plainText: 'CSS (Cascading Style Sheets) memungkinkan desain web yang menarik. Dalam catatan ini, kita akan membahas dasar-dasar CSS, termasuk selektor, properti gaya, dan cara menerapkannya untuk meningkatkan estetika halaman web.',
    createdAt: '2023-11-12T04:27:34.572Z',
    updatedAt: '',
    archived: false,
  },
  {
    id: 1705470126713,
    label: 3,
    title: 'Modularization',
    richText: 'Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.',
    plainText: 'Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.',
    createdAt: '2022-04-14T04:27:34.572Z',
    updatedAt: '',
    archived: false,
  },
  {
    id: 1705470126714,
    label: 5,
    title: 'Module Bundler',
    richText: 'Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.',
    plainText: 'Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.',
    createdAt: '2022-04-14T04:27:34.572Z',
    updatedAt: '',
    archived: false,
  },
  {
    id: 1705470126715,
    label: 4,
    title: 'Functional Component',
    richText: 'Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.',
    plainText: 'Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.',
    createdAt: '2022-04-14T04:27:34.572Z',
    updatedAt: '',
    archived: false,
  },
  {
    id: 1705470126716,
    label: 4,
    title: 'Functional Component ,./;["]=-!@#$%^&*()',
    richText: '<h1>asdasdad</h1><p><br></p><p>asda;ld</p><p><em>asdad as</em></p><p>d asd</p><p>ad </p><p><strong>asd</strong></p><p> as</p><p> da</p><p>d a</p><p>sd</p><ol><li>a das</li><li>asda</li><li>sdad</li><li>a</li></ol><ul><li>asd</li><li>ada</li><li>das</li><li>das</li><li>dad</li></ul><p><br></p><p>adasd</p><p> a</p>',
    plainText: 'Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.',
    createdAt: '2022-04-14T04:27:34.572Z',
    updatedAt: '',
    archived: false,
  },
]);

const getSelectedNote = (notes, id) => {
  return notes.find(note => note.id == id);
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

function convertTitle(string) {
  // eslint-disable-next-line no-useless-escape
  string = string.replace(/[.,;<>\/?\\|[\]{}"`'!@#$%^&*()_+=~]/g, ' ');
  string = string.replace(/\s+/g, '+');

  return string;
}

export { noteObject, getInitialData, getSelectedNote, showFormattedDate, searchNote, convertTitle };