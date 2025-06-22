'use client';
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/UseProfile';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader';

const USERS_PER_PAGE = 10;

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const UserPage = () => {
  const { loading, data } = useProfile();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async (page = 1) => {
    setLoadingUsers(true);
    try {
      const res = await fetch(`/api/users?page=${page}&limit=${USERS_PER_PAGE}`);
      const data = await res.json();
      setUsers(data.users);
      setTotalUsers(data.totalUsers);
      
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  if (loading || loadingUsers) return <Loader />;
  if (!data) return 'Not an admin';

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  return (
    <section className="max-w-3xl mx-auto mt-8">
      <UserTabs isAdmin={true} />

      {/* Total User Count */}
      <div className="text-center mt-4 mb-6 text-gray-700 font-semibold">
        Total Registered Users: {totalUsers}
      </div>

      {/* User List */}
      <div className="mt-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex flex-wrap sm:flex-nowrap items-center justify-between bg-secondry border border-borclr rounded-lg mb-2 p-3 px-4 gap-2 sm:gap-4"
          >
            <div className="text-sm text-gray-800 flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <span className="font-medium">{user.name || <i>No name</i>}</span>
              <span className="text-gray-500">{user.email}</span>
              <span className="text-gray-400 text-xs">
                Joined on: {formatDate(user.createdAt)}
              </span>
            </div>
            <Link
              className="button text-sm md:w-32"
              style={{ border: '1px solid #F9BC75' }}
              href={`/users/${user._id}`}
            >
              Edit
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &lt;
        </button>
        {[...Array(totalPages).keys()].map((i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? 'bg-primary text-white' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default UserPage;
