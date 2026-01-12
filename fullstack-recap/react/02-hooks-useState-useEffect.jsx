/**
 * DAY 16: useState & useEffect Hooks
 * 
 * Topics:
 * - useState hook fundamentals
 * - Multiple state variables
 * - State with objects and arrays
 * - useEffect hook basics
 * - Effect dependencies
 * - Cleanup functions
 */

import { useState, useEffect } from 'react';

// ============================================
// 1. useState BASICS
// ============================================

// Simple counter
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};

// Toggle state
const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <p>The light is {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={() => setIsOn(!isOn)}>Toggle</button>
      <button onClick={() => setIsOn((prev) => !prev)}>Toggle (functional)</button>
    </div>
  );
};

// Input state
const InputExample = () => {
  const [text, setText] = useState('');

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
      <p>Length: {text.length}</p>
    </div>
  );
};

// ============================================
// 2. MULTIPLE STATE VARIABLES
// ============================================

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    console.log({ email, password, rememberMe });
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember me
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

// ============================================
// 3. STATE WITH OBJECTS
// ============================================

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: '',
  });

  // Method 1: Update individual fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Method 2: Update specific field
  const updateName = (name) => {
    setUser((prev) => ({ ...prev, name }));
  };

  return (
    <div>
      <input
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="age"
        type="number"
        value={user.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

// ============================================
// 4. STATE WITH ARRAYS
// ============================================

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Add todo
  const addTodo = () => {
    if (!input.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInput('');
  };

  // Remove todo
  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Toggle todo
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Clear completed
  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        placeholder="Add todo..."
      />
      <button onClick={addTodo}>Add</button>
      <button onClick={clearCompleted}>Clear Completed</button>
      
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
      <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
    </div>
  );
};

// ============================================
// 5. useEffect BASICS
// ============================================

// Run once on mount
const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Component mounted!');
    
    // Simulate API call
    setTimeout(() => {
      setData({ name: 'John', age: 30 });
      setLoading(false);
    }, 2000);
  }, []); // Empty dependency array = run once

  if (loading) return <p>Loading...</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

// Run on every render (avoid this!)
const EveryRender = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Runs on every render!');
  }); // No dependency array

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
};

// Run when specific value changes
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log('Searching for:', searchTerm);
    
    if (!searchTerm) {
      setResults([]);
      return;
    }

    // Simulate search
    const timer = setTimeout(() => {
      setResults([`Result 1 for ${searchTerm}`, `Result 2 for ${searchTerm}`]);
    }, 500);

    // Cleanup function
    return () => clearTimeout(timer);
  }, [searchTerm]); // Run when searchTerm changes

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

// ============================================
// 6. CLEANUP FUNCTIONS
// ============================================

// Timer cleanup
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup: clear interval when component unmounts or isRunning changes
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
};

// Event listener cleanup
const WindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup: remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
};

// ============================================
// 7. COMMON PATTERNS
// ============================================

// Fetch data pattern
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

// Local storage sync pattern
const PersistentCounter = () => {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('count');
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// ============================================
// PRACTICE EXERCISES
// ============================================

/**
 * TODO 1: Create a ColorPicker component
 * - State: red, green, blue (0-255)
 * - Three range inputs for RGB values
 * - Display color preview div with current color
 * - Show hex value of the color
 */

const ColorPicker = () => {
  // TODO: Implement this
  return <div>Color Picker</div>;
};

/**
 * TODO 2: Create a ShoppingCart component
 * - State: items array [{ id, name, price, quantity }]
 * - Add item functionality
 * - Remove item functionality
 * - Update quantity (+ / -)
 * - Display total price
 * - Clear cart button
 */

const ShoppingCart = () => {
  // TODO: Implement this
  return <div>Shopping Cart</div>;
};

/**
 * TODO 3: Create a LiveSearch component
 * - Fetch users from: https://jsonplaceholder.typicode.com/users
 * - Search input to filter by name
 * - Display filtered results
 * - Show loading state
 * - Debounce search (wait 300ms after user stops typing)
 */

const LiveSearch = () => {
  // TODO: Implement this
  return <div>Live Search</div>;
};

/**
 * TODO 4: Create a CountdownTimer component
 * - Accept initial seconds as prop
 * - Start/Pause/Reset buttons
 * - Display minutes:seconds format
 * - Show alert when reaches 0
 * - Clean up interval on unmount
 */

const CountdownTimer = ({ initialSeconds }) => {
  // TODO: Implement this
  return <div>Countdown Timer</div>;
};

/**
 * TODO 5: Create a FormWithValidation component
 * - Fields: username, email, password, confirmPassword
 * - Real-time validation for each field
 * - Show error messages
 * - Disable submit if validation fails
 * - Store form data in localStorage
 * - Retrieve from localStorage on mount
 */

const FormWithValidation = () => {
  // TODO: Implement this
  return <div>Form With Validation</div>;
};

// Export components
export {
  Counter,
  Toggle,
  InputExample,
  LoginForm,
  UserProfile,
  TodoApp,
  DataFetcher,
  SearchComponent,
  Timer,
  WindowSize,
  UserList,
  PersistentCounter,
  ColorPicker,
  ShoppingCart,
  LiveSearch,
  CountdownTimer,
  FormWithValidation,
};
