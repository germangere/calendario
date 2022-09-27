const pantalla = document.getElementById('pantalla');
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


export default function mostrarCalendario(calendario) {
  if (calendario.length === 0) {
    pantalla.innerText = 'Tu calendario está vacío!\nAgrega tareas para disfrutar esta app 😉';
  } else {
    calendario.sort((a, b) => a.date - b.date);
    let mes = '';
    let anio = '';
    let mensaje = '';

    for (const tarea of calendario) {
      let { date, actividad } = tarea;
      let dia = date.getDate();
      let horas = date.getHours();
      let minutos = date.getMinutes();

      if (dia < 10) dia = '0' + dia;
      if (horas < 10) horas = '0' + horas;
      if (minutos < 10) minutos = '0' + minutos;

      if (anio != date.getFullYear()) {
        anio = date.getFullYear();
        mensaje += `<h3>--------------${date.getFullYear()}--------------</h3>`;
      }

      if (mes != date.getMonth()) {
        mes = date.getMonth();
        let encabezado = meses[mes].toUpperCase();
        mensaje += `<h4>${encabezado}</h4><p>${dia} - ${horas}:${minutos} hs. - ${actividad}</p>`;
      } else {
        mensaje += `<p>${dia} - ${horas}:${minutos} hs. - ${actividad}</p>`;
      }
    }
    pantalla.innerHTML = mensaje;
  }
}