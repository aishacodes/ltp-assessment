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

export const getLevelValue = (letter: string | number) => {
  switch (letter) {
    case "A":
      return 4;
    case "B":
      return 3;
    case "C":
      return 2;
    case "D":
      return 1;
    case 4:
      return "A";
    case 3:
      return "B";
    case 2:
      return "C";
    case 1:
      return "D";
    default:
      return 0;
  }
};

export const getLowestCompetenceValue = (data: Data[], competency: any) => {
  const refinedData = data.filter(
    (el) => el.hasOwnProperty(competency) && el[competency] !== null
  );
  if (refinedData.length < 1) return "No value";

  let isLevel = isNaN(refinedData[0][competency]);

  const lowestValue = refinedData.reduce(
    (min, curr) => {
      const current = isNaN(curr[competency])
        ? getLevelValue(curr[competency])
        : curr[competency];

      return current < min ? current : min;
    },
    isLevel
      ? getLevelValue(refinedData[0][competency])
      : refinedData[0][competency]
  );

  return isLevel ? getLevelValue(lowestValue) : lowestValue;
};

export const getHighestCompetenceValue = (data: Data[], competency: any) => {
  const refinedData = data.filter(
    (el) => el.hasOwnProperty(competency) && el[competency] !== null
  );
  if (refinedData.length < 1) return "No value";

  let isLevel = isNaN(refinedData[0][competency]);

  const highestValue = refinedData.reduce(
    (max, curr) => {
      const current = isNaN(curr[competency])
        ? getLevelValue(curr[competency])
        : curr[competency];
      return current > max ? current : max;
    },

    isLevel
      ? getLevelValue(refinedData[0][competency])
      : refinedData[0][competency]
  );

  return isLevel ? getLevelValue(highestValue) : highestValue;
};

export const getAverageCompetenceValue = (data: Data[], competency: any) => {
  const refinedData = data.filter(
    (el) => el.hasOwnProperty(competency) && el[competency] !== null
  );
  if (refinedData.length < 1) return "No value";

  let isLevel = isNaN(refinedData[0][competency]);

  const scores = refinedData.map((item) =>
    isNaN(item[competency]) ? getLevelValue(item[competency]) : item[competency]
  );

  let average = scores.length
    ? scores.reduce((acc, curr) => Number(acc) + Number(curr), 0) /
      scores.length
    : NaN;

  return isLevel ? getLevelValue(Math.ceil(average)) : average;
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
