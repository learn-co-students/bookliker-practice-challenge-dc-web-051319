document.addEventListener("DOMContentLoaded", function() {
    getBooks()
});

//getting all of the books
function getBooks(){
    fetch('http://localhost:3000/books')
        .then(resp => resp.json())
        .then(book => book.forEach(title))
}

//creating button
function createButton(book){
   let btn = document.createElement('button')
    btn.id = book.id
    btn.innerText = "Read Book"
    return btn
}

// posting the titles to the DOM
function title(books){
    let ul = document.getElementById('list')
    
   let li =  document.createElement('li')
   li.id = books.id
   let h3 = document.createElement('h3')
   li.id = books.id
   li.innerText = books.title
   
   li.addEventListener('click', (e) => displayInfo(e, books))
   ul.appendChild(li)
   
}

//Posting info of the specific book to DOM 
function displayInfo(e, book){
    
    e.preventDefault()
    let show = document.getElementById('show-panel')
    show.innerHTML = ''
    let name = document.createElement('h3')
    name.innerText = book.title
    let img = document.createElement("img")
    img.src = book.img_url
    let p = document.createElement('p')

    p.innerText = book.description
    let ul = document.createElement('ul')
    ul.id = book.id
    let fans = getUsers(book, book.users, ul)
    let btn = createButton(book)
    btn.id = book.id
    btn.addEventListener('click', (e) => postUser(e, book))
    
    show.append(name, img, p, btn, fans)
}

//getting the users for that specific book 
function getUsers(book, user, ul){
    
    for(let i = 0; i < user.length; i++){
        
       let li = document.createElement('li')
        li.id = user[i].id
        li.innerText = user[i].username 
        let btn = createButton(user)
        btn.innerText = 'delete'
        btn.addEventListener('click', (e) => deleteName(e, book))
        li.appendChild(btn)
        ul.appendChild(li)  
    }
    return ul
}

// add a user and post it to the DOM
function postUser(e, book){ 

    e.preventDefault()
    let show = document.getElementById('show-panel')
    let newObj = {id: 1, username: "Peter"}
    let ul = e.target.nextElementSibling
    let nuUl= document.createElement('ul')
    let new_id = parseInt(e.target.id) 

   

if (book.users.filter(users => users.id === newObj.id).length > 0){
            alert("You already liked this book!");  
            
        }
        else{ 
            let newUser = book.users.push(newObj)
            fetch(`http://localhost:3000/books/${new_id}`, {
                method: 'PATCH',
                headers:{
                   'Content-Type': "application/json",
                   Accept: "application/json"
                   },
                body: JSON.stringify({
                   users: book.users
                   })
               })
   
           .then(resp => resp.json())
           .then(data => { 
               show.removeChild(ul)
                nuUl.id = data.id
              
               newUser = getUsers(data, data.users, nuUl)
             
               show.appendChild(newUser)    
           })
               
        }
        }

    


//Delete User
function deleteName(e, book){
    e.preventDefault()

    let li = e.target.parentElement
    
    let ul = e.target.parentElement.parentElement
    let id = parseInt(ul.id)
    var newUsers = book.users.filter(user => user.id != li.id) 
    li.remove()
    
    

    fetch(`http://localhost:3000/books/${id}`, {
        method: "PATCH", 
        headers:{
            "Content-Type": "application/json", 
            Accept: "application/json"
        },
        body: JSON.stringify({
            users: newUsers
        })
       
    })
    .then(resp => resp.json())
    .then(data => {data})
               
               
       
                   
       
}
