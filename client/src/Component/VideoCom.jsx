import { Fragment, useContext } from "react";
import { CallContext } from "../Context/CallContext";

const VideoCom = () => {
  const { isCalling, MyVideoRef, RemoteVideoRef } = useContext(CallContext);
  return (
    <Fragment>
      {isCalling ? (
        <div
          className={`video_container absolute ${
            isCalling ? "inset-0" : " "
          } w-full h-screen`}
        >
          <video autoPlay className="400px" ref={MyVideoRef} />
          <video
            autoPlay
            ref={RemoteVideoRef}
            className="remote_media border-white"
          />
        </div>
      ) : null}
    </Fragment>
  );
};

export default VideoCom;
