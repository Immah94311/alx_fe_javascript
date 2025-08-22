// =============================
// Quote Storage Management
// =============================

// Load quotes from localStorage or use default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// =============================
// DOM Elements
// =============================
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const exportBtn = document.getElementById("exportJson");
const importInput = document.getElementById("importFile");

// =============================
// Show Random Quote
// =============================
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available. Add one!</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Save last shown quote in sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));

  // Update DOM
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>— ${randomQuote.category}</small>
  `;
}

// =============================
// Add Quote Form (Dynamic)
// =============================
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";
  quoteInput.id = "newQuoteText";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.id = "newQuoteCategory";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  addButton.addEventListener("click", function () {
    const text = quoteInput.value.trim();
    const category = categoryInput.value.trim();

    if (text === "" || category === "") {
      alert("Please enter both a quote and category!");
      return;
    }

    quotes.push({ text, category });
    saveQuotes(); // Save to localStorage

    quoteInput.value = "";
    categoryInput.value = "";

    alert("Quote added successfully!");
    showRandomQuote();
  });

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// =============================
// JSON Export / Import
// =============================
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);

      if (!Array.isArray(importedQuotes)) {
        throw new Error("Invalid JSON format");
      }

      quotes.push(...importedQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
      showRandomQuote();
    } catch (err) {
      alert("Error importing quotes: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// =============================
// Event Listeners
// =============================
newQuoteBtn.addEventListener("click", showRandomQuote);
exportBtn.addEventListener("click", exportToJsonFile);
importInput.addEventListener("change", importFromJsonFile);

// =============================
// Initialization
// =============================
createAddQuoteForm();

// Load last session quote if available
const lastQuote = sessionStorage.getItem("lastQuote");
if (lastQuote) {
  const q = JSON.parse(lastQuote);
  quoteDisplay.innerHTML = `
    <p>"${q.text}"</p>
    <small>— ${q.category}</small>
  `;
} else {
  showRandomQuote();
}
