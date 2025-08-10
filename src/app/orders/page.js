"use client";
import React, { useEffect, useState } from "react";
import { dbTimeForHuman } from "../../libs/datetime";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import Loader from "@/components/loader";
import { FaTrash } from "react-icons/fa";
import DeleteButton from "@/components/DeleteButton";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 10;

  const { loading, data: profile } = useProfile();

  const fetchOrders = async (page = 1) => {
    try {
      setLoadingOrders(true);
      const res = await fetch(`/api/orders?page=${page}&limit=${ORDERS_PER_PAGE}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.orders);
      setTotalOrders(data.totalOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleDelete = async (orderId) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Are you sure you want to delete this order?</span>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-2 py-1 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);

                const promise = new Promise(async (resolve, reject) => {
                  const res = await fetch(`/api/orders?id=${orderId}`, {
                    method: "DELETE",
                  });
                  if (res.ok) {
                    setOrders((prev) => prev.filter((o) => o._id !== orderId));
                    resolve("Deleted");
                  } else {
                    reject("Failed to delete order");
                  }
                });

                toast.promise(promise, {
                  loading: "Deleting...",
                  success: "Order deleted successfully",
                  error: (err) => err || "Failed to delete order",
                });
              }}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
      }
    );
  };

  // Check if an order is within 6 hours
  const canDeleteOrder = (createdAt) => {
    const orderTime = new Date(createdAt).getTime();
    const now = Date.now();
    const sixHours = 6 * 60 * 60 * 1000; // ms
    return now - orderTime <= sixHours;
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="mt-8 max-w-3xl mx-auto">
      <UserTabs isAdmin={profile} />

      {loadingOrders ? (
        <div className="text-center mt-8">
          <Loader />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center mt-8">
          <p>You don&apos;t have any orders yet 😔</p>
        </div>
      ) : (
        <>
          {!profile?.isAdmin && orders.length > 0 && (
            <p className="text-sm text-gray-500 mb-4 mt-5">
              <strong>Note:</strong> Orders can only be cancelled within the first 6 hours after placing them.
            </p>
          )}
          <div className="mt-8">
            {orders.map((order, i) => (
              <div
                key={i}
                className="bg-secondry border border-borclr mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
              >
                <div className="grow flex flex-col md:flex-row items-center gap-5">
                  <div className="grow">
                    <div className="flex gap-2 items-center mb-1">
                      <div className="grow">{order.userEmail}</div>
                      <div className="text-gray-500 text-xs">
                        {dbTimeForHuman(order.createdAt)}
                      </div>
                    </div>
                    <div className="text-gray-500 text-xs">
                      {order.cartProducts.map((p) => p.name).join(", ")}
                    </div>
                  </div>
                </div>
                <div className="justify-end text-right flex gap-2 items-center whitespace-nowrap">
                  <Link
                    href={"/orders/" + order._id}
                    className="button"
                    style={{ border: "1px solid #F9BC75" }}
                  >
                    Show order
                  </Link>

                  {/* Admin always sees delete, user sees delete only if within 6 hours */}
                  {(profile?.isAdmin || canDeleteOrder(order.createdAt)) && (
                    <DeleteButton
                      onDelete={() => handleDelete(order._id)}
                      icon={<FaTrash />}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              &lt;
            </button>
            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i}
                onClick={() => handlePageClick(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-primary text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default OrdersPage;
