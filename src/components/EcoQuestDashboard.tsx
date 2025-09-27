import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import ecoLogo from '@/assets/ecoquest-logo.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

interface StudentData {
  avatar: string;
  name: string;
  grade: string;
  score: number;
  progress: number;
  badges: string;
  status: 'Excellent' | 'Good' | 'Needs Help';
}

interface StatData {
  icon: string;
  value: number;
  label: string;
  color: string;
}

const students: StudentData[] = [
  { avatar: 'A', name: 'Alice Chen', grade: 'Grade 8A', score: 892, progress: 87, badges: '🌟🌱🏆', status: 'Excellent' },
  { avatar: 'B', name: 'Ben Rodriguez', grade: 'Grade 8B', score: 756, progress: 73, badges: '🌱🏆', status: 'Good' },
  { avatar: 'C', name: 'Chloe Kim', grade: 'Grade 8A', score: 634, progress: 61, badges: '🌱', status: 'Good' },
  { avatar: 'D', name: 'David Smith', grade: 'Grade 8C', score: 412, progress: 35, badges: '🌱', status: 'Needs Help' },
];

const overviewStats: StatData[] = [
  { icon: '📋', value: 247, label: 'Challenges Completed', color: 'bg-gradient-to-br from-orange-400/80 to-orange-300/80' },
  { icon: '✅', value: 189, label: 'Eco-Tasks Verified', color: 'bg-gradient-eco' },
  { icon: '🌳', value: 43, label: 'Trees Planted', color: 'bg-gradient-to-br from-blue-400/80 to-blue-300/80' },
  { icon: '🏆', value: 28, label: 'Active Students', color: 'bg-gradient-to-br from-purple-400/80 to-purple-300/80' },
];

const impactStats: StatData[] = [
  { icon: '🌳', value: 43, label: 'Trees Planted', color: 'bg-gradient-to-br from-blue-400/80 to-blue-300/80' },
  { icon: '♻️', value: 1200, label: 'kg Waste Saved', color: 'bg-gradient-eco' },
  { icon: '💧', value: 2800, label: 'Liters Water Saved', color: 'bg-gradient-to-br from-orange-400/80 to-orange-300/80' },
  { icon: '⚡', value: 156, label: 'kWh Energy Saved', color: 'bg-gradient-to-br from-purple-400/80 to-purple-300/80' },
];

const EcoQuestDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [counters, setCounters] = useState({
    challenges: 0,
    tasks: 0,
    trees: 0,
    students: 0,
  });

  // Animated counter effect
  useEffect(() => {
    const animateCounter = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setter(Math.floor(current));
      }, 20);
    };

    setTimeout(() => {
      animateCounter(247, (value) => setCounters(prev => ({ ...prev, challenges: value })));
      animateCounter(189, (value) => setCounters(prev => ({ ...prev, tasks: value })));
      animateCounter(43, (value) => setCounters(prev => ({ ...prev, trees: value })));
      animateCounter(28, (value) => setCounters(prev => ({ ...prev, students: value })));
    }, 500);
  }, []);

  const progressChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Challenges Completed',
      data: [12, 19, 23, 35, 42, 47],
      backgroundColor: [
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.8)',
        'rgba(255, 152, 0, 0.8)',
        'rgba(33, 150, 243, 0.8)',
        'rgba(156, 39, 176, 0.8)',
        'rgba(255, 87, 34, 0.8)'
      ],
      borderRadius: 12,
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.8)'
    }]
  };

  const categoryChartData = {
    labels: ['Energy', 'Water', 'Waste', 'Transport', 'Nature'],
    datasets: [{
      data: [30, 25, 20, 15, 10],
      backgroundColor: [
        'rgba(76, 175, 80, 0.8)',
        'rgba(33, 150, 243, 0.8)',
        'rgba(255, 152, 0, 0.8)',
        'rgba(156, 39, 176, 0.8)',
        'rgba(255, 87, 34, 0.8)'
      ],
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.8)'
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#666',
          font: {
            weight: 600
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#666',
          font: {
            weight: 600
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          color: '#666',
          font: {
            weight: 600
          }
        }
      }
    }
  };

  const StatCard = ({ icon, value, label, color, animated = false }: StatData & { animated?: boolean }) => (
    <div className="glass-card p-8 transition-all duration-500 hover:transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden group">
      <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-full"></div>
      <div className="flex items-center gap-5 mb-5">
        <div className={`w-15 h-15 rounded-2xl flex items-center justify-center text-3xl text-white ${color} glass-button animate-pulse`}>
          <span className="emoji-3d">{icon}</span>
        </div>
        <div>
          <div className="text-4xl font-extrabold text-eco-dark mb-2 tracking-tight">
            {animated ? (
              icon === '📋' ? counters.challenges :
              icon === '✅' ? counters.tasks :
              icon === '🌳' ? counters.trees :
              icon === '🏆' ? counters.students :
              value > 1000 ? `${(value/1000).toFixed(1)}k` : value
            ) : (
              value > 1000 ? `${(value/1000).toFixed(1)}k` : value
            )}
          </div>
          <div className="text-gray-600 text-sm uppercase tracking-wider font-semibold">{label}</div>
        </div>
      </div>
    </div>
  );

  const StudentRow = ({ student }: { student: StudentData }) => (
    <div className="grid grid-cols-6 items-center py-5 border-b border-eco-pale/30 transition-all duration-300 hover:bg-green-50/60 hover:transform hover:scale-[1.01] hover:backdrop-blur-sm rounded-xl">
      <div className={`w-11 h-11 rounded-full bg-gradient-eco flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/30`}>
        {student.avatar}
      </div>
      <div>
        <div className="font-bold text-eco-dark">{student.name}</div>
        <div className="text-gray-600 text-sm">{student.grade}</div>
      </div>
      <div className="font-bold text-primary">{student.score}</div>
      <div>
        <div className="w-full h-2.5 bg-green-200/80 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-eco rounded-full animate-fill shadow-inner"
            style={{ width: `${student.progress}%` }}
          ></div>
        </div>
        <div className="text-xs mt-1 text-gray-600">{student.progress}%</div>
      </div>
      <div><span className="emoji-3d">{student.badges}</span></div>
      <div>
        <span className={`px-4 py-2 rounded-full text-xs font-bold glass-button border ${
          student.status === 'Excellent' ? 'bg-gradient-eco text-white' :
          student.status === 'Good' ? 'bg-gradient-to-br from-orange-400/90 to-orange-300/90 text-white' :
          'bg-gradient-to-br from-red-400/90 to-red-300/90 text-white'
        }`}>
          {student.status}
        </span>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto glass-card p-10 animate-slide-up">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 pb-8 border-b border-eco-pale/40">
        <div className="flex items-center gap-4">
          <div className="glass-card rounded-full p-2 animate-rotate hover:transform hover:scale-105 transition-all duration-300">
            <img src={ecoLogo} alt="EcoQuest Logo" className="h-12 w-12 rounded-full" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-eco-dark via-eco-medium to-eco-sage bg-clip-text text-transparent tracking-tight">
            EcoQuest Teacher Dashboard
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-eco flex items-center justify-center text-white font-bold text-xl animate-bounce shadow-lg shadow-green-500/30">
            MJ
          </div>
          <div>
            <div className="font-bold text-eco-dark">Ms. Johnson</div>
            <div className="text-gray-600 text-sm">Environmental Science</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 bg-white/40 p-2 rounded-2xl glass-button">
        {[
          { id: 'overview', icon: '📊', label: 'Overview' },
          { id: 'students', icon: '👥', label: 'Students' },
          { id: 'impact', icon: '🌍', label: 'Impact' },
          { id: 'about', icon: 'ℹ️', label: 'About' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 rounded-2xl font-semibold text-sm glass-button transition-all duration-500 ${
              activeTab === tab.id 
                ? 'bg-gradient-eco text-white transform scale-105 shadow-lg shadow-green-500/30' 
                : 'text-gray-600 bg-white/20 hover:bg-green-500/10 hover:transform hover:-translate-y-1 hover:text-primary'
            }`}
          >
            <span className="emoji-3d">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {overviewStats.map((stat, index) => (
              <StatCard key={index} {...stat} animated />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="glass-card p-8 h-96 transition-all duration-500 hover:transform hover:-translate-y-1">
              <div className="text-xl font-bold text-eco-dark mb-6 flex items-center gap-3">
                <span className="emoji-3d">📈</span> Monthly Progress
              </div>
              <Bar data={progressChartData} options={chartOptions} />
            </div>
            <div className="glass-card p-8 h-96 transition-all duration-500 hover:transform hover:-translate-y-1">
              <div className="text-xl font-bold text-eco-dark mb-6 flex items-center gap-3">
                <span className="emoji-3d">🔄</span> Task Categories
              </div>
              <Doughnut data={categoryChartData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="glass-card p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-eco-dark flex items-center gap-3">
              <span className="emoji-3d">👥</span> Student Performance
            </h2>
          </div>
          
          <div className="grid grid-cols-6 items-center py-5 font-bold text-eco-dark border-b-2 border-primary">
            <div></div>
            <div>Student</div>
            <div>Eco-Score</div>
            <div>Progress</div>
            <div>Badges</div>
            <div>Status</div>
          </div>

          {students.map((student, index) => (
            <StudentRow key={index} student={student} />
          ))}
        </div>
      )}

      {/* Impact Tab */}
      {activeTab === 'impact' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {impactStats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="glass-card p-8 h-96">
            <div className="text-xl font-bold text-eco-dark mb-6 flex items-center gap-3">
              <span className="emoji-3d">🌍</span> Environmental Impact Over Time
            </div>
            <Line 
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                  label: 'Impact Score',
                  data: [65, 78, 82, 89, 95, 102],
                  borderColor: 'hsl(var(--eco-medium))',
                  backgroundColor: 'hsla(var(--eco-medium), 0.1)',
                  borderWidth: 3,
                  fill: true,
                  tension: 0.4
                }]
              }} 
              options={{
                ...chartOptions,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} 
            />
          </div>
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="glass-card p-10">
          <h2 className="text-3xl font-bold text-eco-dark mb-6 flex items-center gap-3">
            <span className="emoji-3d">🌱</span> About EcoQuest
          </h2>
          <p className="mb-6 leading-relaxed text-gray-600 text-lg">
            EcoQuest is a comprehensive environmental education platform designed to engage students in sustainable practices through gamified learning experiences. Our mission is to create environmentally conscious global citizens through interactive challenges, real-world projects, and community impact tracking.
          </p>

          <h3 className="text-2xl font-bold text-eco-dark my-8 flex items-center gap-3">
            <span className="emoji-3d">🎯</span> Key Features
          </h3>
          <ul className="text-gray-600 leading-relaxed ml-6 text-lg space-y-2">
            <li>• Interactive environmental challenges and tasks</li>
            <li>• Real-time impact tracking and visualization</li>
            <li>• Gamified learning with badges and rewards</li>
            <li>• Community-based sustainability projects</li>
            <li>• Comprehensive teacher analytics dashboard</li>
          </ul>

          <h3 className="text-2xl font-bold text-eco-dark my-8 flex items-center gap-3">
            <span className="emoji-3d">🤝</span> Join Our Initiative
          </h3>
          <p className="mb-6 leading-relaxed text-gray-600 text-lg">
            Schools, NGOs, and educational institutions can partner with us to implement EcoLearn in their communities. Together, we can make a significant environmental impact while educating the next generation.
          </p>

          <div className="flex gap-5 flex-wrap">
            <button className="px-8 py-4 bg-gradient-eco text-white border-none rounded-full font-bold cursor-pointer transition-all duration-500 glass-button shadow-lg shadow-green-500/30 hover:transform hover:scale-105">
              <span className="emoji-3d">📧</span> Contact Us
            </button>
            <button className="px-8 py-4 bg-gradient-to-br from-blue-400/90 to-blue-300/90 text-white border-none rounded-full font-bold cursor-pointer transition-all duration-500 glass-button shadow-lg shadow-blue-500/30 hover:transform hover:scale-105">
              <span className="emoji-3d">🌐</span> Learn More
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-eco rounded-full flex items-center justify-center text-white text-3xl glass-button shadow-xl shadow-green-500/40 cursor-pointer animate-float-action hover:transform hover:scale-115 transition-all duration-500"
        onClick={() => alert('🌱 Ready to add a new environmental challenge for your students!')}
      >
        <span className="emoji-3d">➕</span>
      </button>
    </div>
  );
};

export default EcoQuestDashboard;