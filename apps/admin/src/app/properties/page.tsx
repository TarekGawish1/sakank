'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '@/api/client';
import { Modal } from '@/components/Modal';
import { Search } from 'lucide-react';

export default function Properties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'add' | 'edit' | 'view'; data?: any }>({
    isOpen: false,
    type: 'add'
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchProperties = () => {
    setLoading(true);
    const query = new URLSearchParams({ page: page.toString(), limit: '10' });
    if (search) query.append('search', search);

    fetchApi(`/admin/properties?${query.toString()}`)
      .then(res => {
        setProperties(res.data?.items || res.data || []);
        if (res.meta?.total) {
          setTotalPages(Math.ceil(res.meta.total / 10));
        } else {
          setTotalPages(1);
        }
      })
      .catch(err => console.error("Failed to load properties", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProperties();
  }, [page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (page === 1) {
        fetchProperties();
      } else {
        setPage(1);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (page === 1) fetchProperties();
    else setPage(1);
  };

  const closeModal = () => setModalState({ isOpen: false, type: 'add' });

  const handleAction = async () => {
    if (!modalState.data?.id) return;
    
    setProcessing(true);
    try {
      if (modalState.type === 'edit') {
        const titleInput = document.getElementById('edit-prop-title') as HTMLInputElement;
        
        await fetchApi(`/admin/properties/${modalState.data.id}`, {
          method: 'PUT',
          body: JSON.stringify({
             title: titleInput?.value || modalState.data.title,
          })
        });
        showToast('تم تعديل بيانات العقار بنجاح');
      }
      closeModal();
      fetchProperties();
    } catch (err: any) {
      showToast(`حدث خطأ: ${err.message}`, 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (loading && properties.length === 0) {
    return <div className="page-container dashboard-page"><div className="page-header"><h1>جاري تحميل العقارات...</h1></div></div>;
  }

  const propertyTypesAr: Record<string, string> = {
    'APARTMENT_BUILDING': 'عمارة سكنية',
    'VILLA': 'فيلا',
    'HOUSE': 'منزل',
    'DORMITORY': 'سكن طلاب',
    'COMPOUND': 'مجمع سكني',
    'STUDIO': 'استوديو'
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
          <h1>العقارات والوحدات</h1>
          <p className="text-secondary">إدارة القوائم العقارية والوحدات السكنية المتاحة.</p>
        </div>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '12px', border: '1.5px solid var(--border-subtle)', overflow: 'hidden', padding: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ padding: '0 12px', color: 'var(--text-secondary)' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="ابحث بعنوان العقار..." 
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
              <th>العنوان</th>
              <th>النوع</th>
              <th>الموقع</th>
              <th>الوحدات</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '32px' }}>لا توجد عقارات مضافة.</td></tr>
            ) : (
              properties.map(property => (
                <tr key={property.id}>
                  <td><strong style={{ color: 'var(--text-primary)' }}>{property.title}</strong></td>
                  <td><span className="badge badge-student" style={{ backgroundColor: 'var(--color-blue-50)', color: 'var(--brand-primary)' }}>{propertyTypesAr[property.propertyType] || property.propertyType}</span></td>
                  <td className="text-secondary">{property.city?.name}، {property.area?.name}</td>
                  <td><strong>{property._count?.units || 0}</strong></td>
                  <td>
                    <button className="btn-icon" onClick={() => setModalState({ isOpen: true, type: 'view', data: property })}>عرض</button>
                    <button className="btn-icon" onClick={() => setModalState({ isOpen: true, type: 'edit', data: property })}>تعديل</button>
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
          modalState.type === 'edit' ? `تعديل: ${modalState.data?.title}` : 
          `عرض: ${modalState.data?.title}`
        }
        footer={
          modalState.type !== 'view' && (
            <>
              <button className="btn-secondary" onClick={closeModal} disabled={processing}>إلغاء</button>
              <button className="btn-primary" onClick={handleAction} disabled={processing}>
                {processing ? 'جاري الحفظ...' : 'حفظ العقار'}
              </button>
            </>
          )
        }
      >
        {modalState.type === 'view' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="card" style={{ padding: '16px', backgroundColor: 'var(--color-neutral-50)' }}>
              <p><strong>النوع:</strong> {propertyTypesAr[modalState.data?.propertyType] || modalState.data?.propertyType}</p>
              <p><strong>الموقع:</strong> {modalState.data?.city?.name}، {modalState.data?.area?.name}</p>
              <p><strong>إجمالي الوحدات:</strong> {modalState.data?._count?.units || 0}</p>
              <p><strong>العنوان التفصيلي:</strong> {modalState.data?.address}</p>
            </div>
            <p className="text-secondary">هذه واجهة للقراءة فقط لتفاصيل العقار.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label>عنوان العقار</label>
              <input id="edit-prop-title" type="text" placeholder="مثال: عمارة النور" defaultValue={modalState.type === 'edit' ? modalState.data?.title : ''} />
            </div>
            <div className="form-group">
              <label>المدينة</label>
              <input type="text" disabled defaultValue={modalState.type === 'edit' ? modalState.data?.city?.name : ''} />
              <small className="text-secondary">لا يمكن تعديل المدينة حالياً من لوحة التحكم.</small>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
