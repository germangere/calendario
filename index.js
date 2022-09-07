const calendario = [];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

class Tarea {
  constructor(date, actividad, id) {
    this.date = date;
    this.actividad = actividad;
    this.id = id;
  }
}

// let tarea0 = new Tarea(new Date(2023, 1, 22, 15, 15), 'cumple Ger!!', 0);
// let tarea1 = new Tarea(new Date(2022, 8, 1, 12, 30), 'comprar verdura', 1);
// let tarea2 = new Tarea(new Date(2022, 8, 5, 17, 00), 'reunión con amigos', 2);
// let tarea3 = new Tarea(new Date(2022, 8, 5, 13, 30), 'reunión familiar', 3);
// let tarea4 = new Tarea(new Date(2022, 3, 3, 14, 00), 'felicitar a papá', 4);
// let tarea5 = new Tarea(new Date(2022, 5, 27, 7, 00), 'turno médico', 5);
// let tarea6 = new Tarea(new Date(2023, 5, 14, 22, 00), 'partido de fútbol', 6);
// calendario.push(tarea0, tarea1, tarea2, tarea3, tarea4, tarea5, tarea7);
function menu() {
  let menu = prompt(`
    Bienvenido a tu calendario!
    Qué haremos hoy? (ingresa el número de la opción)
    1 - Ver calendario
    2 - Agregar tarea
    3 - Buscar actividades por mes
    4 - Eliminar una actividad
    5 - Salir
  `);
  selector(menu);
}

function selector(opcion) {
  switch (opcion) {
    case '1':
      verCalendario();
      break;
    case '2':
      agregarTarea();
      break;
    case '3':
      buscarPorMes();
      break;
    case '4':
      eliminar();
      break;
    case '5':
      console.clear();
      alert('Hasta luego!!');
      break;
    default:
      alert('Ingrese una opción correcta');
      menu();
      break;
  }
}

function verCalendario() {
  console.clear();
  if (calendario.length === 0) {
    alert('Tu calendario está vacío! Agrega tareas para disfrutar esta app ;)');
    menu();
  } else {
    calendario.sort((a, b) => a.date - b.date);
    let mes = '';
    let anio = '';
    for (const tarea of calendario) {
      let dia = tarea.date.getDate();
      let horas = tarea.date.getHours();
      let minutos = tarea.date.getMinutes();
      if (dia < 10) dia = '0' + dia;
      if (horas < 10) horas = '0' + horas;
      if (minutos < 10) minutos = '0' + minutos;

      if (anio != tarea.date.getFullYear()) {
        anio = tarea.date.getFullYear();
        console.log(`---------${tarea.date.getFullYear()}---------`);
      }
      if (mes != tarea.date.getMonth()) {
        mes = tarea.date.getMonth();
        let encabezado = meses[mes].toUpperCase();
        console.log(`${encabezado}\n${dia} - ${horas}:${minutos} hs. - ${tarea.actividad}`);
      } else {
        console.log(`${dia} - ${horas}:${minutos} hs. - ${tarea.actividad}`);
      }
    }
    alert('Grandes actividades te esperan!');
    menu();
  }
}

function agregarTarea() {
  let dia = prompt('Ingresa el día (sólo el día!)');
  let mes = parseInt(prompt('Ingresa el mes (en número)'));
  --mes;
  let anio = prompt('Ingresa el año');
  let hora = prompt('Ingresa la hora (sólo la hora, los minutos enseguida ;P )');
  let minuto = prompt('Ingresa los minutos');
  let actividad = prompt('Ingresa la actividad');
  let tarea = new Tarea(new Date(anio, mes, dia, hora, minuto), actividad, calendario.length);
  calendario.push(tarea);
  alert('Listo! ya se agendó tu actividad');
  verCalendario();
}

function buscarPorMes() {
  let mes = parseInt(prompt('Ingresa el mes que te gustaría revisar (sólo el número)')) - 1;
  let anio = parseInt(prompt('Ingresa el año'));
  let result = calendario.filter((tarea) => tarea.date.getFullYear() === anio && tarea.date.getMonth() === mes);
  if (result.length === 0) {
    alert('Tu búsqueda no produjo resultados');
    menu();
  } else {
    console.clear();
    console.log(`Resultados de ${meses[mes]} de ${anio}`);
    for (const tarea of result) {
      let dia = tarea.date.getDate();
      let horas = tarea.date.getHours();
      let minutos = tarea.date.getMinutes();
      if (dia < 10) dia = '0' + dia;
      if (horas < 10) horas = '0' + horas;
      if (minutos < 10) minutos = '0' + minutos;
      console.log(`Día ${dia} - ${horas}:${minutos} hs. - ${tarea.actividad}`);
    }
    alert('Un gran mes!');
    menu();
  }
}

function eliminar() {
  let dia = parseInt(prompt('Ingresa el día de la actividad a eliminar (sólo el día)'));
  let mes = parseInt(prompt('Ingresa el mes')) - 1;
  let anio = parseInt(prompt('Ingresa el año'));
  let result = calendario.filter((tarea) => tarea.date.getFullYear() === anio && tarea.date.getMonth() === mes && tarea.date.getDate() === dia);
  if (result.length === 0) {
    alert('Tu búsqueda no produjo resultados');
  } else {
    let confirmacion = '';
    for (const tarea of result) {
      confirmacion += `ID: ${tarea.id} - ${tarea.actividad}\n`;
    }
    let id = parseInt(prompt(`Confirma el ID de la tarea a eliminar:\n${confirmacion}`));
    calendario.splice(id, 1);
    alert('La actividad seleccionada se eliminó correctamente');
    verCalendario();
  }
}
menu();