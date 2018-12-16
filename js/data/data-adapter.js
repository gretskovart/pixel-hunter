const QuestionType = {
  'two-of-two': `game1`,
  'tinder-like': `game2`,
  'one-of-three': `game3`
};

const AnswerType = {
  'painting': `paint`,
  'photo': `photo`,
};

export default (data) => {
  return data.map((level) => {
    return {
      type: QuestionType[level.type],
      task: level.question,
      options: level.answers.map((answer) => {
        return {
          src: answer.image.url,
          width: answer.image.width,
          height: answer.image.height,
          type: AnswerType[answer.type]
        };
      })
    };
  });
};
