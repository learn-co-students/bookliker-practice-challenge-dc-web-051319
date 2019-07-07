const BOOKSURL = "http://localhost:3000/books/"
const USERSURL = "http://localhost:3000/users/"


document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Finished Loading.");
    console.log("Connected");
    Book.getAllBooks();

});

function getUlList(){
    return document.getElementById("list");
}

function getShowPanel(){
    return document.getElementById("show-panel");
}