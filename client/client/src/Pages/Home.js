import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

const Home = () => {
  //States
  const [todo, setTodo] = useState("");
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const history = useHistory();

  // fetching data if there is a token in the localStorage
  //Note that l set the loading to false when the data has been fetched
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      history.push("/login");
    }
    const fetchTodoData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/todo", config);
        console.log(data);
        setApi(data);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem("userToken");
        setError("You are not authorized please login");
      }
    };
    fetchTodoData();
  }, [history]);

  //Logout handler
  const logouthandler = () => {
    localStorage.removeItem("userToken");
    history.push("/login");
  };

  //This function fetches data when a user add a task...You call this function in handleClick
  const finalFetch = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    };

    try {
      const { data } = await axios.get("/api/todo", config);
      console.log(data);
      setApi(data);
    } catch (error) {
      localStorage.removeItem("userToken");
      setError("You are not authorized please login");
    }
  };

  //This function is called when deleting a task
  const handledelete = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    };
    try {
      const { data } = await axios.delete(`/api/todo/${_id}`, config);
      console.log(data);
      finalFetch();
    } catch (error) {
      setError("You are not authorized please login");
    }
  };

  //This function is called when adding a task
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };

      const { data } = await axios.post(
        "/api/todo",
        {
          todo,
        },
        config
      );
      console.log(data);
      finalFetch();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <span
        style={{ fontWeight: "200px", margin: "30px", cursor: "pointer" }}
        onClick={logouthandler}
      >
        Logout
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        {loading && <Loading />}
        <div
          style={{
            display: "flex",

            width: "500px",
          }}
        >
          <input
            style={{ width: "100%", outline: "none" }}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            onClick={handleClick}
            style={{
              width: "20%",
              marginLeft: "20px",
              background: "blue",
              padding: "5px",
              border: "none",
              color: "white",
            }}
          >
            Add task
          </button>
        </div>
        <div style={{ marginTop: "50px" }}>
          {api.map((todoData) => {
            return (
              <ul>
                <div style={{ display: "flex" }}>
                  <li>{todoData.todo} </li>
                  <span
                    onClick={() => handledelete(todoData._id)}
                    style={{
                      marginLeft: "50px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    X
                  </span>
                </div>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
