//Made an empty array called myLibrary
const myLibrary = [];

//Made an object constructor that is a template for creating books, avoids repetition
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

//Made a function addBookToLibrary that takes any new books made and adds it to the end of myLibrary

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// Adding container to DOM and calling it container
const container = document.getElementById("container");

// creating a DOM button and adding it to container to add a newBook button to the page
const newBookButton = document.createElement("button");
newBookButton.textContent = "Add Book";
container.appendChild(newBookButton);

// adding form to the DOM and calling it form
const form = document.getElementById("form");

//adding an event listener to the add book button that shows the form

newBookButton.addEventListener("click", function () {
  form.classList.remove("hidden");
});

// adding an event listener that handles form submission, adds the details to myLibrary, displays the new book

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read-status").checked;

  addBookToLibrary(title, author, pages, read);

  displayBooks();

  form.reset();
  form.classList.add("hidden");
});

// a function that loops through the library, and adds each book to the container
function displayBooks() {
  // Remove the existing book cards before rebuilding the display
  container.querySelectorAll(".card").forEach((card) => {
    card.remove();
  });

  //Loop through the library array
  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");

    //Associate this card with its book
    card.dataset.id = book.id;

    //Display the book's detials
    card.style.whiteSpace = "pre-line";
    card.textContent = `
    Title: ${book.title} 
    Author: ${book.author} 
    Pages: ${book.pages} 
    Read: ${book.read}`;

    //Add the completed card to the page
    container.appendChild(card);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    card.appendChild(removeButton);

    removeButton.addEventListener("click", function () {
      const bookID = card.dataset.id;

      const index = myLibrary.findIndex((book) => book.id === bookID);

      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
      }
    });
  });
}

//removeButton.addEventListener("click", function (e) {
//const currentCard = e.target.closest("div");

//if (currentCard) {
//currentCard.remove();
//}
//}
// Click Remove
// Identify the selected book using its ID
// Remove from myLibrary
// Find and remove the matching object
// Call displayBooks()
//Rebuild the cards using the updated array
