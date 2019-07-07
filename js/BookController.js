class BookController{
    static init(){
        console.log("1. Initialized")
        BookController.renderBooks()
    }

    static renderBooks(){

        // Queries for constant non iterating elements
        console.log("2. Render the Books")
        const listPanelDiv = document.getElementById("list-panel");
        const ul = document.getElementById("list");
        

        Adapter.getBooks()
        .then( bookArray => {
            bookArray.forEach(book => {
                let b = new Book(book)
                ul.append(b.getLi())
            })
        })
    }

    static showBookData(book){
        const showPanelDiv = document.getElementById("show-panel")
        console.log("3. Listen for clicks")
        showPanelDiv.innerText = " "
        showPanelDiv.append(book.getH2(), book.getImage(), book.getP(), book.getH4(), book.getButton())
        
    }
}