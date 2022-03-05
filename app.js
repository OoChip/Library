const myLibrary = [];
const autor = document.getElementById ("autor")
const title = document.getElementById("title")
const pages = document.getElementById("pages")
const readed = document.getElementById("readed")
const addButton = document.getElementById("add");
addButton.addEventListener("click", createAndAddBook);

const table = document.getElementById("table")

class Book {
    constructor(autor, title, pages, readed) {
        this.autor = autor
        this.title = title
        this.pages = pages
        this.readed = readed 
    }
    set setReaded (a){this.readed = a}
    get getReaded(){return this.readed}
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook)
    draw(newBook)
}

function createAndAddBook (e){
   addBookToLibrary (new Book(autor.value, title.value, pages.value, readed.checked))
}

function draw (newBook){
    const newBookIndex = myLibrary.length - 1
    const newTr = document.createElement("tr") 
    newTr.id = `book${newBookIndex}`

    for (let i = 0; i <= 5; i++) {
        let newTd = document.createElement("td");
        switch(i){
            case 0:
                newTd.innerText = newBookIndex
                break
            case 1:
                newTd.innerText = newBook.autor
                break
            case 2:
                newTd.innerText = newBook.title
                break
            case 3:
                newTd.innerText = newBook.pages
                break
            case 4:
                newTd.innerText = newBook.readed
                break
            case 5:
                let erase = document.createElement ("img")
                erase.src = "./assets/erase.svg"
                erase.id = `${newBookIndex}`
                erase.alt = "erase"
                erase.addEventListener ("click", eraseBook)
                newTd.appendChild(erase)
                break
        }
        newTr.appendChild(newTd);
    }

        table.appendChild(newTr)
}


function eraseBook (e){
    let id = e.target.id
    myLibrary.splice((id), 1);
    console.log(myLibrary);
    eraseBookInTable(id)
}

function eraseBookInTable(id){
    let tdToErase = document.getElementById (`book${id}`)
    console.log(tdToErase);
    tdToErase.parentElement.removeChild(tdToErase);
}


addBookToLibrary (new Book("Serafin Masparrote", "Biologia 8°", 124, true));
addBookToLibrary (new Book("Galileo Galilei", "Diagrama Veritate", 43, false));
console.log(myLibrary);





