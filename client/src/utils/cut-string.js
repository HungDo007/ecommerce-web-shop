export const cut = (sentence, lengthToCut) => {
  if (sentence.length < lengthToCut) {
    sentence = sentence.padEnd(lengthToCut - 1, " ");
  } else if (sentence.length > lengthToCut) {
    const format = sentence.slice(0, lengthToCut - 3);
    return format + "...";
  }

  return sentence;
};
