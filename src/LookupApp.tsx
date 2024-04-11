import { useState } from "react";
import scoresData from "./scores.json";
import {
  generateListofCompetencies,
  generateListofParticipants,
  getAverageCompetenceValue,
  getCompetenceType,
  getHighestCompetenceValue,
  getLowestCompetenceValue,
} from "./utils/helper";
import "./LookupApp.css";

const LookupApp = () => {
  const [competency, setCompetency] = useState<string>("");
  const [participant, setParticipant] = useState("");
  const [summary, setSummary] = useState("");
  const [output, setOutput] = useState("");
  const [parameter, setParameter] = useState("participant");

  const competencies = generateListofCompetencies(scoresData);
  const participants = generateListofParticipants(scoresData);

  const handleGenerateOutput = () => {
    let filteredData = scoresData;

    if (participant && competency) {
      const participantFound = filteredData.find(
        (entry) => entry.Participant === participant
      );

      let score =
        participantFound?.[competency as keyof typeof participantFound];
      setOutput(
        score
          ? ` ${participant} scored ${score}  on ${competency}`
          : ` ${participant} has no score for ${competency}`
      );
      return;
    }

    let result;

    switch (summary) {
      case "lowest":
        result = getLowestCompetenceValue(filteredData, competency);
        break;

      case "highest":
        result = getHighestCompetenceValue(filteredData, competency);
        break;

      case "average":
        result = getAverageCompetenceValue(filteredData, competency);
        break;

      case "type":
        result = getCompetenceType(filteredData, competency);
        break;

      default:
        result = "Invalid summary";
    }

    if (!isNaN(result)) {
      result = Number(result).toFixed(1);
    }

    setOutput(
      result == "No value"
        ? `${competency} has no value throughout`
        : `The ${summary} for ${competency} is ${result}`
    );
  };

  return (
    <main>
      <div className="competence">
        Competence:
        <select
          required
          value={competency}
          onChange={(e) => setCompetency(e.target.value)}
        >
          <option value="">Select Competency</option>
          {competencies.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className="competence">
        Parameter:
        <div className="param">
          <div className="param-options">
            <p
              onClick={() => {
                setSummary("");
                setParameter("participant");
              }}
            >
              <input
                type="radio"
                name="parameter"
                checked={parameter == "participant"}
                value={parameter}
              />
              Participant
            </p>
            <p
              onClick={() => {
                setParticipant("");
                setParameter("summary");
              }}
            >
              <input
                type="radio"
                name="parameter"
                checked={parameter == "summary"}
              />
              Summary
            </p>
          </div>
          {parameter == "participant" ? (
            <select
              value={participant}
              onChange={(e) => setParticipant(e.target.value)}
            >
              <option value="">Select Participant</option>
              {participants.map((participant) => (
                <option key={participant} value={participant}>
                  Participant {participants.indexOf(participant) + 1}
                </option>
              ))}
            </select>
          ) : (
            <select
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            >
              <option value="">Select Summary</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
              <option value="average">Average</option>
              <option value="type">Type</option>
            </select>
          )}
        </div>
      </div>

      <button
        disabled={!competency || (!participant && !summary)}
        onClick={handleGenerateOutput}
      >
        Generate Output
      </button>
      <div>{output}</div>
    </main>
  );
};

export default LookupApp;
