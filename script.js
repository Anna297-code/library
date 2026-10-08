const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

const container = document.getElementById("container");

const newBookButton = document.createElement("button");
newBookButton.textContent = "Add Book";
container.appendChild(newBookButton);

const form = document.getElementById("form");

//Show the form

newBookButton.addEventListener("click", function () {
  form.classList.remove("hidden");
});

//Handle the form submission

form.addEventListener("submit", function (event){
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read-status").checked;

    addBookToLibrary(title, author, pages, read);

    displayBooks();

    form.reset();
    form.classList.add("Hidden");
});

function displayBooks() {
  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = book.id;
    card.style.whiteSpace = "pre-line";

    
    card.textContent = `
    Title: ${book.title} 
    Author: ${book.author} 
    Pages: ${book.pages} 
    Read: ${book.read}`;

    container.appendChild(card);
  });
}
