import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../utils/constants";
import { addRequests } from "../utils/requestsSlice";
import { useEffect } from "react";
import axios from "axios";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const getRequests = async () => {
        if (requests.length > 0) return;
        const res = await axios.get(BASE_URL + "/user/request/received", { withCredentials: true });
        console.log(res.data.Connection_Request);
        dispatch(addRequests(res.data.Connection_Request));
    }

    useEffect(() => {
        getRequests();
    }, []);
    if (!requests || requests.length === 0) {
        return (
            <div className="flex justify-center my-10">
                <h1 className="font-bold text-2xl">No requests Found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center my-6 gap-4">
            {" "}
            {/* ✅ flex-col so cards stack vertically */}
            <h1 className="font-bold text-2xl">Requests, Not answered Yet.</h1>
            {requests.map((request) => {
                const { _id, firstName, lastName, age, gender, about, photoUrl } =
                request.FromUserId; // ✅ _id as key

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
}

export default Requests;