/**
 * DAY 15: React Basics & JSX
 * 
 * Topics:
 * - Components (Functional vs Class)
 * - JSX syntax and rules
 * - Props and children
 * - Conditional rendering
 * - Lists and keys
 */

// ============================================
// 1. FUNCTIONAL COMPONENTS
// ============================================

// Simple functional component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Arrow function component
const Greeting = ({ name, age }) => {
  return (
    <div>
      <h2>Welcome {name}</h2>
      <p>Age: {age}</p>
    </div>
  );
};

// Component with children
const Card = ({ children, title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
};

// Usage
// <Card title="My Card">
//   <p>This is the card content</p>
// </Card>

// ============================================
// 2. JSX RULES & BEST PRACTICES
// ============================================

const JSXRules = () => {
  // Rule 1: Must return single parent element
  return (
    <div>
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );

  // Or use Fragment
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );

  // Rule 2: Close all tags
  const selfClosing = <img src="image.jpg" alt="description" />;

  // Rule 3: Use camelCase for attributes
  const withAttributes = (
    <div className="container" onClick={() => console.log('clicked')}>
      Content
    </div>
  );

  // Rule 4: Use {} for JavaScript expressions
  const name = 'John';
  const element = <h1>Hello, {name.toUpperCase()}</h1>;
};

// ============================================
// 3. PROPS IN DETAIL
// ============================================

// Props with default values
const Button = ({ text = 'Click me', variant = 'primary', onClick }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {text}
    </button>
  );
};

// Props destructuring
const UserCard = ({ user: { name, email, avatar } }) => {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};

// Spreading props
const Input = (props) => {
  return <input {...props} className="form-input" />;
};

// Usage: <Input type="text" placeholder="Enter name" onChange={handler} />

// Props validation (with PropTypes - install: npm i prop-types)
import PropTypes from 'prop-types';

const Profile = ({ name, age, isActive }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <span>{isActive ? 'Active' : 'Inactive'}</span>
    </div>
  );
};

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

Profile.defaultProps = {
  isActive: false,
};

// ============================================
// 4. CONDITIONAL RENDERING
// ============================================

// Method 1: If-else (outside JSX)
const LoginButton = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <button>Logout</button>;
  }
  return <button>Login</button>;
};

// Method 2: Ternary operator
const UserGreeting = ({ isLoggedIn, username }) => {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back, {username}!</h1> : <h1>Please sign in</h1>}
    </div>
  );
};

// Method 3: Logical && operator
const Notification = ({ hasNotifications, count }) => {
  return (
    <div>
      <h1>Notifications</h1>
      {hasNotifications && <span className="badge">{count}</span>}
    </div>
  );
};

// Method 4: Immediately Invoked Function Expression (IIFE)
const ComplexConditional = ({ status }) => {
  return (
    <div>
      {(() => {
        switch (status) {
          case 'loading':
            return <p>Loading...</p>;
          case 'error':
            return <p>Error occurred!</p>;
          case 'success':
            return <p>Success!</p>;
          default:
            return <p>Unknown status</p>;
        }
      })()}
    </div>
  );
};

// ============================================
// 5. LISTS AND KEYS
// ============================================

// Basic list rendering
const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

// List with component
const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

// List with index (use only if items have no stable ID)
const ColorList = ({ colors }) => {
  return (
    <ul>
      {colors.map((color, index) => (
        <li key={index} style={{ color }}>
          {color}
        </li>
      ))}
    </ul>
  );
};

// Filtering and mapping
const ActiveUsers = ({ users }) => {
  const activeUsers = users.filter((user) => user.isActive);

  return (
    <div>
      <h2>Active Users ({activeUsers.length})</h2>
      {activeUsers.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};

// ============================================
// 6. EVENT HANDLING
// ============================================

const EventHandling = () => {
  // Method 1: Inline arrow function
  const handleClick1 = (
    <button onClick={() => console.log('Clicked!')}>Click 1</button>
  );

  // Method 2: Function reference
  const handleClick = () => {
    console.log('Clicked!');
  };
  const handleClick2 = <button onClick={handleClick}>Click 2</button>;

  // Method 3: With parameters
  const handleClickWithParam = (id) => {
    console.log('Clicked item:', id);
  };
  const handleClick3 = (
    <button onClick={() => handleClickWithParam(123)}>Click 3</button>
  );

  // Preventing default behavior
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
  );
};

// ============================================
// PRACTICE EXERCISES
// ============================================

/**
 * TODO 1: Create a ProductCard component
 * - Accept props: name, price, image, inStock
 * - Display product information
 * - Show "In Stock" or "Out of Stock" based on inStock prop
 * - Add a "Add to Cart" button (disabled if out of stock)
 */

const ProductCard = ({ name, price, image, inStock }) => {
  // TODO: Implement this
  return <div>Product Card</div>;
};

/**
 * TODO 2: Create a CommentList component
 * - Accept array of comments: [{ id, author, text, timestamp }]
 * - Display each comment with author and text
 * - Format timestamp to readable date
 * - Add conditional rendering: show "No comments yet" if empty
 */

const CommentList = ({ comments }) => {
  // TODO: Implement this
  return <div>Comment List</div>;
};

/**
 * TODO 3: Create a StatusIndicator component
 * - Accept status prop: 'online', 'offline', 'away', 'busy'
 * - Display different colored dots and text based on status
 * - Use switch statement or object mapping
 */

const StatusIndicator = ({ status }) => {
  // TODO: Implement this
  return <span>Status</span>;
};

/**
 * TODO 4: Create a SearchableList component
 * - Accept items array: [{ id, name, category }]
 * - Display all items
 * - Add search input (just UI for now, no state)
 * - Show item count
 */

const SearchableList = ({ items }) => {
  // TODO: Implement this
  return <div>Searchable List</div>;
};

/**
 * TODO 5: Create a NavigationMenu component
 * - Accept menuItems array: [{ id, label, url, isActive }]
 * - Render navigation links
 * - Highlight active menu item with different styling
 * - Handle click events (console.log for now)
 */

const NavigationMenu = ({ menuItems }) => {
  // TODO: Implement this
  return <nav>Navigation</nav>;
};

// ============================================
// TESTING YOUR COMPONENTS (In a React app)
// ============================================

/**
 * To test these components:
 * 
 * 1. Create a React app: npx create-react-app my-app
 * 2. Copy this file to src/components/
 * 3. Import and use in App.js:
 * 
 * import { ProductCard, CommentList } from './components/01-react-basics';
 * 
 * function App() {
 *   const product = {
 *     name: 'Laptop',
 *     price: 999,
 *     image: 'laptop.jpg',
 *     inStock: true
 *   };
 * 
 *   return (
 *     <div>
 *       <ProductCard {...product} />
 *     </div>
 *   );
 * }
 */

// Export components
export {
  Welcome,
  Greeting,
  Card,
  Button,
  UserCard,
  Profile,
  LoginButton,
  UserGreeting,
  Notification,
  TodoList,
  UserList,
  ProductCard,
  CommentList,
  StatusIndicator,
  SearchableList,
  NavigationMenu,
};
