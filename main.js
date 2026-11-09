/* ===========================
   DATOS DEL CLUB
   Una sola lista con todas las categorías. De aquí salen
   el buscador, las tarjetas de equipos y la tabla de horarios,
   así que para cambiar un horario solo hay que tocarlo aquí.
=========================== */

const categorias = [
  { nombre: "Benjamín", desde: 2017, hasta: 2018, tipo: "Escuela", dias: "Lunes y miércoles", hora: "17:00 – 18:00", sede: "Polideportivo Río Claro", precio: 35 },
  { nombre: "Alevín", desde: 2015, hasta: 2016, tipo: "Escuela", dias: "Martes y jueves", hora: "17:00 – 18:00", sede: "Polideportivo Río Claro", precio: 35 },
  { nombre: "Infantil", desde: 2013, hasta: 2014, tipo: "Competición", dias: "Lunes, miércoles y viernes", hora: "17:30 – 19:00", sede: "Pabellón Los Álamos", precio: 45 },
  { nombre: "Cadete", desde: 2011, hasta: 2012, tipo: "Competición", dias: "Lunes, miércoles y viernes", hora: "19:00 – 20:30", sede: "Pabellón Los Álamos", precio: 45 },
  { nombre: "Juvenil", desde: 2009, hasta: 2010, tipo: "Competición", dias: "Martes, jueves y viernes", hora: "19:00 – 20:30", sede: "Pabellón Los Álamos", precio: 45 },
  { nombre: "Júnior", desde: 2007, hasta: 2008, tipo: "Competición", dias: "Martes, jueves y viernes", hora: "20:30 – 22:00", sede: "Pabellón Los Álamos", precio: 45 },
  { nombre: "Sénior", desde: 1950, hasta: 2006, tipo: "Competición", dias: "Lunes, miércoles y jueves", hora: "21:00 – 22:30", sede: "Pabellón Los Álamos", precio: 50 },
];

// Texto de las edades de cada categoría ("Nacidos en 2013 y 2014")
function textoEdades(categoria) {
  if (categoria.nombre === "Sénior") {
    return "Nacidos en 2006 o antes";
  }
  return `Nacidos en ${categoria.desde} y ${categoria.hasta}`;
}

/* ===========================
   MENÚ EN MÓVIL
=========================== */

const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  const abierto = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!abierto));
  menu.classList.toggle("is-open", !abierto);
});

// Al elegir un enlace, el menú se cierra
menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuBtn.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  }
});

/* ===========================
   TARJETAS DE EQUIPOS Y TABLA DE HORARIOS
=========================== */

const teamsList = document.getElementById("teams-list");
const scheduleBody = document.getElementById("schedule-body");

categorias.forEach((categoria) => {
  const claseEscuela = categoria.tipo === "Escuela" ? " team-school" : "";

  teamsList.insertAdjacentHTML(
    "beforeend",
    `<article class="team${claseEscuela}">
        <h3>${categoria.nombre}</h3>
        <p>${textoEdades(categoria)}</p>
        <p>${categoria.tipo}</p>
    </article>`
  );

  scheduleBody.insertAdjacentHTML(
    "beforeend",
    `<tr>
        <th scope="row">${categoria.nombre}</th>
        <td>${categoria.dias}</td>
        <td>${categoria.hora}</td>
        <td>${categoria.sede}</td>
    </tr>`
  );
});

/* ===========================
   BUSCADOR DE CATEGORÍA
=========================== */

const yearSelect = document.getElementById("birth-year");
const finderResult = document.getElementById("finder-result");

// Años del 2020 al 1990: se generan solos para no escribirlos a mano
for (let year = 2020; year >= 1990; year--) {
  yearSelect.insertAdjacentHTML("beforeend", `<option value="${year}">${year}</option>`);
}

yearSelect.addEventListener("change", () => {
  const year = Number(yearSelect.value);

  if (!year) {
    finderResult.innerHTML = "";
    return;
  }

  const categoria = categorias.find((c) => year >= c.desde && year <= c.hasta);

  // Demasiado pequeño para la escuela
  if (!categoria) {
    finderResult.innerHTML = `
        <h3>Todavía no</h3>
        <p>La escuela empieza a los 8 años (nacidos en 2018). Escríbenos y te avisamos cuando abramos plazas.</p>`;
    return;
  }

  finderResult.innerHTML = `
      <h3>${categoria.nombre}</h3>
      <p><strong>${categoria.tipo}</strong> · ${categoria.dias}, de ${categoria.hora}</p>
      <p>${categoria.sede} · ${categoria.precio} € al mes</p>`;
});

/* ===========================
   FORMULARIO DE CONTACTO
   Es una web de demostración: no envía nada, solo comprueba
   los campos y muestra el mensaje de confirmación.
=========================== */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formStatus.textContent = "Revisa tu nombre y tu correo electrónico.";
    contactForm.querySelector(":invalid").focus();
    return;
  }

  formStatus.textContent = "¡Gracias! Te escribimos en menos de 48 horas.";
  contactForm.reset();
});
