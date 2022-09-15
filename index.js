import agregarTarea from "./js/agregar.js";
import buscarPorMes from "./js/buscar.js";
import eliminar from "./js/eliminar.js";
import mostrarCalendario from "./js/mostrar.js";

const calendario = [];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

class Tarea {
  constructor(date, actividad) {
    this.date = date;
    this.actividad = actividad;
  }
}

let tarea0 = new Tarea(new Date(2023, 1, 22, 15, 15), 'cumple Ger!!');
let tarea1 = new Tarea(new Date(2022, 8, 1, 12, 30), 'comprar verdura');
let tarea2 = new Tarea(new Date(2022, 8, 5, 17,), 'reunión con amigos');
let tarea3 = new Tarea(new Date(2022, 8, 5, 13, 30), 'reunión familiar');
let tarea4 = new Tarea(new Date(2022, 3, 3, 14,), 'felicitar a papá');
let tarea5 = new Tarea(new Date(2022, 5, 27, 7), 'turno médico');
let tarea6 = new Tarea(new Date(2023, 5, 14, 22), 'partido de fútbol');
calendario.push(tarea0, tarea1, tarea2, tarea3, tarea4, tarea5, tarea6);

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
