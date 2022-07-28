const STORAGE_KEY = "bookshelf";



let books_list = [];


 function isStorageExist() /* boolean */ {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    } 
    return true;
}


function saveData() {
    const parsed /* string */ = JSON.stringify(books_list);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}


function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
    books_list = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}


function composeBookObject(bookTitle, author, yearbook, isCompleted) {
    return {
        id: +new Date(),
        bookTitle,
        author,
        yearbook,
        isCompleted,
    };
}

function findbook(bookId) {

    for(book of books_list){
        if(book.id === bookId)
            return book;
    }

    return null;
}

function findBookIndex(bookId) {
    
    let index = 0
    for (book of books_list) {
        if(book.id === bookId)
            return index;

        index++;
    }

    return -1;
}
