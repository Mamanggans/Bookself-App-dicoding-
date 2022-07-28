const BELUM_DIBACA = "incompleteBookshelfList";
const CUDAH_DIBACA = "completeBookshelfList";
const BOOK_ITEMID = "itemId";



function makebook(title, penulis, tahun, isCompleted) {

    const textTitle = document.createElement("h3");
    textTitle.setAttribute("id","judul")
    textTitle.innerText = title;

    const textpenulis = document.createElement("p");
    textpenulis.setAttribute("id","penulis")
    textpenulis.innerText = penulis;

    const yearbook = document.createElement("p");
    yearbook.setAttribute("id", "year");
    yearbook.innerText = tahun;



    const textContainer = document.createElement("div");
    textContainer.classList.add("book_item");
    textContainer.append(textTitle, textpenulis, yearbook,);

    const container = document.createElement("div");
    container.classList.add("action");
    container.append(textContainer);

    if (isCompleted) {
        textContainer.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        textContainer.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return textContainer;
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function createUndoButton() {
    return createButton("green2", function (event) {
        createButton.innerText = "Masukkan Buku ke Rak <span>Belum selesai dibaca</span>";  
        undoTaskFromCompleted(event.target.parentElement);
        
    });
}

function createTrashButton() {
    return createButton("red", function (event) {
        createButton.innerText = "Masukkan Buku ke Rak <span>Belum selesai dibaca</span>";  
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("green", function (event) {
        createButton.innerText = "Masukkan Buku ke Rak <span>Belum selesai dibaca</span>";  
        addTaskToCompleted(event.target.parentElement);
    });
}

function addbook() {
    const belumdibaca = document.getElementById(BELUM_DIBACA);
    const textTitle = document.getElementById("inputBookTitle").value;
    const author =  "penulis : " + document.getElementById("inputBookAuthor").value;
    const year = "tahun : " + document.getElementById("inputBookYear").value;



    const book = makebook(textTitle, author, year, false);
    const bookObject = composeBookObject(textTitle, author, year, false);
    
    book[BOOK_ITEMID] = bookObject.id;
    books_list.push(bookObject);

    belumdibaca.append(book);
    updateDataToStorage();
}
function checkbook() {
    const listBookCompleted = document.getElementById(CUDAH_DIBACA);
    const textTitle = document.getElementById("inputBookTitle").value;
    const taskbookauthor = "penulis : " + document.getElementById("inputBookAuthor").value;
    const taskyearbook = "tahun : " + document.getElementById("inputBookYear").value;

    const newbook = makebook(textTitle, taskbookauthor,taskyearbook, true);
    const bookObject = composeBookObject(textTitle, taskbookauthor,taskyearbook, true);

    newbook[BOOK_ITEMID] = bookObject.id;
    books_list.push(bookObject);

    listBookCompleted.append(newbook);

    updateDataToStorage();

}

function addTaskToCompleted(taskElement) {
    const listBookCompleted = document.getElementById(CUDAH_DIBACA);
    const taskbookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const taskbookauthor = taskElement.querySelector(".book_item > p").innerText;
    const taskyearbook = document.getElementById("year").innerText;

    const newbook = makebook(taskbookTitle, taskbookauthor,taskyearbook, true);
    

    const book = findbook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newbook[BOOK_ITEMID] = book.id;

    listBookCompleted.append(newbook);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement) {

    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books_list.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement) {
    const listBookUncompleted = document.getElementById(BELUM_DIBACA);
    const taskbookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const taskbookauthor = taskElement.querySelector(".book_item > p").innerText;
    const taskyearbook = document.getElementById("year").innerText;
    
    const newbook = makebook(taskbookTitle, taskbookauthor,taskyearbook, false);

    const book = findbook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newbook[BOOK_ITEMID] = book.id;

    listBookUncompleted.append(newbook);
    taskElement.remove();
    
    updateDataToStorage();
}
function refreshDataFrombook() {
    const listBookUncompleted = document.getElementById(BELUM_DIBACA);
    let listBookCompleted = document.getElementById(CUDAH_DIBACA);

    for(book of books_list){
        const newbook = makebook(book.bookTitle, book.author, book.yearbook, book.isCompleted);
        newbook[BOOK_ITEMID] = book.id;

        if(book.isCompleted){
            listBookCompleted.append(newbook);
        } else {
            listBookUncompleted.append(newbook);
        }
    }
}
function fungsigantibutton() {
    var btn = document.getElementById("submit-belu");
    var check = document.getElementById("inputBookIsComplete")
    
    if (btn.style.backgroundColor == "rgb(137, 235, 1)") {
          btn.style.backgroundColor = "rgb(100, 149, 237)"
          btn.innerHTML = "Masukkan Buku ke Rak <span>Belum selesai dibaca</span>";  
          btn.style.color = "white"
      }else {
          btn.style.backgroundColor = "rgb(137, 235, 1)"
          btn.innerHTML = "Masukkan Buku ke Rak <span>Sudah selesai dibaca</span>";
          btn.style.color = "black"
      }}


const list = document.getElementById(CUDAH_DIBACA);

const cariform = document.forms["searchBook"].querySelector("input");
cariform.addEventListener("keyup", (e) => {
    const term = e.target.value.toLowerCase();
    const Buku = list.getElementsByTagName("h3"); 
    Array.from(Buku).forEach((Buku) => {
        const judul = Buku.getElementsByTagName("h3").textContent;
        if(judul.indexOf(e.target.value) != -1){
            Buku.style.display = 'block';
          } else {
            Buku.style.display = 'none';
          }
        });
      });



