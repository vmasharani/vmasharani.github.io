var ctx = document.getElementById("myChart");

var countries = new Array();
var militarynum = new Array();
var xaxislabel = String("# of people")
$.each(json,function( index,value){
  countries.push(value.cn);
  militarynum.push(value.mnp);
});


var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: countries,
        datasets: [{
            label: xaxislabel,
            data: militarynum,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
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
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
