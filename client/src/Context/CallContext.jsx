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
  const [peer, setpeer] = useState(null);
  const [callAccepted, setcallAccepted] = useState(false);
  const [call, setcall] = useState({});
  const [isCallend, setisCallend] = useState(false);
  const [Isincomingcall, setIsincomingcall] = useState(false);
  const RemoteVideoRef = useRef();
  const MyVideoRef = useRef();
  const [MyVideoStatus, setMyVideoStatus] = useState(true);
  const [MyMicStatus, setMyMicStatus] = useState(true);
  const [RemoteVideoStatus, setRemoteVideoStatus] = useState();
  const [RemoteMicStatus, setRemoteMicStatus] = useState();

  const openMediaDevices = async (constraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
  };

  useEffect(() => {
    socket.on("incoming_call", (data) => {
      setIsCalling(true);
      setcall(data);
      setIsincomingcall(true);
    });

    // updateRemoteMedia
    socket.on("updateRemoteMedia", ({ type, currentMediaStatus, id }) => {
      if (currentMediaStatus !== null || currentMediaStatus !== []) {
        switch (type) {
          case "video":
            setRemoteVideoStatus(currentMediaStatus);
            break;
          case "mic":
            setRemoteMicStatus(currentMediaStatus);
            break;
          default:
            setRemoteMicStatus(currentMediaStatus[0]);
            setRemoteVideoStatus(currentMediaStatus[1]);
            break;
        }
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on("calldroped", () => {
      setisCallend(true);
      setIsCalling(false);
      setcallAccepted(false);
      setIsincomingcall(false);
    });

    // close the peer connection
    if (peer) {
      peer.destroy();
    }
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
      RemoteVideoRef.current.srcObject = currentstream;
    });

    socket.on("callaccepted", (signal) => {
      setcallAccepted(true);
      peer.signal(signal);
    });
    setpeer(peer);
  };

  const AnswerCall = async () => {
    setIsCalling(true);
    const stream = await openMediaDevices({ video: true, audio: true });
    setLocalStream(stream);
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

    setpeer(peer);
    setcallAccepted(true);
    setIsincomingcall(false);
  };

  // drop a call
  const DropCall = (id) => {
    if (peer) {
      peer.destroy();
      setisCallend(true);
      setIsCalling(false);
      setIsincomingcall(false);

      const peer2 = new Peer({
        initiator: false,
        trickle: false,
        stream: null,
      });

      setpeer(peer2);
      socket.emit("dropCall", id);
    }
  };

  //  Toggle Video
  const UpdateVideo = () => {
    setMyVideoStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "mic",
        currentMediaStatus: !currentStatus,
      });
      localStream.getVideoTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });
  };

  //  Toggle Video
  const UpdateAudio = () => {
    setMyMicStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "video",
        currentMediaStatus: !currentStatus,
      });
      localStream.getAudioTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });
  };

  console.clear();
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
        MyMicStatus,
        MyVideoStatus,
        RemoteVideoStatus,
        RemoteMicStatus,
        DropCall,
        isCallend,
        UpdateAudio,
        UpdateVideo,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export default CallContextProvider;
