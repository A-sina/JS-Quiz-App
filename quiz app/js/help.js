const formatData = (data) => {
    const result = data.map((item) => {
        const questionObj = {question: item.question,}
        const answers = [...item.incorrect_answers]
        const rand = Math.floor(Math.random() * 4);
        answers.splice(rand, 0, item.correct_answer)
        questionObj.answers = answers;
        questionObj.correctAnswerIndex = rand;
        return questionObj;
    })
    return result;
}
export default formatData;