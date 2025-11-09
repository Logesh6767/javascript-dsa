/**
 * DAY 18: Custom Hooks
 * 
 * Topics:
 * - Creating custom hooks
 * - Reusing stateful logic
 * - Common custom hook patterns
 * - Hook composition
 * - Best practices
 */

import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================
// 1. BASIC CUSTOM HOOKS
// ============================================

// useFetch - Fetch data from API
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

// Usage example
const UserList = () => {
  const { data: users, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

// ============================================
// 2. useLocalStorage - Sync state with localStorage
// ============================================

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      // Allow value to be a function like setState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage example
const Settings = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16);

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      
      <input
        type="number"
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
      />
    </div>
  );
};

// ============================================
// 3. useToggle - Boolean toggle hook
// ============================================

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse];
}

// Usage example
const Modal = () => {
  const [isOpen, toggle, open, close] = useToggle(false);

  return (
    <div>
      <button onClick={open}>Open Modal</button>
      
      {isOpen && (
        <div className="modal">
          <p>Modal Content</p>
          <button onClick={close}>Close</button>
          <button onClick={toggle}>Toggle</button>
        </div>
      )}
    </div>
  );
};

// ============================================
// 4. useDebounce - Debounce value changes
// ============================================

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage example
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Searching for:', debouncedSearchTerm);
      // Perform API call here
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
};

// ============================================
// 5. useWindowSize - Track window dimensions
// ============================================

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Usage example
const ResponsiveComponent = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
      {width < 768 ? <p>Mobile view</p> : <p>Desktop view</p>}
    </div>
  );
};

// ============================================
// 6. useClickOutside - Detect clicks outside element
// ============================================

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Usage example
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
      {isOpen && (
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      )}
    </div>
  );
};

// ============================================
// 7. usePrevious - Get previous value
// ============================================

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage example
const Counter = () => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// ============================================
// 8. useInterval - Declarative interval
// ============================================

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null) return;

    const tick = () => {
      savedCallback.current();
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

// Usage example
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      setSeconds(seconds + 1);
    },
    isRunning ? 1000 : null
  );

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

// ============================================
// 9. useForm - Form state management
// ============================================

function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field was touched
    if (touched[name] && validate) {
      const fieldErrors = validate({ ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    if (validate) {
      const fieldErrors = validate(values);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    // Validate all fields
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    onSubmit(values);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}

// Usage example
const LoginForm = () => {
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, reset } =
    useForm({ email: '', password: '' }, validate);

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
        />
        {touched.email && errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
        />
        {touched.password && errors.password && <span>{errors.password}</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

// ============================================
// 10. useAsync - Handle async operations
// ============================================

function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...params) => {
      setStatus('pending');
      setData(null);
      setError(null);

      try {
        const response = await asyncFunction(...params);
        setData(response);
        setStatus('success');
        return response;
      } catch (err) {
        setError(err);
        setStatus('error');
        throw err;
      }
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
}

// Usage example
const UserProfile = ({ userId }) => {
  const fetchUser = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.json();
  };

  const { status, data: user, error, execute } = useAsync(fetchUser, true);

  return (
    <div>
      {status === 'pending' && <p>Loading...</p>}
      {status === 'error' && <p>Error: {error.message}</p>}
      {status === 'success' && user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button onClick={execute}>Refresh</button>
        </div>
      )}
    </div>
  );
};

// ============================================
// PRACTICE EXERCISES
// ============================================

/**
 * TODO 1: Create useInfiniteScroll hook
 * - Detect when user scrolls near bottom of page
 * - Trigger callback to load more data
 * - Accept threshold parameter (e.g., 200px from bottom)
 * - Return { isLoading, hasMore } state
 */

function useInfiniteScroll(callback, threshold = 200) {
  // TODO: Implement this
}

/**
 * TODO 2: Create useKeyPress hook
 * - Detect when specific key is pressed
 * - Accept key name (e.g., 'Enter', 'Escape')
 * - Return boolean indicating if key is currently pressed
 * - Handle keydown and keyup events
 */

function useKeyPress(targetKey) {
  // TODO: Implement this
}

/**
 * TODO 3: Create useMediaQuery hook
 * - Accept media query string (e.g., '(max-width: 768px)')
 * - Return boolean indicating if query matches
 * - Update on window resize
 * - Usage: const isMobile = useMediaQuery('(max-width: 768px)')
 */

function useMediaQuery(query) {
  // TODO: Implement this
}

/**
 * TODO 4: Create useClipboard hook
 * - Copy text to clipboard
 * - Return [copiedText, copy] where:
 *   - copiedText: last copied text
 *   - copy: function to copy text
 * - Show success state for 2 seconds after copying
 */

function useClipboard() {
  // TODO: Implement this
}

/**
 * TODO 5: Create useThrottle hook
 * - Similar to useDebounce but throttles instead
 * - Ensure callback fires at most once per delay period
 * - Accept value and delay
 * - Return throttled value
 */

function useThrottle(value, delay = 500) {
  // TODO: Implement this
}

/**
 * TODO 6: Create usePagination hook
 * - Manage pagination state
 * - Return: { currentPage, totalPages, next, prev, goToPage, items }
 * - Accept items array and itemsPerPage
 * - Calculate paginated items
 */

function usePagination(items, itemsPerPage = 10) {
  // TODO: Implement this
}

/**
 * TODO 7: Create useOnlineStatus hook
 * - Detect if user is online or offline
 * - Listen to online/offline events
 * - Return boolean indicating connection status
 * - Show notification when status changes
 */

function useOnlineStatus() {
  // TODO: Implement this
}

// Export all hooks
export {
  useFetch,
  useLocalStorage,
  useToggle,
  useDebounce,
  useWindowSize,
  useClickOutside,
  usePrevious,
  useInterval,
  useForm,
  useAsync,
  // TODO: Export your custom hooks here
};
