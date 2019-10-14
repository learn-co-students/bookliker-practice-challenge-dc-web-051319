let booksUrl =  "http://localhost:3000/books"
let usersUrl = "http://localhost:3000/users"

document.addEventListener("DOMContentLoaded", function() {
    fetchBooks()
});

function fetchBooks(){
    fetch(booksUrl)
        .then(response => response.json())
        .then(books => {
            books.forEach(book=> {
                displayBook(book)
            });
        });
}

function displayBook(book){
    // console.log(book)
    let li = document.createElement("li");
    li.innerText = book.title;
    li.addEventListener("click", ()=> {
        showDetails(book)
    })

    getList().append(li)
}

function showDetails(book){

    getPanel().innerHTML = ""

    let h2  = document.createElement("h2");
    h2.innerText = book.title ;
    let image = document.createElement("img");
    image.src = book.img_url;
    let p = document.createElement("p");
    p.innerText = book.description;

    let ul = document.createElement("ul");
    ul.dataset.ulId = book.id
    getPanel().append(h2, image, p, ul)

    book.users.forEach(user =>{
        createUser(user, ul)
    })

    let button = document.createElement("button");
    button.innerText = 'read this book';
    button.addEventListener('click', ()=>{
        addUser(book)
    })
    getPanel().appendChild(button)
    // parentNode.appendChild();
}

function addUser(book){
    let me = {"id":1, "username":"pouros"}
    let foundUser = book.users.find(userobj => {
        return userobj.id === me.id
    })

    if (foundUser) {
        alert("you already read this")
    } else{

    


    let usersArray  = book.users
    
    usersArray.push(me)

    // let updateData = {
    //     : ,
    //     : 
    // };
    
    let configObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            users: usersArray
        })
    };
    
    fetch(booksUrl+"/"+book.id, configObject)
        .then(response => response.json())
        .then(book => {
            showDetails(book)
        })
        .catch(error => {
            window.alert(error.message);
        });
    }
}


function createUser(user, ul){
    let li = document.createElement("li");
    li.innerText = user.username;
    li.dataset.userId = user.id
    ul.appendChild(li)
}
///

function getList(){
    return document.getElementById("list")
}

function getPanel(){
   return document.querySelector("#show-panel")
}