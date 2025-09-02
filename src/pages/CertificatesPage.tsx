import React from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { courses } from '../data/courses';
import { Award, Download, Calendar, Share2 } from 'lucide-react';

export default function CertificatesPage() {
  const { state, awardCertificate } = useProgress();

  const availableCertificates = courses.filter(course => {
    const completedLessons = state.progress.filter(
      p => p.courseId === course.id && p.completed
    ).length;
    return completedLessons === course.lessons.length;
  });

  const generateCertificate = (courseId: string) => {
    if (!state.certificates.includes(courseId)) {
      awardCertificate(courseId);
    }
  };

  const downloadCertificate = (course: any) => {
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Certificate - ${course.title}</title>
        <style>
          body { 
            font-family: 'Georgia', serif; 
            margin: 0; 
            padding: 40px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .certificate { 
            background: white; 
            padding: 60px; 
            border-radius: 20px; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center; 
            max-width: 800px;
            width: 100%;
            border: 8px solid #f8f9fa;
          }
          .header { 
            border-bottom: 3px solid #3b82f6; 
            padding-bottom: 30px; 
            margin-bottom: 40px; 
          }
          .title { 
            font-size: 48px; 
            color: #1e40af; 
            margin-bottom: 10px;
            font-weight: bold;
          }
          .subtitle { 
            font-size: 18px; 
            color: #6b7280; 
            font-style: italic;
          }
          .recipient { 
            font-size: 32px; 
            color: #111827; 
            margin: 30px 0;
            font-weight: bold;
          }
          .course { 
            font-size: 28px; 
            color: #3b82f6; 
            margin: 20px 0;
            font-weight: 600;
          }
          .date { 
            font-size: 16px; 
            color: #6b7280; 
            margin-top: 40px;
          }
          .signature { 
            margin-top: 50px; 
            padding-top: 30px; 
            border-top: 2px solid #e5e7eb;
          }
          .logo { 
            width: 80px; 
            height: 80px; 
            background: #3b82f6; 
            border-radius: 50%; 
            margin: 0 auto 20px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 40px; 
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <div class="logo">${course.icon}</div>
            <div class="title">Certificate of Completion</div>
            <div class="subtitle">LearnCode Programming Academy</div>
          </div>
          
          <div>
            <div style="font-size: 20px; color: #6b7280; margin-bottom: 10px;">This is to certify that</div>
            <div class="recipient">Student Developer</div>
            <div style="font-size: 20px; color: #6b7280; margin-bottom: 10px;">has successfully completed</div>
            <div class="course">${course.title}</div>
            <div style="font-size: 16px; color: #6b7280; margin-top: 20px;">
              Demonstrating proficiency in ${course.description.toLowerCase()}
            </div>
          </div>
          
          <div class="date">
            Completed on ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          
          <div class="signature">
            <div style="font-size: 18px; font-weight: 600; color: #111827;">LearnCode Academy</div>
            <div style="font-size: 14px; color: #6b7280; margin-top: 5px;">Online Programming Education</div>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([certificateHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.title.replace(/\s+/g, '-').toLowerCase()}-certificate.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Certificates</h1>
        <p className="text-gray-600">
          Celebrate your achievements and download your completion certificates.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <Award className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">{state.certificates.length}</div>
          <div className="text-sm text-gray-600">Certificates Earned</div>
        </div>
        
        <div className="card text-center">
          <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">{availableCertificates.length}</div>
          <div className="text-sm text-gray-600">Courses Completed</div>
        </div>
        
        <div className="card text-center">
          <Share2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">{state.totalXP}</div>
          <div className="text-sm text-gray-600">Total XP Earned</div>
        </div>
      </div>

      {/* Available Certificates */}
      {availableCertificates.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableCertificates.map((course) => {
              const hasCertificate = state.certificates.includes(course.id);
              
              return (
                <div key={course.id} className="card">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center text-white text-2xl mr-4`}>
                      {course.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">Course completed!</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    {!hasCertificate ? (
                      <button
                        onClick={() => generateCertificate(course.id)}
                        className="btn-primary flex items-center"
                      >
                        <Award className="w-4 h-4 mr-2" />
                        Generate Certificate
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => downloadCertificate(course)}
                          className="btn-primary flex items-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                        <div className="flex items-center text-green-600 text-sm">
                          <Award className="w-4 h-4 mr-1" />
                          Certificate Ready
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Earned Certificates */}
      {state.certificates.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {state.certificates.map((certificateId) => {
              const course = courses.find(c => c.id === certificateId);
              if (!course) return null;
              
              return (
                <div key={certificateId} className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center text-white text-2xl mr-4`}>
                      {course.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">Certificate earned</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => downloadCertificate(course)}
                    className="btn-primary flex items-center w-full justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No Certificates Yet */}
      {availableCertificates.length === 0 && state.certificates.length === 0 && (
        <div className="card text-center py-12">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Yet</h3>
          <p className="text-gray-600 mb-6">
            Complete courses to earn certificates and showcase your achievements!
          </p>
          <a href="/" className="btn-primary">
            Start Learning
          </a>
        </div>
      )}
    </div>
  );
}
