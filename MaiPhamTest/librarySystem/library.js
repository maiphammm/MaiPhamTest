// Book class definition
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.isAvailable = true; // Book is available by default
    }
}

// Library class definition
class Library {
    constructor() {
        this.books = []; // Initialize an empty list of books
    }

    // Method to add a book to the library
    addBook(book) {
        this.books.push(book);
        this.displayBooks(); // Refresh the display after adding a book
    }

    // Method to check out a book
    checkOutBook(title) {
        const normalizedTitle = title.toLowerCase();
        const book = this.books.find(b => b.title.toLowerCase() === normalizedTitle);
        if (book) {
            if (book.isAvailable) {
                book.isAvailable = false;
                alert(`You have successfully checked out "${book.title}".`);
            } else {
                alert(`Sorry, "${book.title}" is currently not available.`);
            }
        } else {
            alert(`Sorry, the book "${title}" does not exist in the library.`);
        }
        this.displayBooks(); // Refresh the display after checking out a book
    }

    // Method to check in a book
    checkInBook(title) {
        const normalizedTitle = title.toLowerCase();
        const book = this.books.find(b => b.title.toLowerCase() === normalizedTitle);
        if (book) {
            if (!book.isAvailable) {
                book.isAvailable = true;
                alert(`You have successfully checked in "${book.title}".`);
            } else {
                alert(`The book "${book.title}" was not checked out.`);
            }
        } else {
            alert(`Sorry, the book "${title}" does not exist in the library.`);
        }
        this.displayBooks(); // Refresh the display after checking in a book
    }

    // Method to display all books in the library
    displayBooks() {
        const booksList = document.getElementById('booksList');
        booksList.innerHTML = ''; // Clear previous list
        this.books.forEach(book => {
            const status = book.isAvailable ? 'Available' : 'Not available';
            booksList.innerHTML += `<p>${book.title} by ${book.author} (${status})</p>`;
        });
    }
}

// Create a library instance
const library = new Library();

// Function to add a book from the input fields
function addBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    if (title && author) {
        const book = new Book(title, author);
        library.addBook(book);
        // Clear input fields
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
    } else {
        alert('Please enter both title and author.');
    }
}

// Function to check out a book
function checkOutBook() {
    const title = document.getElementById('checkoutTitle').value.trim();
    if (title) {
        library.checkOutBook(title);
        // Clear input field
        document.getElementById('checkoutTitle').value = '';
    } else {
        alert('Please enter the title of the book to check out.');
    }
}

// Function to check in a book
function checkInBook() {
    const title = document.getElementById('checkinTitle').value.trim();
    if (title) {
        library.checkInBook(title);
        // Clear input field
        document.getElementById('checkinTitle').value = '';
    } else {
        alert('Please enter the title of the book to check in.');
    }
}
