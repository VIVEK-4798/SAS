"use client";
import React, { useEffect, useState } from "react";
import dbTimeForHuman from '../../libs/datetime';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        console.log(orders);
        setOrders(orders);
      });
    });
  }, []);

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile} />
      <div className="mt-8">
        {orders?.length > 0 &&
          orders.map((order, i) => (
            <div
              className="bg-gray-100 mb-2 p-4 rounded-lg grid grid-cols-3"
              key={i}
            >
              <div 
                className="text-gray-500">
                    {order.userEmail}{order.paid}
              </div>
              <div className="text-center">
                <span className={
                        (order.paid ? 'bg-green-500' : 'bg-red-400') + ' p-2 rounded-md text-white'}>
                    {order.paid ? "Paid" : "Not paid"}
                </span>
              </div>
              <div className="text-right">
                {dbTimeForHuman(order.createdAt)}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default OrdersPage;
