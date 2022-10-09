export default function api() {
  const pantalla = document.getElementById('pantalla');
  let today = new Date();
  let anio = today.getFullYear();
  let mes = today.getMonth() + 1;

  fetch(`https://nolaborables.com.ar/api/v2/feriados/${anio}`)
    .then((res) => res.json())
    .then((data) => {
      let feriadosDelMes = data.filter(feriado => feriado.mes === mes);

      let feriadosCont = document.createElement('div');
      let feriadosTitulo = document.createElement('h4');
      let feriadosList = document.createElement('ul');
      let titulo = document.createTextNode('Feriados del mes');
      let sinFeriados = document.createTextNode('Este mes no tiene feriados');
      feriadosCont.classList.add('feriadosCont');
      feriadosTitulo.classList.add('feriadosTitulo');
      feriadosList.classList.add('feriadosList');

      feriadosCont.appendChild(feriadosTitulo);
      feriadosCont.appendChild(feriadosList);
      if (feriadosDelMes.length > 0) {
        feriadosTitulo.appendChild(titulo);
        feriadosDelMes.forEach((el) => {
          let li = document.createElement('li');
          li.innerText = `${el.dia} - ${el.motivo}`;
          feriadosList.appendChild(li);
        })
      } else {
        feriadosTitulo.appendChild(sinFeriados);
      }
      let firstChildClass = pantalla.firstElementChild.getAttribute('class');
      if (firstChildClass === 'tareasCont') {
        pantalla.insertAdjacentElement("afterbegin", feriadosCont);
      }
    })
    .catch((error) => console.warn(error.message, error.name))
}