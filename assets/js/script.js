const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const alternativas = ["a", "b", "c", "d"];
let pontuacao = 0;
let perguntaAtual = 0;

// Perguntas
const questions = [
    {
        question: 'Qual é a diferença entre as palavras-chave "let" e "const" na declaração de variáveis em JavaScript?',
        answers: [
            {
                answer: '"let" é usado para declarar variáveis que podem ser reatribuídas, enquanto "const" é usado para variáveis imutáveis.',
                correct: true,
            },
            {
                answer: '"let" é usado para variáveis imutáveis, enquanto "const" é usado para declarar variáveis que podem ser reatribuídas.',
                correct: false,
            },
            {
                answer: 'Ambas as palavras-chave "let" e "const" são usadas para declarar variáveis imutáveis.',
                correct: false,
            },
            {
                answer: 'Ambas as palavras-chave "let" e "const" são usadas para declarar variáveis que podem ser reatribuídas.',
                correct: false,
            },
        ],
    },
    {
        question: 'Qual é o operador usado para comparar valores em JavaScript?',
        answers: [
            {
                answer: "==",
                correct: false,
            },
            {
                answer: "===",
                correct: true,
            },
            {
                answer: "!=",
                correct: false,
            },
            {
                answer: "!==",
                correct: false,
            },
        ],
    },
    {
        question: 'Qual é a função usada para exibir uma mensagem na tela em JavaScript?',
        answers: [
            {
                answer: "log()",
                correct: false,
            },
            {
                answer: 'alert()',
                correct: true,
            },
            {
                answer: 'console()',
                correct: false,
            },
            {
                answer: 'print()',
                correct: false,
            },
        ],
    },
    {
        question: 'Qual é a sintaxe correta para um laço "for" em JavaScript?',
        answers: [
            {
                answer: 'for (i = 0; i < 10; i++)',
                correct: false,
            },
            {
                answer: 'for (let i = 10; i > 0; i--)',
                correct: false,
            },
            {
                answer: 'for (i = 10; i > 0; i--)',
                correct: false,
            },
            {
                answer: 'for (let i = 0; i < 10; i++)',
                correct: true,
            },
        ],
    },
    {
        question: 'Qual é o método usado para adicionar um elemento ao final de um array em JavaScript?',
        answers: [
            {
                answer: 'add()',
                correct: false,
            },
            {
                answer: 'append()',
                correct: false,
            },
            {
                answer: 'push()',
                correct: true,
            },
            {
                answer: 'insert()',
                correct: false,
            },
        ],
    },
    {
        question: 'Qual é o operador usado para atribuir um valor a uma variável em JavaScript?',
        answers: [
            {
                answer: ':',
                correct: false,
            },
            {
                answer: '=',
                correct: true,
            },
            {
                answer: '=>',
                correct: false,
            },
            {
                answer: '->',
                correct: false,
            },
        ],
    },
    {
        question: 'Qual é a função usada para converter uma string em um número em JavaScript?',
        answers: [
            {
                answer: 'parseInt()',
                correct: true,
            },
            {
                answer: 'parseFloat()',
                correct: false,
            },
            {
                answer: 'toNumber()',
                correct: false,
            },
            {
                answer: 'toString()',
                correct: false,
            },
        ],
    },
    {
        question: 'Qual é a sintaxe correta para uma função em JavaScript?',
        answers: [
            {
                answer: 'function myFunction {}',
                correct: false,
            },
            {
                answer: 'myFunction = function {}',
                correct: false,
            },
            {
                answer: 'myFunction() {}',
                correct: false,
            },
            {
                answer: 'Todas as alternativas estão corretas.',
                correct: true,
            },
        ],
    },
    {
        question: 'Qual é o método usado para remover um elemento de um array em JavaScript?',
        answers: [
            {
                answer: 'pop()',
                correct: false,
            },
            {
                answer: 'shift()',
                correct: false,
            },
            {
                answer: 'splice()',
                correct: true,
            },
            {
                answer: 'slice()',
                correct: false,
            },
        ],
    },
    {
        question: 'Qual é a sintaxe correta para um condicional "if" em JavaScript?',
        answers: [
            {
                answer: 'if condition {}',
                correct: false,
            },
            {
                answer: 'if (condition) {}',
                correct: false,
            },
            {
                answer: 'if (condition) {} else if (condition) {}',
                correct: false,
            },
            {
                answer: 'if (condition) {} else if (condition) {} else {}',
                correct: true,
            },
        ],
    },
];

// Função que inicia o jogo:
function init() {
    createQuestion(0);
}

function createQuestion(i) {
    // i = 0
    // limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function (btn) {
        btn.remove();
    });

    // Alterar o texto da pergunta
    const questionText = question.querySelector("#question-txt");
    const questionNumber = question.querySelector("#question-number");

    questionText.innerText = questions[i].question;
    questionNumber.innerText = i + 1;

    // Criar o template do botão do quizz
    questions[i].answers.forEach(function (answer, i) {

        const answerTemplate = document
            .querySelector(".answer-template")
            .cloneNode(true);

        const letterBtn = answerTemplate.querySelector('.btn-letter');
        const answerTxt = answerTemplate.querySelector('.question-answer');

        letterBtn.innerText = alternativas[i];
        answerTxt.innerText = answer.answer;

        answerTemplate.setAttribute("correct-answer", answer.correct);

        // Remover o hide e answer template class
        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');

        // inserindo a pergunta no answersbox
        answersBox.appendChild(answerTemplate);

        // Inserindo evento de click no botão
        answerTemplate.addEventListener('click', function () {
            checkAnswer(answerTemplate);
        })


    });
    // Incrementando a pergunta atual
    perguntaAtual++;
}

// Verificando a resposta do usuário
function checkAnswer(btn) {
    const buttons = answersBox.querySelectorAll("button");

    buttons.forEach(function (button) {
        if (button.getAttribute("correct-answer") == "true") {
            button.classList.add("correct-answer");

            // Checa se o usuário acertou a perguntou 
            if (btn == button) {
                pontuacao++;
            }
        }
        else {
            button.classList.add("wrong-answer");
        }
    })

    nextQuestion();
}

function nextQuestion() {
    setTimeout(function () {
        // verificar se ainda há pergunta nas lista
        if (perguntaAtual >= questions.length) {
            // Apresentar mensagem de sucesso
            showResult();
            return;
        }
        createQuestion(perguntaAtual);
    }, 1000)
}

function showResult() {
    // calcular pontuação:
    const score = ((pontuacao / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector('#display-score');
    displayScore.innerText = score + '%'

    // Alterar o número de perguntas corretas
    const correctAnswers = document.querySelector('#correct-answers');
    correctAnswers.innerText = pontuacao;

    const qtd = document.querySelector('#questions-qtd');
    qtd.innerText = questions.length;

    hideOrShowQuizz();
}

function hideOrShowQuizz() {
    quizzContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');
}

// reiniciar o quizz
const restart = document.querySelector('#restart');

restart.addEventListener('click', function() {
    pontuacao = 0;
    perguntaAtual = 0;
    hideOrShowQuizz();
    init();
})

init();