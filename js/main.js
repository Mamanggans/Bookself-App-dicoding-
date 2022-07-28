
document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("inputBook");
    const sub_btn = document.getElementById("submit_belu");
    const aft_btn = document.getElementById("submit_selesa");
    const kamvret = document.getElementById("inputBookIsComplete")

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (kamvret.checked === false){
            addbook();
        } else {
            checkbook();
    }
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});



document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFrombook();
});
