class DOMController {
    static listHandler(event) {
        let panel = document.querySelector("#show-panel")

        while (panel.firstChild) {
            panel.removeChild(panel.firstChild);
        };

        let id = event.target.id;
        let book = Book.findByElementId(id);
        DOMController.renderBook(book);
    }

    static likeHandler(event) {
        let bookId = event.target.parentElement.dataset["bookId"];
        let book = Book.all.find((book) => book.id = bookId);
        book.like();
    }

    static renderList(books){
        let bookList = document.querySelector("#list");

        books.forEach(book => {
            let listItem = document.createElement("li");
            listItem.innerText = book.title;
            listItem.id = `book-${book.id}`;
            listItem.addEventListener("click", DOMController.listHandler);
            bookList.appendChild(listItem);
        });
    }

    static renderBook(book) {
        let panel = document.querySelector("#show-panel")
        panel.dataset.bookId = book.id;

        let title = document.createElement("h2");
        title.innerText = book.title;
        panel.appendChild(title);

        let img = document.createElement("img");
        img.src = book.img_url;
        panel.appendChild(img);
        
        let description = document.createElement("p");
        description.innerText = book.description;
        panel.appendChild(description);

        let users = document.createElement("ul");
        book.users.forEach(user => {
            let userListItem = document.createElement("li");
            userListItem.innerText = user.username;
            users.appendChild(userListItem);    
        });
        panel.appendChild(users);

        let likeButton = document.createElement("button");
        likeButton.innerText = "Like This Book";
        likeButton.addEventListener("click", DOMController.likeHandler)
        panel.appendChild(likeButton);

    }
}