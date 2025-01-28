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

    myLibrary.addBook(title, author, pages, read);

    event.target.reset();
    document.getElementById("formContainer").close();
});

class Library {
    #myLibrary = [];

    addBook(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        this.#myLibrary.push(newBook);
        this.displayLibrary();
    }

    getLibrary() {
        return this.#myLibrary;
    }

    displayLibrary() {
        const libraryDisplay = document.getElementById("libraryDisplay");
        libraryDisplay.innerHTML = "";
    
        this.#myLibrary.forEach((book, index) => {
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
}

const myLibrary = new Library();

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    info() {
        return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`
    }
}

Book.prototype.toggleReadStatus = function() {
    this.read = this.read === "yes" ? "no" : "yes";
};

function addEventListeners() {
    document.querySelectorAll(".toggleRead").forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            const Library = myLibrary.getLibrary();
            Library[index].toggleReadStatus();
            myLibrary.displayLibrary();
        });
    });

    document.querySelectorAll(".removeBook").forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            const Library = myLibrary.getLibrary();
            Library.splice(index, 1);
            myLibrary.displayLibrary();
        });
    });
}





// constraint validation

const authorInput = document.getElementById('author');

const checkAuthor = () => {
    if (authorInput.validity.patternMismatch) {
        authorInput.setCustomValidity('The author\'s name should consist only letters');
    } else {
        authorInput.setCustomValidity('');
    }
}

window.onload = () => {
    authorInput.oninput = checkAuthor;
}