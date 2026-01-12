/**
 * DAY 20: Advanced Patterns & Best Practices
 * 
 * Topics:
 * - Component composition patterns
 * - Render props pattern
 * - Higher-Order Components (HOC)
 * - Compound components
 * - Controlled vs Uncontrolled components
 * - Best practices and common pitfalls
 */

import { useState, createContext, useContext, cloneElement, Children } from 'react';

// ============================================
// 1. COMPONENT COMPOSITION
// ============================================

// Container/Presentational Pattern
const UserListContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  // Container handles logic
  return <UserListPresentation users={users} loading={loading} />;
};

// Presentational component handles UI
const UserListPresentation = ({ users, loading }) => {
  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

// Children as props pattern
const Card = ({ children, header, footer }) => {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

// Usage
const CardExample = () => (
  <Card
    header={<h2>Card Title</h2>}
    footer={<button>Action</button>}
  >
    <p>Card content goes here</p>
  </Card>
);

// ============================================
// 2. RENDER PROPS PATTERN
// ============================================

// Mouse position tracker with render prop
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage
const MouseTrackerExample = () => (
  <MouseTracker
    render={({ x, y }) => (
      <p>
        Mouse position: {x}, {y}
      </p>
    )}
  />
);

// Modern approach with hooks
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};

// Data fetcher with render prop
const DataFetcher = ({ url, render }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return render({ data, loading, error });
};

// Usage
const DataFetcherExample = () => (
  <DataFetcher
    url="https://jsonplaceholder.typicode.com/users"
    render={({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
      return <ul>{data.map((user) => <li key={user.id}>{user.name}</li>)}</ul>;
    }}
  />
);

// ============================================
// 3. HIGHER-ORDER COMPONENTS (HOC)
// ============================================

// withAuth HOC
const withAuth = (Component) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      // Check authentication
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    }, []);

    if (!isAuthenticated) {
      return <p>Please log in to access this page</p>;
    }

    return <Component {...props} />;
  };
};

// Usage
const Dashboard = () => <h1>Dashboard</h1>;
const ProtectedDashboard = withAuth(Dashboard);

// withLoading HOC
const withLoading = (Component) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return <Component {...props} />;
  };
};

// Usage
const UserProfile = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </div>
);
const UserProfileWithLoading = withLoading(UserProfile);

// withLogger HOC
const withLogger = (Component) => {
  return (props) => {
    useEffect(() => {
      console.log('Component mounted:', Component.name);
      return () => console.log('Component unmounted:', Component.name);
    }, []);

    useEffect(() => {
      console.log('Props changed:', props);
    }, [props]);

    return <Component {...props} />;
  };
};

// ============================================
// 4. COMPOUND COMPONENTS PATTERN
// ============================================

// Tabs component with compound pattern
const TabsContext = createContext();

const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

const TabList = ({ children }) => {
  return <div className="tab-list">{children}</div>;
};

const Tab = ({ value, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      className={activeTab === value ? 'tab active' : 'tab'}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

const TabPanels = ({ children }) => {
  const { activeTab } = useContext(TabsContext);

  return (
    <div className="tab-panels">
      {Children.map(children, (child) => {
        if (child.props.value === activeTab) {
          return child;
        }
        return null;
      })}
    </div>
  );
};

const TabPanel = ({ value, children }) => {
  return <div className="tab-panel">{children}</div>;
};

// Attach subcomponents
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Usage
const TabsExample = () => (
  <Tabs defaultValue="tab1">
    <Tabs.List>
      <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
      <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
      <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
    </Tabs.List>

    <Tabs.Panels>
      <Tabs.Panel value="tab1">Content for Tab 1</Tabs.Panel>
      <Tabs.Panel value="tab2">Content for Tab 2</Tabs.Panel>
      <Tabs.Panel value="tab3">Content for Tab 3</Tabs.Panel>
    </Tabs.Panels>
  </Tabs>
);

// ============================================
// 5. CONTROLLED VS UNCONTROLLED COMPONENTS
// ============================================

// Controlled Component
const ControlledInput = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Controlled"
      />
      <p>Value: {value}</p>
    </div>
  );
};

// Uncontrolled Component
const UncontrolledInput = () => {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    console.log('Value:', inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} defaultValue="Initial value" placeholder="Uncontrolled" />
      <button onClick={handleSubmit}>Get Value</button>
    </div>
  );
};

// Hybrid: Controlled with default value
const FlexibleInput = ({ value: controlledValue, defaultValue, onChange }) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');

  // Is it controlled?
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  return <input value={value} onChange={handleChange} />;
};

// ============================================
// 6. ERROR BOUNDARIES
// ============================================

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <MyComponent />
  </ErrorBoundary>
);

// ============================================
// 7. BEST PRACTICES & COMMON PITFALLS
// ============================================

// ❌ BAD: Mutating state directly
const BadStateUpdate = () => {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = () => {
    items.push(4); // DON'T mutate state
    setItems(items); // This won't trigger re-render
  };

  return <button onClick={addItem}>Add Item</button>;
};

// ✅ GOOD: Creating new state
const GoodStateUpdate = () => {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = () => {
    setItems([...items, 4]); // Create new array
  };

  return <button onClick={addItem}>Add Item</button>;
};

// ❌ BAD: Derived state
const BadDerivedState = ({ items }) => {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems(items.filter((item) => item.active));
  }, [items]);

  return <ul>{/* ... */}</ul>;
};

// ✅ GOOD: Calculate during render
const GoodDerivedState = ({ items }) => {
  const filteredItems = items.filter((item) => item.active);
  return <ul>{/* ... */}</ul>;
};

// ❌ BAD: Keys with index
const BadKeys = ({ items }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// ✅ GOOD: Keys with unique ID
const GoodKeys = ({ items }) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);

// ============================================
// PRACTICE EXERCISES
// ============================================

/**
 * TODO 1: Create a Modal compound component
 * - Modal container with context
 * - Modal.Trigger to open modal
 * - Modal.Content for modal content
 * - Modal.Close to close modal
 * - Support multiple modals on same page
 */

const Modal = ({ children }) => {
  // TODO: Implement compound modal
  return <div>Modal</div>;
};

/**
 * TODO 2: Create a withPermissions HOC
 * - Check if user has required permissions
 * - Accept permissions array as parameter
 * - Show unauthorized message if no permission
 * - Pass user permissions to wrapped component
 */

const withPermissions = (permissions) => (Component) => {
  // TODO: Implement HOC
  return Component;
};

/**
 * TODO 3: Create a Select compound component
 * - Select container with keyboard navigation
 * - Select.Trigger to show/hide options
 * - Select.Options for options list
 * - Select.Option for each option
 * - Support single and multi-select
 */

const Select = ({ children }) => {
  // TODO: Implement compound select
  return <div>Select</div>;
};

/**
 * TODO 4: Create a form HOC pattern
 * - withFormValidation HOC
 * - withFormSubmission HOC
 * - Can be composed together
 * - Handle validation rules
 * - Handle submission states
 */

const withFormValidation = (rules) => (Component) => {
  // TODO: Implement HOC
  return Component;
};

const withFormSubmission = (onSubmit) => (Component) => {
  // TODO: Implement HOC
  return Component;
};

/**
 * TODO 5: Create an Accordion compound component
 * - Accordion container
 * - Accordion.Item for each item
 * - Accordion.Trigger for header
 * - Accordion.Content for body
 * - Support single or multiple open items
 */

const Accordion = ({ children, type = 'single' }) => {
  // TODO: Implement compound accordion
  return <div>Accordion</div>;
};

// Export components
export {
  UserListContainer,
  Card,
  MouseTracker,
  DataFetcher,
  withAuth,
  withLoading,
  withLogger,
  Tabs,
  ControlledInput,
  UncontrolledInput,
  FlexibleInput,
  ErrorBoundary,
  Modal,
  withPermissions,
  Select,
  withFormValidation,
  withFormSubmission,
  Accordion,
};
