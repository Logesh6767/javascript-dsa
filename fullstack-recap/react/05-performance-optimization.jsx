/**
 * DAY 19: useMemo, useCallback & Performance Optimization
 * 
 * Topics:
 * - useMemo for expensive computations
 * - useCallback for function memoization
 * - React.memo for component memoization
 * - When to optimize (and when not to)
 * - Profiling and measuring performance
 */

import { useState, useMemo, useCallback, memo } from 'react';

// ============================================
// 1. useMemo BASICS
// ============================================

// Without useMemo - expensive calculation runs on every render
const ExpensiveComponent = ({ numbers }) => {
  const [count, setCount] = useState(0);

  // This runs on EVERY render (including count changes)
  const sum = numbers.reduce((acc, num) => acc + num, 0);

  return (
    <div>
      <p>Sum: {sum}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};

// With useMemo - expensive calculation only runs when numbers change
const OptimizedComponent = ({ numbers }) => {
  const [count, setCount] = useState(0);

  // This only runs when 'numbers' changes
  const sum = useMemo(() => {
    console.log('Calculating sum...');
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);

  return (
    <div>
      <p>Sum: {sum}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};

// Real-world example: Filtering and sorting
const ProductList = ({ products, searchTerm, sortBy }) => {
  // Expensive filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    console.log('Filtering and sorting products...');

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });

    return sorted;
  }, [products, searchTerm, sortBy]);

  return (
    <ul>
      {filteredAndSortedProducts.map((product) => (
        <li key={product.id}>
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
};

// ============================================
// 2. useCallback BASICS
// ============================================

// Without useCallback - new function on every render
const ParentWithoutCallback = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // New function created on every render
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>Count: {count}</p>
      <ChildComponent onClick={handleClick} />
    </div>
  );
};

// With useCallback - function reference stays the same
const ParentWithCallback = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Function reference stays the same between renders
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Empty deps = function never changes

  // Function that uses state
  const incrementCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // Can use setter function form

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>Count: {count}</p>
      <MemoizedChild onClick={handleClick} />
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
};

// ============================================
// 3. React.memo - Component Memoization
// ============================================

// Regular component - re-renders when parent re-renders
const ChildComponent = ({ onClick }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click Me</button>;
};

// Memoized component - only re-renders when props change
const MemoizedChild = memo(({ onClick }) => {
  console.log('MemoizedChild rendered');
  return <button onClick={onClick}>Click Me</button>;
});

// Memoized component with custom comparison
const ExpensiveComponent2 = memo(
  ({ data, onUpdate }) => {
    console.log('ExpensiveComponent rendered');

    return (
      <div>
        <h3>{data.title}</h3>
        <button onClick={onUpdate}>Update</button>
      </div>
    );
  },
  // Custom comparison function
  (prevProps, nextProps) => {
    // Return true if props are equal (don't re-render)
    // Return false if props are different (re-render)
    return prevProps.data.id === nextProps.data.id;
  }
);

// ============================================
// 4. COMBINING useMemo, useCallback, memo
// ============================================

// Optimized Todo App
const TodoItem = memo(({ todo, onToggle, onDelete }) => {
  console.log('TodoItem rendered:', todo.id);

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build app', completed: false },
  ]);
  const [filter, setFilter] = useState('all');

  // Memoize filtered todos
  const filteredTodos = useMemo(() => {
    console.log('Filtering todos...');
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  // Memoize callback functions
  const handleToggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // Calculate stats (memoized)
  const stats = useMemo(() => {
    return {
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      active: todos.filter((t) => !t.completed).length,
    };
  }, [todos]);

  return (
    <div>
      <div>
        <button onClick={() => setFilter('all')}>All ({stats.total})</button>
        <button onClick={() => setFilter('active')}>Active ({stats.active})</button>
        <button onClick={() => setFilter('completed')}>
          Completed ({stats.completed})
        </button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

// ============================================
// 5. REAL-WORLD OPTIMIZATION PATTERNS
// ============================================

// Virtualized list (concept)
const VirtualizedList = ({ items, itemHeight = 50 }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerHeight = 600;

  // Calculate which items to render
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);
    
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      ...item,
      index: startIndex + index,
    }));
  }, [items, scrollTop, itemHeight, containerHeight]);

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight }}>
        {visibleItems.map((item) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: item.index * itemHeight,
              height: itemHeight,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

// Debounced search with memoization
const SearchWithResults = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Memoized search results
  const results = useMemo(() => {
    if (!debouncedQuery) return [];

    console.log('Searching for:', debouncedQuery);
    // Simulate search
    return [
      `Result 1 for ${debouncedQuery}`,
      `Result 2 for ${debouncedQuery}`,
    ];
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
// 6. WHEN NOT TO OPTIMIZE
// ============================================

// ❌ DON'T optimize simple calculations
const BadExample1 = ({ a, b }) => {
  // DON'T do this - simple addition is fast enough
  const sum = useMemo(() => a + b, [a, b]);
  return <p>Sum: {sum}</p>;
};

// ✅ DO this instead
const GoodExample1 = ({ a, b }) => {
  const sum = a + b;
  return <p>Sum: {sum}</p>;
};

// ❌ DON'T memoize everything
const BadExample2 = () => {
  const [count, setCount] = useState(0);

  // DON'T do this - unnecessary memoization
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  // Component doesn't even receive the function as prop
  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

// ✅ DO this instead
const GoodExample2 = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
};

// ============================================
// 7. PERFORMANCE PROFILING
// ============================================

/**
 * Use React DevTools Profiler to measure performance:
 * 
 * 1. Open React DevTools
 * 2. Go to Profiler tab
 * 3. Click record button
 * 4. Interact with your app
 * 5. Stop recording
 * 6. Analyze flame graph to see render times
 * 
 * Key metrics:
 * - Render duration
 * - Number of renders
 * - Props that caused re-render
 */

// Add profiler in code
import { Profiler } from 'react';

const onRenderCallback = (
  id, // component name
  phase, // "mount" or "update"
  actualDuration, // time spent rendering
  baseDuration, // estimated time without memoization
  startTime, // when render started
  commitTime // when React committed changes
) => {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
};

const ProfiledComponent = () => {
  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  );
};

// ============================================
// PRACTICE EXERCISES
// ============================================

/**
 * TODO 1: Optimize a DataTable component
 * - Accept large array of data (1000+ items)
 * - Implement sorting by column (memoize sorted data)
 * - Implement filtering by search term (memoize filtered data)
 * - Memoize row components
 * - Add callback functions without causing re-renders
 */

const DataTable = ({ data, columns }) => {
  // TODO: Implement optimized data table
  return <table>Data Table</table>;
};

/**
 * TODO 2: Create an optimized ImageGallery
 * - Display grid of images
 * - Implement lazy loading (only load visible images)
 * - Add lightbox functionality (memoize modal component)
 * - Optimize image loading callbacks
 */

const ImageGallery = ({ images }) => {
  // TODO: Implement optimized image gallery
  return <div>Image Gallery</div>;
};

/**
 * TODO 3: Build a PerformanceMonitor component
 * - Track render count of a component
 * - Measure render duration
 * - Display in a small overlay
 * - Compare with/without optimization
 */

const PerformanceMonitor = ({ children, componentName }) => {
  // TODO: Implement performance monitor
  return <div>{children}</div>;
};

/**
 * TODO 4: Optimize a RealTimeChart component
 * - Updates every second with new data
 * - Calculate expensive statistics (average, min, max)
 * - Memoize chart data transformation
 * - Only re-render when necessary
 */

const RealTimeChart = ({ dataPoints }) => {
  // TODO: Implement optimized real-time chart
  return <div>Real Time Chart</div>;
};

/**
 * TODO 5: Create a FormBuilder with optimization
 * - Dynamic form with multiple field types
 * - Each field is a memoized component
 * - Validation only runs for changed fields
 * - Submit handler is memoized
 */

const FormBuilder = ({ fields }) => {
  // TODO: Implement optimized form builder
  return <form>Form Builder</form>;
};

// Export components
export {
  OptimizedComponent,
  ProductList,
  ParentWithCallback,
  MemoizedChild,
  TodoApp,
  VirtualizedList,
  SearchWithResults,
  ProfiledComponent,
  DataTable,
  ImageGallery,
  PerformanceMonitor,
  RealTimeChart,
  FormBuilder,
};
