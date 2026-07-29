'use client';

import React, { useEffect, useState } from 'react';
import { Users, Home, ClipboardList, CheckCircle } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { fetchApi } from '@/api/client';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/admin/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error("Failed to load stats:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="page-container dashboard-page"><div className="page-header"><h1>جاري تحميل الإحصائيات...</h1></div></div>;
  }

  const propertyTypesAr: Record<string, string> = {
    'APARTMENT_BUILDING': 'عمارة سكنية',
    'VILLA': 'فيلا',
    'HOUSE': 'منزل',
    'DORMITORY': 'سكن طلاب',
    'COMPOUND': 'مجمع سكني',
    'STUDIO': 'استوديو'
  };

  const propertiesData = (stats?.propertyDistribution || []).map((p: any) => ({
    name: propertyTypesAr[p.name] || p.name,
    count: p.count
  }));

  return (
    <div className="page-container dashboard-page fade-in">
      <div className="page-header">
        <div>
          <h1>نظرة عامة</h1>
          <p className="text-secondary">تابع أهم المقاييس والأنشطة الخاصة بمنصتك.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon pulse-soft"><Users color="var(--brand-primary)" /></div>
          <div className="stat-info">
            <span className="stat-label">إجمالي المستخدمين</span>
            <span className="stat-value">{stats?.totalUsers || 0}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Home color="var(--color-green-500)" /></div>
          <div className="stat-info">
            <span className="stat-label">العقارات النشطة</span>
            <span className="stat-value">{stats?.activeProperties || 0}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><ClipboardList color="var(--color-orange-500)" /></div>
          <div className="stat-info">
            <span className="stat-label">الإعلانات النشطة</span>
            <span className="stat-value">{stats?.activeListings || 0}</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card glass-card">
          <h3>نمو المستخدمين</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats?.userGrowth || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" orientation="right" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', textAlign: 'right', direction: 'rtl' }}
                />
                <Line type="monotone" dataKey="users" stroke="url(#colorUv)" strokeWidth={4} dot={{ r: 4, fill: 'var(--brand-primary)' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="var(--color-blue-400)" stopOpacity={1}/>
                    <stop offset="95%" stopColor="var(--color-blue-600)" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-card glass-card">
          <h3>توزيع أنواع العقارات</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertiesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" orientation="right" />
                <Tooltip 
                  cursor={{ fill: 'var(--color-neutral-50)' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', textAlign: 'right', direction: 'rtl' }}
                />
                <Bar dataKey="count" fill="var(--color-blue-400)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
