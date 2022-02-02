window.onload = () => {
    // cargarDatos()

    fetch("http://localhost:3001/api/usuarios")
    .then(response => response.json())
    .then(data => {
      let sel = document.getElementById("selectorCedula");
      for(let cliente of data){
        console.log(cliente.Huesped.cedula)
        let p = `<option value='${cliente.Huesped.cedula}'> ${cliente.Huesped.cedula} ${cliente.nombres} ${cliente.apellidos} </option>`; 
        sel.innerHTML += p;
      }

    })
    .catch(error => console.error);

    let selector = document.getElementById("selectorCedula")
    selector.addEventListener('change', (event) => {
        let cedula = event.target.value
      fetch(`http://localhost:3002/api/reservas/${cedula}`).then(response => response.json()).then(data => {
      document.getElementById('ordenes_tablas').innerHTML = '';
      for(let cliente of data){
        var date = new Date(cliente.fecha_entrada);
        let fechaSalida = cliente.fecha_salida.split("T");
        let fechaEntrada = cliente.fecha_entrada.split("T");
        let fechaReserva = cliente.fecha_reservado.split("T");
        // let fechap = date.split()
        
        let plan = `<tr>
          <td>${cliente.num_factura}</td>
          <td>${cliente.nombres}</td>
          <td>${cliente.apellidos}</td>
          <td>${fechaReserva[0]}</td>
          <td>${fechaEntrada[0]}</td>
          <td>${fechaSalida[0]}</td>
          <td>${cliente.num_habitacion}</td>
          <td>${cliente.precio_total}</td>
          </tr>
        `
        document.getElementById('ordenes_tablas').innerHTML += plan;
      }
      }).catch(console.error);
      
    });

}    