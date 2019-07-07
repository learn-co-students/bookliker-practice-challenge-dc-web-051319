const BOOKS_URL = "http://localhost:3000/books"
const USERS_URL = "http://localhost:3000/users"
const myUser = {"id":1, "username":"pouros"}

document.addEventListener("DOMContentLoaded", init);

function init() {
  fetchBooks()
}

function fetchBooks() {
  return fetch(BOOKS_URL).then(r => r.json())
  .then(books => listBooks(books))
}

function fetchBook(id) {
  return fetch(`${BOOKS_URL}/${id}`).then(r => r.json())
  .then(book => showBook(book))
}

function updateLikes(id, bookLikers) {
  return fetch(`${BOOKS_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({users: bookLikers})
  }).then(r => r.json())
}

function listBooks(books) {
  const list = document.getElementById('list')
  books.forEach(book => {
    const id = book.id
    const li = document.createElement('li')
    li.innerText = book.title
    li.addEventListener('click', () => fetchBook(id))
    list.appendChild(li)
  }) 
}

function showBook(book) {
  const showPanel = document.getElementById('show-panel')
    showPanel.innerHTML = ''

  const h2 = document.createElement('h2')
    h2.innerText = book.title
  const img = document.createElement('img')
    img.src = book.img_url
  const p = document.createElement('p')
    p.innerText = book.description
 
  const ul = document.createElement('ul')
    ul.classList.add('book-likers')
    const bookLikers = book.users
    bookLikers.forEach(user => appendUser(user, ul))

  const button = document.createElement('button')
  button.dataset.id = book.id
  button.innerText = "Like Book"
  button.addEventListener('click', () => likeBook(book))

  showPanel.append(h2, img, p, ul, button)
}

function likeBook(book){
  const ul = document.querySelector('.book-likers')
  const id = book.id
  const bookLikers = book.users

  if (findUser(book)) {
    bookLikers.pop(myUser)
    updateLikes(id, bookLikers).then(removeUser(myUser))
  } 
  else {
    bookLikers.push(myUser)
    updateLikes(id, bookLikers).then(appendUser(myUser, ul))
  }
}

function findUser(book) {
  const bookLikers = book.users
  return bookLikers.find(user => user.id === myUser.id)
}

function appendUser(user, ul) {
  let li = document.createElement('li')
  li.innerText = user.username
  li.dataset.userId = user.id
  ul.appendChild(li)
}

function removeUser(user) {
  document.querySelector(`[data-user-id="${user.id}"]`).remove()
}