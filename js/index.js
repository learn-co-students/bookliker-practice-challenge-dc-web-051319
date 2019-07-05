const BOOK_URL = "http://localhost:3000/books"
const bookListId = document.getElementById("list")
const showPanel = document.getElementById("show-panel")

document.addEventListener("DOMContentLoaded", init);

function init() {

  getBooks()

}

function getBooks() {
  fetch(BOOK_URL)
  .then(response => response.json())
  .then(books => listBooks(books))

}

function listBooks(books) {
  books.forEach(book => {
    let li = document.createElement("li")
    li.innerText = book.title
    li.dataset.bookId = book.id
    li.addEventListener("click", () => showBook(book)) // Passes the book object associated with the LI book to the next function
    bookListId.appendChild(li)
  })
}


function showBook(book) {
  showPanel.innerHTML = ""
  let b = book
  let img = document.createElement("img")
  img.src = book.img_url
  let h1 = document.createElement("h1")
  h1.innerText = book.title
  let p = document.createElement("p")
  p.innerText = book.description
  let likeBtn = document.createElement("button")
  likeBtn.innerText = "Like Book"
  likeBtn.addEventListener("click", () => likeBook(book))
  let ul = document.createElement("ul")
  ul.dataset.ulBookId = book.id
  showPanel.append(img, h1, p, likeBtn, ul)
  book.users.forEach( user => {
    let li = document.createElement("li")
    li.id = user.id
    li.innerText = user.username
    ul.appendChild(li)
  })
}

function likeBook(book) {
  let me = {"id":1, "username":"pouros"}
  let newArray = []
  let getUl = document.querySelector(`[data-ul-book-id='${book.id}']`)
  let ulChildren = getUl.children
  let likeArray = Array.from(ulChildren)
  let result = likeArray.find(user => user.innerText === me.username)

  if (result) {
    alert("I know that the book is pretty good, but you can only like it once!")
  } else {
    book.users.forEach( user => newArray.push(user))
    newArray.push(me)
    fetch(BOOK_URL + "/" + `${book.id}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        users: newArray
      })
    })
    .then(response => response.json())
    .then(likers => {
      getUl.innerHTML = ""
      likers.users.forEach( user => {
        let li = document.createElement("li")
        li.id = user.id
        li.innerText = user.username
        getUl.appendChild(li)
      })
    })
  }
}
