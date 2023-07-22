// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito =[];

cargarEventListener();
function cargarEventListener(){
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito= []; // reseteamos el carrito
        limpiarHtml(); //limpiamos html
    });

}

// Funciones

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Lee elcontenido del html al que dimos click y extrae la info del curso
function leerDatosCurso(curso){
    //console.log(curso);
    
    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad: 1
    }
    //console.log(infoCurso);
    //comprobar si el curso esta en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe){
        // actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
        
    }else{
        // agrega elementos a 'articulosCarrito'
        articulosCarrito = [...articulosCarrito,infoCurso]
    }
    //console.log(articulosCarrito);
    carritoHTML();

}

// muestra el carrito en html
function carritoHTML(){
    // limpiar el html
    limpiarHtml();

    // recorre l carrito y  genera el html
    articulosCarrito.forEach((curso)=> {
        const row = document.createElement('tr');
        //console.log(curso);
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id= "${curso.id}"> X </a>
            </td>
        `;
       // console.log(row.innerHTML);
        // Agrega el html del carrito en tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbody
function limpiarHtml(){
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    // forma rápida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

//Eliminar elementos del carrito
function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        // obtener el id del curso a borrar
        const cursoId = e.target.getAttribute('data-id');

        //borrar del carrito el curso
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito);
        carritoHTML();
    }
}