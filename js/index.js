const BOOKS_URL = "http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", () => {
    Adapter.fetch(BOOKS_URL)
        .then((books) => {
            Book.make(books);
            return Book.all;
        })
        .then((books) => {
            DOMController.renderList(books)
        })
});
