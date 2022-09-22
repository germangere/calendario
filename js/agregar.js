export default function agregarTarea(calendario, Tarea, pantalla) {
  pantalla.innerHTML = `
  <h3>Agregar actividad al calendario</h3>
  <form id="formCarga">
    <input type="date" name="fecha">
    <input type="time" name="hora">
    <input type="text" name="actividad" placeholder="Ingresa tu actividad">
    <input type="submit" value="Agregar tarea">
  </form>`;

  const $form = document.getElementById('formCarga');
  const $submit = $form[$form.length - 1];

  $submit.addEventListener('click', (e) => {
    e.preventDefault();
    let fecha = $form[0].value.split('-');
    let hora = $form[1].value.split(':');
    let actividad = $form[2].value;
    let valido = true;
    for (const valor of fecha) {
      if (!valor) {
        alert('Completa la fecha');
        valido = false;
      }
    }
    for (const valor of hora) {
      if (!valor) {
        alert('Completa la hora');
        valido = false;
      }
    }
    if (!actividad) {
      alert('Completa la actividad');
      valido = false;
    }
    if (valido) {
      let tarea = new Tarea(
        new Date(
          fecha[0],
          fecha[1] - 1,
          fecha[2],
          hora[0],
          hora[1]
        ),
        actividad);
      calendario.push(tarea);
      localStorage.setItem('calendario', JSON.stringify(calendario));
      $form.reset();
      pantalla.innerHTML = '<h3>Tu actividad se agregó correctamente ✅</h3>';
    }
  })
}