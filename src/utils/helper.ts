interface Data {
  [key: string]: any;
}

export const generateListofCompetencies = (data: Data[]): string[] => {
  let keys = new Set<string>();
  data.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      keys.add(key);
    });
  });

  const competencies = [...keys].filter(
    (el) => el.toLowerCase() != "participant"
  );

  return competencies;
};

export const generateListofParticipants = (data: Data[]) => {
  const participants = [...new Set(data.map((obj) => obj.Participant))];

  return participants;
};

//summary functions

export const getLevelValue = (letter: string) => {
  switch (letter) {
    case "A":
      return 4;
    case "B":
      return 3;
    case "C":
      return 2;
    case "D":
      return 1;
    default:
      return 0;
  }
};

export const getLowestCompetenceValue = (data: Data[], competency: any) => {
  const refinedData = data.filter((el) => el.hasOwnProperty(competency));

  const lowestValue = refinedData.reduce((min, curr) => {
    const current = isNaN(curr[competency])
      ? getLevelValue(curr[competency])
      : curr[competency];

    return current < min ? current : min;
  }, refinedData[0][competency]);

  console.log(lowestValue);
  return lowestValue;
};

export const getHighestCompetenceValue = (data: Data[], competency: any) => {
  const refinedData = data.filter((el) => el.hasOwnProperty(competency));

  const highestValue = refinedData.reduce((max, curr) => {
    const current = isNaN(curr[competency])
      ? getLevelValue(curr[competency])
      : curr[competency];

    return current > max ? current : max;
  }, refinedData[0][competency]);

  return highestValue;
};

export const getAverageCompetenceValue = (data: Data[], competency: any) => {
  const scores = data
    .map((item) => item[competency])
    .filter((score) => !isNaN(score));
  let average = scores.length
    ? scores.reduce((acc, curr) => acc + curr, 0) / scores.length
    : NaN;

  return average;
};

export const getCompetenceType = (data: Data[], competency: any) => {
  let type = "";
  data.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (key == competency) {
        type = isNaN(obj[key]) ? "Level" : "score";
      }
    });
  });

  return type;
};
