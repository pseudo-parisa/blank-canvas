import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <main>
      <h1>{user.name}</h1>

      <p>{user.email}</p>

      <p>Role: {user.role}</p>
    </main>
  );
}