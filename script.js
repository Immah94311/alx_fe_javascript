// Quotes array with objects { text, category }
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Select main elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Function: Show a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available. Add one!</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Clear and create new quote elements dynamically
  quoteDisplay.innerHTML = "";

  const quoteText = document.createElement("p");
  quoteText.textContent = `"${randomQuote.text}"`;

  const quoteCategory = document.createElement("small");
  quoteCategory.textContent = `— ${randomQuote.category}`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Function: Create and append Add Quote Form dynamically
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

  // Event listener for adding quotes
  addButton.addEventListener("click", function () {
    const text = quoteInput.value.trim();
    const category = categoryInput.value.trim();

    if (text === "" || category === "") {
      alert("Please enter both a quote and category!");
      return;
    }

    // Add new quote to array
    quotes.push({ text, category });

    // Clear inputs
    quoteInput.value = "";
    categoryInput.value = "";

    alert("Quote added successfully!");
    showRandomQuote(); // Immediately display the new quote
  });

  // Append elements to form container
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  // Add form to body
  document.body.appendChild(formContainer);
}

// Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize page
showRandomQuote();      // Show a quote at start
createAddQuoteForm();   // Build form dynamically
