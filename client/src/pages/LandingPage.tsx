import { LogIn } from 'lucide-react';
import { API_URL } from '../lib/api';

export default function LandingPage() {
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`);
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-brief-gray-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-brief-gray-border p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-brief-blue rounded-xl flex items-center justify-center text-white font-bold text-2xl">
            B
          </div>
        </div>
        <h1 className="text-3xl font-bold text-brief-gray-heading mb-2">Welcome to BriefMe</h1>
        <p className="text-brief-gray-text mb-8">Your smart daily briefing assistant. Get personalized summaries and action items instantly.</p>
        
        <button 
          onClick={handleLogin}
          className="w-full h-12 bg-brief-blue hover:bg-brief-blue-hover text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <LogIn size={20} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
