/**
 * DAY 21: Week 3 Review & Mini Project
 * 
 * Review all React concepts and build a comprehensive mini project
 * 
 * Topics Covered This Week:
 * - React basics, JSX, components, props
 * - useState, useEffect hooks
 * - useContext, useReducer, useRef
 * - Custom hooks
 * - Performance optimization (useMemo, useCallback, memo)
 * - Advanced patterns (HOC, render props, compound components)
 */

import React, { useState, useEffect, useReducer, useContext, createContext, useMemo, useCallback, memo } from 'react';

// ============================================
// WEEK 3 REVIEW QUESTIONS
// ============================================

/**
 * REVIEW QUESTIONS - Answer these before starting the project
 * 
 * 1. What's the difference between useState and useReducer?
 * 2. When should you use useCallback vs useMemo?
 * 3. What does useEffect's dependency array do?
 * 4. How does useContext help avoid prop drilling?
 * 5. What's the purpose of React.memo?
 * 6. When should you create a custom hook?
 * 7. What's the cleanup function in useEffect for?
 * 8. How do compound components work?
 * 9. What's the difference between controlled and uncontrolled components?
 * 10. When should you optimize React components?
 */

// ============================================
// MINI PROJECT: TASK MANAGEMENT APP
// ============================================

/**
 * PROJECT REQUIREMENTS:
 * 
 * Build a task management application with the following features:
 * 
 * 1. TASK CRUD OPERATIONS
 *    - Add new tasks with title, description, priority, due date
 *    - Edit existing tasks
 *    - Delete tasks
 *    - Mark tasks as complete/incomplete
 * 
 * 2. FILTERING & SORTING
 *    - Filter by: All, Active, Completed, High Priority
 *    - Sort by: Due Date, Priority, Created Date
 *    - Search tasks by title/description
 * 
 * 3. CATEGORIES/PROJECTS
 *    - Create task categories (Work, Personal, etc.)
 *    - Assign tasks to categories
 *    - Filter by category
 * 
 * 4. PERSISTENCE
 *    - Save tasks to localStorage
 *    - Load tasks on mount
 * 
 * 5. OPTIMIZATION
 *    - Memoize expensive computations
 *    - Optimize re-renders
 * 
 * 6. CUSTOM HOOKS
 *    - useLocalStorage
 *    - useDebounce
 *    - useToggle
 * 
 * BONUS FEATURES:
 * - Dark mode toggle
 * - Task statistics dashboard
 * - Drag and drop to reorder
 * - Task tags
 * - Export/Import tasks
 */

// ============================================
// SOLUTION STRUCTURE (Fill in the TODOs)
// ============================================

// Custom Hooks
function useLocalStorage(key, initialValue) {
  // TODO: Implement useLocalStorage hook
  // - Get value from localStorage on mount
  // - Update localStorage when value changes
  // - Handle JSON serialization
  
  const [value, setValue] = useState(initialValue);
  return [value, setValue];
}

function useDebounce(value, delay = 500) {
  // TODO: Implement useDebounce hook
  // - Return debounced value
  // - Clear timeout on unmount
  
  return value;
}

function useToggle(initialValue = false) {
  // TODO: Implement useToggle hook
  // - Return [value, toggle, setTrue, setFalse]
  
  const [value, setValue] = useState(initialValue);
  return [value, () => setValue(!value)];
}

// Context for global state
const TaskContext = createContext();

// Task reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      // TODO: Add new task to state
      return state;

    case 'UPDATE_TASK':
      // TODO: Update task by id
      return state;

    case 'DELETE_TASK':
      // TODO: Remove task by id
      return state;

    case 'TOGGLE_TASK':
      // TODO: Toggle task completion
      return state;

    case 'SET_FILTER':
      // TODO: Update filter
      return state;

    case 'SET_SORT':
      // TODO: Update sort order
      return state;

    default:
      return state;
  }
};

// Task Provider
const TaskProvider = ({ children }) => {
  const initialState = {
    tasks: [],
    filter: 'all',
    sortBy: 'created',
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);
  
  // TODO: Load tasks from localStorage on mount
  // TODO: Save tasks to localStorage when they change

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// Task Form Component
const TaskForm = ({ task, onSubmit, onCancel }) => {
  // TODO: Create form with fields:
  // - title (required)
  // - description
  // - priority (low, medium, high)
  // - dueDate
  // - category
  
  // TODO: Handle validation
  // TODO: Call onSubmit with task data

  return (
    <form>
      <h3>{task ? 'Edit Task' : 'New Task'}</h3>
      {/* TODO: Add form fields */}
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

// Task Item Component (Memoized)
const TaskItem = memo(({ task, onToggle, onEdit, onDelete }) => {
  // TODO: Display task information
  // TODO: Show checkbox to toggle completion
  // TODO: Show edit and delete buttons
  // TODO: Apply different styles based on priority
  // TODO: Show due date and category

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div>
        <h4>{task.title}</h4>
        {/* TODO: Add more task details */}
      </div>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
});

// Task List Component
const TaskList = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // TODO: Use useDebounce for search term
  const debouncedSearch = useDebounce(searchTerm, 300);

  // TODO: Memoize filtered and sorted tasks
  const displayedTasks = useMemo(() => {
    let filtered = state.tasks;

    // Filter by completion status
    if (state.filter === 'active') {
      filtered = filtered.filter(t => !t.completed);
    } else if (state.filter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    // Filter by search term
    if (debouncedSearch) {
      // TODO: Filter by title/description
    }

    // Sort tasks
    // TODO: Sort by state.sortBy

    return filtered;
  }, [state.tasks, state.filter, state.sortBy, debouncedSearch]);

  // TODO: Memoize callback functions
  const handleToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, [dispatch]);

  const handleEdit = useCallback((task) => {
    setEditingTask(task);
  }, []);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks..."
      />

      {editingTask ? (
        <TaskForm
          task={editingTask}
          onSubmit={(task) => {
            dispatch({ type: 'UPDATE_TASK', payload: task });
            setEditingTask(null);
          }}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <TaskForm
          onSubmit={(task) => {
            dispatch({ type: 'ADD_TASK', payload: task });
          }}
          onCancel={() => {}}
        />
      )}

      <div>
        {displayedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

// Filter Bar Component
const FilterBar = () => {
  const { state, dispatch } = useContext(TaskContext);

  // TODO: Display filter buttons
  // TODO: Display sort options
  // TODO: Calculate and display task statistics

  return (
    <div className="filter-bar">
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
      </div>

      <div>
        <label>Sort by:</label>
        <select
          value={state.sortBy}
          onChange={(e) => dispatch({ type: 'SET_SORT', payload: e.target.value })}
        >
          <option value="created">Created Date</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
};

// Statistics Component
const TaskStatistics = () => {
  const { state } = useContext(TaskContext);

  // TODO: Calculate statistics with useMemo
  const stats = useMemo(() => {
    return {
      total: state.tasks.length,
      completed: state.tasks.filter(t => t.completed).length,
      active: state.tasks.filter(t => !t.completed).length,
      highPriority: state.tasks.filter(t => t.priority === 'high').length,
    };
  }, [state.tasks]);

  return (
    <div className="statistics">
      <div>Total: {stats.total}</div>
      <div>Completed: {stats.completed}</div>
      <div>Active: {stats.active}</div>
      <div>High Priority: {stats.highPriority}</div>
    </div>
  );
};

// Main App Component
const TaskManagementApp = () => {
  const [darkMode, toggleDarkMode] = useToggle(false);

  return (
    <TaskProvider>
      <div className={darkMode ? 'app dark' : 'app'}>
        <header>
          <h1>Task Manager</h1>
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        <TaskStatistics />
        <FilterBar />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

// ============================================
// BONUS CHALLENGES
// ============================================

/**
 * TODO 1: Add drag and drop functionality
 * - Install react-beautiful-dnd or implement custom solution
 * - Allow reordering tasks by dragging
 * - Persist order in localStorage
 */

/**
 * TODO 2: Add task tags
 * - Create Tag management system
 * - Allow adding multiple tags to tasks
 * - Filter by tags
 * - Tag autocomplete
 */

/**
 * TODO 3: Add export/import functionality
 * - Export tasks as JSON
 * - Import tasks from JSON file
 * - Validate imported data
 */

/**
 * TODO 4: Add task recurrence
 * - Allow tasks to repeat (daily, weekly, monthly)
 * - Auto-create new task when completed
 * - Show upcoming recurring tasks
 */

/**
 * TODO 5: Add collaboration features
 * - Assign tasks to team members
 * - Add comments to tasks
 * - Task activity log
 */

// ============================================
// TESTING YOUR APP
// ============================================

/**
 * To run this app:
 * 
 * 1. Create a new React app:
 *    npx create-react-app task-manager
 * 
 * 2. Copy this file to src/
 * 
 * 3. Import in App.js:
 *    import { TaskManagementApp } from './07-week3-review';
 *    function App() {
 *      return <TaskManagementApp />;
 *    }
 * 
 * 4. Add CSS styling in App.css
 * 
 * 5. Run: npm start
 */

// ============================================
// SELF-ASSESSMENT CHECKLIST
// ============================================

/**
 * After completing the project, verify you've used:
 * 
 * ✓ useState for local component state
 * ✓ useEffect for side effects (localStorage)
 * ✓ useReducer for complex state management
 * ✓ useContext to avoid prop drilling
 * ✓ useMemo for expensive computations
 * ✓ useCallback for memoized callbacks
 * ✓ Custom hooks (useLocalStorage, useDebounce, useToggle)
 * ✓ React.memo for component optimization
 * ✓ Proper key usage in lists
 * ✓ Controlled components for forms
 * ✓ Error handling
 * ✓ Clean code structure
 * 
 * BONUS:
 * ✓ Compound components pattern
 * ✓ Error boundaries
 * ✓ PropTypes or TypeScript
 * ✓ Accessibility features
 */

export {
  TaskManagementApp,
  TaskProvider,
  TaskList,
  TaskForm,
  TaskItem,
  FilterBar,
  TaskStatistics,
  useLocalStorage,
  useDebounce,
  useToggle,
};
