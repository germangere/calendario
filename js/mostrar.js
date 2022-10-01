import { mostrarOpciones } from "./gestion.js";

const pantalla = document.getElementById('pantalla');
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


export default function mostrarCalendario(calendario, realizadas) {
  calendario.sort((a, b) => a.date - b.date);
  let aMostrar = calendario.filter((el) => el.realizada === realizadas)
  if (aMostrar.length === 0) {
    return pantalla.innerText = 'Tu calendario está vacío!\nAgrega tareas para disfrutar esta app 😉';
  }

  let mes = '';
  let anio = '';
  let mensaje = '';
  for (const tarea of aMostrar) {
    let { date, actividad } = tarea;
    let id = calendario.indexOf(tarea)
    let dia = date.getDate();
    let horas = date.getHours();
    let minutos = date.getMinutes();

    if (dia < 10) dia = '0' + dia;
    if (horas < 10) horas = '0' + horas;
    if (minutos < 10) minutos = '0' + minutos;

    if (anio != date.getFullYear()) {
      anio = date.getFullYear();
      mensaje += `<div class="year">${date.getFullYear()}</div>`;
    }

    if (mes != date.getMonth()) {
      mes = date.getMonth();
      let encabezado = meses[mes].toUpperCase();
      mensaje += `<div class="month">${encabezado}</div>
                    <div class='activity' data-id='${id}'>
                      <p class='desc'><strong>${dia}</strong> - <strong>${horas}:${minutos} hs.</strong> - ${actividad}</p>
                      <div class='btnEliminar'  title='Eliminar'>
                        <i class="fa-solid fa-trash"></i>
                      </div>`;
      mensaje += realizadas
        ? `<div class='btnPendiente' title='Marcar como pendiente'>
            <i class="fa-solid fa-hourglass-start"></i>
          </div></div>`
        : `<div class='btnCheck' title='Marcar como realizada'>
            <i class="fa-solid fa-check"></i>
          </div></div>`

    } else {
      mensaje += `<div class='activity' data-id='${id}'>
                    <p class='desc'><strong>${dia}</strong> - <strong>${horas}:${minutos} hs.</strong> - ${actividad}</p>
                    <div class='btnEliminar'  title='Eliminar'>
                      <i class="fa-solid fa-trash"></i>
                    </div>`;
      mensaje += realizadas
        ? `<div class='btnPendiente' title='Marcar como pendiente'>
            <i class="fa-solid fa-hourglass-start"></i>
          </div></div>`
        : `<div class='btnCheck' title='Marcar como realizada'>
            <i class="fa-solid fa-check"></i>
          </div></div>`
    }
  }
  pantalla.innerHTML = mensaje;
  mostrarOpciones();
}