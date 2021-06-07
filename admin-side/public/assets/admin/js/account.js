var showInput = function(){
    var textEmail = document.getElementById("text-email")
    var textUsername = document.getElementById("text-username")
    var textName = document.getElementById("text-name")
    var textPhone = document.getElementById("text-phone")
    var btnEdit = document.getElementById("btn_edit");
    

    var Email = document.getElementById("email")
    var Username = document.getElementById("username")
    var Name = document.getElementById("name")
    var Phone = document.getElementById("phone")
    var Password = document.getElementById("password")
    var GroupBtn = document.getElementById("group-btn");
    
    textEmail.classList.add("d-none");
    textUsername.classList.add("d-none");
    textName.classList.add("d-none");
    textPhone.classList.add("d-none");
    btnEdit.classList.add("d-none");
    
    Email.classList.remove("invisible");
    Username.classList.remove("invisible");
    Name.classList.remove("invisible");
    Phone.classList.remove("invisible");
    Password.classList.remove("invisible");
    GroupBtn.classList.remove("d-none");
}