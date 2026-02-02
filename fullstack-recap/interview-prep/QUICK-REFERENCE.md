# QUICK REFERENCE - Print This Out! 📄

**For last-minute review and during interview (if notes allowed)**

---

## JAVASCRIPT ESSENTIALS

### Array Methods
```javascript
// Transform
arr.map(x => x * 2)                    // [1,2,3] → [2,4,6]
arr.filter(x => x > 2)                 // [1,2,3] → [3]
arr.reduce((acc, x) => acc + x, 0)     // [1,2,3] → 6

// Search
arr.find(x => x > 2)                   // First match: 3
arr.findIndex(x => x > 2)              // Index: 2
arr.some(x => x > 2)                   // Boolean: true
arr.every(x => x > 0)                  // Boolean: true

// Modify
arr.push(4)                            // Add to end
arr.pop()                              // Remove from end
arr.unshift(0)                         // Add to start
arr.shift()                            // Remove from start
arr.splice(1, 1)                       // Remove at index
arr.slice(1, 3)                        // Copy portion
```

### Promises & Async
```javascript
// Promise
new Promise((resolve, reject) => {
  if (success) resolve(data);
  else reject(error);
});

// Async/Await
try {
  const result = await asyncFunction();
} catch (error) {
  console.error(error);
}

// Promise.all
const [r1, r2] = await Promise.all([p1, p2]);
```

### Common Patterns
```javascript
// Debounce
const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

// Throttle
const throttle = (fn, ms) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, ms);
    }
  };
};

// Deep clone (simple)
JSON.parse(JSON.stringify(obj))

// Remove duplicates
[...new Set(array)]

// Flatten array
arr.flat(Infinity)
```

---

## REACT ESSENTIALS

### Hooks
```javascript
// useState
const [state, setState] = useState(initialValue);
const [state, setState] = useState(() => expensiveInit());

// useEffect
useEffect(() => {
  // Run after render
  return () => {
    // Cleanup
  };
}, [dependencies]);

// useCallback (memoize function)
const memoFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// useMemo (memoize value)
const memoValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useRef
const ref = useRef(initialValue);
ref.current = newValue; // Doesn't trigger re-render

// useContext
const value = useContext(MyContext);
```

### Custom Hook Template
```javascript
function useCustomHook(param) {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Async logic
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetch(param);
        setState(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [param]);

  return { state, loading, error };
}
```

### Form Handling
```javascript
// Controlled input
const [form, setForm] = useState({ email: '', password: '' });

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Validate and submit
};

// JSX
<form onSubmit={handleSubmit}>
  <input name="email" value={form.email} onChange={handleChange} />
  <input name="password" type="password" value={form.password} onChange={handleChange} />
  <button type="submit">Submit</button>
</form>
```

### Common Patterns
```javascript
// Conditional rendering
{isLoading && <Spinner />}
{error && <Error message={error} />}
{data && <Display data={data} />}

// List rendering
{items.map(item => <Item key={item.id} {...item} />)}

// Event handling
<button onClick={() => handleClick(id)}>Click</button>
```

---

## NODE.JS/EXPRESS ESSENTIALS

### Basic Setup
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get('/api/resource', handler);
app.post('/api/resource', handler);
app.put('/api/resource/:id', handler);
app.delete('/api/resource/:id', handler);

// Error handler (LAST)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

// Start server
app.listen(3000, () => console.log('Server on 3000'));
```

### Middleware Pattern
```javascript
// Basic middleware
const middleware = (req, res, next) => {
  // Do something
  next(); // MUST call next()
};

// Async handler
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/route', asyncHandler(async (req, res) => {
  const data = await Model.find();
  res.json(data);
}));
```

### Request/Response
```javascript
// Request
req.params.id          // /users/:id
req.query.page         // /users?page=1
req.body               // POST/PUT body
req.headers            // Headers

// Response
res.json({ data })              // JSON response
res.status(201).json({ data }) // With status
res.send('text')                // Text response
res.sendFile(path)              // File response
```

### JWT Auth
```javascript
const jwt = require('jsonwebtoken');

// Generate token
const token = jwt.sign(
  { userId: user._id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Verify middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Use on protected routes
app.get('/protected', authMiddleware, handler);
```

### Password Hashing
```javascript
const bcrypt = require('bcrypt');

// Hash
const hash = await bcrypt.hash(password, 10);

// Verify
const isValid = await bcrypt.compare(password, hash);
```

---

## MONGODB/MONGOOSE ESSENTIALS

### Schema Definition
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false  // Don't return by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
}, { timestamps: true }); // Adds createdAt, updatedAt

const User = mongoose.model('User', userSchema);
```

### CRUD Operations
```javascript
// Create
const user = await User.create({ email, password });
const user = new User({ email, password });
await user.save();

// Read
const users = await User.find();
const user = await User.findById(id);
const user = await User.findOne({ email });

// Update
const user = await User.findByIdAndUpdate(
  id,
  { name: 'New Name' },
  { new: true, runValidators: true }
);

// Delete
await User.findByIdAndDelete(id);
await User.deleteMany({ role: 'guest' });
```

### Query Modifiers
```javascript
// Filtering
User.find({ age: { $gte: 18, $lte: 65 } })
User.find({ name: { $regex: /john/i } })
User.find({ role: { $in: ['admin', 'moderator'] } })

// Sorting
User.find().sort({ createdAt: -1 })  // Descending
User.find().sort('name')              // Ascending

// Limiting
User.find().limit(10)
User.find().skip(20).limit(10)

// Selecting fields
User.find().select('name email')      // Include
User.find().select('-password')       // Exclude

// Populate
User.findById(id).populate('profile')
User.find().populate('posts', 'title content')
```

### Pagination
```javascript
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const users = await User.find()
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });

const total = await User.countDocuments();

res.json({
  users,
  currentPage: page,
  totalPages: Math.ceil(total / limit),
  totalUsers: total
});
```

### Pre/Post Hooks
```javascript
// Before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// After find
userSchema.post('find', function(docs) {
  console.log(`Found ${docs.length} users`);
});
```

---

## VALIDATION PATTERNS

### Backend (Express)
```javascript
const validateUser = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) errors.push('Email required');
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Invalid email');
  if (!password) errors.push('Password required');
  if (password && password.length < 6) errors.push('Password min 6 chars');

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
```

### Frontend (React)
```javascript
const validate = (form) => {
  const errors = {};

  if (!form.email) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Invalid email format';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};
```

---

## ERROR HANDLING

### Try-Catch Pattern
```javascript
// Backend
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Frontend
const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    setData(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

## HTTP STATUS CODES

```
200 OK                  - Success
201 Created             - Resource created
204 No Content          - Success, no response body

400 Bad Request         - Validation error
401 Unauthorized        - No/invalid authentication
403 Forbidden           - Authenticated but no permission
404 Not Found           - Resource doesn't exist
409 Conflict            - Duplicate resource

500 Internal Server Error - Server error
```

---

## ENVIRONMENT VARIABLES

```javascript
// .env file
PORT=3000
MONGODB_URI=mongodb://localhost:27017/dbname
JWT_SECRET=your-secret-key-here
NODE_ENV=development

// Usage
require('dotenv').config();
const port = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI;
const secret = process.env.JWT_SECRET;
```

---

## CORS SETUP

```javascript
const cors = require('cors');

// Simple
app.use(cors());

// Configured
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

## COMMON REGEX

```javascript
// Email
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Password (min 8, 1 uppercase, 1 lowercase, 1 number)
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

// Phone (US)
/^\d{3}-\d{3}-\d{4}$/

// URL
/^https?:\/\/.+/
```

---

## TESTING CHECKLIST

### Before Submitting Code
- [ ] All features work
- [ ] Error handling added
- [ ] Input validation (both ends)
- [ ] No console.logs
- [ ] Environment variables used
- [ ] Code is formatted
- [ ] Comments added
- [ ] Edge cases tested
- [ ] Status codes correct
- [ ] No security issues

---

## INTERVIEW PHRASES

### When Starting
- "Let me make sure I understand the requirements..."
- "I'll start with [backend/frontend/schema] first because..."
- "I'm thinking of structuring this as..."

### When Coding
- "I'm creating a middleware to..."
- "I'll use useState here to..."
- "Let me add error handling for..."
- "I should validate this input because..."

### When Using AI
- "I'll use AI to generate the boilerplate for..."
- "Let me have AI help with [complex part]..."
- "I need to review this AI code to ensure..."
- "I'm going to enhance this by adding..."

### When Stuck
- "I'd normally reference the documentation for..."
- "Can I use AI assistance for this part?"
- "Let me think through this step by step..."
- "I'd search for [specific thing] in production..."

---

**Print this and keep it handy during practice and interview!** 📋
