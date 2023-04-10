import { createContext, useEffect, useRef, useState } from "react";
import global from "global";
import * as process from "process";
global.process = process;
import { socket } from "../Context/AppContextProvider";
import Peer from "simple-peer";
import { useSelector } from "react-redux";

export const CallContext = createContext();

const CallContextProvider = ({ children }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  // const _user = JSON.parse(localStorage.getItem("user"));
  const { _user } = useSelector((state) => state.User);

  const [callAccepted, setcallAccepted] = useState(false);
  const [call, setcall] = useState({});
  const [isCallend, setisCallend] = useState(false);
  const [Isincomingcall, setIsincomingcall] = useState(false);
  const RemoteVideoRef = useRef();
  const MyVideoRef = useRef();
  const ConnectionRef = useRef();
  const user = useSelector((state) => state.User);
  console.log(user);
  const openMediaDevices = async (constraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
  };

  useEffect(() => {
    socket.on("incoming_call", (data) => {
      setIsCalling(true);
      setcall(data);
      setIsincomingcall(true);
    });
  }, [socket]);

  const Calluser = async (id) => {
    setIsCalling(true);
    const mystream = await openMediaDevices({ video: true, audio: true });
    setLocalStream(mystream);
    MyVideoRef.current.srcObject = mystream;
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: mystream,
    });

    peer.on("signal", (data) => {
      socket.emit("Calluser", {
        userToCall: id,
        signalData: data,
        from: _user.id,
        type: "both",
      });
    });

    peer.on("stream", (currentstream) => {
      console.log(currentstream);
      RemoteVideoRef.current.srcObject = currentstream;
    });

    socket.on("callaccepted", (signal) => {
      setcallAccepted(true);
      peer.signal(signal);
    });

    ConnectionRef.current = peer;
    console.log(ConnectionRef.current);
  };

  const AnswerCall = async () => {
    setIsCalling(true);
    const stream = await openMediaDevices({ video: true, audio: true });
    MyVideoRef.current.srcObject = stream;
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answer_call", {
        signal: data,
        to: call.from,
        type: "both",
      });
    });

    // handle remoteStream
    peer.on("stream", (currentstream) => {
      RemoteVideoRef.current.srcObject = currentstream;
    });

    // connect the caller using the recieved signal data
    peer.signal(call.signal);

    ConnectionRef.current = peer;
    setcallAccepted(true);
    setIsincomingcall(false);
  };

  return (
    <CallContext.Provider
      value={{
        localStream,
        remoteStream,
        isCalling,
        MyVideoRef,
        RemoteVideoRef,
        AnswerCall,
        Calluser,
        callAccepted,
        Isincomingcall,
        call,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export default CallContextProvider;
