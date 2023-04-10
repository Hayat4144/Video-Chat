import { MdVideoCall } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import { Fragment } from "react";
import { CallContext } from "../Context/CallContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const ChatHeader = ({ user, UserStatus, istyping, makecall }) => {
  const { Calluser } = useContext(CallContext);
  const { id } = useParams();
  return (
    <Fragment>
      <header className="chat_info bg-blue-700">
        <div className="username">
          <h1 className="text-xl">{user.email}</h1>
          <h1 className="user_status -translate-y-1">
            {UserStatus.online
              ? istyping
                ? "typing..."
                : "Online"
              : "Offline"}
          </h1>
        </div>
        <div className="icons space-x-5">
          <h1 className="audio_icon cursor-pointer">
            <IoCallSharp fontSize={"28px"} />
          </h1>
          <h1 className="videow_icon cursor-pointer">
            <MdVideoCall
              fontSize={"28px"}
              onClick={() => {
                Calluser(id);
              }}
            />
          </h1>
        </div>
      </header>
    </Fragment>
  );
};

export default ChatHeader;
