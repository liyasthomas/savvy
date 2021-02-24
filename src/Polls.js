import React, { useEffect, useReducer } from "react";
import API from "@aws-amplify/api";
import Storage from "@aws-amplify/storage";
import { Link } from "react-router-dom";
import { itemsByType } from "./gql/queries";
import { onUpdateByID } from "./gql/subscriptions";
import { upVote } from "./gql/mutations";
import { setVoteForPoll, CLIENT_ID } from "./utils/localStorageInfo";
import Candidates from "./Candidates";
import actionTypes from "./actionTypes";
import loading from "./loading.svg";

const initialState = {
  polls: [],
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_POLL:
      return {
        ...state,
        polls: action.polls,
        loading: false,
      };
    case actionTypes.UPVOTE:
      const { pollId, candidateId } = action;
      const polls = state.polls;
      const poll = polls.find((p) => p.id === pollId);
      const pollIndex = polls.findIndex((p) => p.id === pollId);
      const identifiedCandidate = poll.candidates.items.find(
        (c) => c.id === candidateId
      );
      const candidateIndex = poll.candidates.items.findIndex(
        (c) => c.id === candidateId
      );
      identifiedCandidate.upvotes = identifiedCandidate.upvotes + 1;
      polls[pollIndex].candidates.items[candidateIndex] = identifiedCandidate;
      return {
        ...state,
        polls,
      };
    default:
      return state;
  }
}

export default function Polls() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const subscriptions = {};
  useEffect(() => {
    fetchPolls();
    return () => {
      Object.values(subscriptions).forEach((subscription) =>
        subscription.unsubscribe()
      );
    };
  }, []);
  async function fetchPolls() {
    const pollData = await API.graphql({
      query: itemsByType,
      variables: {
        sortDirection: "ASC",
        itemType: "Poll",
        limit: 5,
      },
    });
    await Promise.all(
      pollData.data.itemsByType.items.map(async (poll) => {
        await Promise.all(
          poll.candidates.items.map(async (c) => {
            const image = await Storage.get(c.image);
            c.image = image;
            return image;
          })
        );
      })
    );
    dispatch({
      type: actionTypes.SET_POLL,
      polls: pollData.data.itemsByType.items,
    });
    pollData.data.itemsByType.items.forEach((item) => subscribe(item));
  }

  function subscribe(pollData) {
    const { items } = pollData.candidates;
    const { id: pollId } = pollData;
    const id1 = items[0].id;
    const id2 = items[1].id;

    subscriptions[id1] = API.graphql({
      query: onUpdateByID,
      variables: { id: id1 },
    }).subscribe({
      next: (apiData) => {
        const {
          value: {
            data: {
              onUpdateByID: { id, clientId },
            },
          },
        } = apiData;
        if (clientId === CLIENT_ID) return;
        dispatch({ type: actionTypes.UPVOTE, pollId, candidateId: id });
      },
    });

    subscriptions[id2] = API.graphql({
      query: onUpdateByID,
      variables: { id: id2 },
    }).subscribe({
      next: (apiData) => {
        const {
          value: {
            data: {
              onUpdateByID: { id, clientId },
            },
          },
        } = apiData;
        if (clientId === CLIENT_ID) return;
        dispatch({ type: actionTypes.UPVOTE, pollId, candidateId: id });
      },
    });
  }

  function createLocalUpvote(candidateId, pollId) {
    const limitReached = setVoteForPoll(pollId, candidateId);
    if (limitReached) return;
    const polls = state.polls;
    const poll = polls.find((p) => p.id === pollId);
    const pollIndex = polls.findIndex((p) => p.id === pollId);
    const identifiedCandidate = poll.candidates.items.find(
      (c) => c.id === candidateId
    );
    const candidateIndex = poll.candidates.items.findIndex(
      (c) => c.id === candidateId
    );
    identifiedCandidate.upvotes = identifiedCandidate.upvotes + 1;
    polls[pollIndex].candidates.items[candidateIndex] = identifiedCandidate;
    dispatch({ type: actionTypes.SET_POLL, polls });
  }
  async function onUpVote({ id: candidateId }, { id: pollId }) {
    createLocalUpvote(candidateId, pollId);
    upvoteApi(candidateId);
  }
  async function upvoteApi(id) {
    await API.graphql({
      query: upVote,
      variables: { id, clientId: CLIENT_ID },
    });
  }
  if (state.loading)
    return (
      <div className="flex flex-col items-center justify-center">
        <img className="h-8 m-8" src={loading} alt="Loading" />
        Loading
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">
        Collect feedback from customers and public
      </h1>
      <p className="py-4 md:w-3/5">
        Savvy is a scalable serverless customer feedback app - built with AWS
        Amplify, AWS AppSync, and Amazon DynamoDB on{" "}
        <a
          href="https://townhall.hashnode.com/announcing-aws-amplify-hackathon-on-hashnode"
          target="_blank"
          className="text-indigo-500 hover:text-indigo-600"
          rel="noopener noreferrer"
        >
          AWS Amplify Hackathon by Hashnode
        </a>
        .
      </p>
      <p className="py-4 md:w-3/5">
        Savvy runs on Savvy. Feel free to add new feature requests that you'd
        like to see implemented in Savvy or up vote your favorite ones that are
        already listed below. Down voting a feature shows less intrest in it.
      </p>
      <h2 className="my-8 text-sm font-bold tracking-wide text-gray-800 uppercase">
        Feature requests
      </h2>
      <div className="flex flex-col mb-8 divide-y divide-gray-300">
        {state.polls.map((poll, index) => (
          <div className="flex items-stretch" key={poll.id}>
            <Candidates
              key={index}
              candidates={poll.candidates.items}
              poll={poll}
              onUpVote={onUpVote}
            />
            <h3 className="flex flex-1 px-8 py-4 text-xl font-semibold border-l">
              <Link
                to={`/${poll.id}`}
                className="text-gray-800 hover:text-gray-600"
              >
                {poll.name}
              </Link>
            </h3>
          </div>
        ))}
      </div>
      <h1 className="mt-8 text-2xl font-semibold text-gray-800">
        Setup your own Savvy
      </h1>
      <p className="py-4 md:w-3/5">
        Savvy ♥ open source.
        <br />
        <br />
        We build Savvy for developers, entrepreneures, indie hackers, and
        startups. Deploy your own self-hosted Savvy instance to AWS Amplify with
        one-click and start building better products.
        <br />
        <br />
        <a
          href="https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/liyasthomas/savvy"
          target="_blank"
          className="text-indigo-500 hover:text-indigo-600"
          rel="noopener noreferrer"
        >
          Deploy to AWS Amplify
        </a>
        <br />
        <br />
        Follow the detailed instructions on our{" "}
        <a
          href="https://github.com/liyasthomas/savvy"
          target="_blank"
          className="text-indigo-500 hover:text-indigo-600"
          rel="noopener noreferrer"
        >
          GitHub repository
        </a>
        .
      </p>
    </div>
  );
}
