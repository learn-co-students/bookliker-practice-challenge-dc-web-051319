class Adapter{

    static getBooks(){
        return fetch("http://localhost:3000/books")
        .then(response => response.json())
    }



}