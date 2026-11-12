

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = read;
    this.id = crypto.randomUUID();
  }

  get readLabel() {
    return this.read ? "Read" : "Not Read";
  }

  toggleRead() {
    this.read = !this.read;
  }
}

class Library {
  #books = [];

  add(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    this.#books.push(book);
    return book;
  }

  find(id) {
    for (const book of this.#books) {
      if (book.id === id) {
        return book;
      }
    }
    return undefined;
  }

  remove(id) {
    const index = this.#books.findIndex(function (book) {
      return book.id === id;
    });

    if (index !== -1) {
      this.#books.splice(index, 1);
    }
  }

  get books() {
    const books = [...this.#books];
    return books;
  }
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// Adding container to DOM and calling it container
const container = document.getElementById("container");

// creating a DOM button and adding it to container to add a newBook button to the page
const newBookButton = document.getElementById("new-book-button");
const form = document.getElementById("form");
const cancelButton = document.getElementById("cancel-button");

cancelButton.addEventListener("click", function () {
  form.reset();
  form.classList.add("hidden");
});

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

    const titleElement = document.createElement("h2");
    titleElement.textContent = `Title: ${book.title}`;
    card.appendChild(titleElement);

    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${book.author}`;
    card.appendChild(authorElement);

    const pagesElement = document.createElement("p");
    pagesElement.textContent = `Pages: ${book.pages}`;
    card.appendChild(pagesElement);

    const readStatusElement = document.createElement("p");
    readStatusElement.textContent = book.readLabel;
    readStatusElement.classList.add("read-status");
    if (book.readLabel === "Read") {
      readStatusElement.classList.add("is-read");
    } else {
      readStatusElement.classList.add("is-unread");
    }
    card.appendChild(readStatusElement);

    //Add the completed card to the page
    container.appendChild(card);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("card-buttons");

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    buttonContainer.appendChild(removeButton);

    removeButton.addEventListener("click", function () {
      const bookID = card.dataset.id;

      const index = myLibrary.findIndex((book) => book.id === bookID);

      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
      }
    });

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-btn");

    if (book.readLabel === "Read") {
      toggleButton.textContent = "Mark as not read";
    } else {
      toggleButton.textContent = "Mark as read";
    }

    buttonContainer.appendChild(toggleButton);

    toggleButton.addEventListener("click", function () {
      const id = card.dataset.id;
      const found = myLibrary.find((book) => book.id === id);

      if (found) {
        found.toggleRead();
        displayBooks();
      }
    });

    card.appendChild(buttonContainer);
  });
}
