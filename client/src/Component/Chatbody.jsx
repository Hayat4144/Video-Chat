import { Fragment } from "react";
import { useSelector } from "react-redux";
const Chatbody = ({ message_data, lastMessageRef }) => {
  // const _user = JSON.parse(localStorage.getItem("user"));
  const { _user } = useSelector((state) => state.User);

  return (
    <Fragment>
      <div className="messages bg-gray-400">
        <div className="chats flex flex-col">
          {message_data.map((message, index) => (
            <div
              key={index}
              className={`message send  ${
                message.sender === _user.id
                  ? "self-end bg-green-200 my-2"
                  : "self-start bg-gray-200 my-1"
              } rounded-lg p-2 mx-2`}
            >
              <p>{message.payload.content}</p>
            </div>
          ))}
          <div ref={lastMessageRef} />
        </div>
      </div>
    </Fragment>
  );
};

export default Chatbody;
