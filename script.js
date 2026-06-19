
// Simple FAQ toggle logic
document.querySelectorAll('.border-b h3').forEach(header => {
header.addEventListener('click', () => {
const content = header.nextElementSibling;
const icon = header.querySelector('.material-symbols-outlined');

if (content.classList.contains('hidden')) {
content.classList.remove('hidden');
icon.textContent = 'expand_less';
} else {
content.classList.add('hidden');
icon.textContent = 'expand_more';
}
});
});

const mudarTexto = document.getElementById('duvida_frequente');

function mudarCor(){
  mudarTexto.scrollIntoView({behavior: 'smooth'});
  mudarTexto.classList.add('highlight');
 
  setTimeout(() => {
    mudarTexto.classList.remove('highlight');
  }, 2500);
}





// Navbar scroll effect
window.addEventListener('scroll', () => {
const nav = document.getElementById('navbar');
if (window.scrollY > 50) {
nav.classList.add('shadow-md');
nav.classList.remove('shadow-sm');
} else {
nav.classList.remove('shadow-md');
nav.classList.add('shadow-sm');
}
});

// Testimonial Carousel Logic
const slider = document.getElementById('testimonial-slider');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const paginationContainer = document.getElementById('testimonial-pagination');

if (slider && prevBtn && nextBtn && paginationContainer) {
let currentSlide = 0;
const totalSlides = slider.children.length;
const bullets = paginationContainer.querySelectorAll('button');

function updateCarousel() {
slider.style.transform = `translateX(-${currentSlide * 100}%)`;

bullets.forEach((bullet, index) => {
if (index === currentSlide) {
bullet.classList.replace('bg-primary/30', 'bg-primary');
bullet.classList.remove('hover:bg-primary/50');
} else {
bullet.classList.replace('bg-primary', 'bg-primary/30');
bullet.classList.add('hover:bg-primary/50');
}
});
}

prevBtn.addEventListener('click', () => {
currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
updateCarousel();
});

nextBtn.addEventListener('click', () => {
currentSlide = (currentSlide + 1) % totalSlides;
updateCarousel();
});

bullets.forEach((bullet, index) => {
bullet.addEventListener('click', () => {
currentSlide = index;
updateCarousel();
});
});

// Optional: Auto-play functionality
setInterval(() => {
currentSlide = (currentSlide + 1) % totalSlides;
updateCarousel();
}, 5000);
}



//Formulario
document.addEventListener("DOMContentLoaded", function() {
const btn = document.getElementById('btn-enviar');

if (btn) {
btn.addEventListener('click', function(e) {
e.preventDefault(); 

// Captura os elementos da tela
const campoNome = document.getElementById('nome');
const campoWhats = document.getElementById('whats');
const campoServico = document.getElementById('servico');
const campoDataAgenda = document.getElementById('data-agenda'); // Novo campo

const nome = campoNome.value.trim();
const whats = campoWhats.value.trim();
const dataAgendaRaw = campoDataAgenda.value; // Pega o valor cru (AAAA-MM-DDTHH:MM)

if (!campoServico || campoServico.selectedIndex === -1) {
alert("Por favor, selecione um serviço!");
return;
}
const servicoTexto = campoServico.options[campoServico.selectedIndex].text;

// Validação: Garante que todos os campos foram preenchidos
if (!nome || !whats || campoServico.value === "" || !dataAgendaRaw) {
alert("Por favor, preencha todos os campos e selecione a data do agendamento!");
return;
}

// Formata a data escolhida pelo cliente para o padrão brasileiro (Ex: 20/06/2026 às 14:30)
const dataObjeto = new Date(dataAgendaRaw);
const dataFormatada = dataObjeto.toLocaleDateString('pt-BR') + ' às ' + dataObjeto.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});

// Trava o botão visualmente
btn.innerText = "Enviando dados...";
btn.disabled = true;

const urlGoogleSheets = "https://script.google.com/macros/s/AKfycbxcICCK9h7lUWLUe-rL67PkrXe4icEgDVm0jzyiJDUxmfLcS81hBf3n8qkB3utJgaCVjQ/exec";

// Inclui a nova informação 'dataEscolha' no pacote que vai para o Google
const dadosParaPlanilha = {
nome: nome,
whatsapp: whats,
servico: servicoTexto,
dataEscolha: dataFormatada 
};

// Envia para o Google Sheets em segundo plano
fetch(urlGoogleSheets, {
method: 'POST',
mode: 'no-cors', 
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(dadosParaPlanilha)
});

// Exibe a mensagem de sucesso e limpa a tela
setTimeout(function() {
alert("Obrigado! Seus dados e a preferência de horário foram enviados. Nossa equipe entrará em contato em breve via WhatsApp para confirmar a sua sessão!");

campoNome.value = "";
campoWhats.value = "";
campoServico.selectedIndex = 0;
campoDataAgenda.value = "";

btn.innerText = "Solicitar Agendamento";
btn.disabled = false;
}, 300);
});
}
});
