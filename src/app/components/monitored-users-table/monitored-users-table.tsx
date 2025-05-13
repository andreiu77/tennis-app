'use client';
import React, { useEffect, useState } from 'react';

type MonitoredUser = {
  id: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export default function MonitoredUserTable() {
  const [users, setUsers] = useState<MonitoredUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/monitored-users');
        if (!res.ok) throw new Error('Failed to fetch monitored users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading monitored users...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Registration ID</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Created At</th>
        </tr>
      </thead>
      <tbody>
        {users.map((mu) => (
          <tr key={mu.id}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mu.id}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mu.user.email}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{new Date(mu.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
