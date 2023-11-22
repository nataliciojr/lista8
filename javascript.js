// Aguarda o carregamento completo da página
window.addEventListener("load", function () {

    // Associa os botões e eventos aos elementos do DOM (HTML)
   // document.getElementById("btnPlay").addEventListener("click", iniciarCronometro);
    document.getElementById("btnPlay").addEventListener("click", iniciarCronometro);
    document.getElementById("btnPause").addEventListener("click", pausarCronometro);
    document.getElementById("btnStop").addEventListener("click", pararCronometro);

    

    // Declaração de variáveis para o contador de números pares e ímpares
    let contadorPar = 0;
    let contadorImpar = 0;

    // Função para verificar se um número é par ou ímpar e atualizar o contador
    function verificarEAtualizarParImpar(numero) {
        if (numero % 2 === 0) {
            contadorPar++;
            document.getElementById("par").textContent = contadorPar;
        } else {
            contadorImpar++;
            document.getElementById("impar").textContent = contadorImpar;
        }

        // Atualiza as porcentagens
        atualizarPorcentagens();
    }

    // Adicione um evento de clique ao número sorteado para verificar e atualizar par ou ímpar
    document.getElementById("nomeNumeroAleatorio").addEventListener("click", function () {
        const numeroSorteado = parseInt(document.getElementById("nomeNumeroAleatorio").textContent);
        verificarEAtualizarParImpar(numeroSorteado);
    });

    // Declaração de variáveis cronometro
    let intervaloCronometro;
    let contagemRegressiva = 90; // 1 minuto e 30 segundos em segundos
    let emAndamento = false;

    let cronNrosAleatorios;

    // Inicialmente, desabilita o botão de "Play" e habilita o botão de "Pause" e "Stop"
    controlarBtns(false, true);

    function atualizarExibicaoCronometro() {
        const minutos = Math.floor(contagemRegressiva / 60);
        const segundos = contagemRegressiva % 60;
        const exibicao = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
        document.getElementById('timer').textContent = exibicao;
    }

   // Associa o evento de mudança do elemento select ao manipulador de eventos
   document.getElementById("selectDificuldade").addEventListener("change", function () {
    const selectDificuldade = document.getElementById("selectDificuldade");
    const valorSelecionado = selectDificuldade.value;

        if (valorSelecionado === "facil") {
            contagemRegressiva = 90; // 1 minuto e 30 segundos
        } else if (valorSelecionado === "medio") {
            contagemRegressiva = 60; // 1 minuto
        } else if (valorSelecionado === "dificil") {
            contagemRegressiva = 30; // 30 segundos
        }

        atualizarExibicaoCronometro();

        // Ajustar o intervalo de sorteio com base na dificuldade
        const intervaloSorteio = valorSelecionado === "facil" ? 500 : valorSelecionado === "medio" ? 300 : 100;

        // Iniciar o intervalo para exibir números aleatórios
        cronNrosAleatorios = setInterval(exibirMsg, intervaloSorteio);

        // Habilita o botão "Play" quando a dificuldade é selecionada
        document.getElementById("btnPlay").disabled = false;



    });

    // Função para iniciar o cronômetro
    function iniciarCronometro() {

        //Cronometro do tempo
        if (!emAndamento) {
            intervaloCronometro = setInterval(function () {
                contagemRegressiva--;

                atualizarExibicaoCronometro();

                if (contagemRegressiva === 0) {
                    clearInterval(intervaloCronometro);
                    emAndamento = false;

                }
            }, 1000);
            emAndamento = true;
        } // fim do controle de tempo

        // Habilita o botão de "Play" e desabilita o botão de "Pause"
       controlarBtns(true, false,);
     


        // Inicia um intervalo para exibir números aleatórios a cada 500ms
        cronNrosAleatorios = setInterval(exibirMsg, 500);




    }

    // Função para pausar o cronômetro
    function pausarCronometro() {
        //Cronometro do tempo pausar
        if (emAndamento) {
            clearInterval(intervaloCronometro);
            emAndamento = false;
        } // fim do controle de tempo pausar

        // Desabilita o botão de "Play" e habilita o botão de "Pause"
        controlarBtns(false, true); //verificar


        // Para o intervalo de geração de números aleatórios
        clearInterval(cronNrosAleatorios);



    }
    // Função para parar o cronômetro
    function pararCronometro() {

        clearInterval(intervaloCronometro);
        emAndamento = false;
        contagemRegressiva = 90;
        atualizarExibicaoCronometro();
        // fim do controle de tempo parar


        // Desabilita o botão de "Play" e habilita o botão de "Pause"
        controlarBtns(false, true);

        // Para o intervalo de geração de números aleatórios
        clearInterval(cronNrosAleatorios);

        // Zera os contadores de números pares e ímpares
        contadorPar = 0;
        contadorImpar = 0;
        document.getElementById("par").textContent = contadorPar;
        document.getElementById("impar").textContent = contadorImpar;

        // Zera as porcentagens

        document.getElementById("percentagemPar").textContent = "Porcentagem de acertos em números pares: 0%";
        document.getElementById("percentagemImpar").textContent = "Porcentagem de acertos em números ímpares: 0%";

        // Zera o número sorteado

        document.getElementById("nomeNumeroAleatorio").textContent = "0";

    }


    // Função para controlar a habilitação dos botões
    function controlarBtns(play, pause, stop) {
        document.getElementById("btnPlay").disabled = play;
        document.getElementById("btnPause").disabled = pause;
        document.getElementById("btnStop").disabled = stop;



    }

    // Função para exibir um número aleatório
    function exibirMsg() {
        document.getElementById("nomeNumeroAleatorio").innerHTML = parseInt(Math.random() * 1000) + 1;
    }
      // Função para atualizar as porcentagens de acertos e erros
      function atualizarPorcentagens() {
        const totalTentativas = contadorPar + contadorImpar;
        const percentagemPar = (contadorPar / totalTentativas) * 100;
        const percentagemImpar = (contadorImpar / totalTentativas) * 100;
        
        document.getElementById("percentagemPar").textContent = `Porcentagem de acertos em números pares: ${percentagemPar.toFixed(2)}%`;
        document.getElementById("percentagemImpar").textContent = `Porcentagem de acertos em números ímpares: ${percentagemImpar.toFixed(2)}%`;
    }
});


