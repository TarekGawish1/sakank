'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '@/api/client';
import { Modal } from '@/components/Modal';
import { Search } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'add' | 'edit' | 'block'; data?: any }>({
    isOpen: false,
    type: 'add'
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchUsers = () => {
    setLoading(true);
    const query = new URLSearchParams({ page: page.toString(), limit: '10' });
    if (search) query.append('search', search);

    fetchApi(`/admin/users?${query.toString()}`)
      .then(res => {
        setUsers(res.data?.items || res.data || []);
        if (res.meta?.total) {
          setTotalPages(Math.ceil(res.meta.total / 10));
        } else {
          setTotalPages(1);
        }
      })
      .catch(err => console.error("Failed to fetch users", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (page === 1) {
        fetchUsers();
      } else {
        setPage(1); // changing page will trigger fetchUsers via useEffect
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (page === 1) fetchUsers();
    else setPage(1);
  };

  const closeModal = () => setModalState({ isOpen: false, type: 'add' });

  const handleAction = async () => {
    if (!modalState.data?.user?.id) return;
    
    setProcessing(true);
    try {
      if (modalState.type === 'block') {
        await fetchApi(`/admin/users/${modalState.data.user.id}/block`, { method: 'POST' });
        showToast(modalState.data.user.isBlocked ? 'تم إلغاء حظر المستخدم بنجاح' : 'تم حظر المستخدم بنجاح');
      } else if (modalState.type === 'edit') {
        const fnInput = document.getElementById('edit-fn') as HTMLInputElement;
        const lnInput = document.getElementById('edit-ln') as HTMLInputElement;
        const roleSelect = document.getElementById('edit-role') as HTMLSelectElement;
        
        await fetchApi(`/admin/users/${modalState.data.user.id}`, {
          method: 'PUT',
          body: JSON.stringify({
             firstName: fnInput?.value || modalState.data.user.firstName,
             lastName: lnInput?.value || modalState.data.user.lastName,
             role: roleSelect?.value || modalState.data.user.role
          })
        });
        showToast('تم تعديل بيانات المستخدم بنجاح');
      }
      closeModal();
      fetchUsers();
    } catch (err: any) {
      showToast(`حدث خطأ: ${err.message}`, 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (loading && users.length === 0) {
    return <div className="page-container dashboard-page"><div className="page-header"><h1>جاري تحميل المستخدمين...</h1></div></div>;
  }

  const roleLabels: Record<string, string> = {
    'ADMIN': 'مدير',
    'OWNER': 'مالك',
    'STUDENT': 'طالب'
  };

  return (
    <div className="page-container fade-in">
      {toast && (
        <div className="fade-in" style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999,
          padding: '16px 24px',
          borderRadius: '12px',
          backgroundColor: toast.type === 'error' ? 'var(--color-red-600)' : '#10B981',
          color: 'white',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: 500,
          direction: 'rtl'
        }}>
          {toast.message}
        </div>
      )}

      <div className="page-header" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>إدارة المستخدمين</h1>
          <p className="text-secondary">قم بإدارة مستخدمي النظام والصلاحيات.</p>
        </div>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '12px', border: '1.5px solid var(--border-subtle)', overflow: 'hidden', padding: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ padding: '0 12px', color: 'var(--text-secondary)' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="ابحث بالاسم أو البريد..." 
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
              <th>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>الدور</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '32px' }}>لا يوجد مستخدمين.</td></tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="avatar avatar-sm">{user.firstName[0]}</div>
                      <span style={{ fontWeight: 500 }}>{user.firstName} {user.lastName}</span>
                    </div>
                  </td>
                  <td className="text-secondary" style={{ direction: 'ltr', textAlign: 'right' }}>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'ADMIN' ? 'badge-active' : user.role === 'OWNER' ? 'badge-pending' : 'badge-student'}`}>
                      {roleLabels[user.role] || user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${!user.isBlocked ? 'badge-active' : 'badge-pending'}`} style={user.isBlocked ? { backgroundColor: 'var(--color-red-50)', color: 'var(--color-red-700)' } : {}}>
                      {!user.isBlocked ? 'نشط' : 'محظور'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-icon" onClick={() => setModalState({ isOpen: true, type: 'edit', data: { name: `${user.firstName} ${user.lastName}`, user } })}>تعديل</button>
                    <button className={user.isBlocked ? "btn-icon" : "btn-icon btn-danger"} onClick={() => setModalState({ isOpen: true, type: 'block', data: { name: `${user.firstName} ${user.lastName}`, user } })}>
                      {user.isBlocked ? 'إلغاء الحظر' : 'حظر'}
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
        title={
          modalState.type === 'edit' ? `تعديل المستخدم: ${modalState.data?.name}` : 
          modalState.data?.user?.isBlocked ? 'إلغاء حظر المستخدم' : 'تأكيد الحظر'
        }
        footer={
          <>
            <button className="btn-secondary" onClick={closeModal} disabled={processing}>إلغاء</button>
            <button className={modalState.type === 'block' && !modalState.data?.user?.isBlocked ? 'btn-primary btn-danger' : 'btn-primary'} onClick={handleAction} disabled={processing}>
              {processing ? 'جاري التنفيذ...' : modalState.type === 'block' ? (modalState.data?.user?.isBlocked ? 'إلغاء الحظر' : 'حظر المستخدم') : 'حفظ التغييرات'}
            </button>
          </>
        }
      >
        {modalState.type === 'block' ? (
          <p>
            {modalState.data?.user?.isBlocked 
              ? `هل أنت متأكد من إلغاء حظر `
              : `هل أنت متأكد من حظر `}
            <strong style={{ color: 'var(--text-primary)' }}>{modalState.data?.name}</strong>؟
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label>الاسم الأول</label>
              <input id="edit-fn" type="text" defaultValue={modalState.data?.user?.firstName || ''} />
            </div>
            <div className="form-group">
              <label>الاسم الأخير</label>
              <input id="edit-ln" type="text" defaultValue={modalState.data?.user?.lastName || ''} />
            </div>
            <div className="form-group">
              <label>الدور</label>
              <select id="edit-role" defaultValue={modalState.data?.user?.role || 'STUDENT'}>
                <option value="STUDENT">طالب</option>
                <option value="OWNER">مالك عقار</option>
                <option value="ADMIN">مدير</option>
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
