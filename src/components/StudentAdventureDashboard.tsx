import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

interface CourseData {
  avatar: string;
  name: string;
  progress: number;
  grade: string;
  credits: number;
  status: string;
}

const StudentAdventureDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedCounts, setAnimatedCounts] = useState({
    totalCredits: 0,
    gpa: 0,
    assignments: 0,
    completedCourses: 0
  });

  const counts = {
    totalCredits: 120,
    gpa: 3.85,
    assignments: 8,
    completedCourses: 24
  };

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedCounts({
          totalCredits: Math.floor(counts.totalCredits * progress),
          gpa: parseFloat((counts.gpa * progress).toFixed(2)),
          assignments: Math.floor(counts.assignments * progress),
          completedCourses: Math.floor(counts.completedCourses * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedCounts(counts);
        }
      }, increment);
    };

    animateCounters();
  }, []);

  const coursesData: CourseData[] = [
    { avatar: '🧪', name: 'Chemistry Lab', progress: 92, grade: 'A', credits: 4, status: 'Active' },
    { avatar: '📊', name: 'Statistics', progress: 88, grade: 'A-', credits: 3, status: 'Active' },
    { avatar: '💻', name: 'Computer Science', progress: 95, grade: 'A+', credits: 4, status: 'Active' },
    { avatar: '📖', name: 'Literature', progress: 85, grade: 'B+', credits: 3, status: 'Active' },
    { avatar: '🎨', name: 'Digital Art', progress: 90, grade: 'A', credits: 2, status: 'Active' },
    { avatar: '⚡', name: 'Physics', progress: 87, grade: 'B+', credits: 4, status: 'Active' }
  ];

  const gradeDistributionData = {
    labels: ['A+', 'A', 'A-', 'B+', 'B', 'B-'],
    datasets: [{
      data: [15, 25, 20, 18, 12, 10],
      backgroundColor: [
        'hsl(var(--block-sage))',
        'hsl(var(--block-medium))',
        'hsl(var(--block-light))',
        'hsl(var(--block-cream))',
        'hsl(var(--block-pale))',
        'hsl(var(--block-dark))'
      ],
      borderWidth: 3,
      borderColor: '#000'
    }]
  };

  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [{
      label: 'GPA Progress',
      data: [3.2, 3.4, 3.6, 3.7, 3.8, 3.85],
      borderColor: 'hsl(var(--block-sage))',
      backgroundColor: 'hsl(var(--block-sage) / 0.2)',
      tension: 0.1,
      borderWidth: 4,
      pointRadius: 6,
      pointBackgroundColor: 'hsl(var(--block-light))',
      pointBorderColor: '#000',
      pointBorderWidth: 2
    }]
  };

  const assignmentData = {
    labels: ['Math', 'Science', 'Literature', 'Art', 'History'],
    datasets: [{
      label: 'Assignments Completed',
      data: [12, 8, 15, 6, 10],
      backgroundColor: [
        'hsl(var(--block-sage))',
        'hsl(var(--block-medium))',
        'hsl(var(--block-light))',
        'hsl(var(--block-cream))',
        'hsl(var(--block-pale))'
      ],
      borderColor: '#000',
      borderWidth: 2
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'monospace',
            size: 14,
            weight: 'bold' as const
          },
          color: '#000'
        }
      }
    },
    scales: {
      y: {
        ticks: {
          font: {
            family: 'monospace',
            weight: 'bold' as const
          },
          color: '#000'
        },
        grid: {
          color: 'hsl(var(--block-pale))'
        }
      },
      x: {
        ticks: {
          font: {
            family: 'monospace',
            weight: 'bold' as const
          },
          color: '#000'
        },
        grid: {
          color: 'hsl(var(--block-pale))'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-block p-4 font-mono">
      {/* Header */}
      <header className="bg-gradient-glass backdrop-blur-lg border-4 border-black rounded-lg p-6 mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-block-sage border-4 border-black rounded-lg flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              🎓
            </div>
            <div>
              <h1 className="text-3xl font-black text-black">Adventure Academy</h1>
              <p className="text-lg font-bold text-black/80">Student Progress Portal</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-black">Welcome back, Alex!</p>
            <p className="text-sm font-bold text-black/70">Semester Progress: 75%</p>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-block-light border-4 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-black/70 uppercase tracking-wide">Total Credits</p>
              <p className="text-3xl font-black text-black">{animatedCounts.totalCredits}</p>
            </div>
            <div className="w-12 h-12 bg-block-sage border-2 border-black rounded flex items-center justify-center text-xl">📚</div>
          </div>
        </div>

        <div className="bg-block-sage border-4 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-black/70 uppercase tracking-wide">Current GPA</p>
              <p className="text-3xl font-black text-black">{animatedCounts.gpa}</p>
            </div>
            <div className="w-12 h-12 bg-block-light border-2 border-black rounded flex items-center justify-center text-xl">⭐</div>
          </div>
        </div>

        <div className="bg-block-cream border-4 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-black/70 uppercase tracking-wide">Pending Tasks</p>
              <p className="text-3xl font-black text-black">{animatedCounts.assignments}</p>
            </div>
            <div className="w-12 h-12 bg-block-sage border-2 border-black rounded flex items-center justify-center text-xl">📝</div>
          </div>
        </div>

        <div className="bg-block-medium border-4 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-black/70 uppercase tracking-wide">Completed</p>
              <p className="text-3xl font-black text-black">{animatedCounts.completedCourses}</p>
            </div>
            <div className="w-12 h-12 bg-block-light border-2 border-black rounded flex items-center justify-center text-xl">✅</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gradient-glass backdrop-blur-lg border-4 border-black rounded-lg p-2 mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Quest Overview', icon: '🏠' },
            { id: 'courses', label: 'Active Courses', icon: '📖' },
            { id: 'grades', label: 'Grade Stats', icon: '📊' },
            { id: 'achievements', label: 'Achievements', icon: '🏆' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-bold border-4 border-black rounded-lg transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                activeTab === tab.id
                  ? 'bg-block-light text-black'
                  : 'bg-block-pale text-black hover:bg-block-cream'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-glass backdrop-blur-lg border-4 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black text-black mb-4 flex items-center">
                <span className="mr-2">📈</span>GPA Journey
              </h3>
              <Line data={progressData} options={chartOptions} />
            </div>
            <div className="bg-gradient-glass backdrop-blur-lg border-4 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black text-black mb-4 flex items-center">
                <span className="mr-2">🎯</span>Grade Distribution
              </h3>
              <Doughnut data={gradeDistributionData} options={chartOptions} />
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="bg-gradient-glass backdrop-blur-lg border-4 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black text-black mb-6 flex items-center">
              <span className="mr-2">📚</span>Active Course Adventures
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-block-dark text-white">
                    <th className="text-left p-4 font-black border-2 border-black">Course</th>
                    <th className="text-left p-4 font-black border-2 border-black">Progress</th>
                    <th className="text-left p-4 font-black border-2 border-black">Grade</th>
                    <th className="text-left p-4 font-black border-2 border-black">Credits</th>
                    <th className="text-left p-4 font-black border-2 border-black">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {coursesData.map((course, index) => (
                    <tr key={index} className="bg-block-pale hover:bg-block-cream transition-colors border-2 border-black">
                      <td className="p-4 border-2 border-black">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-block-light border-2 border-black rounded flex items-center justify-center text-lg">
                            {course.avatar}
                          </div>
                          <span className="font-bold text-black">{course.name}</span>
                        </div>
                      </td>
                      <td className="p-4 border-2 border-black">
                        <div className="w-full bg-block-cream border-2 border-black rounded-full h-4">
                          <div
                            className="bg-block-sage h-full rounded-full transition-all duration-1000"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-black mt-1 block">{course.progress}%</span>
                      </td>
                      <td className="p-4 font-black text-black border-2 border-black">{course.grade}</td>
                      <td className="p-4 font-black text-black border-2 border-black">{course.credits}</td>
                      <td className="p-4 border-2 border-black">
                        <span className="px-3 py-1 bg-block-sage text-black font-bold border-2 border-black rounded text-sm">
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'grades' && (
          <div className="bg-gradient-glass backdrop-blur-lg border-4 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black text-black mb-4 flex items-center">
              <span className="mr-2">📊</span>Assignment Progress by Subject
            </h3>
            <Bar data={assignmentData} options={chartOptions} />
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Perfect Attendance', desc: 'No missed classes this semester', icon: '🎯', color: 'bg-block-light' },
              { title: 'Dean\'s List', desc: 'Maintained 3.5+ GPA', icon: '🏆', color: 'bg-block-sage' },
              { title: 'Research Pioneer', desc: 'Completed independent study', icon: '🔬', color: 'bg-block-cream' },
              { title: 'Team Player', desc: 'Led 5 group projects', icon: '🤝', color: 'bg-block-medium' },
              { title: 'Tech Wizard', desc: 'Mastered 3 programming languages', icon: '⚡', color: 'bg-block-light' },
              { title: 'Knowledge Seeker', desc: 'Read 50+ academic papers', icon: '📚', color: 'bg-block-pale' }
            ].map((achievement, index) => (
              <div key={index} className={`${achievement.color} border-4 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200`}>
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h4 className="text-lg font-black text-black mb-2">{achievement.title}</h4>
                <p className="text-sm font-bold text-black/70">{achievement.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAdventureDashboard;