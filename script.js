// =======================================================
// 1. CÓDIGO DO MODAL LIGHTBOX (MANTIDO E FUNCIONANDO)
// =======================================================
const fotos = document.querySelectorAll('.foto-item img');
const modal = document.getElementById('modal-fotos');
const modalImg = document.getElementById('modal-imagem');
const btnFechar = document.getElementById('btn-fechar');
const btnAnt = document.getElementById('btn-ant');
const btnProx = document.getElementById('btn-prox');

let listaImagens = [];
let indexAtual = 0;

function mapearImagens() {
    listaImagens = [];
    fotos.forEach(img => {
        if (window.getComputedStyle(img.closest('.foto-item')).display !== 'none') {
            listaImagens.push(img.src);
        }
    });
}

fotos.forEach(img => {
    img.addEventListener('click', function () {
        mapearImagens();
        indexAtual = listaImagens.indexOf(this.src);
        mostrarImagem(indexAtual);
        modal.style.display = 'flex';
    });
});

function mostrarImagem(index) {
    modalImg.src = listaImagens[index];
}

btnProx.addEventListener('click', function (e) {
    e.stopPropagation();
    indexAtual = (indexAtual + 1) % listaImagens.length;
    mostrarImagem(indexAtual);
});

btnAnt.addEventListener('click', function (e) {
    e.stopPropagation();
    indexAtual = (indexAtual - 1 + listaImagens.length) % listaImagens.length;
    mostrarImagem(indexAtual);
});

btnFechar.addEventListener('click', () => modal.style.display = 'none');

modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('keydown', function (e) {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowRight') btnProx.click();
        if (e.key === 'ArrowLeft') btnAnt.click();
        if (e.key === 'Escape') modal.style.display = 'none';
    }
});


// =======================================================
// 2. NOVA IDEIA 1: REVELAÇÃO SUAVE AO ROLAR (FADE-IN)
// =======================================================
// Seleciona os parágrafos de texto e as frases do mural
const elementosScroll = document.querySelectorAll('.bloco-texto p, .frase-inspiracao');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel'); // Ativa a animação do CSS
        }
    });
}, {
    threshold: 0.1 // Ativa quando 10% do elemento aparece na tela
});

elementosScroll.forEach(el => {
    el.classList.add('efeito-scroll'); // Adiciona a classe base do efeito
    observer.observe(el);
});


// =======================================================
// 3. NOVA IDEIA 2: CHUVA DE BRILHOS (SPARKLES)
// =======================================================
const botaoConvite = document.querySelector('.botao-convite');

botaoConvite.addEventListener('click', function(e) {
    // Se o botão tiver um link real (ex: #confirmar), o preventDefault abaixo pode ser removido depois.
    // e.preventDefault(); 

    // Cria 40 partículas de brilho espalhadas
    for (let i = 0; i < 40; i++) {
        criarBrilho();
    }
});

function criarBrilho() {
    const brilho = document.createElement('div');
    brilho.classList.add('brilho-particula');
    
    // Escolhe aleatoriamente se vai ser uma estrelinha ou um mini coração dourado
    const tipos = ['✨', '✧', '✦', '💛'];
    brilho.innerText = tipos[Math.floor(Math.random() * tipos.length)];
    
    // Posição inicial (perto do botão)
    const posX = botaoConvite.offsetLeft + (Math.random() * botaoConvite.offsetWidth);
    const posY = botaoConvite.offsetTop + (Math.random() * botaoConvite.offsetHeight);
    
    brilho.style.left = posX + 'px';
    brilho.style.top = posY + 'px';
    
    // Tamanhos e direções aleatórias para o efeito ficar natural
    const tamanho = Math.random() * 15 + 10;
    brilho.style.fontSize = tamanho + 'px';
    
    // Define a distância que a partícula vai voar para os lados
    brilho.style.setProperty('--direcao-x', (Math.random() * 300 - 150) + 'px');
    brilho.style.setProperty('--direcao-y', (Math.random() * 300 - 150) + 'px');
    // Adiciona o elemento na coluna de texto
    document.querySelector('.coluna-texto').appendChild(brilho);
    
    // Remove o brilho do site após 2 segundos (quando a animação acaba)
    setTimeout(() => {
        brilho.remove();
    }, 2000);
}