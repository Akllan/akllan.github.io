// Sistema de Chat Estilo Instagram Live
class InstagramLiveChat {
    constructor() {
        this.messages = [];
        this.currentUser = localStorage.getItem('chatUsername') || '';
        this.messageContainer = null;
        this.chatInput = null;
        this.isActive = true;
        this.messageQueue = [];
        this.savedUserMessages = JSON.parse(localStorage.getItem('savedChatMessages')) || [];
        this.userMessageIndex = 0;
        this.floatingHearts = [];
        this.activeUsers = ['Alfonso', 'Gery', 'Aklan', 'Abish', 'Geraldine', 'AULAN', 'ALDRY'];
        this.heartContainer = null;
        
        // Mensajes predefinidos de Alfonso y Gery sobre la relación
        this.predefinedMessages = [
            {usuario: "Alfonso", mensaje: "Audry y Alan hacen una pareja hermosa 💕", delay: 8000},
            {usuario: "Gery", mensaje: "Se nota que se aman mucho ❤️", delay: 15000},
            {usuario: "Alfonso", mensaje: "Que bonito contador de tiempo juntos", delay: 22000},
            {usuario: "Gery", mensaje: "Alan cuida mucho a Audry 🥰", delay: 30000},
            {usuario: "Alfonso", mensaje: "Esta página está llena de amor", delay: 38000},
            {usuario: "Gery", mensaje: "Audry tiene suerte de tener a Alan", delay: 45000},
            {usuario: "Alfonso", mensaje: "Espero que sean felices para siempre", delay: 52000},
            {usuario: "Gery", mensaje: "Que viva el amor verdadero! 💖", delay: 60000},
            {usuario: "Alfonso", mensaje: "Alan es muy detallista con Audry", delay: 68000},
            {usuario: "Gery", mensaje: "Se ven tan enamorados 😍", delay: 75000},
            {usuario: "Alfonso", mensaje: "Audry y Alan por siempre ✨", delay: 82000},
            {usuario: "Gery", mensaje: "Que bonita historia de amor", delay: 90000},
            {usuario: "Alfonso", mensaje: "Alan hizo una página preciosa", delay: 98000},
            {usuario: "Gery", mensaje: "Audry debe estar muy feliz 💕", delay: 105000},
            {usuario: "Alfonso", mensaje: "Ojalá mi relación fuera así de bonita", delay: 112000},
            {usuario: "Gery", mensaje: "Son la pareja perfecta ❤️", delay: 120000}
        ];
        
        this.currentMessageIndex = 0;
        this.init();
    }
    
    init() {
        this.createChatInterface();
        this.setupEventListeners();
        this.startAutomaticMessages();
        this.startFloatingHearts();
        this.startActiveLikes();

        // Pedir nombre de usuario si no existe
        if (!this.currentUser) {
            this.promptUsername();
        }
    }
    
    createChatInterface() {
        // Contenedor de mensajes flotantes
        this.messageContainer = document.createElement('div');
        this.messageContainer.id = 'liveMessagesContainer';
        this.messageContainer.innerHTML = '';

        // Contenedor de corazones flotantes
        this.heartContainer = document.createElement('div');
        this.heartContainer.id = 'floatingHeartsContainer';
        this.heartContainer.innerHTML = '';

        // Chat input en la parte inferior
        const chatContainer = document.createElement('div');
        chatContainer.id = 'liveChatContainer';
        chatContainer.innerHTML = `
            <div id="chatInputArea">
                <input type="text" id="chatMessageInput" placeholder="Escribe un mensaje..." maxlength="100">
                <button id="sendMessageBtn">📤</button>
                <button id="likeBtn">❤️</button>
            </div>
        `;

        document.body.appendChild(this.messageContainer);
        document.body.appendChild(this.heartContainer);
        document.body.appendChild(chatContainer);

        this.chatInput = document.getElementById('chatMessageInput');
    }
    
    setupEventListeners() {
        const sendBtn = document.getElementById('sendMessageBtn');
        const likeBtn = document.getElementById('likeBtn');

        // Eventos para escritorio
        sendBtn.addEventListener('click', () => this.sendMessage());
        likeBtn.addEventListener('click', () => this.createFloatingHeart());

        // Eventos táctiles para móvil
        sendBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.sendMessage();
        });

        likeBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.createFloatingHeart();
        });

        // Prevenir zoom en doble tap
        sendBtn.addEventListener('touchend', (e) => e.preventDefault());
        likeBtn.addEventListener('touchend', (e) => e.preventDefault());

        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Ajustar viewport en móvil cuando aparece el teclado
        if (window.innerWidth <= 768) {
            this.chatInput.addEventListener('focus', () => {
                setTimeout(() => {
                    document.getElementById('liveChatContainer').style.bottom = '5px';
                }, 300);
            });

            this.chatInput.addEventListener('blur', () => {
                document.getElementById('liveChatContainer').style.bottom = '5px';
            });
        }
    }
    
    promptUsername() {
        const username = prompt('¡Bienvenido al chat! ¿Cuál es tu nombre?');
        if (username && username.trim()) {
            this.currentUser = username.trim();
            localStorage.setItem('chatUsername', this.currentUser);
            this.addMessage('Sistema', `¡${this.currentUser} se unió al chat! 👋`, 'system');
        } else {
            this.currentUser = 'Anónimo';
        }
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (message && this.currentUser) {
            this.addMessage(this.currentUser, message, 'user');

            // Guardar mensaje del usuario para reproducir después
            const userMessage = {
                usuario: this.currentUser,
                mensaje: message,
                timestamp: Date.now(),
                delay: Math.random() * 60000 + 30000 // Entre 30 segundos y 1.5 minutos
            };

            this.savedUserMessages.push(userMessage);
            localStorage.setItem('savedChatMessages', JSON.stringify(this.savedUserMessages));

            this.chatInput.value = '';
        }
    }
    
    addMessage(username, message, type = 'auto') {
        const messageElement = document.createElement('div');
        messageElement.className = `live-message ${type}`;
        
        const colors = {
            'Alfonso': '#ff6b6b',
            'Gery': '#4ecdc4',
            'user': '#e74c3c',
            'system': '#95a5a6'
        };
        
        const userColor = colors[username] || '#3498db';
        
        messageElement.innerHTML = `
            <div class="message-content">
                <span class="username" style="color: ${userColor}">${username}</span>
                <span class="message-text">${message}</span>
            </div>
        `;
        
        this.messageContainer.appendChild(messageElement);
        
        // Animación de entrada
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 100);
        
        // Auto-eliminar después de 8 segundos
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.parentNode.removeChild(messageElement);
                }
            }, 500);
        }, 8000);
        
        // Mantener solo los últimos 10 mensajes visibles
        const messages = this.messageContainer.querySelectorAll('.live-message');
        if (messages.length > 10) {
            messages[0].remove();
        }
    }
    
    startAutomaticMessages() {
        // Mensajes predefinidos de Alfonso y Gery
        this.predefinedMessages.forEach((msgData, index) => {
            setTimeout(() => {
                if (this.isActive) {
                    this.addMessage(msgData.usuario, msgData.mensaje, 'auto');
                }
            }, msgData.delay);
        });

        // Reproducir mensajes guardados de usuarios reales
        this.startUserMessageReplay();

        // Reiniciar el ciclo después de que terminen todos los mensajes
        setTimeout(() => {
            if (this.isActive) {
                this.startAutomaticMessages();
            }
        }, Math.max(...this.predefinedMessages.map(m => m.delay)) + 10000);
    }

    startUserMessageReplay() {
        if (this.savedUserMessages.length === 0) return;

        // Reproducir mensajes de usuarios reales con delays aleatorios
        this.savedUserMessages.forEach((msgData, index) => {
            const randomDelay = Math.random() * 120000 + 20000; // Entre 20 segundos y 2 minutos

            setTimeout(() => {
                if (this.isActive) {
                    this.addMessage(msgData.usuario, msgData.mensaje, 'saved-user');
                }
            }, randomDelay);
        });
    }

    createFloatingHeart(fromUser = null) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';

        // Posición inicial adaptada para móvil
        const isMobile = window.innerWidth <= 768;
        const startX = isMobile ? window.innerWidth - 30 : window.innerWidth - 50;
        const startY = isMobile ? window.innerHeight - 100 : window.innerHeight - 150;

        heart.style.left = startX + 'px';
        heart.style.top = startY + 'px';

        this.heartContainer.appendChild(heart);

        // Mostrar quién dio like si es de un usuario específico
        if (fromUser) {
            this.showLikeNotification(fromUser);
        }

        // Animación de flotación
        setTimeout(() => {
            heart.style.transform = `translateY(-${window.innerHeight}px) translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = '0';
        }, 100);

        // Eliminar después de la animación
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 3000);
    }

    showLikeNotification(username) {
        const notification = document.createElement('div');
        notification.className = 'like-notification';
        notification.innerHTML = `${username} ❤️`;

        const isMobile = window.innerWidth <= 768;

        notification.style.position = 'fixed';
        notification.style.right = isMobile ? '10px' : '20px';
        notification.style.top = isMobile ? '40%' : '50%';
        notification.style.background = 'rgba(255, 255, 255, 0.95)';
        notification.style.padding = isMobile ? '6px 10px' : '5px 10px';
        notification.style.borderRadius = '15px';
        notification.style.fontSize = isMobile ? '11px' : '12px';
        notification.style.fontWeight = 'bold';
        notification.style.zIndex = '1001';
        notification.style.transform = 'translateY(-50%)';
        notification.style.opacity = '0';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';

        document.body.appendChild(notification);

        // Animación de aparición
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(-50%) scale(1.1)';
        }, 100);

        // Desaparecer
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 1500);
    }

    startFloatingHearts() {
        // Crear corazones automáticamente cada 2-5 segundos
        setInterval(() => {
            if (this.isActive && Math.random() < 0.7) {
                this.createFloatingHeart();
            }
        }, Math.random() * 3000 + 2000);
    }

    startActiveLikes() {
        // Usuarios activos dan likes periódicamente
        setInterval(() => {
            if (this.isActive && Math.random() < 0.5) {
                const randomUser = this.activeUsers[Math.floor(Math.random() * this.activeUsers.length)];
                this.createFloatingHeart(randomUser);
            }
        }, Math.random() * 4000 + 3000);
    }
}

// Inicializar el chat cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    window.liveChat = new InstagramLiveChat();
});
