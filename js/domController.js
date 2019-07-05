class DOMController {
    static renderList(books){
        let bookList = document.querySelector("#list");

        let clickHandler = (event) => {
            let panel = document.querySelector("#show-panel")
            while (panel.firstChild) {
                panel.removeChild(panel.firstChild);
            };

            let id = event.target.id;
            let book = Book.findByElementId(id);
            DOMController.renderBook(book);
        };

        books.forEach(book => {
            let listItem = document.createElement("li");
            listItem.innerText = book.title;
            listItem.id = `book-${book.id}`;
            listItem.addEventListener("click", clickHandler);
            bookList.appendChild(listItem);
        });

    }

    static renderBook(book) {
        let panel = document.querySelector("#show-panel")

        let title = document.createElement("h2");
        title.innerText = book.title;
        panel.appendChild(title);

        let img = document.createElement("img");
        img.src = book.img_url;
        panel.appendChild(img);
        
        let description = document.createElement("p");
        description.innerText = book.description;
        panel.appendChild(description);

        let likeButton = document.createElement("button");
        likeButton.innerText = "Like This Book";
        panel.appendChild(likeButton);

    }

}