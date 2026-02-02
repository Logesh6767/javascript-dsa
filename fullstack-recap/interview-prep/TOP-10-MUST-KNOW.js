/**
 * TOP 10 MUST-KNOW PROBLEMS FOR 48-HOUR PREP
 * 
 * If you only have time for 10 problems, master these.
 * These cover 80% of what you'll be asked in a MERN interview.
 * 
 * Time allocation: 2 hours total
 * Practice each 3 times until you can write without looking
 */

// ==========================================
// 1. DEBOUNCE (15 min)
// ==========================================
// Why: Used in search inputs, resize handlers
// Difficulty: Medium
// When to use: Rate limiting API calls, performance optimization

function debounce(func, delay) {
  // Store timeout ID in closure - persists across function calls
  let timeoutId;
  
  // Return a new function that wraps the original
  return function(...args) {
    // ...args captures all arguments passed to function
    
    // Cancel any previous scheduled call (this is key!)
    clearTimeout(timeoutId);
    
    // Schedule NEW call after delay
    timeoutId = setTimeout(() => {
      // Call original function with arguments and correct 'this' context
      func.apply(this, args);
    }, delay);
    // Result: only the LAST call executes (previous ones get cancelled)
  };
}

/* HOW IT WORKS:
   User types 'h' → schedules search('h') in 300ms
   User types 'e' → CANCELS previous, schedules search('he') in 300ms
   User types 'l' → CANCELS previous, schedules search('hel') in 300ms
   User types 'l' → CANCELS previous, schedules search('hell') in 300ms
   User types 'o' → CANCELS previous, schedules search('hello') in 300ms
   300ms passes → search('hello') EXECUTES
   Result: 1 API call instead of 5!
*/

// Test
// const search = debounce((term) => {
//   console.log('Searching for:', term);
// }, 300);

// const debounce = function(func, delay) {
//   let timeoutId;
//   return function (...args) {
//     clearTimeout(timeoutId)
//     timeoutId = setTimeout(() => {
//       func.apply(this, args)
//     }, delay)
//   }
// }

// const searchTerm = debounce((term) => {
//     console.log('Searching for:', term);
// }, 500)

// search('h')
// search('he')
// search('hello') // Only this will execute after 300ms

// ==========================================
// 2. CUSTOM HOOK - useFetch (15 min)
// ==========================================
// Why: Most common React pattern in interviews
// Difficulty: Easy-Medium
// Shows: Hooks knowledge, async handling, state management

function useFetch(url) {
  // Three pieces of state for different UI states
  const [data, setData] = React.useState(null);        // Stores fetched data
  const [loading, setLoading] = React.useState(true);  // True while fetching
  const [error, setError] = React.useState(null);      // Stores error message

  // useEffect runs after render and when 'url' changes
  React.useEffect(() => {
    // Define async function (can't make useEffect callback itself async)
    const fetchData = async () => {
      try {
        setLoading(true);    // Start loading
        setError(null);      // Clear previous errors
        
        // Make HTTP request (await pauses until response received)
        const response = await fetch(url);
        
        // fetch() doesn't throw on 404/500, must check manually
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse JSON response
        const json = await response.json();
        setData(json);       // Save data to state
      } catch (err) {
        setError(err.message);  // Save error message
      } finally {
        setLoading(false);      // Always stop loading (success or fail)
      }
    };

    // Only fetch if url exists (prevents fetching on mount if url is null)
    if (url) {
      fetchData();
    }
  }, [url]);  // Re-run effect when url changes

  // Return object so component can destructure: { data, loading, error }
  return { data, loading, error };
}

//func useFetch, para = url
  //Define States for storing data, error, loading, etc
  //Define useEffect hook
    //fetchData async func define
      //try
        //set error to null
        //set loading to true
        //call api with await promise
        //set error for failed response
        //parse json response
        //store response in the data state
      //catch
        //console.error
      //finally
        //set loading to false
    //end func
    
    //if url is not null then call the fetchData
  //close hook with dependency
  //return results in obj {data, error, loading}
//end func

/* STATE FLOW:
   Initial:  data=null, loading=true, error=null
   Fetching: data=null, loading=true, error=null
   Success:  data={...}, loading=false, error=null
   Error:    data=null, loading=false, error='error message'
*/

// ==========================================
// 3. TODO LIST COMPONENT (20 min)
// ==========================================
// Why: Tests React fundamentals - state, events, lists
// Difficulty: Easy-Medium
// Shows: CRUD operations, immutability, controlled inputs


const TodoList = () => {
  // State: array of todo objects [{id, text, completed}, ...]
  const [todos, setTodos] = React.useState([]);
  // State: current input field value (controlled input)
  const [inputValue, setInputValue] = React.useState('');

  const addTodo = () => {
    // Only add if input has content (trim removes whitespace)
    if (inputValue.trim()) {
      setTodos([
        ...todos,              // Spread existing todos (creates NEW array - immutable!)
        {
          id: Date.now(),      // Unique ID from timestamp
          text: inputValue,    // Todo text from input
          completed: false     // New todos start incomplete
        }
      ]);
      setInputValue('');       // Clear input after adding
    }
  };

  const deleteTodo = (id) => {
    // filter creates NEW array without the deleted todo
    setTodos(todos.filter(todo => todo.id !== id));
    // Keeps all todos where id doesn't match
  };

  const toggleTodo = (id) => {
    // map creates NEW array with one todo changed
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }  // Toggle this one
          : todo                                      // Keep others same
      )
    );
  };

  const handleKeyPress = (e) => {
    // Add todo when Enter key pressed
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-list">
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todos">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="empty-message">No todos yet. Add one!</p>
      )}
    </div>
  );
};

// ==========================================
// 4. EXPRESS AUTH MIDDLEWARE (10 min)
// ==========================================
//// Middleware signature: always (req, res, next)
  try {
    // Get Authorization header (format: "Bearer TOKEN")
    const authHeader = req.headers.authorization;
    
    // Check: 1) header exists? 2) starts with "Bearer "?
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'No token provided'
      });
      // 401 = Unauthorized, RETURN stops execution
    }

    // Extract token: "Bearer TOKEN" → split(' ') → ['Bearer', 'TOKEN'] → [1]
    const token = authHeader.split(' ')[1];

    // Verify token signature and expiration (throws error if invalid)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { userId: '123', email: 'user@example.com' }

    // Attach decoded user data to request (available in next handlers)
    req.user = decoded;

    // Pass control to next middleware/route (MUST call this!)
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

/* USAGE: app.get('/api/profile', authMiddleware, (req, res) => {
     console.log(req.user);  // { userId: '123', email: '...' }
   });
*/

// ==========================================
// 5. LOGIN ENDPOINT (15 min)
// ==========================================
// Why: Authentication is core to most apps
// Difficulty: Medium
// Shows: Security (bcrypt, JWT), error handling, best practices

const loginUser = async (req, res) => {
  try {
    // Extract credentials from request body
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
      // 400 = Bad Request (client error)
    }

    // Find user by email, include password (normally excluded by select:false)
    const user = await User.findOne({ email }).select('+password');

    // User not found (use generic message for security)
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
      // Don't reveal if email exists or not!
    }

    // Compare plain password with hashed password (bcrypt is async/slow by design)
    const isValidPassword = await bcrypt.compare(password, user.password);

    // Wrong password (same generic message as user-not-found)
    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token (payload, secret, options)
    const token = jwt.sign(
      {
        userId: user._id,     // Put user ID in token
        email: user.email     // Put email in token
      },
      process.env.JWT_SECRET,  // Secret from environment variable
      {
        expiresIn: '24h'       // Token valid for 24 hours
      }
    );

    // Send success response (NEVER send password!)
    res.json({
      message: 'Login successful',
      token,                   // Client saves this for future requests
      user: {
        id: user._id,
        email: user.email,
        name: user.name
        // Only send necessary user info
      }
    });
  } catch (error) {
    console.error('Login error:', error);  // Log for debugging
    res.status(500).json({
      message: 'Server error during login'
      // Don't expose error details to client
    });
  }
};

/* SECURITY:
   - Same error message for "user not found" and "wrong password"
   - Never send password in response
   - Hash passwords with bcrypt
   - Use JWT_SECRET from env
   - Token expires in 24h
*/

// ==========================================
// 6. MONGOOSE USER SCHEMA (10 min)
// ==========================================
// Why: Shows database modeling, validation, security
// Difficulty: Medium
// Shows: Mongoose features, pre-save hooks, password hashing

const userSchema = new mongoose.Schema(
  // First argument: field definitions
  {
    email: {
      type: String,                    // Data type
      required: [true, 'Email is required'],  // [boolean, error message]
      unique: true,                    // Creates unique index (prevents duplicates)
      lowercase: true,                 // Converts to lowercase automatically
      trim: true,                      // Removes leading/trailing whitespace
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']  // Regex validation
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false  // DON'T include in queries by default (security!)
      // Use .select('+password') to include it when needed
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name must be less than 50 characters']
    },
    role: {
      type: String,
      enum: ['user', 'admin'],  // Only these values allowed
      default: 'user'           // Default value if not provided
    }
  },
  // Second argument: schema options
  {
    timestamps: true  // Adds createdAt and updatedAt fields automatically
  }
);

// Pre-save hook: runs BEFORE document is saved to database
userSchema.pre('save', async function(next) {
  // 'this' refers to the document being saved
  
  // Only hash if password was modified (don't re-hash on every save)
  if (!this.isModified('password')) {
    return next();  // Skip hashing, continue save
  }

  try {
    // Generate salt (random data for hashing, 10 = rounds)
    const salt = await bcrypt.genSalt(10);
    // Hash password with salt: 'secret123' → '$2b$10$eqVzWZ...'
    this.password = await bcrypt.hash(this.password, salt);
    next();  // Continue with save
  } catch (error) {
    next(error);  // Pass error to abort save
  }
});

// Create model from schema (model name = 'User', collection = 'users')
const User = mongoose.model('User', userSchema);

/* VALIDATION FLOW:
   1. trim whitespace → 2. lowercase email → 3. validate regex
   4. check required → 5. check minlength → 6. pre-save hook (hash password)
   7. save to database
*/

// ==========================================
// 7. REACT FORM WITH VALIDATION (20 min)
// ==========================================
// Why: Forms are everywhere - login, signup, checkout
// Difficulty: Medium
// Shows: Form handling, validation, error states, controlled inputs

const LoginForm = () => {
  // State: single object holds all form fields
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  // State: validation errors object { email: 'error msg', password: 'error msg' }
  const [errors, setErrors] = React.useState({});
  // State: is form currently submitting?
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Validation function - returns object of errors (or empty object if valid)
  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;  // {} = no errors, { email: '...' } = has errors
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;  // Get input name ('email') and value
    
    // Update form data: keep other fields, update this one
    setFormData({
      ...formData,         // Spread existing data
      [name]: value        // Update this field ([name] = computed property)
    });

    // Clear error for this field as user types (good UX)
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submit (page reload)

    const validationErrors = validate();

    // Check if there are errors (Object.keys returns array of keys)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);  // Show errors
      return;                       // Stop submission
    }

    // Form is valid, proceed with API call
    try {
      setIsSubmitting(true);  // Disable form, show loading
      
      // Make POST request to login endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  // Tell server we're sending JSON
        },
        body: JSON.stringify(formData)  // Convert object to JSON string
      });

      const data = await response.json();

      // Check if request failed (fetch doesn't throw on 4xx/5xx)
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Success! Save token and redirect
      localStorage.setItem('token', data.token);  // Save token for future requests
      window.location.href = '/dashboard';       // Navigate to dashboard
    } catch (error) {
      setErrors({ submit: error.message });  // Show error message
    } finally {
      setIsSubmitting(false);  // Re-enable form (runs whether try or catch)nErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token and redirect
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          disabled={isSubmitting}
        />
        {errors.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'error' : ''}
          disabled={isSubmitting}
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>

      {errors.submit && (
        <div className="error-message submit-error">{errors.submit}</div>
      )}
    </form>
  );
};

// ==========================================
// 8. PAGINATION (15 min)
// ==========================================
// Why: Essential for large datasets
// Difficulty: Easy-Medium
// Shows: Query optimization, math, response structure

const getPaginatedData = async (req, res) => {
  try {
    // Get page from query string (?page=2), convert to number, default to 1
    const page = parseInt(req.query.page) || 1;
    // Get limit from query string (?limit=20), default to 10 items per page
    const limit = parseInt(req.query.limit) || 10;
    
    // Calculate how many documents to skip
    const skip = (page - 1) * limit;
    // Page 1: (1-1)*10 = 0  (show first 10)
    // Page 2: (2-1)*10 = 10 (skip first 10, show next 10)
    // Page 3: (3-1)*10 = 20 (skip first 20, show next 10)

    // Query database with pagination
    const users = await User.find()
      .skip(skip)                    // Skip first N documents
      .limit(limit)                  // Return at most N documents
      .sort({ createdAt: -1 })       // Sort newest first (-1 = descending)
      .select('-password');          // Exclude password field

    // Count total documents in collection (for calculating total pages)
    const totalUsers = await User.countDocuments();
    // Calculate total pages needed (round up)
    const totalPages = Math.ceil(totalUsers / limit);
    // 157 users / 10 per page = 15.7 → 16 pages

    // Send response with data and pagination info
    res.json({
      users,                         // Array of user documents
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNextPage: page < totalPages,  // Is there a next page?
        hasPrevPage: page > 1            // Is there a previous page?
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* EXAMPLE: 1000 users, 10 per page
   Page 1: skip 0, show users 1-10
   Page 2: skip 10, show users 11-20
   Page 100: skip 990, show users 991-1000
*/

// ==========================================
// 9. TWO SUM - HASH MAP (10 min)
// ==========================================
// Why: Most popular interview question
// Difficulty: Easy
// Shows: Hash map usage, time/space complexity understanding

function twoSum(nums, target) {
  // Create Map to store numbers we've seen and their indices
  const map = new Map();  // { number: index }

  // Loop through array once
  for (let i = 0; i < nums.length; i++) {
    // Calculate what number we need to reach target
    const complement = target - nums[i];
    // If target=9 and current=2, we need 7

    // Check if we've already seen the complement
    if (map.has(complement)) {
      // Found it! Return both indices
      return [map.get(complement), i];
      // [index where we saw complement, current index]
    }

    // Haven't found complement yet, store current number and index
    map.set(nums[i], i);
    // Store for future lookups
  }

  // No solution found
  return [];
}

// Test
// console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
// console.log(twoSum([3, 2, 4], 6)); // [1, 2]

// Time Complexity: O(n) - single loop through array
// Space Complexity: O(n) - worst case store all numbers in map

/* STEP BY STEP: nums=[2,7,11,15], target=9
   i=0, nums[i]=2, complement=7, map.has(7)? No,  map.set(2,0) → map={2:0}
   i=1, nums[i]=7, complement=2, map.has(2)? Yes! return [0,1]
   Result: nums[0]+nums[1] = 2+7 = 9 ✓
*/

// ==========================================
// 10. ERROR HANDLER MIDDLEWARE (10 min)
// ==========================================
// Why: Professional error handling in production apps
// Difficulty: Medium
// Shows: Express error handling, different error types

const errorHandler = (err, req, res, next) => {
  // MUST have 4 parameters for Express to recognize as error handler
  // MUST have 4 parameters for Express to recognize as error handler
  
  console.error('Error:', err);  // Log error for debugging

  // Handle Mongoose validation errors (required fields, minlength, etc.)
  if (err.name === 'ValidationError') {
    // Extract error messages from all fields
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      message: 'Validation Error',
      errors  // ['Email is required', 'Password too short']
    });
    // 400 = Bad Request
  }

  // Handle MongoDB duplicate key errors (unique constraint violated)
  if (err.code === 11000) {
    // Extract which field was duplicate
    const field = Object.keys(err.keyPattern)[0];  // 'email'
    return res.status(409).json({
      message: `${field} already exists`
    });
    // 409 = Conflict
  }

  // Handle JWT invalid token errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token'
    });
    // 401 = Unauthorized
  }

  // Handle JWT expired token errors
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expired'
    });
  }

  // Handle Mongoose cast errors (invalid ObjectId format)
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid ID format'  // e.g., /api/users/abc (not valid MongoDB ID)
    });
  }

  // Default error handler for everything else
  const statusCode = err.statusCode || 500;  // Use error's code or 500
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    message,
    // Include stack trace ONLY in development (don't expose in production)
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Usage: Place AFTER all routes (must be last middleware)
// app.use(errorHandler);

/* HOW ERRORS REACH THIS MIDDLEWARE:
   try { ... } catch(error) { next(error); }  ← Pass error to next()
   throw new Error('Something broke');  ← In async route with wrapper
   Express automatically catches and forwards to error handler
*/



// ==========================================
// PRACTICE SCHEDULE
// ==========================================

/**
 * DAY 1 MORNING (2 hours):
 * 1. Debounce (3x) - 15 min
 * 2. useFetch (3x) - 15 min
 * 3. Todo List (2x) - 30 min
 * 4. Auth Middleware (3x) - 10 min
 * 5. Login Endpoint (2x) - 20 min
 * 6. Review all - 20 min
 * 
 * DAY 1 AFTERNOON (2 hours):
 * 7. User Schema (3x) - 10 min
 * 8. Form Validation (2x) - 30 min
 * 9. Pagination (3x) - 15 min
 * 10. Two Sum (3x) - 10 min
 * 11. Error Handler (3x) - 10 min
 * 12. Build mini app combining all - 45 min
 * 
 * GOAL: By end of Day 1, you should be able to write
 * all 10 from memory without looking at solutions.
 */

// ==========================================
// INTERVIEW DAY CHECKLIST
// ==========================================

/**
 * ✓ Can you write debounce from memory?
 * ✓ Can you build a custom hook?
 * ✓ Can you create a todo list with CRUD?
 * ✓ Can you set up JWT auth middleware?
 * ✓ Can you build a login endpoint with bcrypt?
 * ✓ Can you define a Mongoose schema with validation?
 * ✓ Can you build a form with validation?
 * ✓ Can you implement pagination?
 * ✓ Can you solve two sum in O(n)?
 * ✓ Can you handle errors properly in Express?
 * 
 * If YES to all 10: You're ready! 🚀
 * If NO to any: Practice that one 3 more times!
 */

module.exports = {
  debounce,
  useFetch,
  TodoList,
  authMiddleware,
  loginUser,
  userSchema,
  LoginForm,
  getPaginatedData,
  twoSum,
  errorHandler
};
