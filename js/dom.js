const UNCOMPLETED_LIST_TODO_ID = "todos";

function addTodo() {
const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);

const textTodo = document.getElementById("title").value; // buat texttodo dengan memanggil title di html 
const timestamp = document.getElementById("date").value; // buat timestamp dengan memanggil date di html 
console.log("todo" + textTodo); // untuk ie di browser 
console.log("timestamp" + timestamp);

// for (let i = 0; i < 10; i++) // ini artinya jika i sama dengan 0 (let i = 0) maka i akan diulang sampe 10 kali dari nol(i < 10) dengan nambahi 1 per 1 
    const todo = makeTodo(textTodo, timestamp); // buat variabel atau elemen baru dengan memanngil fungsi makeTodo (masukin data dalam kontainer )
                                                // lalu masukin variabel text todo dan timestamp kedalam container yang dibuat oleh maketodo
    uncompletedTODOList.append(todo); // masukan variabel fungsi uncompletedTODOList kedalam fungsi make todo 

}
function makeTodo(data, timestamp, isCompleted) {
 
    const textTitle = document.createElement("h2"); // membuat elemen / variabel h2 pada html kita 
    textTitle.innerText = data; // masukan kata kata nya 

    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = timestamp;

    const textContainer = document.createElement("div"); // membuat kelas elemen div dengan class inner d
    textContainer.classList.add("inner") // menamai nya dengan denga nama inner 
    textContainer.append(textTitle, textTimestamp); // dan masukan textitle dan textimestamp dengan append ke dalam html sehingga bentuk nya jadi 
    /* <div class="inner">
    <h2>Tugas Android</h2>
    <p>2021-05-01</p>
    </div> */
    const container = document.createElement("div"); // buat container div baru 
    container.classList.add("item", "shadow") // kasih kelas item dan shadow 
    container.append(textContainer); // masukan textcontainer didalamnya sehingga bentuk nya jadi

    // <div class="item shadow">
    // <div class="inner">
    //     <h2>Tugas Android</h2>
    //     <p>2021-05-01</p>
    // </div>
    // </div>

    if(isCompleted){
        container.append(
            createTrashButton(),
            createUndoButton()); // button yang ada di is completed dipanggil kesini 
    } else {
        container.append(createCheckButton());
    } 
    return container; // Lalu kita gunakan return statement untuk mengembalikan nilai variabel container yang telah dibuat tadi.
    }

    // membuat button menandai sudah selesai (button checlis yang disamping)
    function createButton(buttonTypeClass , eventListener) { // buat  button dengan class yang didapat dari parameter buttontypeclass 
        const button = document.createElement("button");
        button.classList.add(buttonTypeClass);
        button.addEventListener("click", function (event) { // diberikan sebuah listener ketika diklik 
            eventListener(event);
        }); // Penjelasan dari kode tersebut adalah, kita membuat sebuah elemen button dengan class yang didapat dari parameter buttonTypeClass. 
            // Lalu button tersebut diberi listener ketika diklik. Ketika button tersebut diklik maka fungsi pada parameter eventListener akan dijalankan.
        return button; // jan lupa majikal words 
        }
    const COMPLETED_LIST_TODO_ID = "completed-todos"; // variabel konstan yang bersifat global untuk menampung 
                                                      // id dari elemen container todo yang sudah selesai
                                                      // biar dimasukin di id div di html
    
    function addTaskToCompleted(taskElement) {
        const taskTitle = taskElement.querySelector(".inner > h2") // manggil div yang kita buat diatas trus dibikin disini dengang is h2 
        const taskTimestamp = taskElement.querySelector(".inner > p").innerText; // sama cuman abis h2 ada p
        const newTodo = makeTodo(taskTitle, taskTimestamp, true); // ambil valu lalu buat gabugin abis itu 
        const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID); // buat variabel listcom panggil completed.. untuk dimasukin ke div html 
        listCompleted.append(newTodo);  // masukin ke berkas html yang waktu itu 
        taskElement.remove();// menghapus elemn yang data nya telah diisi trus pencet tombol ceklis ilang dah 
    } // keselurahn fungsi diatas adalah untuk memindahkan data dari "todos" ke "completed-todo"


    function removeTaskFromCompleted(taskElement) {
        taskElement.remove(); // ngapus buat di id "completed-todo"
    }
    function createTrashButton(){
        return createButton("trash-button", function(event){ // buat elemen button dengan css dari trash-button dan membuat button deng class yg sama 
            removeTaskFromCompleted(event.target.parentElement); // event mengambil button check button lalu event menargetkan utnuk digunakan dimana dia dipanggil 
        });
    }
    function createCheckButton() {
        return createButton("check-button", function(event){ // buat elemen button dengan css dari check-button dan membuat button deng class yg sama 
            addTaskToCompleted(event.target.parentElement); // event mengambil button check button lalu event menargetkan utnuk digunakan dimana dia dipanggil 
        });
    }
    function createUndoButton() {
        return createButton("undo-button", function(event){
            undoTaskFromCompleted(event.target.parentElement);
        });
    }
    function undoTaskFromCompleted(taskElement){
        const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID); // membuat variabel baru denga isi dari id TODOS
        const taskTitle = taskElement.querySelector(".inner > h2").innerText;  // manggil div yang kita buat diatas trus dibikin disini dengang is h2 
        const taskTimestamp = taskElement.querySelector(".inner > p").innerText; // sama cuman abis h2 ada p
     
        const newTodo = makeTodo(taskTitle, taskTimestamp, false); // ini untuk membuat variabel new todo dengan mengisi itu dari tasktitle dan timestamp 
        const todo = findTodo(taskElement[TODO_ITEMID]);
        todo.isCompleted = false; // a bagian property isCompleted diubah ke false, yang berarti akan mengubah statusnya menjadi ‘not completed’.
        newTodo[TODO_ITEMID] = todo.id;
        listUncompleted.append(newTodo);// masukin datanya ke newtodo (taskTitle, taskTimestamp)
        taskElement.remove(); // meremove si data dari completed_todo
        updateDataToStorage();
    }

    const TODO_ITEMID = "itemId";
    function addTodo() {
        const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID); // buat const dari uncompletedlist
        const textTodo = document.getElementById("title").value; //dapetin value title
        const timestamp = document.getElementById("date").value; //dapetin value Date
      
        const todo = makeTodo(textTodo, timestamp, false);
        const todoObject = composeTodoObject(textTodo, timestamp, false); //1
       
        todo[TODO_ITEMID] = todoObject.id;// ini berfungsi untuk mentrack perubahan pada masing masing elemn 
        todos.push(todoObject);//2 
        //1 dan 2 baris berfungsi untuk menyimpan objek task yang kita buat ke dalam variabel todos yang telah dibuat sebelumnya.
        uncompletedTODOList.append(todo); // masukin lagi seperti biasa 
        updateDataToStorage(); // Kemudian, agar data pada storage bisa up-to-date maka jangan lupa untuk memanggil
     }
     function addTaskToCompleted(taskElement /* HTMLELement */) {
        const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
        const taskTitle = taskElement.querySelector(".inner > h2").innerText;
        const taskTimestamp = taskElement.querySelector(".inner > p").innerText;
      
        const newTodo = makeTodo(taskTitle, taskTimestamp, true);
        const todo = findTodo(taskElement[TODO_ITEMID]); //  cari objek todo yang mau di update pada array todo
        todo.isCompleted = true; // ubah property isCompleted menjadi true supaya TODO ini ditandai ‘selesai’,
        newTodo[TODO_ITEMID] = todo.id; // update lagi identifier yang ada pada elemen TODO yang baru.
      
        listCompleted.append(newTodo);
        taskElement.remove();
      
        updateDataToStorage();
     }
     function removeTaskFromCompleted(taskElement /* HTMLELement */) {
 
        const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]); // mencari objek yang mau kita hapus 
        todos.splice(todoPosition, 1); // lalu menghapus objek tersebut dengan menggunakan fungsi splice().
      
        taskElement.remove();
        updateDataToStorage();
     } //Cara kerja dari fungsi ini adalah menghapus objek yang ada pada suatu array sesuai dengan index yang 
    // didefinisikan pada argumen pertama dari fungsi, dengan spesifikasi jumlah objek pada argumen kedua yang akan 
     //dihapus dimulai dari index pada argumen pertama tadi.
    // Karena kita hanya butuh untuk menghapus satu objek saja, maka pada argumen kedua kita definisikan ke 1 (satu).


     // buat fungsi addtodo dengan memanggil fungsi maketodo
//===================================================================================================================\\
   // fungsi kek update4 gitu jadi kan button tadi dah bisa ngapus nah apusan nya itu dio taro disini 



