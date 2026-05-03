import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBriefingStore } from '../store/useBriefingStore';
import { fetchApi } from '../lib/api';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuthenticated, setUser } = useBriefingStore();
  const processed = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (!code) {
      navigate('/');
      return;
    }

    if (processed.current) return;
    processed.current = true;

    const processAuth = async () => {
      try {
        const response = await fetchApi('/auth/callback', {
          method: 'POST',
          body: JSON.stringify({ code })
        });
        
        if (response.success) {
          setAuthenticated(true);
          setUser(response.user);
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Auth callback failed', error);
        navigate('/');
      }
    };

    processAuth();
  }, [searchParams, navigate, setAuthenticated, setUser]);

  return (
    <div className="min-h-screen bg-brief-gray-bg flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 text-brief-gray-text">
        <Loader2 size={32} className="animate-spin text-brief-blue" />
        <p>Authenticating...</p>
      </div>
    </div>
  );
}
