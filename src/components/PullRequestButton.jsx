// PullRequestButton.jsx
import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import axios from "axios";
import { SaveIcon } from "@heroicons/react/solid";
import { Tooltip } from "@chakra-ui/react";
const PullRequestButton = ({ code, testName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commitType, setCommitType] = useState("direct");
  const [branchName, setBranchName] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [extendedDescription, setExtendedDescription] = useState("");
  const [commitEmail, setCommitEmail] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCommitTypeChange = (event) => {
    setCommitType(event.target.value);
  };

  const handleBranchNameChange = (event) => {
    setBranchName(event.target.value);
  };

  const handleCommitMessageChange = (event) => {
    setCommitMessage(event.target.value);
  };

  const handleExtendedDescriptionChange = (event) => {
    setExtendedDescription(event.target.value);
  };

  const handleCommitEmailChange = (event) => {
    setCommitEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      commit_type: commitType,
      code: code,
      file_path: testName,
      branch_name: commitType === "pr" ? branchName : undefined,
      base_branch: "main",
      title: commitMessage,
      body: extendedDescription,
    };
    console.log(data, "data");
    try {
      const response = await axios.post(
        "https://j2qqehazvsvt44nt44sdrlx4le0womfr.lambda-url.us-west-2.on.aws/",
        data,
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    closeModal();
  };

  return (
    <>
      <Tooltip label="Attach a file">
        <button
          onClick={openModal}
          type="button"
          className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-indigo-600 hover:text-indigo-800"
          aria-label="Attach a file"
        >
          <SaveIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </Tooltip>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 text-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-100"
                >
                  Propose changes
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-2">
                  <input
                    className="w-full px-3 py-2 text-gray-300 border rounded-lg focus:outline-none bg-gray-700 border-gray-600"
                    type="text"
                    placeholder="Commit message"
                    value={commitMessage}
                    onChange={handleCommitMessageChange}
                    required
                  />
                  <textarea
                    className="w-full h-24 px-3 py-2 mt-2 text-gray-300 border rounded-lg focus:outline-none bg-gray-700 border-gray-600"
                    placeholder="Extended description"
                    value={extendedDescription}
                    onChange={handleExtendedDescriptionChange}
                  ></textarea>
                  <input
                    className="w-full px-3 py-2 mt-2 text-gray-300 border rounded-lg focus:outline-none bg-gray-700 border-gray-600"
                    type="email"
                    placeholder="Commit Email"
                    value={commitEmail}
                    onChange={handleCommitEmailChange}
                    required
                  />
                  <div className="mt-4">
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="radio"
                        className="form-radio text-indigo-600"
                        name="commitType"
                        value="pr"
                        checked={commitType === "pr"}
                        onChange={handleCommitTypeChange}
                      />
                      <span className="ml-2">
                        Create a new branch for this commit and start a pull
                        request
                      </span>
                    </label>
                    {commitType === "pr" && (
                      <input
                        className="w-full px-3 py-2 mt-2 text-gray-300 border rounded-lg focus:outline-none bg-gray-700 border-gray-600"
                        type="text"
                        placeholder="Branch name"
                        value={branchName}
                        onChange={handleBranchNameChange}
                        required
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PullRequestButton;
