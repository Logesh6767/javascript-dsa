/**
 * DAY 17: useContext, useReducer, useRef
 * 
 * Topics:
 * - useContext for global state
 * - Context Provider pattern
 * - useReducer for complex state logic
 * - useRef for DOM access and persistent values
 * - When to use each hook
 */

import { useState, useContext, useReducer, useRef, createContext, useEffect } from 'react';

// ============================================
// 1. useContext BASICS
// ============================================

// Create context
const ThemeContext = createContext();

// Provider component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Consumer components
const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
      }}
    >
      Toggle Theme (Current: {theme})
    </button>
  );
};

const ThemedCard = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme === 'light' ? '#f0f0f0' : '#222',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '20px',
      }}
    >
      <h3>Themed Card</h3>
      <p>This card adapts to the current theme!</p>
    </div>
  );
};

// Usage example
// <ThemeProvider>
//   <ThemedButton />
//   <ThemedCard />
// </ThemeProvider>

// ============================================
// 2. MULTIPLE CONTEXTS
// ============================================

// User context
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Language context
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: { welcome: 'Welcome', logout: 'Logout' },
    es: { welcome: 'Bienvenido', logout: 'Cerrar sesión' },
    fr: { welcome: 'Bienvenue', logout: 'Se déconnecter' },
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Component using multiple contexts
const Header = () => {
  const { user, logout } = useContext(UserContext);
  const { t, language, setLanguage } = useContext(LanguageContext);

  return (
    <header>
      <h1>{t('welcome')}, {user?.name}!</h1>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
      <button onClick={logout}>{t('logout')}</button>
    </header>
  );
};

// ============================================
// 3. useReducer BASICS
// ============================================

// Simple counter with reducer
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      return state;
  }
};

const CounterWithReducer = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'SET', payload: 10 })}>Set to 10</button>
    </div>
  );
};

// ============================================
// 4. COMPLEX STATE WITH useReducer
// ============================================

// Todo app with reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    default:
      return state;
  }
};

const TodoAppWithReducer = () => {
  const initialState = {
    todos: [],
    filter: 'all', // 'all', 'active', 'completed'
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState('');

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
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

      <div>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}>
          All
        </button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}>
          Active
        </button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}>
          Completed
        </button>
        <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
          Clear Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============================================
// 5. useRef BASICS
// ============================================

// DOM access
const FocusInput = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Click button to focus" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
};

// Storing previous value
const PreviousValue = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// Storing mutable value (doesn't trigger re-render)
const RenderCount = () => {
  const [input, setInput] = useState('');
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <p>Render count: {renderCount.current}</p>
    </div>
  );
};

// Video player controls
const VideoPlayer = () => {
  const videoRef = useRef(null);

  const play = () => videoRef.current.play();
  const pause = () => videoRef.current.pause();
  const restart = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  return (
    <div>
      <video ref={videoRef} width="400" src="video.mp4" />
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
};

// ============================================
// 6. COMBINING HOOKS
// ============================================

// useReducer + useContext for global state management
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cart: state, dispatch, total }}>
      {children}
    </CartContext.Provider>
  );
};

const CartItem = ({ item }) => {
  const { dispatch } = useContext(CartContext);

  return (
    <div>
      <span>{item.name} - ${item.price} x {item.quantity}</span>
      <button
        onClick={() =>
          dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { id: item.id, quantity: item.quantity + 1 },
          })
        }
      >
        +
      </button>
      <button
        onClick={() =>
          dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) },
          })
        }
      >
        -
      </button>
      <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
        Remove
      </button>
    </div>
  );
};

const Cart = () => {
  const { cart, total, dispatch } = useContext(CartContext);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
    </div>
  );
};

// ============================================
// PRACTICE EXERCISES
// ============================================

/**
 * TODO 1: Create a NotificationContext
 * - Store array of notifications: [{ id, type, message }]
 * - Types: 'success', 'error', 'warning', 'info'
 * - Actions: add notification, remove notification, clear all
 * - Auto-dismiss after 3 seconds
 * - Create NotificationList component to display them
 */

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  // TODO: Implement this
  return <NotificationContext.Provider value={{}}>{children}</NotificationContext.Provider>;
};

/**
 * TODO 2: Create a FormReducer
 * - State: fields object, errors object, isSubmitting boolean
 * - Actions: SET_FIELD, SET_ERROR, CLEAR_ERRORS, SUBMIT_START, SUBMIT_SUCCESS, SUBMIT_ERROR
 * - Create a form component using this reducer
 * - Handle validation and submission
 */

const formReducer = (state, action) => {
  // TODO: Implement this
  return state;
};

/**
 * TODO 3: Create a ChatApplication with useReducer + useContext
 * - State: messages array, currentUser, typing status
 * - Actions: SEND_MESSAGE, DELETE_MESSAGE, SET_TYPING, CLEAR_TYPING
 * - Components: ChatProvider, MessageList, MessageInput, TypingIndicator
 * - Store messages in localStorage
 */

const ChatContext = createContext();

const chatReducer = (state, action) => {
  // TODO: Implement this
  return state;
};

/**
 * TODO 4: Create an AutosaveEditor with useRef
 * - Textarea for content
 * - Auto-save to localStorage every 2 seconds if content changed
 * - Use useRef to track if content has changed (don't cause re-renders)
 * - Show "Saved" or "Saving..." indicator
 * - Load content from localStorage on mount
 */

const AutosaveEditor = () => {
  // TODO: Implement this
  return <div>Autosave Editor</div>;
};

/**
 * TODO 5: Create a DashboardLayout with nested contexts
 * - AuthContext: user, login, logout
 * - SettingsContext: sidebar collapsed, theme, language
 * - NotificationContext: notifications array
 * - Create Sidebar, Header, and MainContent components
 * - Each should consume relevant contexts
 * - Implement persistence with localStorage
 */

const AuthContext = createContext();
const SettingsContext = createContext();

const DashboardProvider = ({ children }) => {
  // TODO: Implement this
  return <div>Dashboard</div>;
};

// Export components
export {
  ThemeProvider,
  ThemeContext,
  ThemedButton,
  ThemedCard,
  UserProvider,
  UserContext,
  LanguageProvider,
  LanguageContext,
  Header,
  CounterWithReducer,
  TodoAppWithReducer,
  FocusInput,
  PreviousValue,
  RenderCount,
  VideoPlayer,
  CartProvider,
  CartContext,
  Cart,
  NotificationProvider,
  AutosaveEditor,
  DashboardProvider,
};
