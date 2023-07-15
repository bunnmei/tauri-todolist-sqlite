import { ChangeEvent, FormEvent, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { type } from "os";

function App() {
    const [inputValue, setInputValue] = useState("")
    const [todos, setTodos] = useState<Todo[]>([])

    type Todo = {
        inputValue: string;
        id: number;
        checked: boolean;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>  {
        setInputValue(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()

        const newTodo: Todo = {
            inputValue,
            id: todos.length,
            checked: false
        }

        setTodos([newTodo, ...todos])
        setInputValue("")
    }

    const handleEdit = (id: number, inputValue: string) => {
        const newTodos = todos.map((todo) => {
            if(todo.id === id){
                todo.inputValue = inputValue
            }
            return todo
        })

        setTodos(newTodos)
    }

    const handleChecked = (id: number, checked: boolean) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.checked = !checked
            }

            return todo
        })

        setTodos(newTodos)
    }

    const handleDelete = (id: number) => {
        const newTodos = todos.filter((todo) => todo.id !== id)
        setTodos(newTodos)
    }

    return (
        <div className="container">
            <div>
                <h2>ToDo-List Tauri+React+TS</h2>
                <form onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <input 
                        type="text" 
                        onChange={(e) => {
                            handleChange(e)
                        }} 
                        className="inputText" 
                        value={inputValue}
                     />
                    <input type="submit" value="作成" className="submitButton" />
                </form>
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <input
                                type="text" 
                                onChange={(e) => {handleEdit(todo.id, e.target.value)}}
                                className="inputText"
                                value={todo.inputValue}
                                disabled = {todo.checked}
                            />
                            <input
                                type="checkbox" 
                                onChange={(e) => {handleChecked(todo.id, todo.checked)}}
                            />

                            <button onClick={ ()=>{handleDelete(todo.id)}}>
                                削除
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default App;


// const [greetMsg, setGreetMsg] = useState("");
// const [name, setName] = useState("");

// async function greet() {
//   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//   setGreetMsg(await invoke("greet", { name }));
// }

// return (
//   <div className="container">
//     <h1>Welcome to Tauri!</h1>

//     <div className="row">
//       <a href="https://vitejs.dev" target="_blank">
//         <img src="/vite.svg" className="logo vite" alt="Vite logo" />
//       </a>
//       <a href="https://tauri.app" target="_blank">
//         <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
//       </a>
//       <a href="https://reactjs.org" target="_blank">
//         <img src={reactLogo} className="logo react" alt="React logo" />
//       </a>
//     </div>

//     <p>Click on the Tauri, Vite, and React logos to learn more.</p>

//     <form
//       className="row"
//       onSubmit={(e) => {
//         e.preventDefault();
//         greet();
//       }}
//     >
//       <input
//         id="greet-input"
//         onChange={(e) => setName(e.currentTarget.value)}
//         placeholder="Enter a name..."
//       />
//       <button type="submit">Greet</button>
//     </form>

//     <p>{greetMsg}</p>
//   </div>
// );