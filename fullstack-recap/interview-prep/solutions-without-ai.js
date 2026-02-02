/**
 * SOLUTIONS - Practice these until you can write them from memory
 * These are the answers to without-ai-practice.js
 * Try solving them yourself first before looking at solutions!
 */

// ============================================
// SECTION 1: JAVASCRIPT FUNDAMENTALS - SOLUTIONS
// ============================================

/**
 * Solution 1: Debounce
 */
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * Solution 2: Deep Clone
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  const clonedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}

/**
 * Solution 3: Flatten Array
 */
function flattenArray(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
}

// Alternative with flat()
function flattenArrayAlt(arr) {
  return arr.flat(Infinity);
}

/**
 * Solution 4: Promise.all
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completedCount = 0;
    
    if (promises.length === 0) {
      resolve(results);
      return;
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(result => {
          results[index] = result;
          completedCount++;
          
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

/**
 * Solution 5: Event Emitter
 */
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

/**
 * Solution 6: Currying
 */
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

/**
 * Solution 7: Balanced Parentheses
 */
function isBalanced(str) {
  const stack = [];
  const pairs = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  
  for (let char of str) {
    if (pairs[char]) {
      stack.push(char);
    } else if (Object.values(pairs).includes(char)) {
      if (stack.length === 0) return false;
      const last = stack.pop();
      if (pairs[last] !== char) return false;
    }
  }
  
  return stack.length === 0;
}

/**
 * Solution 8: Array Chunk
 */
function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// ============================================
// SECTION 2: REACT HOOKS - SOLUTIONS
// ============================================

/**
 * Solution 9: useFetch Hook
 */
function useFetch(url) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

/**
 * Solution 10: useLocalStorage Hook
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Solution 11: useDebounce Hook
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Solution 12: Counter Component
 */
const Counter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};

/**
 * Solution 13: Todo List Component
 */
const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Solution 14: Login Form with Validation
 */
const LoginForm = () => {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      // Submit to API
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      
      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      </div>
      
      <button type="submit">Login</button>
    </form>
  );
};

// ============================================
// SECTION 3: NODE.JS/EXPRESS - SOLUTIONS
// ============================================

/**
 * Solution 15: Basic Express Server
 */
const setupExpressServer = () => {
  const express = require('express');
  const app = express();
  
  // Middleware
  app.use(express.json());
  
  // Routes
  app.get('/api/users', (req, res) => {
    res.json({ message: 'Get all users' });
  });
  
  app.post('/api/users', (req, res) => {
    res.json({ message: 'Create user', data: req.body });
  });
  
  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

/**
 * Solution 16: Logging Middleware
 */
const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
};

/**
 * Solution 17: Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Solution 18: JWT Auth Middleware
 */
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Solution 19: Validation Middleware
 */
const validateUser = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];
  
  if (!email) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    }
  }
  
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  next();
};

// ============================================
// SECTION 4: MONGODB/MONGOOSE - SOLUTIONS
// ============================================

/**
 * Solution 20: User Schema
 */
const createUserSchema = () => {
  const mongoose = require('mongoose');
  
  const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false // Don't return password by default
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  return mongoose.model('User', userSchema);
};

/**
 * Solution 21: Query by Age Range
 */
const findUsersByAge = async (minAge, maxAge) => {
  const User = require('./models/User');
  
  const users = await User.find({
    age: { $gte: minAge, $lte: maxAge }
  });
  
  return users;
};

/**
 * Solution 22: Pagination
 */
const paginateUsers = async (page = 1, limit = 10) => {
  const User = require('./models/User');
  
  const skip = (page - 1) * limit;
  
  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  
  const total = await User.countDocuments();
  
  return {
    users,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalUsers: total
  };
};

/**
 * Solution 23: Post Schema with Reference
 */
const createPostSchema = () => {
  const mongoose = require('mongoose');
  
  const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  return mongoose.model('Post', postSchema);
};

/**
 * Solution 24: Aggregation - Count Posts by User
 */
const countPostsByUser = async () => {
  const Post = require('./models/Post');
  
  const result = await Post.aggregate([
    {
      $group: {
        _id: '$author',
        postCount: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'userInfo'
      }
    },
    {
      $sort: { postCount: -1 }
    }
  ]);
  
  return result;
};

// ============================================
// SECTION 5: ALGORITHMS - SOLUTIONS
// ============================================

/**
 * Solution 25: Two Sum
 */
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

/**
 * Solution 26: Valid Anagram
 */
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  
  const count = {};
  
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  
  return true;
}

/**
 * Solution 27: Reverse String
 */
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Alternative in-place
function reverseStringInPlace(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  
  return arr;
}

/**
 * Solution 28: Find Maximum
 */
function findMax(arr) {
  if (arr.length === 0) return undefined;
  
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

/**
 * Solution 29: Remove Duplicates from Sorted Array
 */
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  
  return i + 1;
}

/**
 * Solution 30: FizzBuzz
 */
function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      console.log('FizzBuzz');
    } else if (i % 3 === 0) {
      console.log('Fizz');
    } else if (i % 5 === 0) {
      console.log('Buzz');
    } else {
      console.log(i);
    }
  }
}

// ============================================
// EXPORT ALL SOLUTIONS
// ============================================

module.exports = {
  debounce,
  deepClone,
  flattenArray,
  promiseAll,
  EventEmitter,
  curry,
  isBalanced,
  chunk,
  useFetch,
  useLocalStorage,
  useDebounce,
  Counter,
  TodoList,
  LoginForm,
  loggingMiddleware,
  errorHandler,
  authMiddleware,
  validateUser,
  createUserSchema,
  findUsersByAge,
  paginateUsers,
  createPostSchema,
  countPostsByUser,
  twoSum,
  isAnagram,
  reverseString,
  findMax,
  removeDuplicates,
  fizzBuzz
};
