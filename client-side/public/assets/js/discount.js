var input = document.getElementById("input-discount");
var inputFinal = document.getElementById("input-finalPrice");
var btn = document.getElementById("btn-apply");
var temp = document.getElementById("text-temp");
var final = document.getElementById("text-final");
var divAlert = document.getElementById("alert");

var clickBtnDiscount = function(){
    axios.get(`http://localhost:3000/api/discount/${input.value}`).then(res => {
        if (!res.data){
            console.log('null')
            divAlert.textContent = "Mã của bạn không đúng"
            divAlert.classList.remove('hide')
            divAlert.classList.add('show')
            setTimeout(function(){
                divAlert.classList.add("hide");
                divAlert.classList.remove("show");
            }, 3000)
        }else{
            var expire = new Date(res.data.expire);
            var today = new Date()
            if (expire < today){
                divAlert.textContent = "Mã của bạn đã hết hạn";
                divAlert.classList.remove("hide");
                divAlert.classList.add("show");
                input.value = ''
                setTimeout(function () {
                    divAlert.classList.add("hide");
                    divAlert.classList.remove("show");
                }, 3000);
                return
            } 
            var multi = (100 - res.data.multiply) / 100;
            console.log(multi)
            var text_temp = temp.textContent;
            var text_final = final.textContent;
            temp.textContent = (parseFloat(text_temp.slice(0, text_temp.length - 2)) *1000 * multi).toLocaleString('vi', {style : 'currency', currency : 'VND'})
            final.textContent = (parseFloat(text_final.slice(0, text_temp.length - 2)) *1000 * multi).toLocaleString('vi', {style : 'currency', currency : 'VND'})
            btn.disabled = true;
            input.disabled = true;
            inputFinal.value = parseFloat(text_temp.slice(0, text_temp.length - 2)) *1000 * multi
        }
    });

    
}

var inputDiscount = function(){
    if (input.value === ''){
        btn.disabled = true
    }else{
        btn.disabled = false

    }
}

inputDiscount()