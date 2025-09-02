import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface Progress {
  courseId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
}

interface ProgressState {
  progress: Progress[];
  certificates: string[];
  totalXP: number;
  streak: number;
  lastStudyDate?: string;
}

type ProgressAction = 
  | { type: 'COMPLETE_LESSON'; payload: { courseId: string; lessonId: string; score?: number } }
  | { type: 'AWARD_CERTIFICATE'; payload: string }
  | { type: 'LOAD_PROGRESS'; payload: ProgressState }
  | { type: 'UPDATE_STREAK' };

const initialState: ProgressState = {
  progress: [],
  certificates: [],
  totalXP: 0,
  streak: 0
};

function progressReducer(state: ProgressState, action: ProgressAction): ProgressState {
  switch (action.type) {
    case 'COMPLETE_LESSON':
      const existingIndex = state.progress.findIndex(
        p => p.courseId === action.payload.courseId && p.lessonId === action.payload.lessonId
      );
      
      const newProgress = {
        courseId: action.payload.courseId,
        lessonId: action.payload.lessonId,
        completed: true,
        score: action.payload.score,
        completedAt: new Date().toISOString()
      };

      const xpGain = existingIndex >= 0 ? 0 : 50; // Only gain XP for new completions
      const today = new Date().toDateString();
      const newStreak = state.lastStudyDate === today ? state.streak : 
                       (state.lastStudyDate === new Date(Date.now() - 86400000).toDateString() ? state.streak + 1 : 1);

      if (existingIndex >= 0) {
        const updatedProgress = [...state.progress];
        updatedProgress[existingIndex] = newProgress;
        return { 
          ...state, 
          progress: updatedProgress,
          totalXP: state.totalXP + xpGain,
          streak: newStreak,
          lastStudyDate: today
        };
      } else {
        return { 
          ...state, 
          progress: [...state.progress, newProgress],
          totalXP: state.totalXP + xpGain,
          streak: newStreak,
          lastStudyDate: today
        };
      }

    case 'AWARD_CERTIFICATE':
      if (!state.certificates.includes(action.payload)) {
        return { 
          ...state, 
          certificates: [...state.certificates, action.payload],
          totalXP: state.totalXP + 200 // Bonus XP for certificate
        };
      }
      return state;

    case 'LOAD_PROGRESS':
      return action.payload;

    case 'UPDATE_STREAK':
      const currentDate = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      if (state.lastStudyDate === currentDate) {
        return state; // Already studied today
      } else if (state.lastStudyDate === yesterday) {
        return { ...state, streak: state.streak + 1, lastStudyDate: currentDate };
      } else {
        return { ...state, streak: 1, lastStudyDate: currentDate };
      }

    default:
      return state;
  }
}

const ProgressContext = createContext<{
  state: ProgressState;
  dispatch: React.Dispatch<ProgressAction>;
  completeLesson: (courseId: string, lessonId: string, score?: number) => void;
  awardCertificate: (courseId: string) => void;
  getLessonProgress: (courseId: string, lessonId: string) => Progress | undefined;
  getCourseProgress: (courseId: string) => { completed: number; total: number; percentage: number };
  getOverallProgress: () => { completed: number; total: number; percentage: number };
} | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(progressReducer, initialState);

  useEffect(() => {
    const savedProgress = localStorage.getItem('learning-app-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        dispatch({ type: 'LOAD_PROGRESS', payload: parsed });
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('learning-app-progress', JSON.stringify(state));
  }, [state]);

  const completeLesson = (courseId: string, lessonId: string, score?: number) => {
    dispatch({ type: 'COMPLETE_LESSON', payload: { courseId, lessonId, score } });
  };

  const awardCertificate = (courseId: string) => {
    dispatch({ type: 'AWARD_CERTIFICATE', payload: courseId });
  };

  const getLessonProgress = (courseId: string, lessonId: string) => {
    return state.progress.find(p => p.courseId === courseId && p.lessonId === lessonId);
  };

  const getCourseProgress = (courseId: string) => {
    // This would need course data to calculate total lessons
    const completed = state.progress.filter(p => p.courseId === courseId && p.completed).length;
    const total = 10; // Placeholder - would be calculated from course data
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const getOverallProgress = () => {
    const completed = state.progress.filter(p => p.completed).length;
    const total = 50; // Total lessons across all courses
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  return (
    <ProgressContext.Provider value={{
      state,
      dispatch,
      completeLesson,
      awardCertificate,
      getLessonProgress,
      getCourseProgress,
      getOverallProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
