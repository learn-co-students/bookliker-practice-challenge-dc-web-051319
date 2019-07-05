const booksUrl = 'http://localhost:3000/books'

document.addEventListener('DOMContentLoaded', init);

function init() {
    fetchBooks()
}

function fetchBooks() {
    fetch(booksUrl)
        .then(response => response.json())
        .then(books => books.forEach(book => renderToDom(book)))
}

function renderToDom(book) {
    let li = document.createElement('li')
    li.innerText = book.title
    li.addEventListener('click', () => showBook(book))
    getUl().appendChild(li)
}

function showBook(book) {
    getDiv().innerHTML = ''

    let h1 = document.createElement('h1')
    h1.innerText = book.title
    let img = document.createElement('img')
    img.src = book.img_url
    let p = document.createElement('p')
    p.innerText = book.description
    
    
    let btn = document.createElement('button')
    btn.innerText = "Read Book"
    btn.addEventListener('click', () => addUser(book))
    
    getDiv().append(h1, img, p, btn)

    book.users.forEach(user => getUsers(user))
}

function addUser(book) {
    let me = { "id": 1, "username": "pouros" }

    if (book.users.find(user => user.id === me.id)) {
        alert("You read this already!")
    } else {
        book.users.push(me)

        let updatedUsers = {
            'users': book.users
        }
        fetch(`${booksUrl}/${book.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updatedUsers)
        })
            .then(response => response.json())
            .then(data => showBook(data))
    }
}

function getUsers(user) {
    let li = document.createElement('li')
    li.innerText = user.username
    getDiv().appendChild(li)
}

function getUl() {
    return document.querySelector('#list')
}

function getDiv() {
    return document.querySelector('#show-panel')
}
