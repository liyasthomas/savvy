import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import API from "@aws-amplify/api";
import Storage from "@aws-amplify/storage";
import {
  createPoll as createPollMutation,
  createCandidate as createCandidateMutation,
} from "./graphql/mutations";
import { getPoll as getPollQuery } from "./graphql/queries";
import slugify from "./utils/slugify";
import Button from "./Button";
import loading from "./loading.svg";

let counter;
let pollId;

const initialState = {
  pollType: null,
  candidate1: null,
  candidate2: null,
  pollName: null,
  isUploading: false,
};

export default function CreatePoll() {
  const [state, setState] = useState(initialState);
  const history = useHistory();
  function setPollType(type) {
    setState(() => ({ ...initialState, pollType: type }));
  }

  function onChangeText(e) {
    const { name, value } = e.target;
    setState((currentState) => ({ ...currentState, [name]: value }));
  }
  async function onChangeImage(e) {
    if (!e.target.files[0]) return;
    setState((currentState) => ({ ...currentState, isUploading: true }));
    e.persist();
    const file = e.target.files[0];
    const fileName = `${uuid()}_${file.name}`;
    setState((currentState) => ({
      ...currentState,
      [e.target.name]: {
        localFile: URL.createObjectURL(file),
        file,
        fileName,
      },
    }));
    await Storage.put(fileName, file);
    setState((currentState) => ({ ...currentState, isUploading: false }));
  }

  async function createPoll() {
    /* Check if poll name is already taken, if so append a version # to the name
     *  then create the poll.
     */
    const { pollType } = state;
    let { pollName } = state;
    try {
      pollId = slugify(pollName);
      if (counter) {
        pollId = `${pollId}-v-${counter}`;
      }
      const data = await API.graphql({
        query: getPollQuery,
        variables: {
          id: pollId,
        },
      });
      if (data.data.getPoll) {
        counter ? (counter = counter + 1) : (counter = 2);
        return createPoll();
      }
    } catch (err) {}
    try {
      if (counter) {
        pollName = `${pollName}-v-${counter}`;
      }
      const pollData = {
        id: pollId,
        itemType: "Poll",
        type: pollType,
        name: pollName,
      };
      const isImage = pollType === "image";

      const candidate1Data = {
        pollCandidatesId: pollId,
        upvotes: 0,
        name: isImage ? null : candidate1,
        image: isImage ? candidate1.fileName : null,
      };
      const candidate2Data = {
        pollCandidatesId: pollId,
        upvotes: 0,
        name: isImage ? null : candidate2,
        image: isImage ? candidate2.fileName : null,
      };

      const createPollPromise = API.graphql({
        query: createPollMutation,
        variables: { input: pollData },
      });
      const createCandidate1Promise = API.graphql({
        query: createCandidateMutation,
        variables: { input: candidate1Data },
      });
      const createCandidate2Promise = API.graphql({
        query: createCandidateMutation,
        variables: { input: candidate2Data },
      });
      await Promise.all([
        createPollPromise,
        createCandidate1Promise,
        createCandidate2Promise,
      ]);

      const url = `/${pollId}`;
      history.push(url);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  const { pollType, candidate1, candidate2, pollName, isUploading } = state;
  const isDisabled = !pollType || !candidate1 || !candidate2 || !pollName;

  return (
    <div className="flex flex-col flex-1">
      <h1 className="mb-8 text-2xl font-semibold highlight-text">
        Create new feature request
      </h1>
      <div>
        <p className="mb-2 font-semibold">
          What type of poll would you like to create?
        </p>
        <div className="flex my-8">
          <Button
            onClick={() => setPollType("text")}
            title="Text"
            backgroundColor="#00acee"
          />
          <Button
            onClick={() => setPollType("image")}
            title="Image"
            backgroundColor="#00acee"
          />
        </div>
      </div>
      {pollType === "text" && (
        <div className="mt-2">
          <p className="mb-2 font-semibold">Brief description of the feature</p>
          <input
            placeholder="8-10 words"
            name="pollName"
            onChange={onChangeText}
            autoComplete="off"
            className="w-full px-4 py-2 my-4 highlight-bg rounded-lg outline-none highlight-text"
          />
          <p className="mt-4 mb-2 font-semibold">Up vote label</p>
          <input
            placeholder="Yes"
            name="candidate1"
            onChange={onChangeText}
            autoComplete="off"
            className="w-full px-4 py-2 my-4 highlight-bg rounded-lg outline-none highlight-text"
          />
          <p className="mt-4 mb-2 font-semibold">Down vote label</p>
          <input
            placeholder="No"
            name="candidate2"
            onChange={onChangeText}
            autoComplete="off"
            className="w-full px-4 py-2 my-4 highlight-bg rounded-lg outline-none highlight-text"
          />
        </div>
      )}
      {pollType === "image" && (
        <div className="mt-2">
          <p className="mb-2 font-semibold">Brief description of the feature</p>
          <input
            placeholder="8-10 words"
            name="pollName"
            autoComplete="off"
            onChange={onChangeText}
            className="w-full px-4 py-2 my-4 highlight-bg rounded-lg outline-none highlight-text"
          />
          <div>
            <p className="mt-4 mb-2 font-semibold">Up vote image</p>
            {state.candidate1 && (
              <img
                src={state.candidate1.localFile}
                style={imageStyle}
                alt="Candidate"
              />
            )}
            <div className="my-8">
              <input
                type="file"
                name="candidate1"
                id="file1"
                style={inputFileStyle}
                onChange={onChangeImage}
              />
              <label
                htmlFor="file1"
                style={inputLabelStyle}
                className="w-full px-4 py-2 my-4 highlight-bg rounded-lg outline-none highlight-text"
              >
                Choose a file
              </label>
            </div>
            <p className="mt-4 mb-2 font-semibold">Down vote image</p>
            {state.candidate2 && (
              <img
                src={state.candidate2.localFile}
                style={imageStyle}
                alt="Candidate"
              />
            )}
            <div className="my-8">
              <input
                type="file"
                name="candidate2"
                id="file2"
                style={inputFileStyle}
                onChange={onChangeImage}
              />
              <label
                htmlFor="file2"
                style={inputLabelStyle}
                className="w-full px-4 py-2 my-4 highlight-bg rounded-lg outline-none highlight-text"
              >
                Choose a file
              </label>
            </div>
          </div>
        </div>
      )}
      {isUploading && (
        <div className="flex flex-col items-center justify-start mx-auto">
          <img className="h-8 m-8" src={loading} alt="Loading" />
          Uploading
        </div>
      )}
      {pollType && (
        <div className="mt-10">
          <Button
            onClick={createPoll}
            title="Create Poll"
            backgroundColor="#3B82F6"
            disabled={isDisabled || isUploading}
          />
        </div>
      )}
    </div>
  );
}

const imageStyle = {
  width: "100%",
  maxWidth: 200,
  borderRadius: 8,
  marginTop: 32,
  marginBottom: 32,
};

const inputFileStyle = {
  width: "0.1px",
  height: "0.1px",
  opacity: 0,
  overflow: "hidden",
  position: "absolute",
  zIndex: -1,
};

const inputLabelStyle = {
  cursor: "pointer",
};
