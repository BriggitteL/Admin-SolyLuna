// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");

var tipos = []
var valoraciones = []

fetch("http://localhost:3001/api/habitaciones/tipos")
    .then(response => response.json())
    .then(data => {
      let tipo = document.getElementById('tiposHabitaciones')
      for(let cliente of data){
        //console.log(cliente.valoracion)
        valoraciones.push(parseFloat(cliente.valoracion))
        tipos.push(cliente.tipo)
        let plantilla = `<span class="mr-2">
        <i class="fas fa-circle"></i> ${cliente.tipo}
    </span>`
    tipo.innerHTML+= plantilla
        
      }
      var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: tipos,
          datasets: [{
            data: valoraciones,
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          }],
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          },
          legend: {
            display: false
          },
          cutoutPercentage: 80,
        },
      });

    })
    .catch(error => console.error);

    



