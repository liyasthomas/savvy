import React from "react";
import { STORAGE_KEY } from "./utils/localStorageInfo";
import votePink from "./assets/votepink.svg";
import voteBlue from "./assets/voteblue.svg";
import Button from "./Button";
import { toast, ToastContainer } from "react-toastify";

export default function Candidates({
  poll,
  candidates,
  onUpVote,
  simulateUpvotes,
  pollView = false,
}) {
  const isImage = poll.type === "image";
  let totalUpvotes;
  let candidate1;
  let candidate2;
  if (pollView) {
    /* If this is poll view, create percentages for chart */
    totalUpvotes = candidates.reduce((acc, next) => acc + next.upvotes, 0);
    candidate1 = candidates[0].upvotes
      ? (candidates[0].upvotes / totalUpvotes) * 100
      : 0;
    candidate2 = candidates[1].upvotes
      ? (candidates[1].upvotes / totalUpvotes) * 100
      : 0;
  }
  if (totalUpvotes === 0) {
    /* If poll is new, set 50% width for each side of chart */
    candidate1 = 50;
    candidate2 = 50;
  }

  const voteDataFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (voteDataFromStorage && voteDataFromStorage[poll.id]) {
    /* If user has voted 50 times for a candidate, disable voting */
    const c1 = voteDataFromStorage[poll.id][candidates[0].id];
    const c2 = voteDataFromStorage[poll.id][candidates[1].id];
    if (c1 && c1.upvotes >= 50) candidates[0].isDisabled = true;
    if (c2 && c2.upvotes >= 50) candidates[1].isDisabled = true;
  }

  return (
    <div>
      {
        /* This is the data vizualization. Essentially a rectangle filled with the percentage width of each candidate. */
        pollView && (
          <div style={dataVizStyle}>
            <div style={candidate1Style(candidate1)} />
            <div style={candidate2Style(candidate2)} />
          </div>
        )
      }
      <div className={`flex w-48 ${isImage ? "flex-col" : "flex-col"}`}>
        {candidates.map((candidate, index) => {
          if (poll.type === "text") {
            return (
              <div className="flex items-center" key={candidate.id}>
                <div className="flex items-center">
                  <div
                    style={voteImageContainerStyle(index, candidate.isDisabled)}
                    className="p-2 m-4 border rounded-lg"
                    onClick={
                      candidate.isDisabled
                        ? null
                        : () => onUpVote(candidate, poll)
                    }
                  >
                    <img
                      src={index === Number(0) ? votePink : voteBlue}
                      alt="Candidate"
                    />
                  </div>
                  <p
                    className="text-xl font-semibold"
                    style={voteNameStyle(index)}
                  >
                    {candidate.upvotes}
                  </p>
                </div>
                <div className="flex justify-center flex-1 mx-8">
                  <p className="text-xl font-semibold">{candidate.name}</p>
                </div>
              </div>
            );
          }
          return (
            <div className="flex items-center" key={candidate.id}>
              <div className="">
                <ImageVoteBlock
                  poll={poll}
                  onUpVote={onUpVote}
                  candidate={candidate}
                  index={index}
                />
              </div>
              <div className="flex justify-center flex-1 mx-8">
                <img
                  src={candidate.image}
                  style={candidateImageStyle(index)}
                  className="w-8"
                  alt="Candidate"
                />
              </div>
            </div>
          );
        })}
      </div>
      {pollView && (
        <div className="mt-6">
          <Button
            emoji="🌍"
            title="Share"
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              toast("Successfully copied to clipboard!", {
                className: "toast-background",
              });
            }}
          />
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

function ImageVoteBlock({ index, candidate, poll, onUpVote }) {
  return (
    <div className="flex items-center">
      <div
        style={voteImageContainerStyle(index, candidate.isDisabled)}
        className="p-2 m-4 border rounded-lg"
        onClick={() => onUpVote(candidate, poll)}
      >
        <img src={index === Number(0) ? votePink : voteBlue} alt="Candidate" />
      </div>
      <p className="text-xl font-semibold" style={voteNameStyle(index)}>
        {candidate.upvotes}
      </p>
    </div>
  );
}

const dataVizStyle = {
  width: "100%",
  height: 60,
  display: "flex",
  marginTop: 10,
  borderRadius: 10,
};

function candidate1Style(width) {
  return {
    backgroundColor: "#10B981",
    width: `${width}%`,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    transition: "all 0.5s ease",
  };
}

function candidate2Style(width) {
  return {
    backgroundColor: "#EF4444",
    width: `${width}%`,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    transition: "all 0.5s ease",
  };
}

const voteImageContainerStyle = (index, isDisabled) => ({
  backgroundColor: index === Number(0) ? "#10B981" : "#EF4444",
  opacity: isDisabled ? 0.5 : 1,
  cursor: isDisabled ? "auto" : "pointer",
});

function candidateImageStyle(index) {
  // const indexzero = index === Number(0);
  return {
    // border: `1px solid ${indexzero ? "#10B981" : "#EF4444"}`,
    objectFit: "contain",
  };
}

function voteNameStyle(index) {
  const indexzero = index === Number(0);
  return {
    color: indexzero ? "#10B981" : "#EF4444",
  };
}
