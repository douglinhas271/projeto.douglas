// Banco de dados fictício simulando os achados mapeados pelo Bot
const promoDatabase = [
    {
        title: "Jaqueta de Couro Legítimo Vintage Destroyer",
        category: "Roupa",
        platform: "mercadolivre",
        platformName: "Mercado Livre",
        oldPrice: "R$ 459,00",
        newPrice: "R$ 289,90",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
        minutesAgo: 1
    },
    {
        title: "Teclado Mecânico Cyberpunk RGB Switch Blue",
        category: "Eletrônico",
        platform: "shopee",
        platformName: "Shopee",
        oldPrice: "R$ 299,00",
        newPrice: "R$ 142,50",
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=500&q=80",
        minutesAgo: 2
    },
    {
        title: "Relógio Militar Digital tático - Black Ops",
        category: "Acessório",
        platform: "mercadolivre",
        platformName: "Mercado Livre",
        oldPrice: "R$ 189,00",
        newPrice: "R$ 89,00",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=500&q=80",
        minutesAgo: 4
    },
    {
        title: "Headset Gamer Wireless ANC - Neon Sound",
        category: "Eletrônico",
        platform: "shopee",
        platformName: "Shopee",
        oldPrice: "R$ 540,00",
        newPrice: "R$ 319,00",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
        minutesAgo: 5
    },
    {
        title: "Bota Coturno de Camurça Rústica Premium",
        category: "Roupa",
        platform: "mercadolivre",
        platformName: "Mercado Livre",
        oldPrice: "R$ 320,00",
        newPrice: "R$ 198,00",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=500&q=80",
        minutesAgo: 7
    },
    {
        title: "Óculos de Sol Steampunk Lentes Polarizadas",
        category: "Acessório",
        platform: "shopee",
        platformName: "Shopee",
        oldPrice: "R$ 120,00",
        newPrice: "R$ 45,90",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80",
        minutesAgo: 9
    },
    {
        title: "Mouse Gamer Sem Fio Ultraleve 26K DPI",
        category: "Eletrônico",
        platform: "mercadolivre",
        platformName: "Mercado Livre",
        oldPrice: "R$ 410,00",
        newPrice: "R$ 225,00",
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=500&q=80",
        minutesAgo: 12
    },
    {
        title: "Moletom Oversized Algodão Heavyweight",
        category: "Roupa",
        platform: "shopee",
        platformName: "Shopee",
        oldPrice: "R$ 199,00",
        newPrice: "R$ 95,00",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80",
        minutesAgo: 15
    }
];

// Elementos do DOM
const containerFeed = document.getElementById('products-feed');
const terminalLog = document.getElementById('terminal-log');

// Função para gerar logs realistas no terminal simulado
function addTerminalLog(message, isSuccess = false) {
    const p = document.createElement('p');
    p.classList.add('log-entry');
    if (isSuccess) p.classList.add('success');
    
    const timestamp = new Date().toLocaleTimeString();
    p.innerHTML = `[${timestamp}] > ${message}`;
    
    terminalLog.appendChild(p);
    
    // Auto-scroll para manter sempre o último log visível
    terminalLog.scrollTop = terminalLog.scrollHeight;

    // Limita o número de logs na tela para não quebrar o layout
    if (terminalLog.children.length > 5) {
        terminalLog.removeChild(terminalLog.children[0]);
    }
}

// Função para estruturar o HTML do card de produto
function createProductCard(prod) {
    // Escolhe o ícone da plataforma correspondente
    const platformIcon = prod.platform === 'shopee' 
        ? '<i class="fa-solid fa-bag-shopping"></i>' 
        : '<i class="fa-solid fa-handshake"></i>';

    return `
        <div class="image-container">
            <span class="platform-tag ${prod.platform}">
                ${platformIcon} ${prod.platformName}
            </span>
            <span class="category-tag">${prod.category}</span>
            <img src="${prod.image}" alt="${prod.title}">
        </div>
        <div class="card-content">
            <div class="timestamp">
                <i class="fa-regular fa-clock"></i> Atualizado há ${prod.minutesAgo} min
            </div>
            <h3 class="product-title">${prod.title}</h3>
            <div class="price-box">
                <span class="old-price">${prod.oldPrice}</span>
                <span class="new-price">${prod.newPrice}</span>
            </div>
            <button class="btn-buy">
                <i class="fa-solid fa-bolt"></i> Resgatar Oferta
            </button>
        </div>
    `;
}

// Inicialização: Renderizar os 3 primeiros produtos imediatamente
let currentDisplayCount = 0;
const poolPositions = [...promoDatabase]; // Clona o banco para manipulação

function initFeed() {
    for (let i = 0; i < 3; i++) {
        const product = poolPositions.shift();
        const cardElement = document.createElement('div');
        cardElement.classList.add('product-card');
        cardElement.innerHTML = createProductCard(product);
        containerFeed.appendChild(cardElement);
        currentDisplayCount++;
    }
    addTerminalLog("Monitoramento ativo. 3 ofertas de alta relevância renderizadas no feed principal.", true);
}

// Função que simula o bot encontrando e injetando um novo produto dinamicamente
function insertNewDealLive() {
    if (poolPositions.length === 0) {
        // Se esgotarem os produtos, reinicia o pool de simulação
        poolPositions.push(...promoDatabase);
    }

    // Pega o próximo item do array simulado
    const nextProduct = poolPositions.shift();
    
    // Atualiza dinamicamente o tempo para parecer gerado agora
    nextProduct.minutesAgo = Math.floor(Math.random() * 3) + 1;

    // Mensagens randômicas para o terminal parecer vivo
    const scanMessages = [
        `Varredura completa na seção de ${nextProduct.category}s.`,
        `Brecha de preço detectada na API da plataforma ${nextProduct.platformName}!`,
        `Rastreando alteração de preço para: ${nextProduct.title.substring(0, 20)}...`,
    ];
    
    addTerminalLog(scanMessages[Math.floor(Math.random() * scanMessages.length)]);

    setTimeout(() => {
        // Cria o elemento do card
        const newCard = document.createElement('div');
        newCard.classList.add('product-card');
        newCard.innerHTML = createProductCard(nextProduct);

        // Insere no topo do grid para efeito visual impactante
        containerFeed.insertBefore(newCard, containerFeed.firstChild);
        
        addTerminalLog(`SUCESSO: [${nextProduct.platformName}] Novo achado adicionado ao topo do painel.`, true);

        // Remove o último card se a tela começar a ficar muito cheia (Mantém limite de 6 para performance)
        if (containerFeed.children.length > 6) {
            containerFeed.removeChild(containerFeed.lastChild);
        }
    }, 1500); // delay de processamento simulado do robô
}

// Execução
window.addEventListener('DOMContentLoaded', () => {
    initFeed();
    // A cada 5 segundos roda o ciclo do bot (1.5s de análise + inserção)
    setInterval(insertNewDealLive, 5000);
});