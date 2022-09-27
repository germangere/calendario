import agregarTarea from "./js/agregar.js";
import buscarPorMes from "./js/buscar.js";
import eliminar from "./js/eliminar.js";
import mostrarCalendario from "./js/mostrar.js";

let calendario = [];

const getCalendario = () => {
  calendario = JSON.parse(localStorage.getItem('calendario'));
  for (const tarea of calendario) {
    let date = new Date(tarea.date);
    tarea.date = date;
  }
}
const setCalendario = () => localStorage.setItem('calendario', calendario);

(localStorage.getItem('calendario')) ? getCalendario() : setCalendario();

const $mostrar = document.getElementById('mostrar');
const $agregar = document.getElementById('agregar');
const $buscar = document.getElementById('buscar');
const $eliminar = document.getElementById('eliminar');

const pantalla = document.getElementById('pantalla');
pantalla.innerHTML = '<h3>Bienvenido/a!</h3><p>😃 Qué haremos hoy? 📅<p>';

$mostrar.addEventListener('click', () => mostrarCalendario(calendario));
$agregar.addEventListener('click', () => agregarTarea(calendario));
$buscar.addEventListener('click', () => buscarPorMes(calendario));
$eliminar.addEventListener('click', () => eliminar(calendario));