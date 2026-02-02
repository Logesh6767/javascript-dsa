# MERN Stack Interview - WITH AI Scenarios

These scenarios are designed to test how you leverage AI to build complex features efficiently. Focus on:
- How you prompt AI
- Understanding and modifying AI-generated code
- Making architectural decisions
- Adding improvements beyond AI suggestions

---

## Scenario 1: Complete Authentication System
**Time: 45 minutes | Difficulty: Medium-Hard**

### Requirements
Build a full-stack authentication system with:

**Backend:**
- User registration with email validation
- Password hashing with bcrypt
- Login with JWT token generation
- Protected routes middleware
- Password reset with email (can use nodemailer)
- Refresh token mechanism

**Frontend:**
- Registration form with validation
- Login form with error handling
- Protected routes that redirect to login
- Token management (localStorage or httpOnly cookies)
- Logout functionality

**Database:**
- User model with proper schema validation
- Email uniqueness constraint
- Password field (never return in queries)
- Timestamps

### What Interviewers Look For
- ✅ Proper password hashing (bcrypt with salt rounds)
- ✅ JWT implementation with appropriate expiry
- ✅ Protected routes middleware on backend
- ✅ React Router protected routes on frontend
- ✅ Proper error handling and user feedback
- ✅ Security considerations (httpOnly cookies, CORS)
- ✅ Environment variables for secrets

### Prompts to Try
```
"Create a user registration endpoint in Express with email validation and bcrypt password hashing"

"Build JWT authentication middleware that verifies token and attaches user to request"

"Create a React login form with validation and JWT token storage"

"Implement protected route component in React that redirects to login"
```

### Bonus Points
- Implement refresh token rotation
- Add rate limiting for login attempts
- Email verification before account activation
- Social auth integration (Google, GitHub)

---

## Scenario 2: Real-Time Chat Application
**Time: 60 minutes | Difficulty: Hard**

### Requirements
Build a real-time chat with Socket.io:

**Backend:**
- Socket.io server setup
- User connection/disconnection handling
- Message broadcasting
- Store messages in MongoDB
- Online users tracking
- Private messaging between users

**Frontend:**
- Real-time message display
- Message input with send on Enter
- Online users list
- Typing indicators
- Message timestamps
- Auto-scroll to latest message

**Database:**
- Message schema (sender, receiver, content, timestamp)
- Chat room schema (participants, last message)

### What Interviewers Look For
- ✅ Proper Socket.io setup on both ends
- ✅ Event handling (connection, message, disconnect)
- ✅ Real-time state updates in React
- ✅ Message persistence in database
- ✅ User experience (typing indicators, timestamps)
- ✅ Clean component structure

### Prompts to Try
```
"Set up Socket.io server in Express with connection handling"

"Create React component that connects to Socket.io and displays messages in real-time"

"Implement typing indicator in Socket.io chat"

"Store chat messages in MongoDB with sender and timestamp"
```

### Bonus Points
- Message read receipts
- Image/file sharing
- Message search functionality
- Chat history pagination

---

## Scenario 3: E-Commerce Shopping Cart
**Time: 45 minutes | Difficulty: Medium**

### Requirements
Build shopping cart functionality:

**Backend:**
- Product CRUD operations
- Add/remove items from cart
- Update item quantities
- Calculate cart total with tax
- Apply discount codes
- Create order from cart

**Frontend:**
- Product listing with search/filter
- Add to cart button
- Cart page with item list
- Quantity increment/decrement
- Remove item functionality
- Order summary with totals
- Checkout button

**Database:**
- Product schema (name, price, stock, image)
- Cart schema (user, items array)
- Order schema (user, items, total, status)

### What Interviewers Look For
- ✅ Proper state management for cart
- ✅ Stock validation before adding to cart
- ✅ Accurate total calculations
- ✅ Optimistic UI updates
- ✅ Error handling for out of stock
- ✅ Clean API design

### Prompts to Try
```
"Create Express API endpoints for shopping cart operations (add, remove, update quantity)"

"Build React shopping cart component with items list and total calculation"

"Implement discount code validation in Express"

"Create product listing page with add to cart functionality in React"
```

### Bonus Points
- Wishlist functionality
- Product recommendations
- Cart persistence across sessions
- Inventory management

---

## Scenario 4: Advanced Search & Filtering
**Time: 30 minutes | Difficulty: Medium**

### Requirements
Build advanced search functionality:

**Backend:**
- Full-text search in MongoDB
- Multiple filter combinations (price range, category, rating)
- Sorting (price, date, popularity)
- Pagination with total count
- Search autocomplete suggestions

**Frontend:**
- Search input with debounce
- Filter sidebar with checkboxes/sliders
- Sort dropdown
- Results grid/list
- Pagination controls
- Loading states
- "No results" message

### What Interviewers Look For
- ✅ Debounced search input
- ✅ Efficient MongoDB text search
- ✅ Multiple filter handling
- ✅ Query parameter management in URL
- ✅ Loading and empty states
- ✅ Responsive design

### Prompts to Try
```
"Create MongoDB text search with multiple filters and sorting"

"Build React search component with debounced input and filter sidebar"

"Implement autocomplete suggestions for search"

"Create pagination component with page numbers and next/prev buttons"
```

### Bonus Points
- Search history
- Popular searches
- Search result highlighting
- Save search filters

---

## Scenario 5: File Upload & Management
**Time: 30 minutes | Difficulty: Medium**

### Requirements
Build file upload system:

**Backend:**
- Multer configuration for file uploads
- File validation (type, size)
- Image resizing with Sharp
- Cloud storage integration (optional)
- Get file by ID endpoint
- Delete file endpoint

**Frontend:**
- File input with drag-and-drop
- Upload progress bar
- Image preview before upload
- File list with delete button
- Error handling for invalid files

**Database:**
- File schema (name, size, type, url, uploadedBy)

### What Interviewers Look For
- ✅ Proper Multer setup
- ✅ File validation
- ✅ Progress tracking
- ✅ Error handling
- ✅ Security (file type validation)
- ✅ User feedback (success/error messages)

### Prompts to Try
```
"Set up Multer in Express for image uploads with file validation"

"Create React file upload component with drag-and-drop and preview"

"Implement image resizing with Sharp in Node.js"

"Build upload progress bar in React"
```

### Bonus Points
- Multiple file upload
- Cloud storage (S3, Cloudinary)
- Image cropping
- Generate thumbnails

---

## Scenario 6: Dashboard with Data Visualization
**Time: 45 minutes | Difficulty: Medium-Hard**

### Requirements
Build analytics dashboard:

**Backend:**
- MongoDB aggregation for statistics
- Date range filtering
- Export data as CSV
- Caching with Redis (optional)

**Frontend:**
- Charts (line, bar, pie) with Chart.js or Recharts
- Filter by date range
- Stats cards (total users, revenue, etc.)
- Data table with sorting
- Export button

**Database:**
- Various data models to aggregate

### What Interviewers Look For
- ✅ Complex MongoDB aggregations
- ✅ Data visualization library integration
- ✅ Date handling
- ✅ Performance optimization
- ✅ Clean dashboard layout
- ✅ Responsive design

### Prompts to Try
```
"Create MongoDB aggregation to calculate monthly revenue"

"Build React dashboard with Recharts for data visualization"

"Implement CSV export in Express"

"Create date range filter component in React"
```

### Bonus Points
- Real-time updates
- Comparison with previous period
- Custom date ranges
- Email reports

---

## Scenario 7: Social Media Feed
**Time: 45 minutes | Difficulty: Medium-Hard**

### Requirements
Build social media post feed:

**Backend:**
- Create post (text, image)
- Get feed with pagination
- Like/unlike post
- Comment on post
- Follow/unfollow users
- Feed algorithm (show followed users' posts)

**Frontend:**
- Post creation form
- Feed with infinite scroll
- Like button with count
- Comment section
- Follow button on user profiles

**Database:**
- Post schema (author, content, image, likes, comments)
- User schema (followers, following arrays)
- Comment schema (post ref, author, content)

### What Interviewers Look For
- ✅ Efficient feed queries
- ✅ Infinite scroll implementation
- ✅ Optimistic UI updates
- ✅ Real-time like count updates
- ✅ Proper data relationships
- ✅ Clean component structure

### Prompts to Try
```
"Create Express API for social media posts with like and comment functionality"

"Build React infinite scroll feed component"

"Implement follow/unfollow system in MongoDB with user references"

"Create post card component with like and comment features"
```

### Bonus Points
- Image upload for posts
- Hashtags and mentions
- Post sharing
- Notifications

---

## General Tips for AI-Assisted Coding

### 1. Start with Clear Prompts
```
❌ Bad: "Make a user login"
✅ Good: "Create Express login endpoint that validates email/password, returns JWT token, and handles invalid credentials with 401 status"
```

### 2. Break Down Complex Tasks
```
Step 1: Get backend authentication working
Step 2: Build frontend login form
Step 3: Integrate them together
Step 4: Add error handling
Step 5: Add loading states
```

### 3. Review and Understand AI Code
- Read every line AI generates
- Ask AI to explain complex parts
- Test edge cases AI might miss
- Add comments to clarify logic

### 4. Common AI Mistakes to Watch For
- Missing error handling
- No input validation
- Hardcoded values instead of env variables
- Security vulnerabilities (SQL injection, XSS)
- Missing null checks
- Inefficient queries

### 5. Enhance AI Suggestions
After AI gives you code:
- Add comprehensive error messages
- Implement loading states
- Add input validation
- Consider edge cases
- Improve variable names
- Add comments
- Optimize performance

### 6. Architecture Decisions (Your Job!)
AI can write code, but YOU decide:
- State management approach
- Component structure
- API endpoint design
- Database schema
- Security measures
- Error handling strategy

---

## Interview Day Strategy

### Time Allocation (60 min with AI)
- **5 min**: Read requirements, plan architecture
- **10 min**: Set up basic structure (models, routes, components)
- **25 min**: Implement core features with AI
- **10 min**: Test and fix bugs
- **5 min**: Add error handling and polish
- **5 min**: Review code, add comments

### Show Your Thought Process
1. Read requirements OUT LOUD
2. Sketch architecture (DB schema, API endpoints, components)
3. Explain what you'll build first and why
4. Explain your prompts to AI
5. Review AI code and explain what it does
6. Point out improvements you made

### Questions to Ask Before Starting
- "Should I focus on backend or full-stack?"
- "Any specific libraries I should/shouldn't use?"
- "What's more important: features or code quality?"
- "Should I prioritize error handling or get features working first?"

---

## Red Flags Interviewers Watch For

❌ **Blindly copying AI code without understanding**
✅ Read and explain every part

❌ **Not testing the code**
✅ Test as you build

❌ **Ignoring errors and moving on**
✅ Fix errors immediately

❌ **No error handling**
✅ Add try-catch, validation, user feedback

❌ **Messy, uncommented code**
✅ Clean structure, meaningful names, comments

❌ **Poor prompting (vague, unclear)**
✅ Specific, detailed prompts

❌ **Not improving AI suggestions**
✅ Add enhancements, fix issues

❌ **No security considerations**
✅ Validate inputs, hash passwords, use env variables

---

## Final Checklist Before Submitting

- [ ] All features work as required
- [ ] Proper error handling on backend
- [ ] User-friendly error messages on frontend
- [ ] Input validation on both ends
- [ ] No console.logs left in code
- [ ] Environment variables for sensitive data
- [ ] Code is well-organized and commented
- [ ] Tested edge cases (empty inputs, invalid data)
- [ ] Loading states where appropriate
- [ ] Responsive design (if applicable)
- [ ] README with setup instructions
- [ ] No obvious security vulnerabilities

**Good luck! Remember: Show your thinking, not just coding speed.** 🚀
