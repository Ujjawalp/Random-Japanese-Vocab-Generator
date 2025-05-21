const btn = document.getElementById('btn');
const kanjiEl = document.getElementById('kanji');
const furiganaEl = document.getElementById('furigana');
const meaningEl = document.getElementById('meaning');
const levelEl = document.getElementById('level');

let vocabData = [];

// async function to fetch vocab data
async function fetchVocab() {
  try {
    const response = await fetch('https://jlpt-vocab-api.vercel.app/api/words/all');
    vocabData = await response.json();
    btn.disabled = false;
  } catch (err) {
    console.error('Error fetching vocabulary:', err);
    alert('Failed to load vocabulary data.');
  }
}

// call fetch function right away
fetchVocab();

// handle button click
btn.addEventListener('click', () => {
  if (vocabData.length === 0) {
    alert('Vocabulary data not loaded yet. Please wait a moment and try again.');
    return;
  }

  const randomIndex = Math.floor(Math.random() * vocabData.length);
  const vocab = vocabData[randomIndex];

  kanjiEl.textContent = vocab.word;
  furiganaEl.textContent = `${vocab.furigana} (${vocab.romaji})`;
  meaningEl.textContent = `Meaning: ${vocab.meaning}`;
  levelEl.textContent = `N${vocab.level}`;
});
