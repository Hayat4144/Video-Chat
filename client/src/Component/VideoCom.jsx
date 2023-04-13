import { Fragment, useContext } from "react";
import { CallContext } from "../Context/CallContext";
import { BsMicMute } from "react-icons/bs";
import { BsMic } from "react-icons/bs";
import { SlCallEnd } from "react-icons/sl";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { MdOutlineVideocamOff } from "react-icons/md";
import { useParams } from "react-router-dom";

const VideoCom = () => {
  const {
    isCalling,
    DropCall,
    MyVideoRef,
    RemoteVideoRef,
    UpdateAudio,
    UpdateVideo,
    MyMicStatus,
    MyVideoStatus,
  } = useContext(CallContext);
  const { id } = useParams();
  return (
    <Fragment>
      {isCalling ? (
        <div className="absolute inset-0 w-full h-screen">
          <div className="video_box h-full">
            <video
              className="object-cover main_screen h-full w-full"
              autoPlay
              ref={RemoteVideoRef}
            ></video>
            <video
              autoPlay
              className="absolute top-5 left-5 h-40 w-40 local_screen"
              ref={MyVideoRef}
            ></video>
            <div
              className="video_controls_buttons absolute bottom-10 left-[40%] 
            flex items-center justify-between space-x-5 right-[40%]"
            >
              <button
                onClick={() => {
                  UpdateAudio();
                }}
                className="mic_btn px-4 py-2  rounded-md focus:border focus:border-indigo-700
                    outline-none bg-indigo-700 focus:text-white focus:bg-transparent
                    "
              >
                {MyMicStatus ? (
                  <BsMic className="text-white text-2xl" />
                ) : (
                  <BsMicMute className="text-white text-2xl" />
                )}
              </button>
              <button
                type="button"
                onClick={() => UpdateVideo()}
                className="video_btn px-4 py-2  rounded-md focus:border focus:border-sky-700
                    outline-none bg-sky-700 focus:text-white focus:bg-transparent"
              >
                {MyVideoStatus ? (
                  <HiOutlineVideoCamera className="text-white text-2xl" />
                ) : (
                  <MdOutlineVideocamOff className="text-white text-2xl" />
                )}
              </button>
              <button
                onClick={() => DropCall(id)}
                type="button"
                className="cancel_call_btn  px-4 py-2  rounded-md focus:border focus:border-red-700
                    outline-none bg-red-700 focus:text-white focus:bg-transparent"
              >
                <SlCallEnd className="text-white text-2xl" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default VideoCom;
