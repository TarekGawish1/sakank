'use client';

import '../index.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Users as UsersIcon, Building, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    
    if (!token && pathname !== '/login') {
      router.push('/login');
    } else if (token && pathname === '/login') {
      router.push('/');
    } else {
      if (token) setIsAuthenticated(true);
      setLoading(false);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/login');
  };

  if (loading) return <html lang="ar" dir="rtl"><body></body></html>;

  if (pathname === '/login') {
    return (
      <html lang="ar" dir="rtl">
        <body>{children}</body>
      </html>
    );
  }

  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="app-container">
          <aside className="sidebar">
            <div className="brand" style={{ fontSize: '26px' }}>سكنك</div>
            <nav>
              <Link href="/" className={pathname === '/' ? 'active' : ''}>
                <Home size={20} /> الرئيسية
              </Link>
              <Link href="/users" className={pathname === '/users' ? 'active' : ''}>
                <UsersIcon size={20} /> المستخدمين
              </Link>
              <Link href="/properties" className={pathname === '/properties' ? 'active' : ''}>
                <Building size={20} /> العقارات
              </Link>
            </nav>
            <div style={{ marginTop: 'auto', padding: '24px 16px' }}>
              <button 
                onClick={handleLogout} 
                className="btn-icon text-secondary" 
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', fontWeight: 600, borderRadius: '10px' }}
              >
                <LogOut size={20} /> تسجيل خروج
              </button>
            </div>
          </aside>
          
          <main className="main-content">
            <header className="topbar glass">
              <div className="page-title">لوحة تحكم الإدارة</div>
              <div className="user-profile">
                <div className="avatar">A</div>
                <span>المدير</span>
              </div>
            </header>
            
            <div className="content fade-in">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
