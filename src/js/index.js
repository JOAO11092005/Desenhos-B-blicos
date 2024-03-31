function main() {
    // Função para carregar os dados do arquivo JSON
    function carregarDesenhos() {
        fetch('./src/desenhos/desenhos.json')
            .then(response => response.json())
            .then(data => mostrarDesenhos(data.desenhos_biblicos))
            .catch(error => console.error('Erro ao carregar os dados:', error));
    }

    // Função para exibir os desenhos na página
    function mostrarDesenhos(desenhos) {
        const container = document.querySelector('.desenhos-biblicos');

        desenhos.forEach((desenho, index) => {
            const div = document.createElement('div');
            div.classList.add('episodio');
            div.classList.add(desenho.testamento === 'Novo' ? 'novo-testamento' : 'velho-testamento'); // Adiciona classe de acordo com o testamento
            div.setAttribute('id', `episodio_${index}`); // Adiciona um ID correspondente a cada episódio

            const img = document.createElement('img');
            img.src = desenho.foto; // Define a fonte da imagem com a URL fornecida
            img.alt = desenho.nome;
            div.appendChild(img);

            const nome = document.createElement('p');
            nome.textContent = desenho.nome;
            div.appendChild(nome);

            div.dataset.video = desenho.video_link; // Define o atributo data-video com o link do vídeo
            container.appendChild(div);
        });

        // Adiciona evento de clique às divs de episódio para exibir o player
        const episodios = document.querySelectorAll('.episodio');
        episodios.forEach(episodio => {
            episodio.addEventListener('click', function() {
                const videoLink = this.dataset.video;
                const videoPlayer = document.getElementById('videoPlayer');
                const playerOverlay = document.getElementById('playerOverlay');

                videoPlayer.src = videoLink;
                playerOverlay.style.display = 'block';
            });
        });
    }

    // Chamada da função para carregar os dados
    carregarDesenhos();

    // Adiciona evento de clique ao botão de Novo Testamento
    const novoTestamentoButton = document.querySelector('nav ul li:nth-child(1) button');
    novoTestamentoButton.addEventListener('click', function() {
        mostrarDesenhosPorTestamento('Novo');
    });

    // Adiciona evento de clique ao botão de Velho Testamento
    const velhoTestamentoButton = document.querySelector('nav ul li:nth-child(2) button');
    velhoTestamentoButton.addEventListener('click', function() {
        mostrarDesenhosPorTestamento('Velho');
    });

    // Função para mostrar os desenhos de acordo com o testamento
    function mostrarDesenhosPorTestamento(testamento) {
        const episodios = document.querySelectorAll('.episodio');
        episodios.forEach(episodio => {
            episodio.style.display = episodio.classList.contains(`${testamento.toLowerCase()}-testamento`) ? 'block' : 'none';
        });
    }

    // Adiciona evento de clique ao botão de fechar o player
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', function() {
        const playerOverlay = document.getElementById('playerOverlay');
        const videoPlayer = document.getElementById('videoPlayer');

        playerOverlay.style.display = 'none';
        videoPlayer.src = '';
    });

    // Adiciona evento de input ao campo de pesquisa
      // Adiciona evento de input ao campo de pesquisa
      const pesquisaInput = document.getElementById('pesquisaInput');
      pesquisaInput.addEventListener('input', function() {
          const termoPesquisa = this.value.toLowerCase();
          const episodios = document.querySelectorAll('.episodio');

          episodios.forEach(episodio => {
              const nomeDesenho = episodio.getAttribute('data-nome'); // Obtém o nome do desenho do atributo personalizado
              if (nomeDesenho.includes(termoPesquisa)) {
                  episodio.style.display = 'block';
              } else {
                  episodio.style.display = 'none';
              }
          });
      });
}

// Chamada da função main quando a página é carregada
window.onload = main;

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const hamburger = document.querySelector('.hamburger');
    let isExpanded = false;

    hamburger.addEventListener('click', function () {
        if (!isExpanded) {
            // Se o header não estiver expandido, expande para 200px
            header.style.height = '200px';
            main.style.height = '598px'; // Ajuste para 670px conforme o último requisito
            isExpanded = true;
        } else {
            // Se o header estiver expandido, volta para 90px
            header.style.height = '90px';
            main.style.height = '670px';
            isExpanded = false;
        }
    });
});
