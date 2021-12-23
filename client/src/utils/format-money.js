export const formatMoney = (amountOfMoney) => {
  const amountOfMoneyInString = amountOfMoney.toString();

  if (amountOfMoneyInString.length <= 3) return amountOfMoneyInString;

  const formated = [];
  let pointIndex = 0;

  for (let i = amountOfMoneyInString.length - 1; i >= 0; i--) {
    formated.push(amountOfMoneyInString[i]);
    pointIndex += 1;

    if (pointIndex === 3) {
      formated.push(".");
      pointIndex = 0;
    }
  }

  if (formated[formated.length - 1] === ".") formated.pop();

  return formated.reverse().join("");
};
