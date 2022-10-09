const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const pantalla = document.getElementById('pantalla');

export default function buscarPorMes(calendario) {
  let mensaje = '<h3>Buscar actividades por mes</h3>';
  pantalla.innerHTML = `
  ${mensaje}
  <form id="formBuscar">
    <input type="month" name="month"></input>
    <input type="submit" value="Buscar">
  </form>`;

  const $form = document.getElementById('formBuscar');

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = $form[0].value.split('-');
    const anio = parseInt(value[0]);
    const mes = value[1] - 1;
    let valido = true;

    if (!anio || mes + 1 == 0) {
      Swal.fire({
        icon: 'warning',
        text: 'Completa el mes y año a buscar',
        title: 'Faltan datos',
        timer: 3000,
        confirmButtonText: 'OK'
      });
      valido = false;
    }

    if (valido) {
      let result = calendario.filter(({ date } = tarea) => date.getFullYear() === anio && date.getMonth() === mes);

      if (result.length === 0) {
        mensaje += '<h4>Tu búsqueda no produjo resultados</h4>';
        pantalla.innerHTML = mensaje;
      } else {
        mensaje += `<h4>Resultados de ${meses[mes]} de ${anio}</h4>`;
        pantalla.innerHTML = mensaje;
        for (const tarea of result) {
          let { date, actividad, realizada, ingresaHora } = tarea;
          let dia = date.getDate();
          let horas = date.getHours();
          let minutos = date.getMinutes();
          if (dia < 10) dia = '0' + dia;
          if (horas < 10) horas = '0' + horas;
          if (minutos < 10) minutos = '0' + minutos;
          mensaje += `<p>${dia} - ${ingresaHora ? `${horas}:${minutos} hs. - ` : ''} ${actividad} 
                    ${realizada ? '<i class="fa-solid fa-check" title="Realizada"></i>' : '<i class="fa-solid fa-hourglass-start" title="Pendiente"></i>'}</p>`;
          pantalla.innerHTML = mensaje;
        }
      }
    }
  })
}