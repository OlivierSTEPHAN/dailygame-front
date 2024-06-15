import React from "react";
import { Characteristics } from "@/model/Characteristics";

interface TableProps {
  answers: Characteristics[];
  correctAnswer: Characteristics | undefined;
  getHighlightedClass: (correctValue: any, guessedValue: any) => string;
  renderYearComparison: (
    correctYear: number,
    guessedYear: number
  ) => JSX.Element;
}

const Table: React.FC<TableProps> = ({
  answers,
  correctAnswer,
  getHighlightedClass,
  renderYearComparison,
}) => {
  if (!correctAnswer) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full mt-4 border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Genres</th>
            <th className="px-4 py-2">POV</th>
            <th className="px-4 py-2">Franchises</th>
            <th className="px-4 py-2">Companies</th>
            <th className="px-4 py-2">Platforms</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Game Modes</th>
            <th className="px-4 py-2">Game Engines</th>
          </tr>
        </thead>
        <tbody>
          {answers.length > 0 &&
            answers.map((answer, index) => (
              <tr key={index}>
                <td className="border px-4 py-1">{index + 1}</td>
                <td
                  className={`border px-4 py-1 ${getHighlightedClass(
                    correctAnswer.name,
                    answer.name
                  )}`}
                >
                  {answer.name || "-"}
                </td>
                <td className="border px-4 py-1">
                  {answer.genres
                    ? answer.genres.map((genre) => (
                        <span
                          key={genre}
                          className={getHighlightedClass(correctAnswer.genres, [
                            genre,
                          ])}
                        >
                          {genre}{" "}
                        </span>
                      ))
                    : "-"}
                </td>
                <td className="border px-4 py-1">
                  {answer.pov
                    ? answer.pov.map((pov) => (
                        <span
                          key={pov}
                          className={getHighlightedClass(correctAnswer.pov, [
                            pov,
                          ])}
                        >
                          {pov}{" "}
                        </span>
                      ))
                    : "-"}
                </td>
                <td className="border px-4 py-1">
                  {answer.franchises
                    ? answer.franchises.map((franchise) => (
                        <span
                          key={franchise}
                          className={getHighlightedClass(
                            correctAnswer.franchises,
                            [franchise]
                          )}
                        >
                          {franchise}{" "}
                        </span>
                      ))
                    : "-"}
                </td>
                <td className="border px-4 py-1">
                  {answer.companiesName
                    ? answer.companiesName.map((company) => (
                        <span
                          key={company}
                          className={getHighlightedClass(
                            correctAnswer.companiesName,
                            [company]
                          )}
                        >
                          {company}{" "}
                        </span>
                      ))
                    : "-"}
                </td>
                <td className="border px-4 py-1">
                  {answer.platforms
                    ? answer.platforms.map((platform) => (
                        <span
                          key={platform}
                          className={getHighlightedClass(
                            correctAnswer.platforms,
                            [platform]
                          )}
                        >
                          {platform}{" "}
                        </span>
                      ))
                    : "-"}
                </td>
                <td className="border px-4 py-1">
                  {answer.year
                    ? renderYearComparison(correctAnswer.year, answer.year)
                    : "-"}
                </td>
                <td className="border px-4 py-1">
                  {answer.gameModes
                    ? answer.gameModes.map((gameMode) => (
                        <span
                          key={gameMode}
                          className={getHighlightedClass(
                            correctAnswer.gameModes,
                            [gameMode]
                          )}
                        >
                          {gameMode}{" "}
                        </span>
                      ))
                    : "-"}
                </td>
                <td className="border px-4 py-1">
                  {answer.gameEngines
                    ? answer.gameEngines.map((gameEngine) => (
                        <span
                          key={gameEngine}
                          className={getHighlightedClass(
                            correctAnswer.gameEngines,
                            [gameEngine]
                          )}
                        >
                          {gameEngine}{" "}
                        </span>
                      ))
                    : "-"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
