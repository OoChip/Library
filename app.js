const autor = document.getElementById ("autor")
const title = document.getElementById("title")
const pages = document.getElementById("pages")
const readed = document.getElementById("readed")
const addButton = document.getElementById("add")
const table = document.getElementById("table")

const myLibrary = [];
let autorValid = false
let titleValid = false
let pagesValid = false


autor.addEventListener("blur", checkValidityOfInput)
title.addEventListener("blur", checkValidityOfInput)
pages.addEventListener("blur", checkValidityOfInput)
addButton.addEventListener("click", createAndAddBook)

function checkValidityOfInput (e){
    let target = e.target.name
    switch (target){
        case "autor":
            if (e.target.validity.valid){
                autorValid = true
                }else{
                autorValid = false 
                }
            break
        case "title":
            if (e.target.validity.valid){
                titleValid = true
                }else{
                titleValid = false 
                }
            break
        case "pages":
            if (e.target.validity.valid){
                pagesValid = true
                }else{
                pagesValid = false 
                }
            break
    }

     if (autorValid && titleValid && pagesValid){
        addButton.disabled = false
     }else{
        addButton.disabled = true
     }
}

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
    reset()
}

function reset(){
    autor.value = ""
    title.value = ""
    pages.value = ""
    addButton.disabled = true
    autorValid = false
    titleValid = false
    pagesValid = false
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
                let label = document.createElement("label")
                label.className = "switch"
                let input = document.createElement("input")
                input.type = "checkbox"
                input.className = "readed"
                let span = document.createElement("span")
                span.className = "slider"
                label.appendChild(input)
                label.appendChild(span)
                newTd.appendChild(label)
                if (newBook.readed){
                    input.checked = true
                }else{
                    input.checked = false
                }
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
addBookToLibrary (new Book("Maquiavelo", "El Principe", 82, true));
addBookToLibrary (new Book("Platon", "Dialogos", 841, true));