const valueButtons = document.querySelectorAll('.btn-namber, .btn-operators');
const btnLimparTela = document.querySelector('.btn-reset');
const btnEqual = document.getElementById('equal');
const btnInverte = document.getElementById('btn-iverte');

// Defina o limite de caracteres
const MAX_LENGTH = 12;

// Função para adicionar o caractere ao display
document.querySelector('.display').value = '0'; // Inicia com o número 0

function adicionarCaracter(caracter) {
    const valorInput = document.querySelector('.display');
    const operadores = ['+', '-', '*', '/'];

    // Verifica se o display contém apenas zero e substitui pelo novo caractere
    if (valorInput.value === '0' && !operadores.includes(caracter)) {
        valorInput.value = caracter;
    } else {
        // Verifica se o último caractere do display é um operador
        const ultimoCaractere = valorInput.value.slice(-1);

        if (operadores.includes(ultimoCaractere) && operadores.includes(caracter)) {
            // Substitui o operador se o último caractere também for um operador
            valorInput.value = valorInput.value.slice(0, -1) + caracter;
        } else {
            // Adiciona o caractere ao display se o comprimento estiver dentro do limite
            if (valorInput.value.length < MAX_LENGTH){
                valorInput.value += caracter;
            }
        }
    }
}

// Pega o clique nos botões numéricos e operadores
valueButtons.forEach(button => {
    button.addEventListener('click', () => {
        adicionarCaracter(button.textContent);
    });
});

// Limpar tela
function limparTela() {
    const valorInput = document.querySelector('.display');
    valorInput.value = '0';  // Reinicia para zero ao limpar
}

btnLimparTela.addEventListener('click', limparTela);

// Calcular
function calcular() {
    const valorInput = document.querySelector('.display');
    try {
        // Remove os pontos de milhar e troca a vírgula pelo ponto decimal antes de calcular
        let expressao = valorInput.value.replace(/\./g, '').replace(',', '.');
        
        // Substitui qualquer número seguido de % por esse número dividido por 100
        expressao = expressao.replace(/(\d+)%/g, '($1/100)');

        // Avalia a expressão matemática
        let resultado = eval(expressao);
        
        // Aplica a formatação de milhar ao resultado
        // Usando toLocaleString para formatar corretamente para pt-BR
        valorInput.value = resultado.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
        
    } catch (error) {
        valorInput.value = 'Erro';
    }
}

// Evento clique no btn =
btnEqual.addEventListener('click', calcular);

// Botão inverter
function inverte() {
    const valorInput = document.querySelector('.display');
    // Inverte o valor atual, lidando com o formato de número brasileiro
    valorInput.value = (parseFloat(valorInput.value.replace(/\./g, '').replace(',', '.')) * -1)
        .toLocaleString('pt-BR')
        .replace('.', ',');
}

btnInverte.addEventListener('click', inverte);