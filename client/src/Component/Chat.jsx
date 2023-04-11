import { Fragment, useContext, useRef } from "react";
import AsideNavbar from "./AsideNavbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { toastifyoption } from "../globalConfig";
import { useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import Chatbody from "./Chatbody";
import ChatHeader from "./ChatHeader";
import { socket } from "../Context/AppContextProvider";
import AppContext from "../Context/AppContext";
import { useSelector } from "react-redux";
import VideoCom from "./VideoCom";

const Chat = () => {
  // ---------------------- All state configurations ------------------- //
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [user_message, setuser_message] = useState("");
  const [message_data, setmessage_data] = useState([]);
  const [conversation_id, setconservation_id] = useState("");
  const [istyping, setistyping] = useState(false);
  // const _user = JSON.parse(localStorage.getItem("user"));
  const { _user } = useSelector((state) => state.User);
  const lastMessageRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_DEV_BASE_URL;
  const { connected, UserStatus } = useContext(AppContext);

  // ------------------------------- all configurations -------------------- //
  const url_configuration = {
    method: "GET",
    header: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  // recieve_message functionality and online functionality
  useEffect(() => {
    socket.on("recieve_message", (message) => {
      setmessage_data((prev_message) => [...prev_message, message]);
    });

    return () => {
      socket.off("recieve_message");
    };
  }, [socket, id]);

  // scroll to bottom view to see lates messages
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message_data]);

  // typing functionality
  useEffect(() => {
    socket.on("typingResponse", () => setistyping(true));
    socket.on("stopedtypingResponse", () => setistyping(false));
  }, [socket]);

  // -------------------- configrurations ended --------------------- //

  // -------------------- Fetching user details and message -------------------- //
  async function FetchUserInfo() {
    let _details_url = `${BASE_URL}/v8/user/by/id?user_id=${id}`;
    let _message_url = `${BASE_URL}/v8/user/chat/read?reciever_id=${id}`;
    const user_details = fetch(_details_url, url_configuration);
    const Message_response = fetch(_message_url, url_configuration);

    Promise.all([user_details, Message_response])
      .then(async ([userDetails, messageDetails]) => {
        const response1 = await userDetails.json();
        const { data } = await messageDetails.json();
        setUser(response1.data);
        const { message } = data[0];
        setmessage_data(message);
        socket.emit("StartChat", data[0]._id, (callback) => {
          if (callback) return setconservation_id(callback.data);
        });
      })
      .catch((error) => {
        if (error) return toast.error(error, toastifyoption);
      });
  }

  useEffect(() => {
    FetchUserInfo();
  }, [id]);

  // --------------------  end of user details fetching -------------------- //

  //  --------------------    send Message    -------------------- //
  async function SendMessage() {
    let url = `${BASE_URL}/v8/user/chat`;
    const message_response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id,
        message: user_message,
      }),
    });

    const { data, error } = await message_response.json();
    if (message_response.status !== 200)
      return toast.error(error, toastifyoption);
    socket.emit("new_message", { message: data, conversation_id });
    setuser_message("");
  }

  // handle input change and stope typing functionality
  const handleinputChange = (e) => {
    setuser_message(e.target.value);
    if (e.target.value < 1) {
      socket.emit("stopetyping", { conversation_id, user_id: _user.id });
    }
  };

  // handletyping
  const handletyping = () => {
    socket.emit("typing", { conversation_id, user_id: _user.id });
  };

  // handle when user done typing
  const handletypingStop = (event) => {
    if (event.keyCode === 13) {
      socket.emit("stopetyping", { conversation_id, user_id: _user.id });
    }
  };

  return (
    <Fragment>
      <main className="flex">
        <AsideNavbar />
        <section className="flex-grow h-screen">
          <ChatHeader user={user} UserStatus={UserStatus} istyping={istyping} />
          <Chatbody
            message_data={message_data}
            lastMessageRef={lastMessageRef}
          />
          <div className="input_box">
            <form
              className="flex"
              onSubmit={(e) => {
                e.preventDefault();
                SendMessage();
              }}
            >
              <input
                type="text"
                className="w-full outline-none text-gray-900  
              placeholder:text-gray-800 text-[18px]"
                value={user_message}
                onChange={handleinputChange}
                onKeyDown={handletyping}
                onKeyUp={handletypingStop}
                placeholder="Type something..."
              />
              <div className="send flex space-x-3 items-center">
                <MdOutlineAttachFile
                  fontSize={"28px"}
                  className="cursor-pointer"
                />
                <input type="file" id="file" style={{ display: "none" }} />
                <button
                  onClick={() =>
                    socket.emit("stopetyping", {
                      conversation_id,
                      user_id: _user.id,
                    })
                  }
                  disabled={connected ? false : true}
                  className="send_btn px-5 py-2 cursor-pointer
                hover:bg-blue-800 bg-blue-600 outline-none focus:border
                focus:border-blue-600 focus:text-black text-white
                rounded-md focus:bg-transparent"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <VideoCom />
    </Fragment>
  );
};

export default Chat;
