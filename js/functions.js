
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
	
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);
}

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

// Variable global para controlar aniversarios
var lastCheckedMonth = -1;
var anniversaryMessages = {
	1: "¡Nuestro primer mes juntos! 💕 Cada día contigo es una nueva aventura.",
	2: "¡Dos meses de amor! 🌹 Tu sonrisa ilumina mis días.",
	3: "¡Tres meses de felicidad! 🎈 Eres mi persona favorita en todo el mundo.",
	4: "¡Cuatro meses de amor puro! 💖 Contigo el tiempo vuela.",
	5: "¡Cinco meses de sueños compartidos! ⭐ Eres mi estrella más brillante.",
	6: "¡Medio año de amor! 🎊 Cada momento contigo es un regalo.",
	7: "¡Siete meses de risas y amor! 😊 Tu amor me hace mejor persona.",
	8: "¡Ocho meses de complicidad! 💑 Somos el equipo perfecto.",
	9: "¡Nueve meses de amor infinito! 🌙 Eres mi luna en las noches oscuras.",
	10: "¡Diez meses de pura magia! ✨ Contigo todo es posible.",
	11: "¡Once meses de amor verdadero! 💝 Eres mi regalo más preciado.",
	12: "¡Un año completo de amor! 🎂 365 días de felicidad contigo."
};

// Función para personalizar mensajes de aniversario
function setAnniversaryMessage(month, message) {
	anniversaryMessages[month] = message;
}

// Función para obtener todos los mensajes (para edición)
function getAllAnniversaryMessages() {
	return anniversaryMessages;
}

function timeElapse(date){
	var current = new Date();
	var startDate = new Date(date);

	// Calcular años, meses y días
	var years = current.getFullYear() - startDate.getFullYear();
	var months = current.getMonth() - startDate.getMonth();
	var days = current.getDate() - startDate.getDate();

	// Ajustar si los días son negativos
	if (days < 0) {
		months--;
		var lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
		days += lastMonth.getDate();
	}

	// Ajustar si los meses son negativos
	if (months < 0) {
		years--;
		months += 12;
	}

	// Calcular el total de meses transcurridos
	var totalMonths = years * 12 + months;

	// Verificar si es aniversario mensual (día exacto)
	if (current.getDate() === startDate.getDate() && days === 0 && totalMonths > 0 && totalMonths !== lastCheckedMonth) {
		lastCheckedMonth = totalMonths;
		triggerAnniversaryAnimation(totalMonths);
	}

	// Calcular horas, minutos y segundos del día actual
	var totalSeconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var remainingSeconds = totalSeconds % (3600 * 24);
	var hours = Math.floor(remainingSeconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	remainingSeconds = remainingSeconds % 3600;
	var minutes = Math.floor(remainingSeconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	var seconds = Math.floor(remainingSeconds % 60);
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	var result = "<span class=\"digit\">" + years + "</span> años <span class=\"digit\">" + months + "</span> meses <span class=\"digit\">" + days + "</span> días <span class=\"digit\">" + hours + "</span> horas <span class=\"digit\">" + minutes + "</span> minutos <span class=\"digit\">" + seconds + "</span> segundos";
	$("#elapseClock").html(result);
}

function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function() {
		showLoveU();
	});
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 195);
	$('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
	$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
	$('#loveu').fadeIn(3000);
}

// Funciones para la animación de aniversario
function triggerAnniversaryAnimation(monthNumber) {
	// Crear overlay para la animación
	createAnniversaryOverlay();

	// Iniciar fuegos artificiales
	setTimeout(function() {
		startFireworks();
	}, 500);

	// Mostrar regalo después de 3 segundos
	setTimeout(function() {
		showGift(monthNumber);
	}, 3000);
}

function createAnniversaryOverlay() {
	var overlay = $('<div id="anniversaryOverlay"></div>');
	overlay.css({
		'position': 'fixed',
		'top': '0',
		'left': '0',
		'width': '100%',
		'height': '100%',
		'background': 'rgba(0, 0, 0, 0.8)',
		'z-index': '1000',
		'display': 'flex',
		'justify-content': 'center',
		'align-items': 'center'
	});

	var fireworksCanvas = $('<canvas id="fireworksCanvas"></canvas>');
	fireworksCanvas.attr('width', $(window).width());
	fireworksCanvas.attr('height', $(window).height());
	fireworksCanvas.css({
		'position': 'absolute',
		'top': '0',
		'left': '0'
	});

	overlay.append(fireworksCanvas);
	$('body').append(overlay);
}

// Sistema de fuegos artificiales
var fireworks = [];
var particles = [];

function Firework(x, y) {
	this.x = x;
	this.y = y;
	this.targetY = Math.random() * ($(window).height() * 0.3) + 50;
	this.speed = Math.random() * 3 + 2;
	this.exploded = false;
	this.hue = Math.random() * 360;
}

Firework.prototype.update = function() {
	if (!this.exploded) {
		this.y -= this.speed;
		if (this.y <= this.targetY) {
			this.explode();
		}
	}
};

Firework.prototype.explode = function() {
	this.exploded = true;
	// Crear partículas de explosión
	for (var i = 0; i < 30; i++) {
		particles.push(new Particle(this.x, this.y, this.hue));
	}
};

Firework.prototype.draw = function(ctx) {
	if (!this.exploded) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
		ctx.fillStyle = 'hsl(' + this.hue + ', 100%, 50%)';
		ctx.fill();
	}
};

function Particle(x, y, hue) {
	this.x = x;
	this.y = y;
	this.vx = (Math.random() - 0.5) * 10;
	this.vy = (Math.random() - 0.5) * 10;
	this.life = 1;
	this.decay = Math.random() * 0.02 + 0.01;
	this.hue = hue + Math.random() * 60 - 30;
}

Particle.prototype.update = function() {
	this.x += this.vx;
	this.y += this.vy;
	this.vy += 0.1; // gravedad
	this.life -= this.decay;
};

Particle.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
	ctx.fillStyle = 'hsla(' + this.hue + ', 100%, 50%, ' + this.life + ')';
	ctx.fill();
};

function startFireworks() {
	var canvas = document.getElementById('fireworksCanvas');
	var ctx = canvas.getContext('2d');

	var fireworkInterval = setInterval(function() {
		// Crear nuevos fuegos artificiales
		if (Math.random() < 0.1) {
			fireworks.push(new Firework(Math.random() * canvas.width, canvas.height));
		}

		// Limpiar canvas
		ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Actualizar y dibujar fuegos artificiales
		for (var i = fireworks.length - 1; i >= 0; i--) {
			fireworks[i].update();
			fireworks[i].draw(ctx);
			if (fireworks[i].exploded) {
				fireworks.splice(i, 1);
			}
		}

		// Actualizar y dibujar partículas
		for (var i = particles.length - 1; i >= 0; i--) {
			particles[i].update();
			particles[i].draw(ctx);
			if (particles[i].life <= 0) {
				particles.splice(i, 1);
			}
		}
	}, 50);

	// Detener fuegos artificiales después de 10 segundos
	setTimeout(function() {
		clearInterval(fireworkInterval);
	}, 10000);
}

function showGift(monthNumber) {
	var giftContainer = $('<div id="giftContainer"></div>');
	giftContainer.css({
		'position': 'absolute',
		'top': '50%',
		'left': '50%',
		'transform': 'translate(-50%, -50%)',
		'z-index': '1001',
		'cursor': 'pointer'
	});

	var gift = $('<div id="gift"></div>');
	gift.css({
		'width': '100px',
		'height': '100px',
		'background': 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
		'border-radius': '10px',
		'position': 'relative',
		'box-shadow': '0 10px 30px rgba(0,0,0,0.3)',
		'animation': 'giftBounce 2s infinite'
	});

	// Lazo del regalo
	var ribbon = $('<div></div>');
	ribbon.css({
		'position': 'absolute',
		'top': '0',
		'left': '50%',
		'transform': 'translateX(-50%)',
		'width': '20px',
		'height': '100px',
		'background': '#feca57',
		'z-index': '1'
	});

	var bow = $('<div></div>');
	bow.css({
		'position': 'absolute',
		'top': '-10px',
		'left': '50%',
		'transform': 'translateX(-50%)',
		'width': '40px',
		'height': '20px',
		'background': '#feca57',
		'border-radius': '50%',
		'z-index': '2'
	});

	gift.append(ribbon);
	gift.append(bow);
	giftContainer.append(gift);

	// Agregar texto "¡Haz clic para abrir!"
	var clickText = $('<div>¡Haz clic para abrir!</div>');
	clickText.css({
		'color': 'white',
		'text-align': 'center',
		'margin-top': '20px',
		'font-size': '18px',
		'font-weight': 'bold',
		'text-shadow': '2px 2px 4px rgba(0,0,0,0.5)',
		'animation': 'textGlow 1.5s infinite alternate'
	});

	giftContainer.append(clickText);
	$('#anniversaryOverlay').append(giftContainer);

	// Evento de clic para abrir el regalo
	giftContainer.click(function() {
		openGift(monthNumber);
	});
}

function openGift(monthNumber) {
	// Animación de apertura del regalo
	$('#gift').css({
		'animation': 'giftOpen 1s ease-out forwards'
	});

	setTimeout(function() {
		showNote(monthNumber);
	}, 1000);
}

function showNote(monthNumber) {
	// Ocultar el regalo
	$('#giftContainer').fadeOut(500);

	setTimeout(function() {
		var noteContainer = $('<div id="noteContainer"></div>');
		noteContainer.css({
			'position': 'absolute',
			'top': '50%',
			'left': '50%',
			'transform': 'translate(-50%, -50%)',
			'z-index': '1002',
			'background': 'white',
			'padding': '30px',
			'border-radius': '15px',
			'box-shadow': '0 15px 50px rgba(0,0,0,0.3)',
			'max-width': '400px',
			'text-align': 'center',
			'animation': 'noteAppear 1s ease-out'
		});

		var noteTitle = $('<h2>¡Feliz Aniversario!</h2>');
		noteTitle.css({
			'color': '#e74c3c',
			'margin-bottom': '20px',
			'font-family': 'Arial, sans-serif'
		});

		var noteMessage = $('<p></p>');
		noteMessage.text(anniversaryMessages[monthNumber] || "¡Otro mes más de amor infinito! 💕");
		noteMessage.css({
			'color': '#2c3e50',
			'font-size': '16px',
			'line-height': '1.6',
			'margin-bottom': '20px',
			'font-family': 'Arial, sans-serif'
		});

		var closeButton = $('<button>Cerrar ❤️</button>');
		closeButton.css({
			'background': '#e74c3c',
			'color': 'white',
			'border': 'none',
			'padding': '10px 20px',
			'border-radius': '25px',
			'cursor': 'pointer',
			'font-size': '16px',
			'font-weight': 'bold'
		});

		closeButton.click(function() {
			closeAnniversaryAnimation();
		});

		noteContainer.append(noteTitle);
		noteContainer.append(noteMessage);
		noteContainer.append(closeButton);

		$('#anniversaryOverlay').append(noteContainer);
	}, 500);
}

function closeAnniversaryAnimation() {
	$('#anniversaryOverlay').fadeOut(1000, function() {
		$(this).remove();
		fireworks = [];
		particles = [];
	});
}

// Función para probar la animación manualmente (temporal)
function testAnniversaryAnimation(monthNumber) {
	if (!monthNumber) monthNumber = 3; // Por defecto mes 3
	triggerAnniversaryAnimation(monthNumber);
}

// Funcionalidad del menú hamburguesa
$(document).ready(function() {
	// Toggle del menú hamburguesa
	$('#hamburgerIcon').click(function() {
		$(this).toggleClass('active');
		$('#navigationMenu').toggleClass('active');
	});

	// Cerrar menú al hacer clic fuera
	$(document).click(function(e) {
		if (!$(e.target).closest('#hamburgerMenu').length) {
			$('#hamburgerIcon').removeClass('active');
			$('#navigationMenu').removeClass('active');
		}
	});

	// Cerrar menú al hacer clic en un enlace
	$('#navigationMenu a').click(function() {
		$('#hamburgerIcon').removeClass('active');
		$('#navigationMenu').removeClass('active');
	});
});