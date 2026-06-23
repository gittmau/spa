
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
const campoData = document.getElementById('data-agenda');
const campoHora = document.getElementById('hora-agenda');

// O seu link oficial do Google Apps Script
const urlGoogleSheets = "https://script.google.com/macros/s/AKfycbxcICCK9h7lUWLUe-rL67PkrXe4icEgDVm0jzyiJDUxmfLcS81hBf3n8qkB3utJgaCVjQ/exec";

// 🔍 FUNÇÃO ISOLADA QUE BUSCA OS HORÁRIOS NO GOOGLE
function buscarHorariosLivres() {
const dataSelecionada = campoData.value; // Formato AAAA-MM-DD
if (!dataSelecionada) return;

campoHora.innerHTML = '<option value="">Buscando horários livres...</option>';
campoHora.disabled = true;

// Faz a consulta de leitura com a rota de redirecionamento autorizada
fetch(urlGoogleSheets + "?data=" + dataSelecionada, {
method: "GET",
redirect: "follow"
})
.then(response => {
if (!response.ok) throw new Error("Erro na rede do servidor");
return response.json();
})
.then(data => {
campoHora.innerHTML = '<option value="">Selecione um horário</option>';

if (data.horariosLivres && data.horariosLivres.length > 0) {
data.horariosLivres.forEach(hora => {
campoHora.innerHTML += `<option value="${hora}">${hora}</option>`;
});
campoHora.disabled = false; // 🔓 DESTRAVA O CAMPO E DEIXA CLICÁVEL!
} else {
campoHora.innerHTML = '<option value="">Nenhum horário disponível para este dia</option>';
}
})
.catch(err => {
console.error("Erro na conexão:", err);
campoHora.innerHTML = '<option value="">Erro ao conectar com o servidor</option>';
});
}

// 🕵️ MONITORAMENTO EM TEMPO REAL: Acorda com cliques, digitação ou preenchimento automático
if (campoData) {
campoData.addEventListener('input', buscarHorariosLivres);
campoData.addEventListener('change', buscarHorariosLivres);

// 🚀 VERIFICAÇÃO INICIAL: Se o campo já abrir preenchido sozinho, ele já roda a busca na hora!
if (campoData.value) {
buscarHorariosLivres();
}
}

// 📥 PROCESSAMENTO DO ENVIO FINAL DO FORMULÁRIO
if (btn) {
btn.addEventListener('click', function(e) {
e.preventDefault(); 

const campoNome = document.getElementById('nome');
const campoWhats = document.getElementById('whats');
const campoServico = document.getElementById('servico');

if (!campoNome || !campoWhats || !campoServico || !campoData || !campoHora) {
alert("Erro interno: Verifique os IDs no HTML.");
return;
}

const nome = campoNome.value.trim();
const whats = campoWhats.value.trim();
const dataTexto = campoData.value;
const horaTexto = campoHora.value;
const servicoTexto = campoServico.options[campoServico.selectedIndex] ? campoServico.options[campoServico.selectedIndex].text : '';

if (!nome || !whats || campoServico.value === "" || !dataTexto || !horaTexto) {
alert("Por favor, preencha todos os campos e escolha um horário disponível!");
return;
}

btn.innerText = "Enviando dados...";
btn.disabled = true;

const dadosParaPlanilha = {
nome: nome,
whatsapp: whats,
servico: servicoTexto,
dataEscolha: dataTexto,
horaEscolha: horaTexto
};

fetch(urlGoogleSheets, {
method: 'POST',
mode: 'no-cors', 
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(dadosParaPlanilha)
});

setTimeout(function() {
alert("Agendamento solicitado com sucesso! Em breve entraremos em contato para confirmar.");
campoNome.value = "";
campoWhats.value = "";
campoServico.selectedIndex = 0;
campoData.value = "";
campoHora.innerHTML = '<option value="">Selecione a data primeiro...</option>';
campoHora.disabled = true;

btn.innerText = "Solicitar Agendamento";
btn.disabled = false;
}, 300);
});
}
});
