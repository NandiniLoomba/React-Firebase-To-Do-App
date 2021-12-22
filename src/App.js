import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FormControl, Input, InputLabel } from "@mui/material";
import db from "./firebaseConfig";
import {collection, onSnapshot, setDoc, doc, serverTimestamp, query, orderBy} from "@firebase/firestore";
import ToDo from './ToDo'


function App() {

  const [todo, setTodo] = useState([]); // todo is storing all the tasks.
  const [input, setInput] = useState("");
  const dbRef = collection(db, "todos");
  const q = query(dbRef, orderBy("timestamp", "desc"));
  
  // We have used useEffect so that the website is loaded at once
  // In useEffect we have used onSnapshot which is the most important function
  // why?? everytime we either add or delete or update a task
  // it calls setTodo function.
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTodo(
        snapshot.docs.map((doc) => ({ id: doc.id, work: doc.data().task }))
      );
    });
  }, []);

  const appendTodo = (event) => {
    
    event.preventDefault(); //this will prevent the page from loading after every append.
    
    //we have taken a timestamp so that we can store the tasks in the most recent manner
    setDoc(doc(dbRef), {
      task: input,
      timestamp: serverTimestamp(), 
    });
    setInput("");
  };

  return (

    <div className="App" style={{ textAlign: "center" }}>
      <h1>What's the Plan for Today?</h1>
      
      {/* We are using forms instead of normal input and button because if we use forms 
          then we can directly submit the input by pressing enter without clicking on the button. */}

      <form>
        <FormControl>
          <InputLabel>Add a task to the list.</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <Button
          disabled={!input} // This is done to avoid adding empty tasks.
          type="submit" onClick={appendTodo} variant="contained" > Add ToDo 
        </Button>

      </form>
      

      {/* Adding all the tasks in the table with the help of component --> ToDo. */}
      <ToDo todo={todo}></ToDo>
 
    </div>
  );
}

export default App;
