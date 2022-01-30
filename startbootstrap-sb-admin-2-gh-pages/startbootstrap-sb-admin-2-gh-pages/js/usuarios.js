const url = 'http://localhost:3001/api/usuarios/'
const formArticulo = document.getElementById('formulario')
const usuario = document.getElementsByName('user')[0]
const nombre = document.getElementsByName('name')[0]
const apellido = document.getElementsByName('lastname')[0]
const correo = document.getElementsByName('email')[0]
const password = document.getElementsByName('password')[0]
let estadodb = 1;
const estado = document.querySelector("div[class='custom-controls-stacked px-2'] > div")
var opcion = ''
let resultados = ''

//funcion para mostrar los resultados FINAL
const mostrar = (usuarios) => {
    usuarios.forEach(usuario => {
		let activo = usuario.admin ? 'on':'off'
        resultados += `<tr>
        <input type="hidden" id="idUsuario" value="${usuario.id}">
        <td id='usuario'>${usuario.username}</td>
        <td id='nombre'>${usuario.nombres}</td>
        <td id='apellido'>${usuario.apellidos}</td>
        <td id='email'>${usuario.email}</td>
        <td class="text-center align-middle"><i class="fa fa-fw text-secondary cursor-pointer fa-toggle-${activo}"></i></td>
        <td class="text-center align-middle"> <div class="btn-group align-top">
	                    <button class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
	                    <button class="btn btn-sm btn-outline-secondary badge" type="button"><i class="fa fa-trash"></i></button>
	                  </div>
        </td>
    </tr>
                `    
		
    })
	document.getElementById('usuarios').innerHTML = resultados
  $(document).ready(function() {
    $('#dataTable').DataTable();
  });
    
}

const cargarClientes = () => {
	fetch(url)
	.then(texto => texto.json())
	.then(data => mostrar(data) )
}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}



//BORRAR
on(document, 'click', "button[class='btn btn-sm btn-outline-secondary badge']:nth-of-type(2)", e => {
	const fila = e.target.parentNode.parentNode.parentNode.parentNode
  const id = String(fila.querySelector("#idUsuario").value)
	fetch(url+id, {
		method: 'DELETE'
	})
	.then( ()=> window.location.reload(true))
})


let idForm = ''



on(document, 'click', "button[class='btn btn-success btn-block']", e => { 
  console.log('creando') 
	nombre.value =''
	apellido.value = ''
	usuario.value = ''
  correo.value = ''
  password.value = ''
	estadodb = 1;

	let plantillaCheckBox = `<input type="checkbox" class="custom-control-input" id="notifications-blog" checked>
							<label class="custom-control-label" for="notifications-blog">Activo</label>
	`
	estado.innerHTML = plantillaCheckBox
	opcion = 'crear'



	document.getElementById("notifications-blog").addEventListener("click", function() {
		if(document.getElementById("notifications-blog").checked) {
			estadodb = 1;
		} else {
			estadodb = 0;
		}
	});
	

})

on(document, 'click', "button[class='btn btn-sm btn-outline-secondary badge']:nth-of-type(1)", e => {   
  console.log('editando') 
  const fila = e.target.parentNode.parentNode.parentNode
	const usuarioForm = fila.querySelector("#usuario").innerHTML
  idForm = fila.querySelector("#idUsuario").value

  const nombreForm = fila.querySelector("#nombre").innerHTML;
  const apellidoForm = fila.querySelector("#apellido").innerHTML;
  const emailForm = fila.querySelector("#email").innerHTML
	const estadoToggle = String(fila.querySelector("i").className).split(" ").splice(-1).join(' ')
  console.log(nombreForm)
  console.log(apellidoForm)
  console.log(emailForm)
  console.log(estadoToggle)
	let estadoForm = 0;
	if(estadoToggle=='fa-toggle-on'){
		estadoForm = 1;
	}else{
		estadoForm = 0;
	}
    nombre.value =  nombreForm
    apellido.value =  apellidoForm
    usuario.value = usuarioForm
    correo.value = emailForm
	
	let check= estadoForm ? 'checked':''
	let plantillaCheckBox = `<input type="checkbox" class="custom-control-input" id="notifications-blog" ${check}>
							<label class="custom-control-label" for="notifications-blog">Activo</label>
	`
	estado.innerHTML = plantillaCheckBox
	estadodb = estadoForm
	opcion = 'editar'



	document.getElementById("notifications-blog").addEventListener("click", function() {
		if(document.getElementById("notifications-blog").checked) {
			estadodb = 1;
		} else {
			estadodb = 0;
		}
	});
})





//CREAR Y EDITAR
formArticulo.addEventListener('submit', (e)=>{
	if(opcion=='crear'){  
		e.preventDefault() 
		if(nombre.value=='' || apellido.value=='' || usuario.value=='' || password.value=='' || correo.value==''){
			window.alert("Llene todos los campos");
		}
		else{
			fetch(url, {
				method:'POST',
				headers: {
					'Content-Type':'application/json'
				},
				body: JSON.stringify({
					      username: usuario.value,
                password: password.value,
                nombres:nombre.value,
                apellidos:apellido.value,
                email: correo.value,
				        admin:String(estadodb)
				})
			})
			.then( response => response.json() )
			.then( data => {
				const nuevoArticulo = []
				nuevoArticulo.push(data)
				mostrar(nuevoArticulo)
			})
			.then( ()=> window.location.reload(true))
		}   

    }
    if(opcion=='editar'){    
        e.preventDefault()
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username: usuario.value,
                password: password.value,
                nombres:nombre.value,
                apellidos:apellido.value,
                email: correo.value,
				        admin:String(estadodb)
            })
        })
        .then( response => response.json() )
        .then( ()=> window.location.reload(true))
    }
})


window.onload = () => {
	cargarClientes()

}