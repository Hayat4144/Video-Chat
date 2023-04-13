import { MdVideoCall } from "react-icons/md";
import { Fragment } from "react";
import { CallContext } from "../Context/CallContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const ChatHeader = ({ user, UserStatus, istyping }) => {
  const { Calluser } = useContext(CallContext);
  const { id } = useParams();
  return (
    <Fragment>
      <header className="chat_info bg-blue-700">
        <div className="username">
          <h1 className="text-xl">{user.name}</h1>
          <h1 className="user_status -translate-y-1">
            {UserStatus.online
              ? istyping
                ? "typing..."
                : "Online"
              : "Offline"}
          </h1>
        </div>
        <div className="icons mr-5">
          <h1 className="videow_icon cursor-pointer">
            <MdVideoCall
              fontSize={"30px"}
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
