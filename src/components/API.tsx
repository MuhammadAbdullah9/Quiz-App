export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
    const questionAPI = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=19&type=multiple`
    const data = await (await fetch(questionAPI)).json();
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleAnswers([...question.incorrect_answers, question.correct_answer])
    }))
}

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type Question = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuestionState = Question & { answers: string[] }

const shuffleAnswers = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)