"use client";
import React, { useEffect, useState } from "react";
import {dbTimeForHuman} from '../../libs/datetime';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import Loader from "@/components/loader";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        console.log(orders);
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }

  if(orders?.length === 0){
    return (
      <section className="mt-8 text-center">
        <p className="mt-4">You don't have any orders yet 😔</p>
      </section>
    )
  }

  return (
    <section className="mt-8 max-w-3xl mx-auto">
      <UserTabs isAdmin={profile} />
      <div className="mt-8">
        {loadingOrders && (
          <Loader/>
        )}
        {orders?.length > 0 &&
          orders.map((order, i) => (
            <div
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row
                  items-center gap-6"
              key={i} >
                <div className="grow flex flex-col md:flex-row items-center gap-5">
                <div>
                <div className={(order.paid ? 'bg-green-500' : 'bg-red-400')
                   + ' p-2 rounded-md text-white w-24 text-center'}>
                    {order.paid ? "Paid" : "Not paid"}
                </div>
              </div>
              <div className="grow">
                <div className="flex gap-2 items-center mb-1">
                  <div className="grow">
                    {order.userEmail}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {dbTimeForHuman(order.createdAt)}
                  </div>
                </div>
                <div className="text-gray-500 text-xs">
                  {order.cartProducts.map(p => p.name).join(', ')}
                </div>
              </div>
                </div>
              <div className="justify-end text-right flex gap-2 items-center whitespace-nowrap">
                <Link href={"/orders/"+order._id}
                  className="button">
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
