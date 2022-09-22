import agregarTarea from "./js/agregar.js";
import buscarPorMes from "./js/buscar.js";
import eliminar from "./js/eliminar.js";
import mostrarCalendario from "./js/mostrar.js";

let calendario = [];
if (localStorage.getItem('calendario')) {
  calendario = JSON.parse(localStorage.getItem('calendario'));
  for (const tarea of calendario) {
    let date = new Date(tarea.date);
    tarea.date = date;
  }
} else {
  localStorage.setItem('calendario', calendario);
}

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

class Tarea {
  constructor(date, actividad) {
    this.date = date;
    this.actividad = actividad;
  }
}

const $mostrar = document.getElementById('mostrar');
const $agregar = document.getElementById('agregar');
const $buscar = document.getElementById('buscar');
const $eliminar = document.getElementById('eliminar');

const $pantalla = document.getElementById('pantalla');
$pantalla.innerHTML = '<h3>Bienvenido/a!</h3><p>😃 Qué haremos hoy? 📅<p>';

$mostrar.addEventListener('click', () => mostrarCalendario(calendario, meses, $pantalla));
$agregar.addEventListener('click', () => agregarTarea(calendario, Tarea, $pantalla));
$buscar.addEventListener('click', () => buscarPorMes(meses, calendario, $pantalla));
$eliminar.addEventListener('click', () => eliminar(calendario, $pantalla));