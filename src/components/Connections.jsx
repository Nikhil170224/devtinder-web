import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";
import { useEffect } from "react";
import axios from "axios";

const Connections = () => {
    let connections = useSelector((store) => store.connection);
    const { Conn } = connections;
    connections = Conn;
  const dispatch = useDispatch();

  const getConnections = async () => {
    // if (connections.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true
      });
        dispatch(addConnection(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);
    
  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold text-2xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-6 gap-4">
      {" "}
      {/* ✅ flex-col so cards stack vertically */}
      <h1 className="font-bold text-2xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } =
          connection; // ✅ _id as key

        return (
          <div
            key={_id} // ✅ unique key for each card
            className="card card-side bg-base-300 shadow-md w-2/3 items-center"
          >
            <figure className="p-4">
              <img
                src={
                  photoUrl ||
                  "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                }
                alt={`${firstName} ${lastName}`}
                className="w-24 h-24 rounded-full object-cover" // ✅ circular profile picture
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {firstName} {lastName}{" "}
                {/* ✅ actual name instead of placeholder */}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-400">
                  {age} years •{" "}
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </p>
              )}
              {about && (
                <p className="text-sm">{about}</p> // ✅ about section
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
