const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title}, ${author}, ${pages}, ${read}`
    }
}

Book.prototype.toggleReadStatus = function() {
    this.read = this.read === "yes" ? "no" : "yes";
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayLibrary();
}

function displayLibrary() {
    const libraryDisplay = document.getElementById("libraryDisplay");
    libraryDisplay.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read}</p>
            <button class="toggleRead" data-index="${index}">Toggle Read Status</button>
            <button class="removeBook" data-index="${index}">Remove Book</button>
        `;

        libraryDisplay.appendChild(bookCard);
    });
    
    addEventListeners();
}

function addEventListeners() {
    document.querySelectorAll(".toggleRead").forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            myLibrary[index].toggleReadStatus();
            displayLibrary();
        });
    });

    document.querySelectorAll(".removeBook").forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            myLibrary.splice(index, 1);
            displayLibrary();
        });
    });
}

document.getElementById("newBookButton").addEventListener("click", () => {
    const formContainer = document.getElementById("formContainer");
    formContainer.showModal();
});

document.getElementById("bookForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    addBookToLibrary(title, author, pages, read);

    event.target.reset();
    document.getElementById("formContainer").close();
});