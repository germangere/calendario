import mostrarCalendario from "./mostrar.js";

const pantalla = document.getElementById('pantalla');
class Tarea {
  constructor(date, actividad) {
    this.date = date;
    this.actividad = actividad;
  }
}

export default function agregarTarea(calendario) {
  pantalla.innerHTML = `
  <h3>Agregar actividad al calendario</h3>
  <form id="formCarga">
    <input type="date" name="fecha">
    <input type="time" name="hora">
    <input type="text" name="actividad" placeholder="Ingresa tu actividad">
    <input type="submit" value="Agregar tarea">
  </form>`;

  const $form = document.getElementById('formCarga');

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    let fecha = $form[0].value.split('-');
    let hora = $form[1].value.split(':');
    let actividad = $form[2].value;
    let valido = true;

    for (const valor of fecha) {
      if (!valor) {
        sweetAlert('fecha');
        valido = false;
      }
    }
    for (const valor of hora) {
      if (!valor) {
        sweetAlert('hora');
        valido = false;
      }
    }
    if (!actividad) {
      sweetAlert('actividad');
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
      Toastify({
        text: 'Actividad agregada correctamente',
        duration: 3000,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {
          fontSize: '1.5rem',
          fontWeight: 900,
          borderRadius: '15px',
          background: 'rgb(255, 136, 0)',
          color: 'rgb(49, 49, 49)'
        }
      }).showToast();
      mostrarCalendario(calendario);
    }
  })
}

function sweetAlert(campo) {
  Swal.fire({
    icon: 'warning',
    text: `Completa la ${campo}`,
    title: 'Faltan datos',
    timer: 3000,
    confirmButtonText: 'OK'
  });
}