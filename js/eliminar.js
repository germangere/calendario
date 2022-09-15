export default function eliminar(calendario, pantalla) {
  let mensaje = `<h3>Eliminar actividad</h3>`;
  pantalla.innerHTML = `
    ${mensaje}
    <h4>Selecciona la fecha de la actividad que deseas eliminar</h4>
    <form id="formEliminar">
      <input type="month" name="fecha">
      <input type="submit" value="Seleccionar">
    </form>
  `;

  const $form = document.getElementById('formEliminar');
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
      let confirmacion = '';

      for (const tarea of result) {
        let index = calendario.indexOf(tarea);
        confirmacion += `<p>ID: <strong>${index}</strong> - ${tarea.actividad}</p>`;
      }

      mensaje += `
        <h4>Confirma el ID de la tarea a eliminar:</h4>
        ${confirmacion}
        <form>
          <input type="number" name="number">
          <input type="submit" value="Eliminar">
        </form>
      `;
      pantalla.innerHTML = mensaje;

      let $formConf = document.querySelector('form');
      let $confBtn = document.querySelector('input[value="Eliminar"]');

      $confBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let id = parseInt($formConf[0].value);
        calendario.splice(id, 1);
        $formConf.reset();
        pantalla.innerHTML = '<h3>Actividad eliminada correctamente 🗑</h3>';
      })
    }
  })
}