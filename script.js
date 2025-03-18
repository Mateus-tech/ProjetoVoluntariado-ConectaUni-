    /* Controle de Modais */
    function showModal(modalId) {
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById(modalId + 'Modal').classList.add('active');
      }
      function hideModals() {
        document.getElementById('modalOverlay').classList.remove('active');
        document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
      }
      
      /* Menu Mobile */
      function toggleMenu() {
        document.querySelector('.nav-links').classList.toggle('active');
      }
      
      /* Smooth scroll */
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
          document.querySelector('.nav-links').classList.remove('active');
        });
      });
      
      /* Back to Top */
      window.addEventListener('scroll', () => {
        document.getElementById('backToTop').style.display = window.scrollY > 300 ? 'block' : 'none';
      });
      function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      /* Função "Ver Mais" */
      function seeMore(type) {
        alert("Carregar mais " + type + "...");
      }
      
      /* Dados para Carousels */
      const courses = [
        { title: "Nivelamento - Matemática Básica", image: "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=800&q=60", description: "Refresque seus conhecimentos em matemática." },
        { title: "Nivelamento - Português", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60", description: "Melhore sua gramática e interpretação." },
        { title: "Nivelamento - Inglês", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=60", description: "Aprenda ou reforce o inglês básico." },
        { title: "Nivelamento - História", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=60", description: "Conheça os principais eventos históricos." },
        { title: "Nivelamento - Geografia", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60", description: "Explore os conceitos básicos de geografia." },
        { title: "Nivelamento - Química", image: "https://static.vecteezy.com/system/resources/previews/031/691/349/large_2x/chemistry-experiment-with-laboratory-flasks-ai-generative-free-photo.jpg", description: "Introdução aos fundamentos da química." }
      ];
      const volunteers = [
        { name: "Joalisson Pinto Maia", photo: "joka.jpg", expertise: "Sistema da Informação" },
        { name: "Carlos Henrique de Souza<br> Santana Santiago", photo: "carlos.jpg", expertise: "Sistema da Informação" },
        { name: "Levi Ferreira de <br>Oliveira Baptista", photo: "levi.jpg", expertise: "Sistema de Informação" },
        { name: "Mateus Queiroz<br>Matos Ferreira", photo: "mateus.jpg", expertise: "Sistema de Informação" }
      ];
      
      function populateCarouselCourses() {
        const carouselTrack = document.getElementById('carouselTrackCourses');
        let slidesHTML = courses.map(course => `
          <div class="card reveal">
            <img src="${course.image}" alt="${course.title}">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
          </div>
        `).join('');
        carouselTrack.innerHTML = slidesHTML + slidesHTML;
      }
      
      function populateCarouselVolunteers() {
        const carouselTrack = document.getElementById('carouselTrackVolunteers');
        let slidesHTML = volunteers.map(volunteer => `
          <div class="card reveal">
            <img src="${volunteer.photo}" alt="${volunteer.name}">
            <h3>${volunteer.name}</h3>
            <p>${volunteer.expertise}</p>
          </div>
        `).join('');
        carouselTrack.innerHTML = slidesHTML + slidesHTML;
      }
      
      /* Inicialização e efeitos de Reveal */
      document.addEventListener('DOMContentLoaded', () => {
        populateCarouselCourses();
        populateCarouselVolunteers();
        initCounters();
        initReveal();
        initTestimonialSlider();
      });
      
      /* Sistema de Login/Cadastro Local */
      function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
      }
      function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
      }
      document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        if(email === 'adm@gmail.com' && password === 'adm') {
          alert('Login como ADM realizado com sucesso!');
          hideModals();
          return;
        }
        const users = getUsers();
        const found = users.find(user => user.email === email && user.password === password);
        if(found) {
          alert('Login realizado com sucesso!');
          hideModals();
        } else {
          alert('Credenciais inválidas!');
        }
      });
      document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        const users = getUsers();
        if(users.find(user => user.email === email)) {
          alert('E-mail já cadastrado!');
          return;
        }
        users.push({ name, email, password });
        saveUsers(users);
        alert('Cadastro realizado com sucesso!');
        hideModals();
      });
      
      /* Dark Mode Toggle */
      function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
      }
      
      /* Contadores Animados (inicia quando visíveis) */
      function initCounters() {
        const counters = document.querySelectorAll('.counter');
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
              const updateCount = () => {
                const target = +entry.target.getAttribute('data-target');
                const count = +entry.target.innerText;
                const increment = target / 200;
                if(count < target) {
                  entry.target.innerText = Math.ceil(count + increment);
                  setTimeout(updateCount, 10);
                } else {
                  entry.target.innerText = target;
                }
              };
              updateCount();
              entry.target.dataset.counted = "true";
            }
          });
        }, { threshold: 0.5 });
        counters.forEach(counter => observer.observe(counter));
      }
      
      /* Testimonial Slider */
      function initTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        let current = 0;
        setInterval(() => {
          testimonials.forEach(t => t.classList.remove('active'));
          testimonials[current].classList.add('active');
          current = (current + 1) % testimonials.length;
        }, 4000);
      }
      
      /* Widget de Chat e Respostas */
      const chatResponses = {
        "olá": "Olá! Em que posso ajudar?",
        "oi": "Oi! Como posso ajudar você hoje?",
        "cadastro": "Para se cadastrar como voluntário, clique no botão 'Cadastrar'.",
        "professor": "Você pode buscar um professor na seção 'Cursos' ou entrar em contato.",
        "voluntário": "Se deseja ser voluntário, clique em 'Cadastrar'."
      };
      function toggleChatModal() {
        document.getElementById('chatModal').classList.toggle('active');
      }
      function sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim().toLowerCase();
        if(message) {
          const chatContent = document.getElementById('chatContent');
          chatContent.innerHTML += `<p><strong>Você:</strong> ${input.value}</p>`;
          let response = chatResponses[message];
          if(!response) {
            response = "Desculpe, não entendi. Por favor, entre em contato com nosso suporte pelo email contato@conectuni.com.";
          }
          setTimeout(() => {
            chatContent.innerHTML += `<p><strong>ChatBot:</strong> ${response}</p>`;
            chatContent.scrollTop = chatContent.scrollHeight;
          }, 500);
          input.value = "";
        }
      }
      
      /* Reveal Elements on Scroll */
      function initReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const options = { threshold: 0.2 };
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if(entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, options);
        reveals.forEach(reveal => observer.observe(reveal));
        
      }
      function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const options = { 
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
          if(entry.target.classList.contains('testimonial-card')) {
            entry.target.style.animation = `cardReveal 0.6s ${entry.target.dataset.delay} forwards`;
          }
        }
      });
    }, options);
  
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
      card.dataset.delay = `${index * 0.2}s`;
    });
  
    reveals.forEach(reveal => observer.observe(reveal));
  }
    // Atualize a função do dark mode para alternar entre as classes
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
      }
    
      // Carregar tema salvo
      window.addEventListener('load', () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.add(savedTheme === 'dark' ? 'dark-mode' : 'light-mode');
      });  

      
// Sistema de Chat Corrigido
const chatIntents = [
    {
        keywords: ['ola', 'olá', 'oi', 'bom dia', 'boa tarde', 'boa noite'],
        response: "👋 Olá! Sou o assistente virtual da ConectaUni. Como posso ajudar?",
    },
    {
        keywords: ['cadastrar', 'cadastro'],
        response: "📝 Clique no botão 'Cadastrar' no menu superior ou <button onclick='showModal(\"signup\")' class='chat-link'>clique aqui</button>",
    },
    {
        keywords: ['curso', 'cursos'],
        response: "📚 Nossos cursos estão na seção <a href='#cursos' class='chat-link'>Cursos de Nivelamento</a>",
    },
    {
        keywords: ['voluntario', 'voluntários'],
        response: "🤝 Para se cadastrar como voluntário, <button onclick='showModal(\"signup\")' class='chat-link'>clique aqui</button>",
    },
    {
        keywords: ['contato', 'suporte'],
        response: "📧 Entre em contato: contato@conectauni.com | (11) 9999-9999",
    }
];

function toggleChatModal() {
    const chatModal = document.getElementById('chatModal');
    chatModal.classList.toggle('active');
    if(chatModal.classList.contains('active')) {
        document.getElementById('chatInput').focus();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    const chatContent = document.getElementById('chatContent');
    
    if(message) {
        // Mensagem do usuário
        const userDiv = document.createElement('div');
        userDiv.className = 'chat-message user-message';
        userDiv.innerHTML = `<strong>Você:</strong> ${message}`;
        chatContent.appendChild(userDiv);
        
        // Resposta do bot
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            const botDiv = document.createElement('div');
            botDiv.className = 'chat-message bot-message';
            botDiv.innerHTML = `<strong>ChatBot:</strong> ${botResponse}`;
            chatContent.appendChild(botDiv);
            chatContent.scrollTop = chatContent.scrollHeight;
        }, 500);
        
        input.value = '';
    }
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    for(const intent of chatIntents) {
        if(intent.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return intent.response;
        }
    }
    return "🤖 Desculpe, não entendi. Você pode tentar: <br>• 'Cadastrar' <br>• 'Cursos' <br>• 'Voluntários'";
}

// Event Listeners
document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        sendChatMessage();
    }
});

document.querySelector('.chat-input button').addEventListener('click', (e) => {
    e.preventDefault();
    sendChatMessage();
});

