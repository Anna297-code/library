const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read, id) {
  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
}

const container = document.getElementById("container");

function displayBooks() {
  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = book.id
    card.style.whiteSpace = "pre-line";
    card.textContent = `
    Title: ${book.title} 
    Author: ${book.author} 
    Pages: ${book.pages} 
    Read: ${book.read}`;
    

    container.appendChild(card);
  });
}
