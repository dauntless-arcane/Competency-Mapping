export interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
}

export interface Score {
  category: string;
  value: number;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  recommended: boolean;
  instructor: string;
  duration: string;
  level: string;
}

export interface Report {
  month: string;
  focus: number;
  memory: number;
  motivation: number;
  creativity: number;
  problemSolving: number;
  overallScore: number;
}

export interface TestQuestion {
  id: number;
  question: string;
  category: string;
  options: string[];
}

export const mockUser: User = {
  id: 1,
  name: "Capsite",
  email: "Capsite@caps.com",
  role: "student"
};

export const mockScores: Score[] = [
  { category: "Focus", value: 70 },
  { category: "Memory", value: 55 },
  { category: "Motivation", value: 80 },
  { category: "Creativity", value: 65 },
  { category: "Problem Solving", value: 72 },
];

export const mockCourses: Course[] = [
  {
    id: 1,
    title: "Mastering Focus Techniques",
    description: "Learn advanced concentration methods and mindfulness practices",
    progress: 30,
    recommended: true,
    instructor: "Dr. Sarah Wilson",
    duration: "6 weeks",
    level: "Intermediate"
  },
  {
    id: 2,
    title: "Memory Enhancement Strategies",
    description: "Boost your memory with proven scientific techniques",
    progress: 0,
    recommended: true,
    instructor: "Prof. Michael Chen",
    duration: "8 weeks",
    level: "Beginner"
  },
  {
    id: 3,
    title: "Creative Problem Solving",
    description: "Develop innovative thinking and creative solutions",
    progress: 60,
    recommended: false,
    instructor: "Dr. Emma Davis",
    duration: "4 weeks",
    level: "Advanced"
  },
  {
    id: 4,
    title: "Motivation and Goal Setting",
    description: "Build lasting motivation and achieve your goals",
    progress: 85,
    recommended: true,
    instructor: "Dr. James Rodriguez",
    duration: "5 weeks",
    level: "Beginner"
  }
];

export const mockReports: Report[] = [
  {
    month: "June 2025",
    focus: 65,
    memory: 50,
    motivation: 75,
    creativity: 60,
    problemSolving: 68,
    overallScore: 64
  },
  {
    month: "July 2025",
    focus: 70,
    memory: 55,
    motivation: 80,
    creativity: 65,
    problemSolving: 72,
    overallScore: 68
  },
  {
    month: "August 2025",
    focus: 75,
    memory: 60,
    motivation: 82,
    creativity: 70,
    problemSolving: 75,
    overallScore: 72
  }
];

export const mockTestQuestions: TestQuestion[] = [
  {
    id: 1,
    question: "How often do you find yourself easily distracted during important tasks?",
    category: "Focus",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 2,
    question: "When learning new information, how well do you retain it after a week?",
    category: "Memory",
    options: ["Very poorly", "Poorly", "Average", "Well", "Very well"]
  },
  {
    id: 3,
    question: "How motivated are you to achieve your personal goals?",
    category: "Motivation",
    options: ["Not motivated", "Slightly motivated", "Moderately motivated", "Very motivated", "Extremely motivated"]
  },
  {
    id: 4,
    question: "When faced with a creative challenge, how do you typically approach it?",
    category: "Creativity",
    options: ["Avoid it", "Use conventional methods", "Try different approaches", "Think outside the box", "Create innovative solutions"]
  },
  {
    id: 5,
    question: "How effectively do you break down complex problems into manageable parts?",
    category: "Problem Solving",
    options: ["Very poorly", "Poorly", "Average", "Well", "Very well"]
  },
  {
    id: 6,
    question: "During meetings or lectures, how well do you maintain attention?",
    category: "Focus",
    options: ["Very poorly", "Poorly", "Average", "Well", "Very well"]
  },
  {
    id: 7,
    question: "How quickly do you forget important details or instructions?",
    category: "Memory",
    options: ["Immediately", "Within hours", "Within days", "Within weeks", "Rarely forget"]
  },
  {
    id: 8,
    question: "How persistent are you when facing obstacles?",
    category: "Motivation",
    options: ["Give up quickly", "Give up after some effort", "Keep trying with breaks", "Very persistent", "Never give up"]
  },
  {
    id: 9,
    question: "How often do you come up with original ideas or solutions?",
    category: "Creativity",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 10,
    question: "When solving problems, how systematic is your approach?",
    category: "Problem Solving",
    options: ["Very unsystematic", "Somewhat unsystematic", "Average", "Systematic", "Very systematic"]
  }
];