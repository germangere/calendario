import mostrarCalendario from "./mostrar.js";

const pantalla = document.getElementById('pantalla');

export default function eliminar(calendario) {
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
      let result = calendario.filter((tarea) => tarea.date.getFullYear() === anio && tarea.date.getMonth() === mes);

      if (result.length === 0) {
        mensaje += '<h4>Tu búsqueda no produjo resultados</h4>';
        pantalla.innerHTML = mensaje;
      } else {
        let confirmacion = '';
        let idAEliminar = [];
        for (const tarea of result) {
          let index = calendario.indexOf(tarea);
          idAEliminar.push(index);
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

        $formConf.addEventListener('submit', (e) => {
          e.preventDefault();
          let id = parseInt($formConf[0].value);
          if (idAEliminar.find(el => el === id) !== undefined) {
            calendario.splice(id, 1);
            localStorage.setItem('calendario', JSON.stringify(calendario));
            Toastify({
              text: 'Actividad eliminada correctamente',
              duration: 3000,
              gravity: "bottom",
              position: "center",
              stopOnFocus: true,
              style: {
                marginLeft: '10px',
                marginRight: '10px',
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: 900,
                borderRadius: '15px',
                background: '#69d2e7',
                color: '#fff'
              }
            }).showToast();
            mostrarCalendario(calendario, false);
          } else {
            Swal.fire({
              icon: 'warning',
              text: 'Error de ID, verificá tu confirmación',
              title: 'Error',
              timer: 3000,
              confirmButtonText: 'OK'
            });
          }
        })
      }
    }
  })
}