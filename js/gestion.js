import mostrarCalendario from "./mostrar.js";

export function mostrarOpciones() {

  pantalla.addEventListener('mouseover', (e) => {
    if (e.target.matches('.activity') || e.target.matches('.activity *')) {
      let elemento = e.target.closest('.activity');
      for (const child of elemento.children) if (child.localName === 'div') child.classList.add('visible');
      e.target.addEventListener('mouseleave', () => {
        for (const child of elemento.children) if (child.localName === 'div') child.classList.remove('visible');
      })
    }
  })

  pantalla.addEventListener('click', (e) => {
    if (e.target.matches('.activity') || e.target.matches('.activity *')) {
      let elemento = e.target.closest('.activity');
      for (const child of elemento.children) if (child.localName === 'div') child.classList.toggle('visible');
    }
  })

}

export function eliminarDesdeVista(calendario) {
  pantalla.addEventListener('click', (e) => {
    if (e.target.matches('.btnEliminar *') || e.target.matches('.btnEliminar')) {
      let id = e.target.closest('.activity').getAttribute('data-id');
      let actividad = calendario[id].actividad.slice(0, 50);
      let fecha = calendario[id].date.toLocaleDateString();
      Swal.fire({
        title: 'Estás seguro?',
        text: `Se eliminará la actividad: "${actividad}", del ${fecha}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
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
        }
      })
    }
  })
}

export function marcarRealizada(calendario) {
  pantalla.addEventListener('click', (e) => {
    if (e.target.matches('.btnCheck *') || e.target.matches('.btnCheck')) {
      let id = e.target.closest('.activity').getAttribute('data-id');
      calendario[id].realizada = true;
      localStorage.setItem('calendario', JSON.stringify(calendario));
      Toastify({
        text: 'Actividad marcada como realizada',
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
    }
  })
}

export function marcarPendiente(calendario) {
  pantalla.addEventListener('click', (e) => {
    if (e.target.matches('.btnPendiente *') || e.target.matches('.btnPendiente')) {
      let id = e.target.closest('.activity').getAttribute('data-id');
      calendario[id].realizada = false;
      localStorage.setItem('calendario', JSON.stringify(calendario));
      Toastify({
        text: 'Actividad marcada como pendiente',
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
      mostrarCalendario(calendario, true);
    }
  })
}