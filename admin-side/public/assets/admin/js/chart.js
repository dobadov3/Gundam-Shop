let myChart = document.getElementById('myChart').getContext('2d');
axios.get('http://localhost:3001/api/orders').then(response=>{
  const sales=[0,0,0,0,0,0,0,0,0,0,0,0]
  console.log(response.data)
  response.data.forEach(c => { 
    var month = new Date(c.date).getMonth();
    sales[month]=sales[month]+c.totalPrice;
    console.log(sales[month])
  })
  var month =["January","February","March","April","May","June","July","August","September","October","November","December"]
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
  })
