import { useState, useCallback, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
function App() {
  const [length, setlength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //useRef hook
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (specialCharAllowed) str += "~!@#$%^&*_-|?><";
    for (let i = 1; i <= length; i++) {
      const ch = Math.floor(Math.random() * str.length + 1);
      pass += str[ch];
    }
    setPassword(pass);
  }, [length, numAllowed, specialCharAllowed,setPassword]);
  const copyPasswordToClipBoard=useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    toast("Copied to ClipBoard");
  },[password])
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, specialCharAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-xl mx-auto shadow-lg rounded-lg px-4 pb-7 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center text-lg my-3">
          Password Generator
        </h1>
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipBoard}
          >
            <ToastContainer/>
            Copy
          </button>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            className="cursor-pointer"
            onChange={(e) => setlength(e.target.value)}
          />
          <label>Length : ({length})</label>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label>Numbers</label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterAllowed"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label>Characters</label>
            <input
              type="checkbox"
              defaultChecked={specialCharAllowed}
              id="specialCharAllowed"
              onChange={() => setSpecialCharAllowed((prev) => !prev)}
            />
            <label>SpecialCharacters</label>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
