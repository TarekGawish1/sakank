'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '@/api/client';
import { Modal } from '@/components/Modal';
import { Search } from 'lucide-react';

export default function Verifications() {
  const [verifications, setVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState<{ isOpen: boolean; data?: any }>({ isOpen: false });
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchVerifications();
  }, [page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (page === 1) {
        fetchVerifications();
      } else {
        setPage(1);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (page === 1) fetchVerifications();
    else setPage(1);
  };

  const fetchVerifications = () => {
    setLoading(true);
    const query = new URLSearchParams({ page: page.toString(), limit: '10' });
    if (search) query.append('search', search);

    fetchApi(`/admin/verifications?${query.toString()}`)
      .then(res => {
        setVerifications(res.data?.items || res.data || []);
        if (res.meta?.total) {
          setTotalPages(Math.ceil(res.meta.total / 10));
        } else {
          setTotalPages(1);
        }
      })
      .catch(err => console.error("Failed to load verifications", err))
      .finally(() => setLoading(false));
  };

  const closeModal = () => {
    setModalState({ isOpen: false });
    setRejectionReason('');
  };

  const handleAction = async (action: 'approve' | 'reject') => {
    const { id, user } = modalState.data;

    if (action === 'reject' && !rejectionReason.trim()) {
      showToast('الرجاء كتابة سبب الرفض.', 'error');
      return;
    }

    try {
      setProcessing(true);
      if (action === 'approve') {
        await fetchApi(`/admin/verifications/${id}/approve`, { method: 'POST' });
        showToast(`تم توثيق ${user?.firstName || ''} بنجاح!`);
      } else {
        await fetchApi(`/admin/verifications/${id}/reject`, { 
          method: 'POST',
          body: JSON.stringify({ reason: rejectionReason })
        });
        showToast(`تم رفض توثيق ${user?.firstName || ''}.`);
      }
      closeModal();
      fetchVerifications();
    } catch (err: any) {
      showToast(`خطأ: ${err.message}. (تأكد من تسجيل الدخول)`, 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (loading && verifications.length === 0) {
    return <div className="page-container dashboard-page"><div className="page-header"><h1>جاري تحميل طلبات التوثيق...</h1></div></div>;
  }

  const roleLabels: Record<string, string> = {
    'ADMIN': 'مدير',
    'OWNER': 'مالك عقار',
    'STUDENT': 'طالب'
  };

  const statusLabels: Record<string, string> = {
    'PENDING': 'قيد الانتظار',
    'APPROVED': 'مقبول',
    'REJECTED': 'مرفوض'
  };

  return (
    <div className="page-container fade-in">
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 500,
          animation: 'fade-in 0.3s ease-out forwards'
        }}>
          {toast.message}
        </div>
      )}

      <div className="page-header" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>طلبات التوثيق</h1>
          <p className="text-secondary">قم بمراجعة واعتماد المستندات الثبوتية للطلاب والملاك.</p>
        </div>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '12px', border: '1.5px solid var(--border-subtle)', overflow: 'hidden', padding: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ padding: '0 12px', color: 'var(--text-secondary)' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="ابحث باسم المستخدم..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', padding: '10px 0', minWidth: '220px', fontSize: '15px' }}
          />
          <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '8px 20px', borderRadius: '8px', marginRight: '8px', fontSize: '14px', fontWeight: 600 }}>
            بحث
          </button>
        </form>
      </div>

      <div className="card glass-card table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>المستخدم</th>
              <th>النوع</th>
              <th>تاريخ التقديم</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {verifications.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '32px' }}>لا توجد طلبات توثيق معلقة.</td></tr>
            ) : (
              verifications.map(req => (
                <tr key={req.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="avatar avatar-sm">{req.user?.firstName?.[0] || '?'}</div>
                      <strong style={{ color: 'var(--text-primary)' }}>{req.user?.firstName} {req.user?.lastName}</strong>
                    </div>
                  </td>
                  <td className="text-secondary">{roleLabels[req.user?.role] || req.user?.role}</td>
                  <td className="text-secondary" style={{ direction: 'ltr', textAlign: 'right' }}>{new Date(req.submittedAt).toLocaleString('ar-EG')}</td>
                  <td><span className="badge badge-pending">{statusLabels[req.status] || req.status}</span></td>
                  <td>
                    <button 
                      className="btn-secondary pulse-soft" 
                      onClick={() => setModalState({ isOpen: true, data: req })}
                      disabled={processing}
                    >
                      مراجعة
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
        <button 
          className="btn-secondary" 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
        >
          السابق
        </button>
        <span style={{ fontSize: '14px', fontWeight: 500 }}>صفحة {page} من {totalPages || 1}</span>
        <button 
          className="btn-secondary" 
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages || loading}
        >
          التالي
        </button>
      </div>

      <Modal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        title={`مراجعة الطلب: ${modalState.data?.user?.firstName || ''}`}
        footer={
          <>
            <button className="btn-secondary" onClick={closeModal} disabled={processing}>إلغاء</button>
            <button className="btn-primary btn-danger" onClick={() => handleAction('reject')} disabled={processing}>
              رفض
            </button>
            <button className="btn-primary" onClick={() => handleAction('approve')} disabled={processing}>
              {processing ? 'جاري التنفيذ...' : 'قبول'}
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>
            الرجاء مراجعة المستندات الثبوتية المرفقة من قبل <strong style={{ color: 'var(--brand-primary)' }}>{modalState.data?.user?.firstName} {modalState.data?.user?.lastName}</strong> ({roleLabels[modalState.data?.user?.role] || modalState.data?.user?.role}).
          </p>
          <div className="card" style={{ padding: '32px', backgroundColor: 'var(--color-neutral-50)', border: '2px dashed var(--border-subtle)', borderRadius: '12px' }}>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 500 }}>معاينة المستند (صورة الهوية / البطاقة الجامعية)</p>
          </div>
          
          <div className="form-group">
            <label>سبب الرفض <span style={{ color: 'var(--color-red-500)', fontSize: '12px' }}>(مطلوب في حال الرفض)</span></label>
            <textarea 
              rows={3} 
              placeholder="اكتب سبب رفض المستندات حتى يتمكن المستخدم من تصحيحها..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              disabled={processing}
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
}
