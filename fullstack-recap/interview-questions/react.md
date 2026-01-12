# React Interview Questions

## Fundamentals

### Q1: What is React?
**Answer**: React is a JavaScript library for building user interfaces, focusing on component-based architecture and declarative programming.

### Q2: What is JSX?
**Answer**: JSX is a syntax extension for JavaScript that allows writing HTML-like code in JavaScript files. It gets transpiled to `React.createElement()` calls.

### Q3: What's the difference between functional and class components?
**Answer**:
- Functional: Simpler, use hooks for state/lifecycle
- Class: More verbose, use `this.state` and lifecycle methods

### Q4: What is the Virtual DOM?
**Answer**: A lightweight copy of the real DOM. React compares virtual DOM with real DOM and updates only what changed (reconciliation).

## Hooks

### Q5: What are React Hooks?
**Answer**: Functions that let you use state and lifecycle features in functional components.

### Q6: What is useState?
**Answer**: Hook for adding state to functional components.
```javascript
const [count, setCount] = useState(0);
```

### Q7: What is useEffect?
**Answer**: Hook for side effects (data fetching, subscriptions, DOM manipulation).
```javascript
useEffect(() => {
    // Effect code
    return () => {
        // Cleanup
    };
}, [dependencies]);
```

### Q8: What's the dependency array in useEffect?
**Answer**:
- `[]`: Runs once on mount
- `[dep1, dep2]`: Runs when dependencies change
- No array: Runs after every render

### Q9: What is useContext?
**Answer**: Hook to consume context values without nesting.
```javascript
const theme = useContext(ThemeContext);
```

### Q10: What is useReducer?
**Answer**: Hook for complex state logic, similar to Redux.
```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

### Q11: What is useMemo?
**Answer**: Memoizes expensive calculations.
```javascript
const memoizedValue = useMemo(() => expensive(a, b), [a, b]);
```

### Q12: What is useCallback?
**Answer**: Memoizes functions to prevent unnecessary re-renders.
```javascript
const memoizedFn = useCallback(() => {
    doSomething(a, b);
}, [a, b]);
```

### Q13: What's the difference between useMemo and useCallback?
**Answer**:
- `useMemo`: Caches computed values
- `useCallback`: Caches functions

## Component Patterns

### Q14: What is prop drilling?
**Answer**: Passing props through multiple levels of components. Solution: Context API or state management.

### Q15: What is component composition?
**Answer**: Building complex UIs from smaller, reusable components.

### Q16: What are controlled vs uncontrolled components?
**Answer**:
- **Controlled**: Form data handled by React state
- **Uncontrolled**: Form data handled by DOM (using refs)

### Q17: What is lifting state up?
**Answer**: Moving state to the closest common ancestor when multiple components need to share it.

## Performance

### Q18: How do you optimize React performance?
**Answer**:
- Use React.memo for component memoization
- Use useMemo/useCallback for expensive operations
- Code splitting with lazy loading
- Virtualize long lists
- Avoid inline function definitions
- Use production build

### Q19: What is React.memo?
**Answer**: Higher-order component that memoizes component renders.
```javascript
const MemoizedComponent = React.memo(MyComponent);
```

### Q20: When does a component re-render?
**Answer**:
- State changes
- Props changes
- Parent re-renders (unless memoized)
- Context value changes

## Advanced Concepts

### Q21: What are Higher-Order Components (HOC)?
**Answer**: Functions that take a component and return a new enhanced component.
```javascript
function withAuth(Component) {
    return function AuthComponent(props) {
        if (!isAuthenticated) return <Login />;
        return <Component {...props} />;
    };
}
```

### Q22: What are Render Props?
**Answer**: Technique for sharing code using a prop whose value is a function.
```javascript
<DataProvider render={data => <Display data={data} />} />
```

### Q23: What is the useRef hook?
**Answer**: Creates a mutable reference that persists across renders.
```javascript
const inputRef = useRef(null);
inputRef.current.focus();
```

### Q24: What is React Context?
**Answer**: Global state management without prop drilling.
```javascript
const ThemeContext = React.createContext('light');
```

### Q25: What is lazy loading in React?
**Answer**: Dynamically importing components to reduce initial bundle size.
```javascript
const LazyComponent = React.lazy(() => import('./Component'));
```

## Coding Challenges

### Challenge 1: Custom Hook - useFetch
```javascript
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [url]);
    
    return { data, loading, error };
}
```

### Challenge 2: Custom Hook - useLocalStorage
```javascript
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialValue;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}
```

### Challenge 3: Debounced Input
```javascript
function DebouncedInput({ onChange, delay = 500 }) {
    const [value, setValue] = useState('');
    
    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(value);
        }, delay);
        
        return () => clearTimeout(timer);
    }, [value, delay, onChange]);
    
    return (
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
```

### Challenge 4: Infinite Scroll
```javascript
function InfiniteScroll() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                setPage(prev => prev + 1);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        loadMore();
    }, [page]);
    
    async function loadMore() {
        setLoading(true);
        const newItems = await fetchItems(page);
        setItems(prev => [...prev, ...newItems]);
        setLoading(false);
    }
    
    return (
        <div>
            {items.map(item => <div key={item.id}>{item.name}</div>)}
            {loading && <div>Loading...</div>}
        </div>
    );
}
```

## Best Practices

1. **Component Structure**
   - Keep components small and focused
   - Extract reusable logic into custom hooks
   - Use composition over inheritance

2. **State Management**
   - Keep state as close as possible to where it's used
   - Use Context for global state sparingly
   - Consider Redux/Zustand for complex state

3. **Performance**
   - Avoid creating functions/objects in render
   - Use keys properly in lists
   - Lazy load routes and components

4. **Code Organization**
   ```
   src/
   ├── components/
   ├── hooks/
   ├── context/
   ├── utils/
   ├── pages/
   └── styles/
   ```

5. **Testing**
   - Test user behavior, not implementation
   - Use React Testing Library
   - Test edge cases and error states
