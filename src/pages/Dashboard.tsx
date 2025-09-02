import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { courses } from '../data/courses';
import { BookOpen, Clock, Award, TrendingUp, Target, Zap } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard() {
  const { state, getOverallProgress } = useProgress();
  const overallProgress = getOverallProgress();

  const stats = [
    {
      label: 'Total XP',
      value: state.totalXP,
      icon: Zap,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    {
      label: 'Study Streak',
      value: `${state.streak} days`,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Certificates',
      value: state.certificates.length,
      icon: Award,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      label: 'Lessons Completed',
      value: overallProgress.completed,
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back to LearnCode! 👋
        </h1>
        <p className="text-gray-600">
          Continue your programming journey with our comprehensive courses.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bg} mr-4`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
        <ProgressBar 
          progress={overallProgress.completed} 
          total={overallProgress.total}
          className="mb-2"
        />
        <p className="text-sm text-gray-600">
          Keep going! You're doing great on your learning journey.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const completedLessons = state.progress.filter(
              p => p.courseId === course.id && p.completed
            ).length;
            const totalLessons = course.lessons.length;
            const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

            return (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="card hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center text-white text-2xl mr-4`}>
                    {course.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600">{course.difficulty}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.estimatedTime}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {totalLessons} lessons
                  </div>
                </div>
                
                <ProgressBar 
                  progress={completedLessons} 
                  total={totalLessons}
                  showText={false}
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">
                  {completedLessons} of {totalLessons} lessons completed ({progressPercentage}%)
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {state.progress.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {state.progress
              .filter(p => p.completed)
              .sort((a, b) => new Date(b.completedAt || '').getTime() - new Date(a.completedAt || '').getTime())
              .slice(0, 5)
              .map((progress, index) => {
                const course = courses.find(c => c.id === progress.courseId);
                const lesson = course?.lessons.find(l => l.id === progress.lessonId);
                
                return (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 ${course?.color || 'bg-gray-500'} rounded-lg flex items-center justify-center text-white text-sm mr-3`}>
                        {course?.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{lesson?.title}</p>
                        <p className="text-sm text-gray-600">{course?.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {progress.completedAt && new Date(progress.completedAt).toLocaleDateString()}
                      </p>
                      {progress.score && (
                        <p className="text-sm font-medium text-green-600">
                          Score: {progress.score}%
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
