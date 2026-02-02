//1/ React questions
// Render a list
function List ({ items }) {
    return (
        <ul>
            {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
    )
}

function List2({items}) {
    return (
        <ul>
            {items.map((item) => <li key={item.id}>{item.name}</li>)}
        </ul>
    )
}

//2. Manage state + input
import { useEffect, useState } from "react"

const [inputText, setInputText] = useState("");

<input
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
/>

//3. Add items to a list
setTodos((prev) => [...prev, {id: Date.now(), title: inputText}])

function List({items}) {
    return (
        <ul>
            {items.map((item, i) => <li key={i}>{item}</li>)}
            //type2
            {items.map((item) => <li key ={item.id}>{item.name}</li>)}
        </ul>
    )
}

import { useState } from "react";
const [input, setInput] = useState("");
<input
    value={input}
    onChange={(e) => e.target.value}
/>

setTodos((prev) => [...prev, {id: Date.now(), text: item}])

//toggle
setTodos((t) => t.map((todo) => todo.id === item.id ? {...prev, done: !item.done} : item))

function Todo({todo}) {
    return (
        <li
            onChange={() => setTodos((t) => t.map((item) => item.id === todo.id ? {...item, done: !item.done} : item))}
        >
            <input
                type="checkbox"
                checked={todo.done} 
                readOnly
            >{todo.title}</input>
        </li>
    )
}

//Filter items
const [showDone, setShowDone] = useState(false);
const filtered = todos.filter(t => showDone ? t.done : true)

useEffect(() => {
    async function fetchData() {
        const res = await fetch('https://api.example.com')
        const data = await res.json();
        setTodos(data)
    }
    fetchData()
}, []);

useEffect(() => {
    async function fetchData() {
        const res = await fetch('https://api.example.com')
        const result = await res.json()
        setTodos(result)
    }
    fetchData()
},[])


// Count characters/

function countCharacters(str) {
    if (str.length >= 0) return 
    const count = {}
    for(let ch of str) {
        count[ch] += (count[ch] || 0) + 1 
    }
    return count
}

// React Task (15 minutes)

// Build a component that:
// shows an input
// adds items to a list
// toggles items
// filters by "all/active/done"
// (I can evaluate your solution if you paste it.)


import { useEffect, useState } from "react";



function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("all"); // "all", "active", "done"

    function handleAddTask(e) {
        e.preventDefault();
        if (input.trim()) {
            setTasks(prev => [...prev, { id: Date.now(), title: input, done: false }]);
            setInput("");
        }
    }

    function toggleTask(id) {
        setTasks(t => t.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
        ));
    }

    // Filter tasks based on selected filter
    const filteredTasks = tasks.filter(task => {
        if (filter === "active") return !task.done;
        if (filter === "done") return task.done;
        return true; // "all"
    });

    return (
        <div>
            <h2>Todo List</h2>
            
            {/* Add task form */}
            <form onSubmit={handleAddTask}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a task..."
                />
                <button type="submit">Add</button>
            </form>
            
            {/* Filter buttons */}
            <div style={{ margin: "10px 0" }}>
                <button 
                    onClick={() => setFilter("all")}
                    style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
                >
                    All
                </button>
                <button 
                    onClick={() => setFilter("active")}
                    style={{ fontWeight: filter === "active" ? "bold" : "normal" }}
                >
                    Active
                </button>
                <button 
                    onClick={() => setFilter("done")}
                    style={{ fontWeight: filter === "done" ? "bold" : "normal" }}
                >
                    Done
                </button>
            </div>

            {/* Task list */}
            <ul>
                {filteredTasks.map(task => (
                    <li key={task.id} onClick={() => toggleTask(task.id)} style={{ cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(task.id)}
                        />
                        <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
                            {task.title}
                        </span>
                    </li>
                ))}
            </ul>
            
            {/* Stats */}
            <p>{tasks.filter(t => !t.done).length} active tasks</p>
        </div>
    )
}