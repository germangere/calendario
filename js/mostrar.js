export default function mostrarCalendario(calendario, meses, pantalla) {
  if (calendario.length === 0) {
    pantalla.innerText = 'Tu calendario está vacío!\nAgrega tareas para disfrutar esta app 😉';
  } else {
    calendario.sort((a, b) => a.date - b.date);
    let mes = '';
    let anio = '';
    let mensaje = '';

    for (const tarea of calendario) {
      let dia = tarea.date.getDate();
      let horas = tarea.date.getHours();
      let minutos = tarea.date.getMinutes();
      if (dia < 10) dia = '0' + dia;
      if (horas < 10) horas = '0' + horas;
      if (minutos < 10) minutos = '0' + minutos;

      if (anio != tarea.date.getFullYear()) {
        anio = tarea.date.getFullYear();
        mensaje += `<h3>--------------${tarea.date.getFullYear()}--------------</h3>`;
      }

      if (mes != tarea.date.getMonth()) {
        mes = tarea.date.getMonth();
        let encabezado = meses[mes].toUpperCase();
        mensaje += `<h4>${encabezado}</h4><p>${dia} - ${horas}:${minutos} hs. - ${tarea.actividad}</p>`;
      } else {
        mensaje += `<p>${dia} - ${horas}:${minutos} hs. - ${tarea.actividad}</p>`;
      }
    }
    pantalla.innerHTML = mensaje;
  }
}