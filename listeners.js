import { checkUserState, login, logout } from "./firebaseAuth.js";
import { getClicks, increaseClicks } from "./firebaseDatabase.js";

function sectionsManager() {
  // Seleccionar todas las etiquetas <a> dentro del <nav>
  const navLinks = document.querySelectorAll("nav a");
  // Seleccionar todas las secciones principales
  const sections = document.querySelectorAll("main section");
  const firstSection = sections[0]; // La primera sección por defecto

  const showSection = (targetId) => {
    const targetSection = document.getElementById(targetId);

    // Ocultar todas las secciones y eliminar la animación
    sections.forEach((section) => {
      section.classList.add("hidden");
      section.classList.remove(
        "animate__animated",
        "animate__backInDown",
        "animate__faster"
      );
    });

    // Mostrar la sección de destino con la animación o el primero si no es válida
    if (targetSection) {
      targetSection.classList.remove("hidden");
      targetSection.classList.add(
        "animate__animated",
        "animate__backInDown",
        "animate__faster"
      );
    } else {
      // Mostrar la primera sección si el target no es válido
      firstSection.classList.remove("hidden");
      firstSection.classList.add(
        "animate__animated",
        "animate__backInDown",
        "animate__faster"
      );
      history.replaceState(null, "", "#"); // Eliminar referencia no válida de la URL
    }
  };

  // Manejar el evento de clic en los enlaces del nav
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

      const targetId = link.getAttribute("href").substring(1); // Obtener el id del destino
      showSection(targetId);
      history.pushState(null, "", `#${targetId}`); // Actualizar la URL
    });
  });

  // Verificar la referencia al cargar la página
  const currentHash = window.location.hash.substring(1); // Obtener el id de la URL actual sin el "#"
  if (currentHash) {
    showSection(currentHash); // Mostrar la sección correspondiente al hash
  } else {
    // Si no hay referencia, mostrar la primera sección
    showSection(firstSection.id);
  }
}

function authState() {
  const loginForm = document.getElementById("login-form");
  const adminContent = document.getElementById("admin-content");
  const userContent = document.getElementById("user-content");

  checkUserState(
    (user) => {
      console.log(user);
      loginForm.style.display = "none";
      if (user.email.includes("admin")) {
        adminContent.style.display = "block";
        userContent.style.display = "none";
      } else {
        adminContent.style.display = "none";
        userContent.style.display = "block";
      }
    },
    () => {
      loginForm.style.display = "block";
      adminContent.style.display = "none";
      userContent.style.display = "none";
    }
  );

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[name="username"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    login(email, password).catch((error) => {
      console.error("Error al iniciar sesión:", error);
    });
  });

  document.querySelectorAll(".logout-button").forEach((button) => {
    button.addEventListener("click", () => {
      logout().catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
    });
  });
}


async function ClikCountState() {
  const clickCounters = document.querySelectorAll(".click-counter");
  const counterButton = document.getElementById("intercasecounter-button");

  // Obtener el contador inicial desde la base de datos
  let clickCount = await getClicks();

  // Actualizar el contador en todos los elementos
  clickCounters.forEach((counter) => {
    counter.textContent = clickCount;
  });

  // Listener para incrementar contador
  if (counterButton) {
    counterButton.addEventListener("click", async () => {
      clickCount++;
      await increaseClicks(clickCount);

      // Actualizar el contador en todos los elementos
      clickCounters.forEach((counter) => {
        counter.textContent = clickCount;
      });
    });
  }
}


sectionsManager(); // Inicializar el manejador de secciones

authState(); // Inicializar el estado de autenticación

ClikCountState(); // Inicializar el estado del contador de clics
