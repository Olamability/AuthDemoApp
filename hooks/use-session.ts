import { useQuery } from '@tanstack/react-query';
import { getUserSession, User } from '@/lib/auth-api';
import { useAuth } from '@/contexts/auth-context';
import { useEffect } from 'react';

export function useSession() {
  const { token, setUser } = useAuth();

  const query = useQuery<User>({
    queryKey: ['session', token],
    queryFn: () => getUserSession(token!),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update auth context when session data is fetched
  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  return query;
}
