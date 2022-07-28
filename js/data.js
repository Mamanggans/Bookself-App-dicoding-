const STORAGE_KEY = "TODO_APPS"; // Berfungsi untuk menyediakan key yang digunakan untuk mengakses data pada local storage
 
let todos = []; // Sebuah global variable yang digunakan untuk menyimpan data temporary dari TODO.
 
function isStorageExist() /* boolean */ { 
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
} /// fungsi untuk mengecek dukdukungan web storage pada browser. Mengembalikan nilai false apabila tidak didukung.
 
function saveData() {
   const parsed = JSON.stringify(todos); /// mengkonversikan data pada global variabel todo ke JSON-formatted string 
   localStorage.setItem(STORAGE_KEY, parsed); // lalu disimpan ke storage key 
   document.dispatchEvent(new Event("ondatasaved")); // Setelah itu, fungsi ini mentrigger custom event ‘ondatasaved’
} // Fungsi yang digunakan untuk menyimpan data TODO ke storage.
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY); // mwndapatkan data dari storage_key 
   
   let data = JSON.parse(serializedData); // mengubah datanya menjadi data json 
   
   if(data !== null)
       todos = data; // Memuat data TODO dari web storage ke dalam variabel todos.
 
   document.dispatchEvent(new Event("ondataloaded")); // Kemudian trigger custom event ‘ondataloaded’ agar kita bisa menggunakannya untuk load data pada aplikasi.
} // fungsi ini dibuat untuk 
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData(); // jika exist maka dia simpen data kosong dulu 
} // Fungsi yang digunakan sebagai perantara dalam menyimpan data,
// ia memastikan terlebih dahulu apakah web storage sudah didukung oleh browser sebelum memanggil saveData()
 
function composeTodoObject(task, timestamp, isCompleted) {
   return {
       id: +new Date(),
       task,
       timestamp,
       isCompleted
   }; // membuat objek baru untuk variable task, timestamp dan is complete 
} // atau Fungsi yang digunakan untuk membuat objek TODO baru dari beberapa parameter yang telah ditentukan.
 
function findTodo(todoId) { // Mencari objek task TODO yang ada pada array todos berdasarkan ID 
   for(todo of todos){
       if(todo.id === todoId)
           return todo; // Lalu mengembalikan objek TODO jika ditemukan
   }
   return null; // kalo kaga ditemukan yah null 
}
 
 
function findTodoIndex(todoId) { // Mencari index dari objek task TODO yang ada pada array todos berdasarkan ID
   let index = 0
   for (todo of todos) {
       if(todo.id === todoId)
           return index; // mengembalikan nilai index (posisi) jika ditemukan
 
       index++;
   }
 
   return -1; // mengembalikan nilai -1 kalo tidak ditemukan 
}
function refreshDataFromTodos() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
 
 
   for(todo of todos){
       const newTodo = makeTodo(todo.task, todo.timestamp, todo.isCompleted); // membuat elemen task TODO,
       newTodo[TODO_ITEMID] = todo.id; // menentukan ‘tempat’ bagi elemen tersebut dibuat.
 
 
       if(todo.isCompleted){
           listCompleted.append(newTodo); // Jika nilai dari isCompleted bernilai true, maka elemen
                                        // TODO akan ditempatkan di dalam elemen listCompleted ATAU yang sudah dilakukan 
       } else {
           listUncompleted.append(newTodo); // jika tidak maka taro di listUncompleted atau yang harus dilakukan 
       }
   }
}// Fungsi ini digunakan untuk me-render data TODO yang ada pada object array todos. 
// Dalam mengambil data dari array, tentu kita 
// membutuhkan sebuah perulangan atau iterasi supaya data yang ada pada array tersebut bisa diakses satu per satu.
