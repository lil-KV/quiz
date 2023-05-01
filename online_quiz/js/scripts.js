const data = [
    {
        question: 'Сколько будет 20*6?',
        answers: [
            {
                id: '1',
                value: '25',
                isCorrect: false
            },
            {
                id: '2',
                value: '120',
                isCorrect: true
            },
            {
                id: '3',
                value: '3',
                isCorrect: false
            }
        ]
    },
    {
        question: 'В каком году издана первая Конституция в Республике Беларусь?',
        answers: [
            {
                id: '4',
                value: '2007',
                isCorrect: false
            },
            {
                id: '5',
                value: '1991',
                isCorrect: false
            },
            {
                id: '6',
                value: '1994',
                isCorrect: true
            }
        ]
    }
]

const quiz = document.getElementById('quiz')
const quizQuestions = document.getElementById('quiz-questions')
const quizIndicator = document.getElementById('quiz-indicator')
const quizResults = document.getElementById('quiz-results')
const btnNext = document.getElementById('btn-next')
const btnRestart = document.getElementById('btn-restart')

let localResults = {}


const renderIndicator = (quizstep) => {
    quizIndicator.innerHTML = `${quizstep}/${data.length}`
}


const renderQuestion2 = (index) => {
    renderIndicator(index + 1)
    quizQuestions.dataset.currentStep = index
    btnNext.disabled = true


    const renderAnswers = () =>
        data[index]
            .answers
            .map((answer) =>
                `
            <li>
                 <label>
                     <input class="answer-input" type="radio" name="${index}" value="${answer.id}">
                     ${answer.value}
                 </label>
            </li>
            `
            )
            .join('')


    quizQuestions.innerHTML = `
    <div class="quiz-question-item">
        <div class="quiz-question-item-question">${data[index].question}</div>
        <ul class="quiz-question-item-answer">${renderAnswers()}</ul>
    </div>
    `
}


const renderResults = () => {
    let result = 'Результаты теста'

    const checkIsCorrect = (answer, index) => {
        let className = ''

        if (!answer.isCorrect && answer.id === localResults[index]) {
            className = 'answer-invalid'
        } else if (answer.isCorrect) {
            className = 'answer-valid'
        }

        return className
    }

    const getAnswers = (index) =>
        data[index]
            .answers
            .map((answer) => `<li class="${checkIsCorrect(answer, index)}">${answer.value}</li>`)
            .join('')


    data.forEach((question, index) => {
        result += `
        <div class="quiz-result-item">
            <div class="quiz-result-item-question">${question.question}</div>
            <ul class="quiz-result-item-answer">${getAnswers(index)}</ul>
        </div>
        `
    })

    quizResults.innerHTML = result
}


quiz.addEventListener('change', (event) => {
        if (event.target.classList.contains('answer-input')) {
            localResults[event.target.name] = event.target.value
            btnNext.disabled = false
        }
    }
)


quiz.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-next')) {
        const nextQuestionIndex = Number(quizQuestions.dataset.currentStep) + 1

        if (nextQuestionIndex === data.length) {
            quizQuestions.classList.add('questions-hidden')
            quizIndicator.classList.add('indicator-hidden')

            btnNext.style.visibility = 'hidden'
            quizResults.style.visibility = 'visible'
            btnRestart.style.visibility = 'visible'
            renderResults()
        } else {
            renderQuestion2(nextQuestionIndex)
        }
    } else if (event.target.classList.contains('btn-restart')) {
        localResults = {}
        quizResults.innerHTML = ''


        quizQuestions.classList.remove('questions-hidden')
        quizIndicator.classList.remove('indicator-hidden')

        btnNext.style.visibility = 'visible'
        quizResults.style.visibility = 'hidden'
        btnRestart.style.visibility = 'hidden'

        renderQuestion2(0)
    }
})

renderQuestion2(0)


