// Contraseña correcta (puedes cambiarla a lo que desees)
// Contraseña correcta
const correctPassword = "loco";

function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value;
    const passwordScreen = document.getElementById("passwordScreen");
    const content = document.getElementById("content");
    const errorMessage = document.getElementById("errorMessage");
    const gifContainer = document.getElementById("snopycon"); // Contenedor del GIF

    // Verificar si la contraseña es correcta
    if (passwordInput === correctPassword) {
        // Si la contraseña es correcta, ocultamos la pantalla de contraseña
        passwordScreen.style.display = "none";
        // Ocultar el contenedor del GIF
        gifContainer.style.display = "none"; // Ocultamos el GIF al ingresar la contraseña

        // Mostramos el contenido de la página con la animación
        content.style.display = "block"; // Esto activa la animación de entrada
    } else {
        // Si la contraseña es incorrecta, mostramos el mensaje de error
        errorMessage.style.display = "block";
    }
}


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