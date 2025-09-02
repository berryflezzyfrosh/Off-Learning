import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './contexts/ProgressContext';
import { PyodideProvider } from './contexts/PyodideContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import CertificatesPage from './pages/CertificatesPage';
import ResourcesPage from './pages/ResourcesPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ProgressProvider>
        <PyodideProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/course/:courseId" element={<CoursePage />} />
                <Route path="/course/:courseId/lesson/:lessonId" element={<LessonPage />} />
                <Route path="/certificates" element={<CertificatesPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
              </Routes>
            </Layout>
          </Router>
        </PyodideProvider>
      </ProgressProvider>
    </ErrorBoundary>
  );
}

export default App;
