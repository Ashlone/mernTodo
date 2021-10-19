import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  //setting states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  //function for logging in
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do no match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "/api/users/register",
          {
            username,
            email,
            password,
          },
          config
        );
        console.log(data);
        alert("You have successfully registered");
        history.push("/login");
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3
        style={{
          marginTop: "50px",
        }}
      >
        {" "}
        CREATE AN ACCOUNT{" "}
      </h3>{" "}
      <div
        style={{
          width: "500px",
          marginTop: "50px",
        }}
      >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger"> {message} </ErrorMessage>}
        {loading && <Loading />}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Name"
            />
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Group>{" "}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button onClick={handleRegister} variant="primary" type="submit">
              {" "}
              Register{" "}
            </Button>{" "}
            <Link to="/login">
              <span> LogIn </span>{" "}
            </Link>{" "}
          </div>{" "}
        </Form>{" "}
      </div>{" "}
    </div>
  );
};

export default RegisterForm;
