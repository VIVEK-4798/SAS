"use client";
import UserTabs from '@/components/layout/UserTabs';
import { React, useState, useEffect } from 'react';
import { useProfile } from '../../components/UseProfile';
import DeleteButton from '@/components/DeleteButton';
import toast from 'react-hot-toast';

const CouponsPage = () => {
  const [couponName, setCouponName] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [editedCoupon, setEditedCoupon] = useState(null);

  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetchCoupons();
  }, []);

  function fetchCoupons() {
    fetch('/api/coupons').then(res => {
      res.json().then(coupons => {
        setCoupons(coupons);
      });
    });
  }

  async function handleCouponSubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = {
        name: couponName,
        discountAmount: parseFloat(discountAmount)
      };
      if (editedCoupon) {
        data._id = editedCoupon._id;
      }

      const response = await fetch('/api/coupons', {
        method: editedCoupon ? 'PUT' : 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      setCouponName('');
      setDiscountAmount('');
      fetchCoupons();
      setEditedCoupon(null);

      response.ok ? resolve() : reject();
    });

    await toast.promise(creationPromise, {
      loading: editedCoupon ? 'Updating coupon...' : 'Creating your new coupon...',
      success: editedCoupon ? 'Coupon updated' : 'Coupon created',
      error: 'Error, sorry...',
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch(`/api/coupons?_id=${_id}`, {
        method: 'DELETE',
      });
      response.ok ? resolve() : reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });
    fetchCoupons();
  }

  if (profileLoading) return 'Loading user info...';
  if (!profileData) return 'Not an admin';

  return (
    <section className='mt-8 max-w-3xl mx-auto'>
      <UserTabs isAdmin={true} />

      {/* Coupon Form */}
      <form className='mt-8' onSubmit={handleCouponSubmit}>
        <div className='flex flex-col sm:flex-row gap-4 items-end'>
          <div className='flex-1'>
            <label>
              {editedCoupon ? 'Update Coupon Name' : 'New Coupon Name'}
              {editedCoupon && <>: <b>{editedCoupon.name}</b></>}
            </label>
            <input
              type='text'
              value={couponName}
              onChange={ev => setCouponName(ev.target.value)}
              placeholder='e.g., NEWYEAR50'
              required
            />
          </div>

          <div className='w-40'>
            <label>Discount Amount (₹)</label>
            <input
              type='number'
              min="0"
              value={discountAmount}
              onChange={ev => setDiscountAmount(ev.target.value)}
              placeholder='e.g., 100'
              required
            />
          </div>

          <div className='flex gap-2 pb-2'>
            <button type='submit' className='border border-primary px-3'>
              {editedCoupon ? 'Update' : 'Create'}
            </button>
            {editedCoupon && (
              <button
                type='button'
                onClick={() => {
                  setEditedCoupon(null);
                  setCouponName('');
                  setDiscountAmount('');
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Existing Coupons */}
      <div>
        <h2 className='mt-8 mb-2 text-sm text-gray-500'>Existing Coupons:</h2>
        {coupons?.length > 0 && coupons.map(c => (
          <div
            key={c._id}
            className='bg-secondry border border-borclr items-center rounded-xl p-2 px-4 flex gap-4 justify-between mb-1'
          >
            <div className='flex flex-col sm:flex-row gap-4 sm:items-center flex-1'>
              <span className='font-medium'>{c.name}</span>
              <span className='text-gray-500 text-sm'>Discount: ₹{c.discountAmount}</span>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => {
                  setEditedCoupon(c);
                  setCouponName(c.name);
                  setDiscountAmount(c.discountAmount);
                }}
                className='border border-[#F9BC75] px-2'
              >
                Edit
              </button>
              <DeleteButton
                label="Delete"
                onDelete={() => handleDeleteClick(c._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CouponsPage;
