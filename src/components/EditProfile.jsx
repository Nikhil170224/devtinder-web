import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);
  // Add this state at the top with other states
  const [skillsInput, setSkillsInput] = useState(user.skills?.join(", ") || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        // ✅ Fix 1: POST → PATCH
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl, // ✅ Fix 2: photoURL → photoUrl
          age: age ? Number(age) : undefined, // ✅ Fix 3: send as Number, backend validates integer
          gender: gender.toLowerCase(), // ✅ Fix 4: backend expects lowercase gender
          about,
          skills,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      const msg = err?.response?.data;
      if (typeof msg === "string" && !msg.startsWith("<!")) {
        setError(msg);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>

              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label mt-2.5">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label mt-2.5">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label mt-2.5">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label mt-2.5">
                    <span className="label-text">Gender</span>
                  </div>
                  <div className="dropdown w-full">
                    <div tabIndex={0} role="button" className="btn m-1">
                      {gender
                        ? gender.charAt(0).toUpperCase() + gender.slice(1)
                        : "Select gender"}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li>
                        <button onClick={() => setGender("male")}>Male</button>
                      </li>
                      <li>
                        <button onClick={() => setGender("female")}>
                          Female
                        </button>
                      </li>
                      <li>
                        <button onClick={() => setGender("other")}>
                          Other
                        </button>
                      </li>
                    </ul>
                  </div>
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Skills (comma separated)</span>
                  </div>
                  <input
                    type="text"
                    value={skillsInput}
                    onChange={(e) => {
                      setSkillsInput(e.target.value); // ✅ update raw string freely
                      setSkills(
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      ); // ✅ update actual skills array in background
                    }}
                    placeholder="e.g. React, CSS, Node.js"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label mt-2.5">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    placeholder="Bio"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="textarea textarea-bordered w-full max-w-xs"
                  ></textarea>
                </label>
              </div>

              <p className="text-red-500 text-center">{error}</p>

              <div className="card-actions justify-center mt-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, about, age, gender, skills }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center pt-20">
          <div className="alert alert-success">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};;

export default EditProfile;
