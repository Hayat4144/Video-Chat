import React, { Fragment, useContext } from "react";
import { CallContext } from "../Context/CallContext";
import { AiOutlineClose } from "react-icons/ai";
import { VscCallIncoming } from "react-icons/vsc";
import { SlCallEnd } from "react-icons/sl";
import { IoCallOutline } from "react-icons/io5";

export default function () {
  const { AnswerCall, Isincomingcall } = useContext(CallContext);

  return (
    <Fragment>
      {Isincomingcall ? (
        <div
          className="absolute inset-0 z-30 w-full bg-black
                    bg-opacity-30 opacity-100  flex justify-center items-center"
        >
          <div className="bg-white fixed h-48 w-[30%] rounded-md px-5 py-2">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl">Incoming call</h1>
              <AiOutlineClose
                fontSize={"25px"}
                className="text-gray-900 cursor-pointer"
              />
            </div>
            <div className="user_info py-5 flex items-center space-x-3">
              <p className="text-2xl">Aarish ilyas is calling you...</p>
              <VscCallIncoming className="text-3xl " />
            </div>
            <div className="answer_decline flex justify-between items-center pt-5">
              <button
                type="button"
                className="px-6 py-1.5 rounded-md outline-none focus:border focus:border-red-700
               text-white focus:text-black bg-red-800 focus:bg-transparent cursor-pointer
                flex items-center space-x-2"
              >
                <SlCallEnd className="text-xl" />
                <span>Decline</span>
              </button>
              <button
                onClick={AnswerCall}
                type="button"
                className="px-6 py-1.5 rounded-md outline-none focus:border focus:border-green-700
               text-white focus:text-black bg-green-800 focus:bg-transparent cursor-pointer
                flex items-center space-x-2"
              >
                <IoCallOutline className="text-xl" />
                <span>Answer</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
