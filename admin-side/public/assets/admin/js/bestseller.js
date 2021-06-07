var id=[];
var totalMoney =0;
var totalOrder =0;
let myChart = document.getElementById('myChart').getContext('2d');
let myChart2 = document.getElementById('myChart2');
axios.get('http://localhost:3001/api/orders').then(response=>{
  const sales=[0,0,0,0,0,0,0,0,0,0,0,0]
  var month =["January","February","March","April","May","June","July","August","September","October","November","December"]
  var detail_category=["SD","Tamiya"]
  for(let i=0;i<response.data.length;i++)
    {
        for(let j=0;j<response.data[i].products.length;j++)
        {
            id.push(response.data[i].products[j]._id)
            totalMoney =totalMoney+ response.data[i].products[j].priceSale
            totalOrder = response.data.length
        }
    }
  //chart
  
  console.log(response.data)
  response.data.forEach(c => { 
    var month = new Date(c.date).getMonth();
    sales[month]=sales[month]+c.totalPrice;
    console.log(sales[month])
  })

  let lineChart = new Chart(myChart,{
    type: 'line',
    data:{
      labels: month,
      datasets: [{
      label: 'Sales',
      data: sales,
      borderColor: 'rgb(75, 192, 192)',
      fill:false,
      tension:0.1,
      borderwidth:0.5,
        }]
      },
    option:{
      scales: {
        y: {
            beginAtZero: true
           },
        }   
      }
    })
    //chart2
    let barChart = new Chart(myChart2,{
      type: 'bar',
    data: {
        labels: ['SD','Tamiya'],
        datasets: [{
            label: 'Sales per type',
            data: [4,2,0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
      })
  
    
    //endchart
    //bestseller
    
    document.getElementById("saleammount").innerHTML=id.length+" sản phẩm"
    document.getElementById("totalmoney").innerHTML=totalMoney.toLocaleString('vi', {style : 'currency', currency : 'VND'})
    document.getElementById("totalorder").innerHTML=totalOrder+" đơn hàng"
    var toplist = foo(id)
    axios.get('http://localhost:3001/api/products').then(response=>{
        for(let i=0;i<toplist[0].length;i++)
        {
            for(let j=0;j<response.data.length;j++)
            {
                for(let k=0;k<toplist[0].length;k++)
                {
                    if(toplist[0][k]==response.data[j]._id)
                    {
                        document.getElementById("bestseller"+(k+1)).src = response.data[j].image[0]
                        document.getElementById("bestsellername"+(k+1)).innerHTML=response.data[j].name
                        document.getElementById("bestsellercount"+(k+1)).innerHTML=toplist[1][0] +" sản phẩm"                      
                    }
                }              
            }
        }
    })
    //endbestseller
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

