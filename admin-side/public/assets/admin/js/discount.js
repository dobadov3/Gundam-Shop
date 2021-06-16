var inputText = document.getElementById("text-expire");
var inputDate = document.getElementById("date-expire");
var btn = document.getElementById("btn-edit-expire");

var showDateExpire = function(){
    var condition = inputText.disabled;

    if (condition){
        inputText.disabled = false;
        inputDate.disabled = false;
        inputText.classList.add('d-none')
        inputDate.classList.remove("d-none");
        btn.textContent = "Hủy"
    }else{
        inputText.disabled = true;
        inputDate.disabled = true;
        inputDate.classList.add("d-none");
        inputText.classList.remove("d-none");
        btn.textContent = "Cập nhật";
    }
}