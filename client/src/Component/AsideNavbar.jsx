import { Fragment, useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import SearchUserModal from "./SearchUserModal";
import { Link } from "react-router-dom";

const AsideNavbar = () => {
  const [search_user, setsearch_user] = useState("");
  const [search_data, setsearch_data] = useState([]);
  const [user_data, setuser_data] = useState([]);
  const [isSearchModalOpen, setisSearchModalOpen] = useState(false);

  const SearchUser = async () => {
    const url = `http://localhost:5000/v8/search/user?search_user=${search_user}`;
    const result_user = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const { data, error } = await result_user.json();
    if (result_user.status !== 200) {
      console.log(error);
      return;
    }
    setsearch_data(data);
    setisSearchModalOpen(!isSearchModalOpen);
  };

  const FetchUser = async () => {
    const url = `http://localhost:5000/v8/users`;
    const result_user = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const { data, error } = await result_user.json();
    if (result_user.status !== 200) {
      console.log(error);
      return;
    }
    setuser_data(data);
  };
  useEffect(() => {
    FetchUser();
  }, []);

  return (
    <Fragment>
      <aside
        className="border-r border-gray-700
       h-screen w-[25%] bg-gray-800"
      >
        {/* search box */}
        <div className="search_box  mx-1 my-1">
          <div className="flex items-center space-x-1">
            <input
              value={search_user}
              onChange={(e) => {
                setsearch_user(e.target.value);
                e.preventDefault();
                SearchUser();
              }}
              type="search"
              className="border border-gray-300 outline-none
              px-6 py-1.5 focus:border focus:border-gray-400
              w-full rounded-md bg-gray-700 text-gray-300"
              placeholder="search your user"
            />
          </div>
        </div>
        <div className="friend_chat">
          <section className="chat_box text-gray-300">
            {user_data.map((data, index) => (
              <Link key={index} to={`/v5/user/chat/${data._id}`}>
                <div
                  className="flex items-center px-2 space-x-2 space-y-3
                cursor-pointer hover:bg-gray-700 hover:text-gray-200 rounded-md"
                >
                  <BiUserCircle fontSize={"35px"} />
                  <div className="username_lastmesage">
                    <span className="block text-xl">{data.email}</span>
                    <span className="last_message block -translate-y-1 text-[13px]">
                      is everything ok chasmail?
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </aside>
      <SearchUserModal
        searchuser_data={search_data}
        isModalOpen={isSearchModalOpen}
      />
    </Fragment>
  );
};

export default AsideNavbar;
