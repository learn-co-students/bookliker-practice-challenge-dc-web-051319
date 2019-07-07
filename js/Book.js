class Book{
    constructor(book){
        this.id = book.id;
        this.title = book.title;
        this.description = book.description;
        this.img_url = book.img_url;
        this.users = book.users;
    }

    getLi() {
        let li = document.createElement("li");
        li.innerText = this.title
        li.addEventListener('click', () => BookController.showBookData(this))
        return li;
    }

    getImage(){
        let img = document.createElement("img");
        img.setAttribute("src", this.img_url);
        return img; 
    }

    getH2(){
        let h2 = document.createElement("h2");
        h2.innerText = this.title;
        return h2;
    }

    getP(){
        let p = document.createElement("p");
        p.innerText = this.description;
        return p;
    }

    getButton(){
        let btn = document.createElement("button");
        btn.innerText = "Read Book"
        return btn;
    }

    getH4(){
        let h4 = document.createElement("h4");
        let ul = document.createElement("ul")
        let li = document.createElement('li')
        let i
        for(i=0; i < this.users.length; i++){
            li.innerText = this.users[i].username;
        }
        ul.append(li)
        h4.append(ul)
        return h4;
    }

    
    

}