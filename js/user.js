class User{
    constructor(user){
        this.id = user.id;
        this.username = user.username;
    }

    renderToUl(parentWindow){
        let userLi = document.createElement("li");
        userLi.innerText = this.username;
        parentWindow.append(userLi);
    }
}