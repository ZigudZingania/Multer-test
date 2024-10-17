import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pathName, setPathName] = useState("");
  const fileInputRef = useRef(null);

  async function handleSubmit() {
    const files = fileInputRef.current.files;
    if (files.length > 0) {
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const response = await axios.post(
        "https://multer-test.vercel.app/send",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            name: `${pathName}-${Date.now()}`,
          },
        }
      );
      console.log(response);
    }
  }

  async function connectServer() {
    let response = await axios.get("https://multer-test.vercel.app/");
    console.log(response);
  }

  useEffect(() => {
    connectServer();
  }, []);

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setPathName(e.target.value);
        }}
      ></input>
      <input type="file" accept="image/*" ref={fileInputRef} multiple></input>
      <button onClick={handleSubmit}>submit</button>
    </>
  );
}

export default App;
