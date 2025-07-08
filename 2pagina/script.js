// Código simplificado sin sistema de contraseña


const notas = [
    "Te amo ❤️",
    "Te Quiero Mucho 💕",
    "Tratare de siempre estar para ti ",
    "Te amo con todo mi corazon mi niña hermosa",
    "Te quiero con el alma mi flaquita",
    "Siempre voy a cuidarte mi vida",
    "Eres un brillo en mi corazon",
    "Eres mi orgullo mugrosa",
    "Te amo y te seguire amando",
    "Ten un bonito dia mi amor"
];

let indiceNota = 0; // Empezamos en la primera nota

function cambiarNota(direccion) {
    let notaElemento = document.getElementById("nota");

    // Paso 1: Hacer que el texto se desvanezca
    notaElemento.style.opacity = 0;

    // Paso 2: Esperar un poco y luego cambiar el texto
    setTimeout(() => {
        indiceNota += direccion;

        // Si llegamos al final, volvemos al inicio
        if (indiceNota >= notas.length) {
            indiceNota = 0;
        }

        // Si estamos al inicio y queremos retroceder, vamos a la última
        if (indiceNota < 0) {
            indiceNota = notas.length - 1;
        }

        // Cambiar el texto
        notaElemento.innerText = notas[indiceNota];

        // Paso 3: Hacer que el texto reaparezca
        notaElemento.style.opacity = 1;
    }, 300); // Tiempo de espera antes de cambiar el texto (en milisegundos)
}


function showFullGif() {
    const overlay = document.getElementById("overlay");
    const fullGif = document.getElementById("fullGif");

    overlay.style.display = "flex";  // Mostrar el overlay (fondo oscuro)
    
    // Esperar un pequeño tiempo antes de empezar la animación (0.5s)
    setTimeout(() => {
        fullGif.style.transition = "opacity 0.5s ease";  // Hacer que el GIF se desvanezca
        fullGif.style.opacity = 1;  // Mostrar el GIF

        // Aplica el filtro de desenfoque cuando se muestra
        overlay.style.filter = "blur(0px)";  // El fondo se vuelve nítido
        overlay.style.opacity = 1;  // Fondo completamente opaco
    }, 100); // Se da tiempo para el efecto de transición del GIF
    
    // Después de 3 segundos, iniciar la animación de desaparecer
    setTimeout(() => {
        // Aplicar desenfoque al fondo y desvanecerlo
        overlay.style.filter = "blur(5px)";  // Aumentar el desenfoque
        overlay.style.opacity = 0;  // Hacer que el fondo se desvanezca
        fullGif.style.opacity = 0;  // Desvanecer el GIF

        setTimeout(() => {
            overlay.style.display = "none";  // Ocultar el overlay completamente
            fullGif.style.opacity = 1;  // Restaurar opacidad del GIF cuando ya está oculto
        }, 500); // Tiempo de espera para el desenfoque y desaparición
    }, 3800); // GIF desaparece después de 3 segundos
}

// Asignar el evento de clic en los GIFs
document.getElementById("gifcorazon").addEventListener("click", showFullGif);

// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const navigationMenu = document.getElementById('navigationMenu');

    // Toggle del menú hamburguesa
    hamburgerIcon.addEventListener('click', function() {
        hamburgerIcon.classList.toggle('active');
        navigationMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#hamburgerMenu')) {
            hamburgerIcon.classList.remove('active');
            navigationMenu.classList.remove('active');
        }
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('#navigationMenu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerIcon.classList.remove('active');
            navigationMenu.classList.remove('active');
        });
    });

    // Funcionalidad de los botones de corazones estilo Instagram
    const likeButtons = document.querySelectorAll('a.like-button');
    likeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('liked');

            // Quitar la clase 'liked' después de 1 segundo para poder repetir la animación
            setTimeout(() => {
                this.classList.remove('liked');
            }, 1000);
        });
    });
});
