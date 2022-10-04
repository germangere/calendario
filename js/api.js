export default function api() {
  let today = new Date();
  let anio = today.getFullYear();
  let mes = today.getMonth() + 1;
  let feriadosDelMes = [];

  fetch(`http://nolaborables.com.ar/api/v2/feriados/${anio}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((el) => {
        if (el.mes === mes) feriadosDelMes.push(el);
      })
    })
  return feriadosDelMes;
}
