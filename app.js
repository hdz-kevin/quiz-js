const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Estado
let currentQuestionIndex = 0;
let answerRevealed = false;

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
}

const questions = [
    new Question(
        '¿En qué año se creó ARPANET?',
        {
            'a': '1967',
            'b': '1969',
            'c': '1971'
        },
        'b'
    ),
    new Question(
        '¿En qué año se descubrió el ADN?',
        {
            'a': '1951',
            'b': '1952',
            'c': '1953',
        },
        'c'
    ),
    new Question(
        '¿En qué país se desarrolló ARPANET?',
        {
            'a': 'Francia',
            'b': 'Estados Unidos',
            'c': 'Reino Unido',
        },
        'b'
    ),
    new Question(
        '¿Por qué motivo Estados Unidos desarrolló ARPANET?',
        {
            'a': 'Para conectar computadoras entre sí y mantener la comunicación en caso de un ataque nuclear',
            'b': 'Para espiar a otros países durante la Guerra Fría',
            'c': 'Para desarrollar armamento avanzado de forma colaborativa',
        },
        'a'
    ),
    new Question(
        '¿Cuál era la finalidad del primer mensaje enviado a travez de lo que hoy conocemos como Internet?',
        {
            'a': 'Enviar un documento',
            'b': 'Iniciar sesión remotamente',
            'c': 'Enviar instrucciones'
        },
        'b'
    ),
    new Question(
        '¿Qué intentaba decir el primer mensaje enviado?',
        {
            'a': 'start',
            'b': 'hello',
            'c': 'login',
        },
        'c'
    ),
    new Question(
        '¿Quién envió el primer correo electrónico en 1971?',
        {
            'a': 'Tim Berners-Lee',
            'b': 'Vinton Cerf',
            'c': 'Ray Tomlinson'
        },
        'c'
    ),
    new Question(
        '¿En qué fecha ARPANET adoptó oficialmente los protocolos TCP/IP, considerado el nacimiento del Internet moderno?',
        {
            'b': '1 de enero de 1983',
            'c': '1 de enero de 1986',
            'a': '1 de enero de 1989',
        },
        'a'
    ),
    new Question(
        '¿Quién creó la World Wide Web (WWW) en 1991?',
        {
            'a': 'Tim Berners-Lee',
            'b': 'Robert Kahn',
            'c': 'Paul Baran'
        },
        'a',
    ),
    new Question(
        '¿Cuál era el propósito original de la Web?',
        {
            'a': 'Desarrollar un sistema de comunicación seguro',
            'b': 'Conectar computadoras entre sí',
            'c': 'Compartir documentos científicos entre investigadores',
        },
        'c',
    ),
    new Question(
        '¿Cuáles fueron los tres inventos clave de Tim Berners-Lee para la Web?',
        {
            'a': 'TCP/IP, DNS y HTTP',
            'b': 'FTP, SMTP y HTML',
            'c': 'HTML, HTTP y el primer navegador web',
        },
        'c'
    ),
    new Question(
        '¿En qué año se lanzó Google?',
        {
            'a': '1996',
            'b': '1998',
            'c': '2000'
        },
        'b'
    ),
    new Question(
        '¿A qué versión de la web pertenecen las redes sociales y los blogs?',
        {
            'a': 'Web 1.0',
            'b': 'Web 2.0',
            'c': 'Web 3.0'
        },
        'b',
    ),
    new Question(
        '¿Qué caracterizaba principalmente a la Web 1.0?',
        {
            'a': 'Los usuarios podían crear contenido e interactuar',
            'b': 'Incluía inteligencia artificial y redes sociales',
            'c': 'Era una web estática donde los usuarios solo podían leer información',
        },
        'c',
    ),
];

function initQuiz() {
    totalQuestionsSpan.textContent = questions.length;
    loadQuestion();
}

// Cargar pregunta actual
function loadQuestion() {
    const question = questions[currentQuestionIndex];

    questionText.textContent = question.text;
    // Actualizar contador
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    optionsContainer.innerHTML = '';

    // Opciones
    Object.entries(question.choices).forEach(([key, text]) => {
        const option = document.createElement('div');
        option.className = 'w-full text-left p-4 border-2 border-gray-200 rounded-xl bg-white font-medium text-gray-700 transition-all duration-300';
        option.textContent = `${key.toUpperCase()}) ${text}`;
        option.dataset.value = key;
        optionsContainer.appendChild(option);
    });

    // Ocultar respuesta revelada
    answerRevealed = false;

    // Resetear botón de mostrar respuesta
    showAnswerBtn.textContent = 'Mostrar Respuesta';
    showAnswerBtn.className = 'w-full sm:w-auto min-w-40 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-300 hover:shadow-lg';

    // Actualizar estado de botones de navegación
    updateNavigationButtons();
}

function toggleAnswer() {
    if (!answerRevealed) {
        showAnswer();
    } else {
        hideAnswer();
    }
}

function showAnswer() {
    const question = questions[currentQuestionIndex];
    const options = optionsContainer.children;

    // Resaltar respuesta correcta
    Array.from(options).forEach(option => {
        if (option.dataset.value === question.answer) {
            option.className = 'w-full text-left p-4 border-2 border-green-500 rounded-xl bg-green-100 text-green-800 font-semibold';
        }
    });

    // Cambiar botón
    showAnswerBtn.textContent = 'Ocultar Respuesta';
    showAnswerBtn.className = 'w-full sm:w-auto min-w-40 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-300 hover:shadow-lg';

    answerRevealed = true;
}

function hideAnswer() {
    const options = optionsContainer.children;

    // Resetear estilos de opciones
    Array.from(options).forEach(option => {
        option.className = 'w-full text-left p-4 border-2 border-gray-200 rounded-xl bg-white font-medium text-gray-700 transition-all duration-300';
    });

    // Resetear botón
    showAnswerBtn.textContent = 'Mostrar Respuesta';
    showAnswerBtn.className = 'w-full sm:w-auto min-w-40 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-300 hover:shadow-lg';

    answerRevealed = false;
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function updateNavigationButtons() {
    // Botón anterior
    if (currentQuestionIndex === 0) {
        prevBtn.disabled = true;
        prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        prevBtn.disabled = false;
        prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    // Botón siguiente
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.disabled = true;
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        nextBtn.disabled = false;
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Event listeners
showAnswerBtn.addEventListener('click', toggleAnswer);
prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            if (!prevBtn.disabled) prevQuestion();
            break;
        case 'ArrowRight':
            if (!nextBtn.disabled) nextQuestion();
            break;
        case ' ':
        case 'Enter':
            e.preventDefault();
            toggleAnswer();
            break;
    }
});

document.addEventListener('DOMContentLoaded', initQuiz);
