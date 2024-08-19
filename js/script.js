const valueButtons = document.querySelectorAll('.btn-namber, .btn-operators');
const btnLimparTela = document.querySelector('.btn-reset');
const btnEqual = document.getElementById('equal')
const btnInverte = document.getElementById('btn-iverte')

// Função para adicionar o caractere ao display
document.querySelector('.display').value = '0'; // Difinir para iniciar com o numero 0
function adicionarCaracter(caracter) {
    const valorInput = document.querySelector('.display');
    // Verifica se o display contém apenas zero e substitui pelo novo caractere
    if (valorInput.value === '0' && caracter !== ',') {
        valorInput.value = caracter;
    } else {
    // Adicionar o campo de input (display)
    valorInput.value += caracter;
    }
    formatarDisplay();
}

// Função para formatar o valor do display com pontos a cada milhar
function formatarDisplay() {
    const valorInput = document.querySelector('.display');
    let valor = valorInput.value.replace(/\./g, '').replace(',', '.');
    const partes = valor.split('.');
    partes[0] = parseInt(partes[0]).toLocaleString('pt-BR');
    valorInput.value = partes.join(',');
}

// Pega o click nos botões numéricos e operadores
valueButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Chama a função adicionarCaracter passando o texto do botão clicado
        adicionarCaracter(button.textContent);
    });
});

//Limpar tela
function limparTela() {
    const valorInput = document.querySelector('.display');
    valorInput.value = '';
}

// Adiciona evento de clique para o botão de AC
btnLimparTela.addEventListener('click', limparTela);


//Calcular
function calcular() {
    const valorInput = document.querySelector('.display');
    try {
        // Substitui a operação de porcentagem por uma expressão matemática. replace é para formatar em milhar e deixar a virgula
        let expressao = valorInput.value.replace(/\./g, '').replace(',', '.').replace(/(\d+)%/g, '($1/100)');
        valorInput.value = eval(expressao).toLocaleString('pt-BR').replace('.', ',');
        // Avalia a expressão no display e atualiza o valor
        valorInput.value = eval(expressao);
    } catch (error) {
        // Em caso de erro, mostra uma mensagem no display
        valorInput.value = 'Erro';
    }
}

//Evento clique no btn =
btnEqual.addEventListener('click', calcular);

// Botão inverter 
function inverte() {
    const valorInput = document.querySelector('.display');
    // valorInput.value = parseFloat(valorInput.value) * -1;
    valorInput.value = (parseFloat(valorInput.value.replace(/\./g, '').replace(',', '.')) * -1).toLocaleString('pt-BR').replace('.', ',');
}

btnInverte.addEventListener('click', inverte);