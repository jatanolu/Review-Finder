import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Profile(logged) {
  const [list, setlist] = useState([]);
  const [text, settext] = useState([]);

  const doThat = async () => {
    let myResponse = await axios.post("user_list/", { listname: text });
    console.log(myResponse);
    getThat();
  };

  const getThat = async () => {
    let myResponse = await axios.get("user_list/");
    console.log(myResponse, "get request");
    setlist(myResponse.data.data);
  };

  function signCheck() {
    if (logged.logged === false) {
      window.location.replace("/");
    }
  }

  function printThat() {
    console.log("change in the air usr");
  }

  useEffect(() => {
    console.log("made it to profile");
    signCheck();
    getThat();
  }, []);

  return (
    <>
      <Form
        className="d-flex position-absolute top-50 start-50 translate-middle"
        style={{ maxHeight: "75px" }}
      >
        <Form.Control
          type="text"
          placeholder="List Name"
          className="me-2"
          aria-label="usr"
          onChange={(event) => settext(event.target.value)}
        />
        <Button onClick={doThat} className="mx-3 px-5" variant="outline-success">
          Create List
        </Button>
      </Form>
      <Button
        onClick={() => {
          console.log(list);
        }}
      />

      {list
        ? list.map((ele) => {
            return (
              <div style={{ top: 500, right: 300 }}>
                <p>{ele.fields.name}</p>
              </div>
            );
          })
        : null}
    </>
  );
}
export default Profile;
