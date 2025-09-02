import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { usePyodide } from '../contexts/PyodideContext';
import { courses } from '../data/courses';
import { ArrowLeft, ArrowRight, CheckCircle, Play, RotateCcw } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';

export default function LessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { completeLesson, getLessonProgress } = useProgress();
  const { runPython, isLoading: pythonLoading } = usePyodide();
  
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  const lessonIndex = course?.lessons.findIndex(l => l.id === lessonId) ?? -1;
  const nextLesson = course?.lessons[lessonIndex + 1];
  const prevLesson = course?.lessons[lessonIndex - 1];

  useEffect(() => {
    if (lesson?.exercise) {
      setUserCode(lesson.exercise.starterCode);
    }
  }, [lesson]);

  useEffect(() => {
    if (courseId && lessonId) {
      const progress = getLessonProgress(courseId, lessonId);
      setLessonCompleted(progress?.completed || false);
    }
  }, [courseId, lessonId, getLessonProgress]);

  if (!course || !lesson) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link to="/" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const runCode = async () => {
    if (!userCode.trim()) return;
    
    setIsRunning(true);
    setOutput('');

    try {
      if (courseId === 'python') {
        if (pythonLoading) {
          setOutput('Python environment is still loading. Please wait...');
          setIsRunning(false);
          return;
        }
        const result = await runPython(userCode);
        setOutput(result);
      } else if (courseId === 'javascript') {
        // Create a safe environment for JavaScript execution
        const originalConsoleLog = console.log;
        let capturedOutput = '';
        
        console.log = (...args) => {
          capturedOutput += args.join(' ') + '\n';
        };

        try {
          // Use Function constructor for safer evaluation
          const func = new Function(userCode);
          const result = func();
          if (result !== undefined) {
            capturedOutput += String(result);
          }
          setOutput(capturedOutput || 'Code executed successfully (no output)');
        } catch (error: any) {
          setOutput(`Error: ${error.message}`);
        } finally {
          console.log = originalConsoleLog;
        }
      } else {
        // For HTML/CSS, we'll show the rendered result
        setOutput('Code updated! Check the preview above.');
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    }

    setIsRunning(false);
  };

  const resetCode = () => {
    if (lesson.exercise) {
      setUserCode(lesson.exercise.starterCode);
      setOutput('');
    }
  };

  const checkSolution = () => {
    if (!lesson.exercise) return;
    
    // Simple solution checking - in a real app, this would be more sophisticated
    const userCodeNormalized = userCode.replace(/\s+/g, ' ').trim();
    const solutionNormalized = lesson.exercise.solution.replace(/\s+/g, ' ').trim();
    
    if (userCodeNormalized.includes(solutionNormalized.substring(0, 50))) {
      setOutput('✅ Great job! Your solution looks correct.');
      handleLessonComplete(100);
    } else {
      setOutput('🤔 Your solution might need some work. Try comparing it with the expected output.');
    }
  };

  const handleLessonComplete = (score?: number) => {
    if (courseId && lessonId) {
      completeLesson(courseId, lessonId, score);
      setLessonCompleted(true);
    }
  };

  const handleQuizComplete = (score: number) => {
    handleLessonComplete(score);
    setShowQuiz(false);
  };

  const renderHTMLPreview = () => {
    if (courseId !== 'html' && courseId !== 'css') return null;

    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Live Preview</h3>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            Preview
          </div>
          <iframe
            srcDoc={userCode}
            className="w-full h-64 border-0"
            title="HTML Preview"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to={`/course/${courseId}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {course.title}
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Lesson {lessonIndex + 1} of {course.lessons.length}</span>
              {lessonCompleted && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Completed
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content */}
        <div className="space-y-6">
          {/* Lesson Content */}
          <div className="card">
            <div className="prose max-w-none">
              {lesson.content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-2xl font-bold mb-4">{line.substring(2)}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-semibold mb-3 mt-6">{line.substring(3)}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-lg font-medium mb-2 mt-4">{line.substring(4)}</h3>;
                } else if (line.startsWith('- ')) {
                  return <li key={index} className="ml-4">{line.substring(2)}</li>;
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index} className="mb-3">{line}</p>;
                }
              })}
            </div>
          </div>

          {/* Code Example */}
          {lesson.codeExample && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Code Example</h3>
              <CodeEditor
                language={courseId || 'javascript'}
                value={lesson.codeExample}
                onChange={() => {}}
                readOnly={true}
                height="300px"
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            {prevLesson ? (
              <Link
                to={`/course/${courseId}/lesson/${prevLesson.id}`}
                className="btn-secondary flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                to={`/course/${courseId}/lesson/${nextLesson.id}`}
                className="btn-primary flex items-center"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            ) : (
              <Link
                to={`/course/${courseId}`}
                className="btn-primary"
              >
                Complete Course
              </Link>
            )}
          </div>
        </div>

        {/* Interactive Section */}
        <div className="space-y-6">
          {/* Exercise */}
          {lesson.exercise && !showQuiz && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Interactive Exercise</h3>
              <p className="text-gray-600 mb-4">{lesson.exercise.instructions}</p>
              
              <CodeEditor
                language={courseId || 'javascript'}
                value={userCode}
                onChange={setUserCode}
                onRun={runCode}
                onReset={resetCode}
                height="300px"
              />

              {renderHTMLPreview()}

              {/* Output */}
              {output && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Output:</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                    {output}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="btn-primary flex items-center disabled:opacity-50"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
                
                <button
                  onClick={checkSolution}
                  className="btn-secondary"
                >
                  Check Solution
                </button>

                {!lessonCompleted && (
                  <button
                    onClick={() => handleLessonComplete()}
                    className="btn-secondary"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Quiz */}
          {lesson.quiz && (
            <div className="card">
              {!showQuiz ? (
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-3">Knowledge Check</h3>
                  <p className="text-gray-600 mb-4">
                    Test your understanding with a quick quiz.
                  </p>
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="btn-primary"
                  >
                    Start Quiz
                  </button>
                </div>
              ) : (
                <Quiz
                  questions={lesson.quiz}
                  onComplete={handleQuizComplete}
                />
              )}
            </div>
          )}

          {/* Completion */}
          {!lesson.exercise && !lesson.quiz && !lessonCompleted && (
            <div className="card text-center">
              <h3 className="text-lg font-semibold mb-3">Lesson Complete</h3>
              <p className="text-gray-600 mb-4">
                Great job reading through this lesson!
              </p>
              <button
                onClick={() => handleLessonComplete()}
                className="btn-primary"
              >
                Mark as Complete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
