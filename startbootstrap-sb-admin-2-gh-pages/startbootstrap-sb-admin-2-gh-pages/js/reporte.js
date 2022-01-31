window.onload = () => {

    fetch("http://localhost:3002/RutaDeClientes")
    .then(response => response.json())
    .then(data => {
      let sel = document.getElementById("selectorCedula");
      for(let cliente of data){
        let p = `<option value='${cliente.id}'> ${cliente.nombre} </option>`; 
        sel.innerHTML += p;
      }

    })
    .catch(error => console.error);

    let selector = document.getElementById("selectorCedula")
    selector.addEventListener('change', (event) => {
        let cedula = event.target.value

      fetch(`http://localhost:3002/AgregarRuta/${cedula}`).then(response => response.json()).then(data => {
        document.getElementById('ordenes_tablas').innerHTML = '';
        for(let cliente of data){
          
          let plan = `<tr>
            <td>${cliente.cedula}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.habitacion}</td>
            <td>${cliente.fechaEntrada}</td>
            <td>${cliente.fechaSalida}</td>
            </tr>
          `
          document.getElementById('ordenes_tablas').innerHTML += plan;
        }
        }).catch(console.error);
    });

}    