var selectCity = document.getElementById("select-city");
var selectDistrict = document.getElementById("select-district");

axios.get('https://thongtindoanhnghiep.co/api/city').then(respone => {
    console.log(respone.data.LtsItem)
    respone.data.LtsItem.forEach(c => {
        var option = document.createElement("option");
        option.text = c.Title;
        option.value = c.ID;
        selectCity.appendChild(option)
    })
})
var onCityChange = function () {
    var value = selectCity.value;
    selectDistrict.innerHTML = ''
    axios.get('https://thongtindoanhnghiep.co/api/city/' + value + '/district').then(respone => {
        respone.data.forEach(c => {
            var optionDistrict = document.createElement("option");
            optionDistrict.text = c.Title;
            optionDistrict.value = c.ID;
            selectDistrict.appendChild(optionDistrict)
        })
    })
}