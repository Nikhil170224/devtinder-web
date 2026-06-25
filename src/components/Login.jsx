import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import BASE_URL from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("virat@gmail.com");
  const [password, setPassword] = useState("Virat@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const loginHandler = async () => {
        try {
           const res = await axios.post(BASE_URL + "/login",
               {
                   emailId,
                   password
               },
               {withCredentials:true}
          ); 
          dispatch(addUser(res.data));
          navigate("/");
        }
        catch (err) {
          setError(err?.response?.data || "Something went wrong!!");
        }
    }
    return (
      <div className="flex justify-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-center text-2xl pt-13">
            Login
          </legend>

          <div>
            <label className="label">Email </label>
            <input
              type="email"
              className="input"
              value={emailId}
              placeholder="Email"
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </div>

          <div className="mt-2">
            <label className="label">Password </label>
            <input
              type="password"
              className="input"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <p className="text-red-600">{error}</p>
          <button className="btn btn-neutral mt-4" onClick={loginHandler}>
            Login
          </button>
        </fieldset>
      </div>
    );
}

export default Login;