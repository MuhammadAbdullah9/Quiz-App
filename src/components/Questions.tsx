import React from 'react';
import { Wrapper, ButtonWrapper } from './Question.styles';

type Types = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNo: number;
    totalQuestions: number;
}

const Questions: React.FC<Types> = ({ question, answers, callback, userAnswer, questionNo, totalQuestions }) => {
    return (
        <div>
            <Wrapper>
                <p>
                    Question: {questionNo} of {totalQuestions}
                </p>
                <p dangerouslySetInnerHTML={{ __html: question }}></p>
                <div>
                    {answers.map(answer => (
                        <div>
                            <ButtonWrapper
                                correct={userAnswer?.correctAnswer === answer}
                                userClicked={userAnswer?.answer === answer}
                            >
                                <button disabled={userAnswer} value={answer} onClick={callback}>
                                    <span className="answers" dangerouslySetInnerHTML={{ __html: answer }}></span>
                                </button>
                            </ButtonWrapper>
                        </div>
                    ))}
                </div>
            </Wrapper>
        </div>
    );
}

export default Questions;
