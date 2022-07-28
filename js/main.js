document.addEventListener("DOMContentLoaded", function () { // berfungsi sebagai listener yang akan menjalankan kode di 
                                                            // dalamnya jika DOM sudah di-load dengan baik.
    const submitForm = document.getElementById("form"); // berfungsi untuk mengambil element dengan id “form” yang berada pada file html. 
                                                        // Setelah didapatkan, element tersebut kita masukkan ke dalam variable submitForm.
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();// Kode ini berfungsi untuk mencegah behaviour asli agar tidak dijalankan pada hal ini fungsi refresh yang dihilangkan 
        addTodo(); // bertujuan untuk menjalankan kode yang akan menambahkan todo ke dalam todo list
    });

 
    if(isStorageExist()){
        loadDataFromStorage();
    }
    });// Kode di atas berfungsi untuk memanggil fungsi yang digunakan untuk memuat data dari 
    //storage (loadDataFromStorage()) ketika semua elemen sudah ready.
    document.addEventListener("ondatasaved", () => {
        console.log("Data berhasil disimpan.");
    }); // Kode di atas berguna untuk catch (menangkap) event yang telah kita buat. Event yang ditangkap bernama 
    //‘ondatasaved’, yang berfungsi untuk memberitahu kepada observer (event listener) bahwa data telah berhasil disimpan. 
    // Yang mana, event ini dipanggil (dispatch) oleh fungsi saveData() yang telah kita buat sebelumnya.
    document.addEventListener("ondataloaded", () => { // digunakan untuk menangkap event ketika data berhasil dimuat ke dalam array todos
        refreshDataFromTodos(); // panggil fungsi refreshDataFromTodos() yang telah dibuat sebelumnya.


    });
