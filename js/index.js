const BOOKS_URL = "http://localhost:3000/books"
const CURRENT_USER = {id: 1, username: "pouros"};

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
