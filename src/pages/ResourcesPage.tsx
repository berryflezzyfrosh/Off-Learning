import React, { useState } from 'react';
import { courses } from '../data/courses';
import { Download, Search, BookOpen, ExternalLink, Code, FileText } from 'lucide-react';

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: 'html-reference',
      title: 'HTML Element Reference',
      description: 'Complete reference of all HTML elements and their attributes',
      category: 'html',
      type: 'reference',
      content: `# HTML Element Reference

## Document Structure
- \`<!DOCTYPE html>\` - Document type declaration
- \`<html>\` - Root element
- \`<head>\` - Document metadata
- \`<body>\` - Document body
- \`<title>\` - Document title
- \`<meta>\` - Metadata

## Text Content
- \`<h1>\` to \`<h6>\` - Headings
- \`<p>\` - Paragraph
- \`<br>\` - Line break
- \`<hr>\` - Horizontal rule
- \`<pre>\` - Preformatted text
- \`<blockquote>\` - Block quotation

## Inline Text
- \`<a>\` - Anchor/Link
- \`<strong>\` - Strong importance
- \`<em>\` - Emphasis
- \`<code>\` - Inline code
- \`<span>\` - Generic inline container
- \`<mark>\` - Highlighted text

## Lists
- \`<ul>\` - Unordered list
- \`<ol>\` - Ordered list
- \`<li>\` - List item
- \`<dl>\` - Description list
- \`<dt>\` - Description term
- \`<dd>\` - Description details

## Tables
- \`<table>\` - Table
- \`<thead>\` - Table header group
- \`<tbody>\` - Table body group
- \`<tfoot>\` - Table footer group
- \`<tr>\` - Table row
- \`<th>\` - Table header cell
- \`<td>\` - Table data cell

## Forms
- \`<form>\` - Form
- \`<input>\` - Input control
- \`<textarea>\` - Multi-line text input
- \`<select>\` - Selection list
- \`<option>\` - Option in select list
- \`<button>\` - Button
- \`<label>\` - Label for form control
- \`<fieldset>\` - Group of form controls
- \`<legend>\` - Caption for fieldset

## Semantic Elements
- \`<header>\` - Header section
- \`<nav>\` - Navigation section
- \`<main>\` - Main content
- \`<article>\` - Article content
- \`<section>\` - Document section
- \`<aside>\` - Sidebar content
- \`<footer>\` - Footer section

## Media
- \`<img>\` - Image
- \`<video>\` - Video content
- \`<audio>\` - Audio content
- \`<source>\` - Media resource
- \`<track>\` - Text track for media

## Scripting
- \`<script>\` - Script
- \`<noscript>\` - Alternative content for no script
- \`<canvas>\` - Graphics canvas
- \`<svg>\` - SVG graphics`
    },
    {
      id: 'css-properties',
      title: 'CSS Properties Guide',
      description: 'Comprehensive guide to CSS properties and values',
      category: 'css',
      type: 'reference',
      content: `# CSS Properties Guide

## Layout Properties
- \`display\` - Display type (block, inline, flex, grid, etc.)
- \`position\` - Positioning method (static, relative, absolute, fixed, sticky)
- \`top, right, bottom, left\` - Position offsets
- \`z-index\` - Stack order
- \`float\` - Float direction
- \`clear\` - Clear floated elements

## Box Model
- \`width, height\` - Element dimensions
- \`min-width, max-width\` - Width constraints
- \`min-height, max-height\` - Height constraints
- \`margin\` - Outside spacing
- \`padding\` - Inside spacing
- \`border\` - Element border
- \`box-sizing\` - Box model calculation

## Flexbox
- \`display: flex\` - Flex container
- \`flex-direction\` - Main axis direction
- \`flex-wrap\` - Wrapping behavior
- \`justify-content\` - Main axis alignment
- \`align-items\` - Cross axis alignment
- \`align-content\` - Multi-line alignment
- \`flex\` - Flex item properties
- \`align-self\` - Individual item alignment

## Grid
- \`display: grid\` - Grid container
- \`grid-template-columns\` - Column track sizes
- \`grid-template-rows\` - Row track sizes
- \`grid-template-areas\` - Named grid areas
- \`grid-gap\` - Gap between tracks
- \`grid-column\` - Column placement
- \`grid-row\` - Row placement
- \`grid-area\` - Area placement

## Typography
- \`font-family\` - Font family
- \`font-size\` - Font size
- \`font-weight\` - Font weight
- \`font-style\` - Font style
- \`line-height\` - Line height
- \`text-align\` - Text alignment
- \`text-decoration\` - Text decoration
- \`text-transform\` - Text transformation
- \`letter-spacing\` - Letter spacing
- \`word-spacing\` - Word spacing

## Colors and Backgrounds
- \`color\` - Text color
- \`background-color\` - Background color
- \`background-image\` - Background image
- \`background-size\` - Background size
- \`background-position\` - Background position
- \`background-repeat\` - Background repeat
- \`background-attachment\` - Background attachment
- \`opacity\` - Element opacity

## Borders and Outlines
- \`border\` - Border shorthand
- \`border-width\` - Border width
- \`border-style\` - Border style
- \`border-color\` - Border color
- \`border-radius\` - Border radius
- \`outline\` - Outline properties
- \`box-shadow\` - Box shadow

## Transforms and Animations
- \`transform\` - 2D/3D transformations
- \`transition\` - Transition effects
- \`animation\` - Animation properties
- \`@keyframes\` - Animation keyframes

## Responsive Design
- \`@media\` - Media queries
- \`viewport\` - Viewport meta tag
- \`rem, em\` - Relative units
- \`vw, vh\` - Viewport units
- \`%\` - Percentage units`
    },
    {
      id: 'js-methods',
      title: 'JavaScript Methods Reference',
      description: 'Essential JavaScript methods and functions',
      category: 'javascript',
      type: 'reference',
      content: `# JavaScript Methods Reference

## Array Methods
- \`push()\` - Add elements to end
- \`pop()\` - Remove last element
- \`shift()\` - Remove first element
- \`unshift()\` - Add elements to beginning
- \`slice()\` - Extract portion of array
- \`splice()\` - Add/remove elements
- \`concat()\` - Merge arrays
- \`join()\` - Join elements into string
- \`reverse()\` - Reverse array order
- \`sort()\` - Sort array elements

## Array Iteration Methods
- \`forEach()\` - Execute function for each element
- \`map()\` - Create new array with transformed elements
- \`filter()\` - Create new array with filtered elements
- \`reduce()\` - Reduce array to single value
- \`find()\` - Find first matching element
- \`findIndex()\` - Find index of first matching element
- \`some()\` - Test if any element passes test
- \`every()\` - Test if all elements pass test
- \`includes()\` - Check if array includes element

## String Methods
- \`charAt()\` - Get character at index
- \`charCodeAt()\` - Get character code at index
- \`concat()\` - Concatenate strings
- \`indexOf()\` - Find index of substring
- \`lastIndexOf()\` - Find last index of substring
- \`slice()\` - Extract part of string
- \`substring()\` - Extract substring
- \`substr()\` - Extract substring (deprecated)
- \`toLowerCase()\` - Convert to lowercase
- \`toUpperCase()\` - Convert to uppercase
- \`trim()\` - Remove whitespace
- \`split()\` - Split string into array
- \`replace()\` - Replace substring
- \`match()\` - Match against regex
- \`search()\` - Search for regex match

## Object Methods
- \`Object.keys()\` - Get object keys
- \`Object.values()\` - Get object values
- \`Object.entries()\` - Get key-value pairs
- \`Object.assign()\` - Copy properties
- \`Object.create()\` - Create object with prototype
- \`hasOwnProperty()\` - Check if property exists
- \`toString()\` - Convert to string
- \`valueOf()\` - Get primitive value

## DOM Methods
- \`getElementById()\` - Get element by ID
- \`getElementsByClassName()\` - Get elements by class
- \`getElementsByTagName()\` - Get elements by tag
- \`querySelector()\` - Get first matching element
- \`querySelectorAll()\` - Get all matching elements
- \`createElement()\` - Create new element
- \`appendChild()\` - Add child element
- \`removeChild()\` - Remove child element
- \`setAttribute()\` - Set attribute
- \`getAttribute()\` - Get attribute
- \`addEventListener()\` - Add event listener
- \`removeEventListener()\` - Remove event listener

## Math Methods
- \`Math.abs()\` - Absolute value
- \`Math.ceil()\` - Round up
- \`Math.floor()\` - Round down
- \`Math.round()\` - Round to nearest integer
- \`Math.max()\` - Maximum value
- \`Math.min()\` - Minimum value
- \`Math.random()\` - Random number
- \`Math.pow()\` - Power
- \`Math.sqrt()\` - Square root
- \`Math.PI\` - Pi constant

## Date Methods
- \`new Date()\` - Create date object
- \`getFullYear()\` - Get year
- \`getMonth()\` - Get month (0-11)
- \`getDate()\` - Get day of month
- \`getDay()\` - Get day of week
- \`getHours()\` - Get hours
- \`getMinutes()\` - Get minutes
- \`getSeconds()\` - Get seconds
- \`getTime()\` - Get timestamp
- \`toDateString()\` - Convert to date string
- \`toISOString()\` - Convert to ISO string`
    },
    {
      id: 'react-hooks',
      title: 'React Hooks Guide',
      description: 'Complete guide to React hooks and their usage',
      category: 'react',
      type: 'guide',
      content: `# React Hooks Guide

## Basic Hooks

### useState
Manages component state in functional components.

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

### useEffect
Handles side effects in functional components.

\`\`\`javascript
import { useEffect, useState } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Effect runs after render
    fetchData().then(setData);
    
    // Cleanup function (optional)
    return () => {
      // Cleanup code here
    };
  }, []); // Dependency array
  
  return <div>{data ? data.title : 'Loading...'}</div>;
}
\`\`\`

### useContext
Consumes context values without nesting.

\`\`\`javascript
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return (
    <button style={{ background: theme.background }}>
      Themed Button
    </button>
  );
}
\`\`\`

## Additional Hooks

### useReducer
Manages complex state logic with a reducer function.

\`\`\`javascript
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
    </div>
  );
}
\`\`\`

### useCallback
Memoizes callback functions to prevent unnecessary re-renders.

\`\`\`javascript
import { useCallback, useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Dependencies array
  
  return <Child onClick={handleClick} />;
}
\`\`\`

### useMemo
Memoizes expensive calculations.

\`\`\`javascript
import { useMemo, useState } from 'react';

function ExpensiveComponent({ items }) {
  const [filter, setFilter] = useState('');
  
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);
  
  return (
    <div>
      <input 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
      />
      {filteredItems.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}
\`\`\`

### useRef
Creates mutable ref objects that persist across renders.

\`\`\`javascript
import { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return <input ref={inputRef} />;
}
\`\`\`

## Custom Hooks

### Creating Custom Hooks
Custom hooks are functions that use other hooks.

\`\`\`javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
    />
  );
}
\`\`\`

## Hook Rules

1. **Only call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions.

2. **Only call hooks from React functions** - Call hooks from React function components or custom hooks.

3. **Use the ESLint plugin** - Install \`eslint-plugin-react-hooks\` to enforce these rules.

## Best Practices

- Use multiple \`useState\` calls for unrelated state
- Use \`useEffect\` with dependency arrays to control when effects run
- Extract custom hooks for reusable stateful logic
- Use \`useCallback\` and \`useMemo\` for performance optimization
- Use \`useRef\` for accessing DOM elements or storing mutable values`
    },
    {
      id: 'python-stdlib',
      title: 'Python Standard Library',
      description: 'Overview of Python\'s built-in modules and functions',
      category: 'python',
      type: 'reference',
      content: `# Python Standard Library Reference

## Built-in Functions

### String Functions
- \`len()\` - Get length of object
- \`str()\` - Convert to string
- \`int()\` - Convert to integer
- \`float()\` - Convert to float
- \`bool()\` - Convert to boolean
- \`ord()\` - Get Unicode code point
- \`chr()\` - Get character from code point

### Collection Functions
- \`list()\` - Create list
- \`tuple()\` - Create tuple
- \`dict()\` - Create dictionary
- \`set()\` - Create set
- \`range()\` - Create range object
- \`enumerate()\` - Add counter to iterable
- \`zip()\` - Combine iterables
- \`sorted()\` - Return sorted list
- \`reversed()\` - Return reversed iterator

### Math Functions
- \`abs()\` - Absolute value
- \`min()\` - Minimum value
- \`max()\` - Maximum value
- \`sum()\` - Sum of iterable
- \`round()\` - Round number
- \`pow()\` - Power function
- \`divmod()\` - Division and modulo

### I/O Functions
- \`print()\` - Print to stdout
- \`input()\` - Read from stdin
- \`open()\` - Open file
- \`format()\` - Format string

## Important Modules

### os - Operating System Interface
\`\`\`python
import os

# Current directory
os.getcwd()

# List directory contents
os.listdir('.')

# Create directory
os.mkdir('new_dir')

# Remove file
os.remove('file.txt')

# Environment variables
os.environ['PATH']

# Path operations
os.path.join('folder', 'file.txt')
os.path.exists('file.txt')
os.path.isfile('file.txt')
os.path.isdir('folder')
\`\`\`

### sys - System-specific Parameters
\`\`\`python
import sys

# Command line arguments
sys.argv

# Python path
sys.path

# Exit program
sys.exit()

# Python version
sys.version

# Platform information
sys.platform
\`\`\`

### datetime - Date and Time
\`\`\`python
from datetime import datetime, date, time, timedelta

# Current date and time
now = datetime.now()
today = date.today()

# Create specific date
birthday = date(1990, 5, 15)

# Format dates
now.strftime('%Y-%m-%d %H:%M:%S')

# Date arithmetic
tomorrow = today + timedelta(days=1)
\`\`\`

### json - JSON Data
\`\`\`python
import json

# Parse JSON string
data = json.loads('{"name": "John", "age": 30}')

# Convert to JSON string
json_string = json.dumps(data)

# Read from file
with open('data.json', 'r') as f:
    data = json.load(f)

# Write to file
with open('data.json', 'w') as f:
    json.dump(data, f)
\`\`\`

### re - Regular Expressions
\`\`\`python
import re

# Search for pattern
match = re.search(r'\\d+', 'The answer is 42')

# Find all matches
numbers = re.findall(r'\\d+', 'I have 5 cats and 3 dogs')

# Replace pattern
text = re.sub(r'\\d+', 'X', 'I have 5 cats and 3 dogs')

# Split by pattern
parts = re.split(r'\\s+', 'split by whitespace')
\`\`\`

### random - Random Numbers
\`\`\`python
import random

# Random float between 0 and 1
random.random()

# Random integer
random.randint(1, 10)

# Random choice from list
random.choice(['apple', 'banana', 'cherry'])

# Shuffle list
items = [1, 2, 3, 4, 5]
random.shuffle(items)

# Random sample
random.sample(range(100), 10)
\`\`\`

### math - Mathematical Functions
\`\`\`python
import math

# Constants
math.pi
math.e

# Basic functions
math.sqrt(16)  # Square root
math.pow(2, 3)  # Power
math.log(10)   # Natural logarithm
math.log10(100)  # Base-10 logarithm

# Trigonometric functions
math.sin(math.pi / 2)
math.cos(0)
math.tan(math.pi / 4)

# Rounding
math.ceil(4.2)   # Round up
math.floor(4.8)  # Round down
\`\`\`

### collections - Specialized Container Types
\`\`\`python
from collections import Counter, defaultdict, namedtuple

# Counter - count hashable objects
counter = Counter(['a', 'b', 'c', 'a', 'b', 'b'])
# Counter({'b': 3, 'a': 2, 'c': 1})

# defaultdict - dict with default values
dd = defaultdict(list)
dd['key'].append('value')

# namedtuple - tuple with named fields
Point = namedtuple('Point', ['x', 'y'])
p = Point(1, 2)
print(p.x, p.y)
\`\`\`

### itertools - Iterator Functions
\`\`\`python
import itertools

# Infinite iterators
count = itertools.count(10, 2)  # 10, 12, 14, 16, ...
cycle = itertools.cycle(['A', 'B', 'C'])  # A, B, C, A, B, C, ...

# Finite iterators
chain = itertools.chain([1, 2], [3, 4])  # 1, 2, 3, 4
combinations = itertools.combinations([1, 2, 3], 2)  # (1,2), (1,3), (2,3)
permutations = itertools.permutations([1, 2, 3])  # All permutations
\`\`\`

### urllib - URL Handling
\`\`\`python
from urllib.request import urlopen
from urllib.parse import urljoin, urlparse

# Open URL
with urlopen('https://httpbin.org/json') as response:
    data = response.read()

# Parse URL
parsed = urlparse('https://example.com/path?query=value')
print(parsed.scheme, parsed.netloc, parsed.path)

# Join URLs
full_url = urljoin('https://example.com/', 'path/to/resource')
\`\`\`

## File I/O

### Reading Files
\`\`\`python
# Read entire file
with open('file.txt', 'r') as f:
    content = f.read()

# Read line by line
with open('file.txt', 'r') as f:
    for line in f:
        print(line.strip())

# Read all lines
with open('file.txt', 'r') as f:
    lines = f.readlines()
\`\`\`

### Writing Files
\`\`\`python
# Write to file
with open('output.txt', 'w') as f:
    f.write('Hello, World!')

# Append to file
with open('output.txt', 'a') as f:
    f.write('\\nAppended text')

# Write multiple lines
lines = ['Line 1\\n', 'Line 2\\n', 'Line 3\\n']
with open('output.txt', 'w') as f:
    f.writelines(lines)
\`\`\`

## Error Handling

### Exception Types
- \`Exception\` - Base exception class
- \`ValueError\` - Invalid value
- \`TypeError\` - Wrong type
- \`KeyError\` - Missing dictionary key
- \`IndexError\` - Invalid list index
- \`FileNotFoundError\` - File doesn't exist
- \`ZeroDivisionError\` - Division by zero

### Try/Except
\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"An error occurred: {e}")
else:
    print("No errors occurred")
finally:
    print("This always runs")
\`\`\``
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const downloadResource = (resource: any) => {
    const blob = new Blob([resource.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.title.replace(/\s+/g, '-').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAllCheatSheets = () => {
    courses.forEach(course => {
      const blob = new Blob([course.cheatSheet], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${course.title.replace(/\s+/g, '-').toLowerCase()}-cheatsheet.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Resources</h1>
        <p className="text-gray-600">
          Download reference materials, cheat sheets, and guides for offline study.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Downloads</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={downloadAllCheatSheets}
            className="btn-primary flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            All Cheat Sheets
          </button>
          
          {courses.map(course => (
            <button
              key={course.id}
              onClick={() => {
                const blob = new Blob([course.cheatSheet], { type: 'text/markdown' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${course.title.replace(/\s+/g, '-').toLowerCase()}-cheatsheet.md`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className={`btn-secondary flex items-center ${course.color} text-white hover:opacity-90`}
            >
              <span className="mr-2">{course.icon}</span>
              {course.title}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Categories</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="python">Python</option>
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const course = courses.find(c => c.id === resource.category);
          const typeIcon = resource.type === 'reference' ? BookOpen : 
                          resource.type === 'guide' ? FileText : Code;
          const TypeIcon = typeIcon;

          return (
            <div key={resource.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 ${course?.color || 'bg-gray-500'} rounded-lg flex items-center justify-center text-white mr-3`}>
                  {course?.icon || '📄'}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <TypeIcon className="w-4 h-4 mr-1" />
                    {resource.type}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => downloadResource(resource)}
                  className="btn-primary flex items-center text-sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
                
                <button
                  onClick={() => {
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                      newWindow.document.write(`
                        <html>
                          <head>
                            <title>${resource.title}</title>
                            <style>
                              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
                              pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
                              code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
                              h1, h2, h3 { color: #333; }
                            </style>
                          </head>
                          <body>
                            <pre>${resource.content}</pre>
                          </body>
                        </html>
                      `);
                    }
                  }}
                  className="btn-secondary flex items-center text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Preview
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="card text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Resources Found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}
    </div>
  );
}
