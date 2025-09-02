export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  exercise?: {
    instructions: string;
    starterCode: string;
    solution: string;
    tests: string[];
  };
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  lessons: Lesson[];
  cheatSheet: string;
}

export const courses: Course[] = [
  {
    id: 'html',
    title: 'HTML Fundamentals',
    description: 'Learn the building blocks of web development with HTML',
    icon: '🏗️',
    color: 'bg-orange-500',
    difficulty: 'Beginner',
    estimatedTime: '4 hours',
    cheatSheet: `# HTML Cheat Sheet

## Document Structure
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>
\`\`\`

## Text Elements
- \`<h1>\` to \`<h6>\` - Headings (largest to smallest)
- \`<p>\` - Paragraph
- \`<br>\` - Line break
- \`<hr>\` - Horizontal rule
- \`<strong>\` - Bold text (important)
- \`<em>\` - Italic text (emphasis)
- \`<mark>\` - Highlighted text
- \`<small>\` - Smaller text
- \`<del>\` - Deleted text
- \`<ins>\` - Inserted text

## Links and Media
- \`<a href="url">\` - Link
- \`<img src="image.jpg" alt="description">\` - Image
- \`<video controls>\` - Video player
- \`<audio controls>\` - Audio player

## Lists
- \`<ul>\` - Unordered list
- \`<ol>\` - Ordered list
- \`<li>\` - List item
- \`<dl>\` - Description list
- \`<dt>\` - Description term
- \`<dd>\` - Description definition

## Tables
- \`<table>\` - Table container
- \`<thead>\` - Table header
- \`<tbody>\` - Table body
- \`<tfoot>\` - Table footer
- \`<tr>\` - Table row
- \`<th>\` - Header cell
- \`<td>\` - Data cell

## Forms
- \`<form>\` - Form container
- \`<input type="text">\` - Text input
- \`<input type="email">\` - Email input
- \`<input type="password">\` - Password input
- \`<input type="checkbox">\` - Checkbox
- \`<input type="radio">\` - Radio button
- \`<textarea>\` - Multi-line text
- \`<select>\` - Dropdown
- \`<option>\` - Dropdown option
- \`<button>\` - Button
- \`<label>\` - Form label

## Semantic Elements
- \`<header>\` - Page/section header
- \`<nav>\` - Navigation
- \`<main>\` - Main content
- \`<article>\` - Article content
- \`<section>\` - Content section
- \`<aside>\` - Sidebar content
- \`<footer>\` - Page/section footer

## Attributes
- \`id="unique-identifier"\` - Unique identifier
- \`class="css-class"\` - CSS class
- \`style="css-properties"\` - Inline styles
- \`title="tooltip-text"\` - Tooltip
- \`data-*="custom-data"\` - Custom data attributes`,
    lessons: [
      {
        id: 'html-basics',
        title: 'HTML Document Structure',
        content: `# HTML Document Structure

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the structure and content of web documents using elements and tags.

## Basic HTML Document

Every HTML document follows a standard structure:

1. **DOCTYPE Declaration**: Tells the browser which version of HTML to use
2. **HTML Element**: The root element that contains all other elements
3. **Head Section**: Contains metadata about the document
4. **Body Section**: Contains the visible content

## Key Concepts

- **Elements**: Building blocks of HTML pages (e.g., \`<h1>\`, \`<p>\`, \`<div>\`)
- **Tags**: Keywords surrounded by angle brackets (\`<tagname>\`)
- **Attributes**: Provide additional information about elements
- **Nesting**: Elements can contain other elements

## Best Practices

- Always include the DOCTYPE declaration
- Use semantic HTML elements when possible
- Provide alt text for images
- Use proper heading hierarchy (h1, h2, h3, etc.)
- Validate your HTML code`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
    <meta name="description" content="A simple HTML page example">
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Home Section</h2>
            <p>This is the main content of my webpage. HTML provides the structure for web content.</p>
            <img src="https://via.placeholder.com/300x200" alt="Placeholder image">
        </section>
        
        <section id="about">
            <h2>About Section</h2>
            <p>Learn more about <strong>HTML</strong> and web development.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</body>
</html>`,
        exercise: {
          instructions: 'Create a complete HTML page about yourself with proper structure, including header, main content, and footer sections.',
          starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Me</title>
</head>
<body>
    <!-- Create your page structure here -->
    <!-- Include: header with your name, main section with information about you, and a footer -->
</body>
</html>`,
          solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Me - John Doe</title>
    <meta name="description" content="Personal webpage of John Doe">
</head>
<body>
    <header>
        <h1>John Doe</h1>
        <p>Web Developer & Designer</p>
    </header>
    
    <main>
        <section>
            <h2>About Me</h2>
            <p>Hello! I'm John, a passionate web developer with 3 years of experience in creating beautiful and functional websites.</p>
            <p>I specialize in <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>.</p>
        </section>
        
        <section>
            <h2>My Skills</h2>
            <ul>
                <li>HTML5 & Semantic Markup</li>
                <li>CSS3 & Responsive Design</li>
                <li>JavaScript & DOM Manipulation</li>
                <li>React & Modern Frameworks</li>
            </ul>
        </section>
        
        <section>
            <h2>Contact</h2>
            <p>Feel free to reach out to me:</p>
            <ul>
                <li>Email: john@example.com</li>
                <li>LinkedIn: <a href="#">linkedin.com/in/johndoe</a></li>
                <li>GitHub: <a href="#">github.com/johndoe</a></li>
            </ul>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 John Doe. All rights reserved.</p>
    </footer>
</body>
</html>`,
          tests: [
            'Document should have proper DOCTYPE declaration',
            'Page should have a meaningful title',
            'Should include header, main, and footer elements',
            'Should use proper heading hierarchy (h1, h2)',
            'Should include personal information and contact details'
          ]
        },
        quiz: [
          {
            question: 'What does HTML stand for?',
            options: [
              'Hyper Text Markup Language',
              'High Tech Modern Language',
              'Home Tool Markup Language',
              'Hyperlink and Text Markup Language'
            ],
            correctAnswer: 0,
            explanation: 'HTML stands for HyperText Markup Language. It is the standard markup language for creating web pages.'
          },
          {
            question: 'Which element is used to define the main content of an HTML document?',
            options: ['<content>', '<main>', '<body>', '<section>'],
            correctAnswer: 1,
            explanation: 'The <main> element represents the main content of the document, excluding headers, footers, and sidebars.'
          }
        ]
      },
      {
        id: 'html-forms',
        title: 'HTML Forms and Input Elements',
        content: `# HTML Forms and Input Elements

Forms are essential for collecting user input on web pages. They allow users to submit data to servers for processing.

## Form Structure

The \`<form>\` element acts as a container for form controls. Key attributes:
- **action**: URL where form data is sent
- **method**: HTTP method (GET or POST)
- **enctype**: How form data is encoded

## Input Types

HTML5 provides many input types for different data:
- \`text\` - Single-line text
- \`email\` - Email addresses
- \`password\` - Hidden text
- \`number\` - Numeric input
- \`date\` - Date picker
- \`checkbox\` - Multiple selections
- \`radio\` - Single selection from group
- \`file\` - File upload

## Form Validation

HTML5 includes built-in validation:
- \`required\` - Field must be filled
- \`pattern\` - Regular expression validation
- \`min/max\` - Numeric ranges
- \`minlength/maxlength\` - Text length limits

## Accessibility

Always include:
- \`<label>\` elements for form controls
- \`for\` attribute linking labels to inputs
- \`fieldset\` and \`legend\` for grouping
- Descriptive placeholder text`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Example</title>
</head>
<body>
    <h1>Contact Us</h1>
    
    <form action="/submit-contact" method="post">
        <fieldset>
            <legend>Personal Information</legend>
            
            <div>
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required>
            </div>
            
            <div>
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required>
            </div>
            
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div>
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890">
            </div>
        </fieldset>
        
        <fieldset>
            <legend>Message Details</legend>
            
            <div>
                <label for="subject">Subject:</label>
                <select id="subject" name="subject" required>
                    <option value="">Choose a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                </select>
            </div>
            
            <div>
                <label for="priority">Priority:</label>
                <input type="radio" id="low" name="priority" value="low" checked>
                <label for="low">Low</label>
                
                <input type="radio" id="medium" name="priority" value="medium">
                <label for="medium">Medium</label>
                
                <input type="radio" id="high" name="priority" value="high">
                <label for="high">High</label>
            </div>
            
            <div>
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="5" cols="50" required minlength="10" maxlength="500"></textarea>
            </div>
            
            <div>
                <input type="checkbox" id="newsletter" name="newsletter" value="yes">
                <label for="newsletter">Subscribe to our newsletter</label>
            </div>
            
            <div>
                <label for="attachment">Attach file:</label>
                <input type="file" id="attachment" name="attachment" accept=".pdf,.doc,.docx">
            </div>
        </fieldset>
        
        <div>
            <button type="submit">Send Message</button>
            <button type="reset">Clear Form</button>
        </div>
    </form>
</body>
</html>`,
        exercise: {
          instructions: 'Create a user registration form with validation. Include fields for username, email, password, confirm password, age, and terms agreement.',
          starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration</title>
</head>
<body>
    <h1>Create Account</h1>
    
    <form action="/register" method="post">
        <!-- Create your registration form here -->
        <!-- Include: username, email, password, confirm password, age, and terms checkbox -->
    </form>
</body>
</html>`,
          solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration</title>
</head>
<body>
    <h1>Create Account</h1>
    
    <form action="/register" method="post">
        <fieldset>
            <legend>Account Information</legend>
            
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required minlength="3" maxlength="20" pattern="[a-zA-Z0-9_]+" title="Username can only contain letters, numbers, and underscores">
            </div>
            
            <div>
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required minlength="8" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}" title="Password must be at least 8 characters with uppercase, lowercase, and number">
            </div>
            
            <div>
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            </div>
            
            <div>
                <label for="age">Age:</label>
                <input type="number" id="age" name="age" min="13" max="120" required>
            </div>
            
            <div>
                <label for="birthdate">Date of Birth:</label>
                <input type="date" id="birthdate" name="birthdate" required>
            </div>
            
            <div>
                <label for="country">Country:</label>
                <select id="country" name="country" required>
                    <option value="">Select your country</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="au">Australia</option>
                    <option value="other">Other</option>
                </select>
            </div>
            
            <div>
                <input type="checkbox" id="terms" name="terms" required>
                <label for="terms">I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></label>
            </div>
            
            <div>
                <input type="checkbox" id="newsletter" name="newsletter">
                <label for="newsletter">Send me updates and newsletters</label>
            </div>
        </fieldset>
        
        <div>
            <button type="submit">Create Account</button>
            <button type="reset">Clear Form</button>
        </div>
    </form>
</body>
</html>`,
          tests: [
            'Form should have proper action and method attributes',
            'All required fields should have required attribute',
            'Password field should have minimum length validation',
            'Email field should use email input type',
            'Age field should have min/max validation',
            'Terms checkbox should be required',
            'All inputs should have associated labels'
          ]
        }
      }
    ]
  },
  {
    id: 'css',
    title: 'CSS Styling',
    description: 'Master the art of styling and layout with CSS',
    icon: '🎨',
    color: 'bg-blue-500',
    difficulty: 'Beginner',
    estimatedTime: '6 hours',
    cheatSheet: `# CSS Cheat Sheet

## Selectors
\`\`\`css
/* Element selector */
p { color: blue; }

/* Class selector */
.my-class { font-size: 16px; }

/* ID selector */
#my-id { background: yellow; }

/* Attribute selector */
[type="text"] { border: 1px solid gray; }

/* Pseudo-class */
a:hover { color: red; }

/* Pseudo-element */
p::first-line { font-weight: bold; }

/* Descendant selector */
div p { margin: 10px; }

/* Child selector */
div > p { padding: 5px; }

/* Adjacent sibling */
h1 + p { margin-top: 0; }

/* General sibling */
h1 ~ p { color: gray; }
\`\`\`

## Box Model
\`\`\`css
.box {
    width: 300px;
    height: 200px;
    padding: 20px;
    border: 2px solid black;
    margin: 10px;
    box-sizing: border-box; /* Include padding and border in width */
}
\`\`\`

## Flexbox
\`\`\`css
.flex-container {
    display: flex;
    justify-content: center; /* horizontal alignment */
    align-items: center; /* vertical alignment */
    flex-direction: row; /* row | column */
    flex-wrap: wrap; /* wrap | nowrap */
    gap: 20px;
}

.flex-item {
    flex: 1; /* grow, shrink, basis */
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;
}
\`\`\`

## Grid
\`\`\`css
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 20px;
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
}

.grid-item {
    grid-column: 1 / 3; /* start / end */
    grid-row: 2 / 4;
    grid-area: header; /* named area */
}
\`\`\`

## Positioning
\`\`\`css
.positioned {
    position: relative; /* static | relative | absolute | fixed | sticky */
    top: 10px;
    left: 20px;
    z-index: 100;
}
\`\`\`

## Typography
\`\`\`css
.text {
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    font-weight: bold; /* normal | bold | 100-900 */
    font-style: italic;
    line-height: 1.5;
    text-align: center;
    text-decoration: underline;
    text-transform: uppercase;
    letter-spacing: 2px;
    word-spacing: 4px;
}
\`\`\`

## Colors and Backgrounds
\`\`\`css
.colorful {
    color: #ff0000; /* hex */
    color: rgb(255, 0, 0); /* rgb */
    color: rgba(255, 0, 0, 0.5); /* rgba with alpha */
    color: hsl(0, 100%, 50%); /* hsl */
    
    background-color: blue;
    background-image: url('image.jpg');
    background-size: cover; /* contain | cover | 100px 200px */
    background-position: center;
    background-repeat: no-repeat;
    
    /* Gradient */
    background: linear-gradient(45deg, red, blue);
    background: radial-gradient(circle, red, blue);
}
\`\`\`

## Transitions and Animations
\`\`\`css
.animated {
    transition: all 0.3s ease-in-out;
    transition-property: opacity, transform;
    transition-duration: 0.5s;
    transition-timing-function: ease;
    transition-delay: 0.1s;
}

@keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}

.slide {
    animation: slideIn 1s ease-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}
\`\`\`

## Responsive Design
\`\`\`css
/* Mobile first approach */
.responsive {
    width: 100%;
}

@media (min-width: 768px) {
    .responsive {
        width: 50%;
    }
}

@media (min-width: 1024px) {
    .responsive {
        width: 33.333%;
    }
}

/* Common breakpoints */
/* Mobile: 320px - 768px */
/* Tablet: 768px - 1024px */
/* Desktop: 1024px+ */
\`\`\`

## Common Properties
\`\`\`css
.utility {
    display: block; /* none | inline | block | inline-block | flex | grid */
    visibility: visible; /* hidden | visible */
    opacity: 0.8; /* 0 to 1 */
    overflow: hidden; /* visible | hidden | scroll | auto */
    cursor: pointer; /* default | pointer | text | wait | help */
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transform: rotate(45deg) scale(1.2) translate(10px, 20px);
}
\`\`\``,
    lessons: [
      {
        id: 'css-basics',
        title: 'CSS Fundamentals and Selectors',
        content: `# CSS Fundamentals and Selectors

CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the presentation of HTML elements, including colors, fonts, spacing, and positioning.

## How CSS Works

CSS works by selecting HTML elements and applying styles to them. The "cascading" nature means styles can inherit from parent elements and be overridden by more specific rules.

## CSS Syntax

CSS rules consist of:
- **Selector**: Targets HTML elements
- **Property**: What aspect to style
- **Value**: How to style it

## Types of Selectors

1. **Element Selector**: Targets all elements of a type
2. **Class Selector**: Targets elements with a specific class
3. **ID Selector**: Targets a unique element with an ID
4. **Attribute Selector**: Targets elements with specific attributes
5. **Pseudo-classes**: Target elements in specific states

## The Box Model

Every HTML element is a rectangular box with:
- **Content**: The actual content
- **Padding**: Space inside the element
- **Border**: Line around the element
- **Margin**: Space outside the element

## CSS Specificity

More specific selectors override less specific ones:
1. Inline styles (highest)
2. IDs
3. Classes, attributes, pseudo-classes
4. Elements (lowest)`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Fundamentals</title>
    <style>
        /* Element selector - targets all paragraphs */
        p {
            color: #333;
            line-height: 1.6;
            margin-bottom: 16px;
        }
        
        /* Class selector - targets elements with class="highlight" */
        .highlight {
            background-color: #ffeb3b;
            padding: 8px;
            border-radius: 4px;
        }
        
        /* ID selector - targets element with id="main-title" */
        #main-title {
            color: #2196f3;
            font-size: 2.5em;
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #2196f3;
            padding-bottom: 10px;
        }
        
        /* Attribute selector - targets input elements with type="text" */
        input[type="text"] {
            border: 2px solid #ddd;
            padding: 10px;
            border-radius: 5px;
            font-size: 16px;
        }
        
        /* Pseudo-class - targets links when hovered */
        a:hover {
            color: #ff5722;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        /* Descendant selector - targets spans inside paragraphs */
        p span {
            font-weight: bold;
            color: #e91e63;
        }
        
        /* Class with pseudo-class */
        .button:hover {
            background-color: #1976d2;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        /* Box model demonstration */
        .box-example {
            width: 300px;
            padding: 20px;
            border: 5px solid #4caf50;
            margin: 20px auto;
            background-color: #e8f5e8;
            box-sizing: border-box; /* Include padding and border in width */
        }
        
        /* Multiple selectors */
        h1, h2, h3 {
            font-family: 'Arial', sans-serif;
            color: #424242;
        }
        
        /* Styling form elements */
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }
        
        .button {
            background-color: #2196f3;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }
    </style>
</head>
<body>
    <h1 id="main-title">CSS Fundamentals Demo</h1>
    
    <p>This is a regular paragraph with some <span>highlighted text</span> inside it.</p>
    
    <p class="highlight">This paragraph has the highlight class applied to it.</p>
    
    <div class="box-example">
        <h3>Box Model Example</h3>
        <p>This div demonstrates the CSS box model with width, padding, border, and margin.</p>
    </div>
    
    <form>
        <div class="form-group">
            <label for="name">Your Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name">
        </div>
        
        <div class="form-group">
            <label for="email">Your Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email">
        </div>
        
        <button type="submit" class="button">Submit Form</button>
    </form>
    
    <p>Visit our <a href="#home">homepage</a> for more information.</p>
</body>
</html>`,
        exercise: {
          instructions: 'Create a styled webpage for a coffee shop. Include a header, menu section with different coffee types, and a footer. Use various CSS selectors and properties to make it visually appealing.',
          starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coffee Shop</title>
    <style>
        /* Add your CSS styles here */
    </style>
</head>
<body>
    <header>
        <h1>Brew & Bean Coffee Shop</h1>
        <p>Serving the finest coffee since 1995</p>
    </header>
    
    <main>
        <section class="menu">
            <h2>Our Menu</h2>
            <div class="coffee-item">
                <h3>Espresso</h3>
                <p class="price">$2.50</p>
                <p class="description">Rich and bold coffee shot</p>
            </div>
            <div class="coffee-item">
                <h3>Cappuccino</h3>
                <p class="price">$4.00</p>
                <p class="description">Espresso with steamed milk and foam</p>
            </div>
            <div class="coffee-item featured">
                <h3>House Special Latte</h3>
                <p class="price">$5.50</p>
                <p class="description">Our signature blend with vanilla and cinnamon</p>
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Brew & Bean Coffee Shop</p>
        <p>Visit us at <a href="#">123 Coffee Street</a></p>
    </footer>
</body>
</html>`,
          solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coffee Shop</title>
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        
        /* Header styles */
        header {
            background: linear-gradient(135deg, #8B4513, #D2691E);
            color: white;
            text-align: center;
            padding: 60px 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        header h1 {
            font-size: 3em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        header p {
            font-size: 1.2em;
            font-style: italic;
            opacity: 0.9;
        }
        
        /* Main content */
        main {
            max-width: 800px;
            margin: 40px auto;
            padding: 0 20px;
        }
        
        .menu h2 {
            text-align: center;
            font-size: 2.5em;
            color: #8B4513;
            margin-bottom: 40px;
            position: relative;
        }
        
        .menu h2::after {
            content: '';
            display: block;
            width: 100px;
            height: 3px;
            background-color: #D2691E;
            margin: 10px auto;
        }
        
        /* Coffee item styles */
        .coffee-item {
            background: white;
            margin-bottom: 30px;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-left: 5px solid #D2691E;
        }
        
        .coffee-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .coffee-item h3 {
            color: #8B4513;
            font-size: 1.8em;
            margin-bottom: 10px;
        }
        
        .price {
            font-size: 1.5em;
            font-weight: bold;
            color: #D2691E;
            margin-bottom: 10px;
        }
        
        .description {
            color: #666;
            font-style: italic;
            line-height: 1.5;
        }
        
        /* Featured item */
        .coffee-item.featured {
            background: linear-gradient(135deg, #fff8e1, #ffecb3);
            border-left-color: #FF6F00;
            position: relative;
            overflow: hidden;
        }
        
        .coffee-item.featured::before {
            content: '★ FEATURED ★';
            position: absolute;
            top: 15px;
            right: -30px;
            background: #FF6F00;
            color: white;
            padding: 5px 40px;
            font-size: 12px;
            font-weight: bold;
            transform: rotate(45deg);
        }
        
        .coffee-item.featured h3 {
            color: #E65100;
        }
        
        .coffee-item.featured .price {
            color: #FF6F00;
        }
        
        /* Footer styles */
        footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 40px 20px;
            margin-top: 60px;
        }
        
        footer p {
            margin-bottom: 10px;
        }
        
        footer a {
            color: #D2691E;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        footer a:hover {
            color: #FF6F00;
            text-decoration: underline;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            header h1 {
                font-size: 2em;
            }
            
            .menu h2 {
                font-size: 2em;
            }
            
            .coffee-item {
                padding: 20px;
            }
            
            .coffee-item h3 {
                font-size: 1.5em;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>Brew & Bean Coffee Shop</h1>
        <p>Serving the finest coffee since 1995</p>
    </header>
    
    <main>
        <section class="menu">
            <h2>Our Menu</h2>
            <div class="coffee-item">
                <h3>Espresso</h3>
                <p class="price">$2.50</p>
                <p class="description">Rich and bold coffee shot made from our premium blend of arabica beans</p>
            </div>
            <div class="coffee-item">
                <h3>Cappuccino</h3>
                <p class="price">$4.00</p>
                <p class="description">Perfect balance of espresso, steamed milk, and velvety foam, dusted with cocoa</p>
            </div>
            <div class="coffee-item featured">
                <h3>House Special Latte</h3>
                <p class="price">$5.50</p>
                <p class="description">Our signature blend with Madagascar vanilla, Ceylon cinnamon, and artisan steamed milk</p>
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Brew & Bean Coffee Shop. All rights reserved.</p>
        <p>Visit us at <a href="#">123 Coffee Street, Downtown</a> | Call: (555) 123-BREW</p>
    </footer>
</body>
</html>`,
          tests: [
            'Header should have background color or gradient',
            'Coffee items should have distinct styling',
            'Featured item should stand out from regular items',
            'Hover effects should be implemented',
            'Footer should have different styling from main content',
            'Typography should be well-styled with appropriate fonts',
            'Color scheme should be cohesive throughout'
          ]
        }
      }
    ]
  }
];
