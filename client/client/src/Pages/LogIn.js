import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LogInForm from "../components/LoginForm";

const LogIn = () => {
  let history = useHistory();
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      history.push("/home");
    }
  }, [history]);
  return (
    <div>
      <LogInForm />
    </div>
  );
};

export default LogIn;
