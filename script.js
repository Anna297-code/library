class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = read;
    this.id = crypto.randomUUID();
  }

  get readValue() {
    return this.read ? "Read" : "Not Read";
  }

  toggleRead() {
    this.read = !this.read;
  }
}

// Library class
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
    return [...this.#books];
  }
}

const library = new Library();

const container = document.getElementById("container");
const newBookButton = document.getElementById("new-book-button");
const form = document.getElementById("form");
const cancelButton = document.getElementById("cancel-button");

cancelButton.addEventListener("click", function () {
  form.reset();
  form.classList.add("hidden");
});

newBookButton.addEventListener("click", function () {
  form.classList.remove("hidden");
});

// Reads the form, asks library.add(...), then calls renderBooks to redraw.

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read-status").checked;

  library.add(title, author, pages, read);

  renderBooks(library, container);

  form.reset();
  form.classList.add("hidden");
});

//Clears the old cards, loops over library.books, gets a card for each book from createBookCard, and appends it to container.
function renderBooks(library, container) {
  container.querySelectorAll(".card").forEach((card) => {
    card.remove();
  });

  library.books.forEach((book) => {
    const card = createBookCard(book, library, container);
    container.appendChild(card);
  });
}

function createBookCard(book, library, container) {
  //creates the card and adds all the values from the form to the html
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = book.id;
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
  readStatusElement.textContent = book.readValue;
  readStatusElement.classList.add("read-status");
  if (book.read) {
    readStatusElement.classList.add("is-read");
  } else {
    readStatusElement.classList.add("is-unread");
  }
  card.appendChild(readStatusElement);

  // Creates a button container and adds the remove and toggle buttons with their listeners

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("card-buttons");

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-btn");

  buttonContainer.appendChild(removeButton);

  removeButton.addEventListener("click", function () {
    const id = card.dataset.id;
    library.remove(id);
    renderBooks(library, container);
  });

  const toggleButton = document.createElement("button");
  toggleButton.classList.add("toggle-btn");

  if (book.read) {
    toggleButton.textContent = "Mark as not read";
  } else {
    toggleButton.textContent = "Mark as read";
  }

  buttonContainer.appendChild(toggleButton);

  toggleButton.addEventListener("click", function () {
    const id = card.dataset.id;
    const book = library.find(id);

    if (book) {
      book.toggleRead();
      renderBooks(library, container);
    }
  });

  card.appendChild(buttonContainer);

  return card;
}
