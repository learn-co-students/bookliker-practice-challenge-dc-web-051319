class Book{
    constructor(book){
        this.id = book.id;
        this.title = book.title;
        this.description = book.description;
        this.img_url = book.img_url;
        this.users = book.users;
    }

    static getAllBooks(){
        fetch(BOOKSURL)
        .then(res => res.json())
        .then(books => books.forEach(book=>{
            let listBook = new Book(book);
            listBook.renderToUl(getUlList());
        }));
    }

    renderToUl(parentWindow){
        let bookLi = document.createElement("li");
        bookLi.dataset.bookId = this.id;
        bookLi.innerText = this.title;
        bookLi.addEventListener("click",liClickHandler);
        parentWindow.append(bookLi);
    }

    renderToPanel(parentWindow){
        parentWindow.innerHTML = "";
        let bookHeader = document.createElement("h3");
            bookHeader.innerText = this.title;
        let bookImg = document.createElement("img");
            bookImg.src = this.img_url;
        let bookDesc = document.createElement("p");
            bookDesc.innerText = this.description;
        let bookLikedUl = document.createElement("ul");
        this.users.forEach(user =>{
            let userLiked = new User(user);
            userLiked.renderToUl(bookLikedUl);
        });
        let bookReadButton = document.createElement("button");
            bookReadButton.innerText = "Read Book";
            bookReadButton.dataset.bookId = this.id;
            // bookReadButton.addEventListener("click",() => readButtonHandler(this));
            bookReadButton.addEventListener("click",readButtonHandler);
        parentWindow.append(bookHeader,bookImg,bookDesc,bookLikedUl,bookReadButton);
    }
}

function liClickHandler(e){
    fetch(BOOKSURL+e.currentTarget.dataset.bookId)
    .then(res => res.json())
    .then(book =>{
        let displayBook = new Book(book);
        displayBook.renderToPanel(getShowPanel());
    });
}

function readButtonHandler(e){
    fetch(BOOKSURL+e.currentTarget.dataset.bookId)
    .then(res => res.json())
    .then(book => { if (book.users.filter(user => user.id === 1).length>=1){
                alert("You've already read this book.")
            }else{
                book.users.push({id:1,username: "pouros"})
                let newUsers = {users: book.users};
                fetch(BOOKSURL+book.id,{
                            method: "PATCH",
                            headers: {"Content-Type" : "application/json"},
                            body: JSON.stringify(newUsers)
                        })
                        .then(res => res.json())
                        .then(updatedBook => {
                            let newBook = new Book(updatedBook);
                            newBook.renderToPanel(getShowPanel());
                        });
                        }
            });
}

// function readButtonHandler(book){
//     let currentUsers = book.users;
//     if (currentUsers.filter(user => user.id === 1).length>=1){
//         alert("You've already read this book.")
//     }else{
//     currentUsers.push({id:1,username: "pouros"})
//     let newUsers = {users: currentUsers};
//     fetch(BOOKSURL+book.id,{
//         method: "PATCH",
//         headers: {"Content-Type" : "application/json"},
//         body: JSON.stringify(newUsers)
//     })
//     .then(res => res.json())
//     .then(updatedBook => {
//         let newBook = new Book(updatedBook);
//         newBook.renderToPanel(getShowPanel());
//     });
//     }
// }