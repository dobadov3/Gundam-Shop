axios.get('http://localhost:3001/api/orders').then(response=>{
    for(let i=0;i<response.data.length;i++)
    {
        for(let j=0;j<response.data[i].products.length;j++)
        id.push(response.data[i].products[j]._id) 
    }
    var toplist = foo(id)
    axios.get('http://localhost:3001/api/products').then(response=>{
        for(let i=0;i<toplist[0].length;i++)
        {
            for(let j=0;j<response.data.length;j++)
            {
                console.log(response.data[j]._id)
                if(toplist[0][0]==response.data[j]._id)
                {
                    document.getElementById("bestsellergold").src=response.data[j].image[0]
                    document.getElementById("bestsellername1").innerHTML=response.data[j].name
                    document.getElementById("bestsellercount1").innerHTML=toplist[1][0] +" sản phẩm"
                }      
                if(toplist[0][1]==response.data[j]._id)
                {
                    document.getElementById("bestsellersilver").src=response.data[j].image[0]
                    document.getElementById("bestsellername2").innerHTML=response.data[j].name
                    document.getElementById("bestsellercount2").innerHTML=toplist[1][1] +" sản phẩm"
                } 
                if(toplist[0][2]==response.data[j]._id)
                {
                    document.getElementById("bestsellerbronze").src=response.data[j].image[0]
                    document.getElementById("bestsellername3").innerHTML=response.data[j].name
                    document.getElementById("bestsellercount3").innerHTML=toplist[1][2] +" sản phẩm"
                } 
            }
        }
    })
})
function foo(arr) {
    var a = [], b = [], prev;
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    return [a, b];
}