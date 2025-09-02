import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { courses } from '../data/courses';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Circle, Download } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { state } = useProgress();
  
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link to="/" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const completedLessons = state.progress.filter(
    p => p.courseId === course.id && p.completed
  ).length;
  
  const progressPercentage = course.lessons.length > 0 
    ? Math.round((completedLessons / course.lessons.length) * 100) 
    : 0;

  const downloadCheatSheet = () => {
    const blob = new Blob([course.cheatSheet], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.title.replace(/\s+/g, '-').toLowerCase()}-cheatsheet.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`w-16 h-16 ${course.color} rounded-xl flex items-center justify-center text-white text-3xl mr-6`}>
              {course.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.estimatedTime}
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {course.lessons.length} lessons
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.difficulty}
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={downloadCheatSheet}
            className="btn-secondary flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Cheat Sheet
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
        <ProgressBar 
          progress={completedLessons} 
          total={course.lessons.length}
          className="mb-2"
        />
        <p className="text-sm text-gray-600">
          {progressPercentage === 100 
            ? '🎉 Congratulations! You\'ve completed this course!' 
            : `Keep going! You're ${progressPercentage}% through this course.`
          }
        </p>
      </div>

      {/* Lessons */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Course Lessons</h2>
        <div className="space-y-4">
          {course.lessons.map((lesson, index) => {
            const isCompleted = state.progress.some(
              p => p.courseId === course.id && p.lessonId === lesson.id && p.completed
            );
            const lessonProgress = state.progress.find(
              p => p.courseId === course.id && p.lessonId === lesson.id
            );

            return (
              <Link
                key={lesson.id}
                to={`/course/${course.id}/lesson/${lesson.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {index + 1}. {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {lesson.content.split('\n')[0].replace(/^#\s*/, '').substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {isCompleted && (
                      <div className="text-sm text-green-600 font-medium">
                        ✓ Completed
                        {lessonProgress?.score && (
                          <div className="text-xs text-gray-500">
                            Score: {lessonProgress.score}%
                          </div>
                        )}
                      </div>
                    )}
                    {lesson.exercise && (
                      <div className="text-xs text-primary-600 mt-1">
                        Interactive Exercise
                      </div>
                    )}
                    {lesson.quiz && (
                      <div className="text-xs text-purple-600 mt-1">
                        Quiz Available
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Certificate */}
      {progressPercentage === 100 && !state.certificates.includes(course.id) && (
        <div className="card mt-8 bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              🎉 Course Complete!
            </h3>
            <p className="text-gray-600 mb-4">
              You've successfully completed all lessons in this course. Claim your certificate!
            </p>
            <Link 
              to="/certificates" 
              className="btn-primary"
            >
              View Certificates
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
