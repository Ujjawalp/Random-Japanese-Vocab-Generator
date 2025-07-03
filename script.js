const btn = document.getElementById('btn');
const kanjiEl = document.getElementById('kanji');
const furiganaEl = document.getElementById('furigana');
const meaningEl = document.getElementById('meaning');
const levelEl = document.getElementById('level');

const searchInput = document.getElementById('searchbar');
const searchResults = document.getElementById('search-results');

let vocabData = [];

// Fetch vocab data from API
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

fetchVocab(); // Call on load

// Generate random word on button click
btn.addEventListener('click', () => {
  if (vocabData.length === 0) {
    alert('Vocabulary data not loaded yet. Please wait a moment and try again.');
    return;
  }

  const randomIndex = Math.floor(Math.random() * vocabData.length);
  const vocab = vocabData[randomIndex];

  updateDisplay(vocab);
});

// Function to update the vocab display section
function updateDisplay(vocab) {
  kanjiEl.textContent = vocab.word;
  furiganaEl.textContent = `${vocab.furigana} (${vocab.romaji})`;
  meaningEl.textContent = `Meaning: ${vocab.meaning}`;
  levelEl.textContent = `N${vocab.level}`;
}

// Search functionality
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  searchResults.innerHTML = '';

  if (!query) return;

  const filtered = vocabData.filter(vocab =>
    vocab.word?.toLowerCase().includes(query) ||
    vocab.furigana?.toLowerCase().includes(query) ||
    vocab.romaji?.toLowerCase().includes(query) ||
    vocab.meaning?.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    searchResults.innerHTML = '<li>No matches found</li>';
    return;
  }

  filtered.slice(0, 10).forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.word} (${item.romaji}) - ${item.meaning}`;
    li.style.cursor = 'pointer';

    li.addEventListener('click', () => {
      updateDisplay(item);
      searchResults.innerHTML = ''; // Clear search results on selection
      searchInput.value = '';       // Clear input box
    });

    searchResults.appendChild(li);
  });
});
