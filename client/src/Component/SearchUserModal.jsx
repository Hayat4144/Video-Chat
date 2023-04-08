import { Fragment } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const SearchUserModal = ({ isModalOpen, searchuser_data }) => {
  return (
    <Fragment>
      <div
        className={`search_modal  ${
          isModalOpen ? "absolute" : "hidden"
        } top-12 w-[25%] left-0`}
      >
        <div className="modal_body py-3 w-full px-2 bg-white z-30 shadow-lg h-1/3">
          {searchuser_data.length > 0 ? (
            <Fragment>
              {searchuser_data.map((data) => (
                <Link to={`/v5/user/chat/${data._id}`}>
                  {" "}
                  <div
                    className="flex items-center cursor-pointer hover:bg-gray-200 py-2
                     hover:rounded-md space-x-3"
                  >
                    <h1>
                      <BiUserCircle className="pl-2" fontSize={"35px"} />
                    </h1>
                    <h1>{data.email}</h1>
                  </div>
                </Link>
              ))}
            </Fragment>
          ) : (
            <Fragment>
              <h1 className="text-xl font-bold">No user has been found</h1>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SearchUserModal;
