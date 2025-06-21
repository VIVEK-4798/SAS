"use client";
import React, { useEffect, useState } from "react";
import { dbTimeForHuman } from "../../libs/datetime";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import Loader from "@/components/loader";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoadingOrders(true);
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };
  
    fetchOrders();
  }, []);
  

  if (loadingOrders) {
    return (
      <section className="mt-8 text-center">
        <Loader />
      </section>
    );
  }

  if (!loadingOrders && orders.length === 0) {
    return (
      <section className="mt-8 text-center">
        <p className="mt-4">You don&apos;t have any orders yet 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8 max-w-3xl mx-auto">
      <UserTabs isAdmin={profile} />
      <div className="mt-8">
        {orders.map((order, i) => (
          <div
            className="bg-secondry border border-borclr mb-2 p-4 rounded-lg flex flex-col md:flex-row
                  items-center gap-6"
            key={i}
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
              <Link href={"/orders/" + order._id} className="button" style={{border: '1px solid #F9BC75'}}>
                Show order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
