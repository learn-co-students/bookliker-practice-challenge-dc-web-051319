document.addEventListener("DOMContentLoaded", function() {
    getBooks()
});

// api 
function getBooks(){
        fetch('http://127.0.0.1:3000/books')
        .then(resp => resp.json())
        .then(books => books.forEach(book => addBook(book)))
}

function getBook(){
    let bookId = event.target.dataset.bookId
    fetch(`http://127.0.0.1:3000/books/${bookId}`)
    .then(resp => resp.json())
    .then(book => showInformation(book))
}

function likeBook(book){
    book.users.push({"id":1, "username":"pouros"})
    
    fetch(`http://localhost:3000/books/${book.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({users: book.users}) 
    })
    .then(resp => resp.json())
    .then(book => showInformation(book))
}

function unlikeBook(book){
    book.users = book.users.filter(user => user.id != 1)
    console.log(book.users)
    fetch(`http://localhost:3000/books/${book.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({users: book.users}) 
    })
    .then(resp => resp.json())
    .then(book => showInformation(book))
}
// modify dom

function addBook(book){
    let li = document.createElement('li')
    li.innerText = book.title
    li.dataset.bookId = book.id 
    li.addEventListener('click', getBook)

    list().appendChild(li)
}

function showInformation(book){
    showPanel().innerHTML = ''

    let img = document.createElement('img')
    img.src = book.img_url
    
    let btn = document.createElement('button')
    
    if (book.users.find(user => user.id === 1 )){
        btn.innerText = "Unlike?"
        btn.addEventListener('click', function(){
            unlikeBook(book)
        })
    } else {
        btn.innerText = "Like?"
        btn.addEventListener('click', function(){
            likeBook(book)
        })
    }

    let h2 = document.createElement('h2')
    h2.innerText = book.title

    let p = document.createElement('p')
    p.innerText = book.description

    let h3 = document.createElement('h3')
    h3.innerText = "Liked by:"

    let ol = document.createElement('ol')
    book.users.forEach(user => {
        let li = document.createElement('li')
        li.id = user.id
        li.innerText = user.username
        ol.appendChild(li)
    })

    showPanel().append(img, btn, h2, p, h3, ol)
}

// selectors 
function list(){
    return document.getElementById('list')
} 

function showPanel(){
    return document.getElementById('show-panel')
}

