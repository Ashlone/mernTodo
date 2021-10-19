import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

const LoginForm = () => {
  //setting states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      history.push("/home");
    }
  }, [history]);
  //function to handle log in
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); //preventing the page from refreshing
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      console.log(data);
      localStorage.setItem("userToken", data.token); //adding userInfo to local storage
      history.push("/home");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
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
      <h3 style={{ marginTop: "50px" }}>TO DO APP</h3>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div style={{ width: "500px", marginTop: "50px" }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="primary" type="submit" onClick={handleLoginSubmit}>
              LogIn
            </Button>
            <Link to="/register">
              <span>Create an account </span>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
