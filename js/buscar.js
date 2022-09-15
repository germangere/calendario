export default function buscarPorMes(meses, calendario, pantalla) {
  let mensaje = '<h3>Buscar actividades por mes</h3>';
  pantalla.innerHTML = `
  ${mensaje}
  <form id="formBuscar">
    <input type="month" name="month"></input>
    <input type="submit" value="Buscar">
  </form>`;

  const $form = document.getElementById('formBuscar');
  const $submit = $form[$form.length - 1];

  $submit.addEventListener('click', (e) => {
    e.preventDefault();
    const value = $form[0].value.split('-');
    const anio = parseInt(value[0]);
    const mes = value[1] - 1;
    let result = calendario.filter((tarea) => tarea.date.getFullYear() === anio && tarea.date.getMonth() === mes);

    if (result.length === 0) {
      mensaje += '<h4>Tu búsqueda no produjo resultados</h4>';
      pantalla.innerHTML = mensaje;
    } else {
      mensaje += `<h4>Resultados de ${meses[mes]} de ${anio}</h4>`;
      pantalla.innerHTML = mensaje;
      for (const tarea of result) {
        let dia = tarea.date.getDate();
        let horas = tarea.date.getHours();
        let minutos = tarea.date.getMinutes();
        if (dia < 10) dia = '0' + dia;
        if (horas < 10) horas = '0' + horas;
        if (minutos < 10) minutos = '0' + minutos;
        mensaje += `<p>Día ${dia} - ${horas}:${minutos} hs. - ${tarea.actividad}</p>`;
        pantalla.innerHTML = mensaje;
      }
    }
  })
}