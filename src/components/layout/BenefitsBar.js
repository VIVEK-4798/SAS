import React from "react";
import {
  FaShippingFast,
  FaMoneyBillWave,
  FaGem  ,
  FaCreditCard,
  FaClock,
  FaTshirt
} from "react-icons/fa";

const benefits = [
  {
    title: "Free Delivery on All Orders",
    icon: FaShippingFast,
  },
  {
    title: "Premium Quality Materials",
    icon: FaGem,
  },
  {
    title: "Secure Online Payments",
    icon: FaCreditCard,
  },
  {
    title: "Seasonal & Festival Discounts",
    icon: FaMoneyBillWave,
  },
  {
    title: "24/7 Customer Support",
    icon: FaClock,
  },
  {
    title: "Wide Range of Styles",
    icon: FaTshirt,
  },
];


const BenefitsBar = () => {
  return (
    <div className="w-full bg-[#fdf3e7] py-10 border-y border-[#e5e7eb] font-poppins mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={index}
              className="relative bg-[#faebd9] rounded-xl p-6 text-center shadow-sm transition-all duration-300 ease-in-out overflow-hidden group hover:-translate-y-1 hover:shadow-xl border border-[#e5e7eb]"
            >
              {/* Hover background effect */}
              <div
                className="absolute inset-0 h-0 opacity-0 group-hover:opacity-100 group-hover:h-full transition-all duration-300 ease-in-out z-0"
                style={{ backgroundColor: "#FBDDB9" }}
              ></div>

              {/* Icon wrapper */}
              <div
                className="relative z-10 w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out bg-opacity-10 group-hover:bg-[#FBDDB9] group-hover:scale-110 border group-hover:border-white"
                style={{ backgroundColor: "#1B3B50" }}
              >
                <Icon className="text-[30px] text-white group-hover:text-[#FBDDB9] transition duration-300 ease-in-out" />
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-base font-semibold text-[#1B3B50]  transition-colors duration-300 ease-in-out">
                {benefit.title}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BenefitsBar;
