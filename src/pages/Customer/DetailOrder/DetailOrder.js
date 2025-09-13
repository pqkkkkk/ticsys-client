import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetOrderByIdWithDetailOrderAndTicketAndEventApi } from "../../../services/api/OrderApi";
import { GetUser } from "../../../services/UserStorageService";
import ThemeToggle from "../../../components/ThemeToggle/ThemeToggle";

function DetailOrder() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user] = useState(GetUser());
    const { orderId } = useParams();
    const [order, setOrder] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalTickets, setTotalTickets] = useState(0);

    useEffect(() => {
        if(user === null || user.roles?.find(role => role === "USER") === undefined) {
            // Lưu current location để redirect back sau khi đăng nhập
            sessionStorage.setItem('redirectAfterLogin', location.pathname);
            navigate('/signin', { replace: true });
        }
    }, [navigate, user, location.pathname]);

    useEffect(() => {
        GetOrderByIdWithDetailOrderAndTicketAndEventApi(orderId).then((response) => {
            setOrder(response);
        }).catch((error) => {
            console.log(error);
        });
    }, [orderId]);

    useEffect(() => {
        let totalAmount = 0;
        let totalTickets = 0;
        order.ticketOfOrders?.forEach((ticketOfOrder, index) => {
            totalAmount += ticketOfOrder.quantity * order.ticketInfos?.at(index)?.price;
            totalTickets += ticketOfOrder.quantity;
        });
        setTotalAmount(totalAmount);
        setTotalTickets(totalTickets);
    }, [order]);
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <ThemeToggle />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/orders")}
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to My Orders
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-secondary-700 dark:text-white mb-2">
              Order Details
            </h1>
            <p className="text-secondary-600 dark:text-gray-300">
              Order #{order.order?.id}
            </p>
          </div>

          {/* Event Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="relative">
              <img
                src={order.event?.bannerPath}
                alt="Event banner"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  {order.event?.name}
                </h2>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{order.event?.date}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{order.event?.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Order Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-secondary-700 dark:text-white mb-6 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-primary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Order Information
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-secondary-600 dark:text-gray-300">
                    Order Date
                  </span>
                  <span className="font-semibold text-secondary-700 dark:text-white">
                    {order.order?.dateCreatedAt}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-secondary-600 dark:text-gray-300">
                    Payment Method
                  </span>
                  <span className="font-semibold text-secondary-700 dark:text-white">
                    Free
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-secondary-600 dark:text-gray-300">
                    Order Status
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.order?.status === "COMPLETED"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : order.order?.status === "PENDING"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {order.order?.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Buyer Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-secondary-700 dark:text-white mb-6 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-primary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Buyer Information
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-secondary-600 dark:text-gray-300">
                    Name
                  </span>
                  <span className="font-semibold text-secondary-700 dark:text-white">
                    {user?.fullName}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-secondary-600 dark:text-gray-300">
                    Email
                  </span>
                  <span className="font-semibold text-secondary-700 dark:text-white">
                    {user?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-secondary-600 dark:text-gray-300">
                    Phone
                  </span>
                  <span className="font-semibold text-secondary-700 dark:text-white">
                    {user?.phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-secondary-600 dark:text-gray-300">
                    Address
                  </span>
                  <span className="font-semibold text-secondary-700 dark:text-white">
                    {user?.address || "Not provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-secondary-700 dark:text-white mb-6 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-primary-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Order Details
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-300 border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-4 px-4 text-secondary-700 dark:text-white dark:bg-gray-500 font-semibold">
                      Ticket Type
                    </th>
                    <th className="text-center py-4 px-4 text-secondary-700 dark:text-white dark:bg-gray-500 font-semibold">
                      Quantity
                    </th>
                    <th className="text-right py-4 px-4 text-secondary-700 dark:text-white dark:bg-gray-500 font-semibold">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {order.ticketOfOrders &&
                    order.ticketOfOrders.map((ticketOfOrder, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <td className="py-4 px-4 text-secondary-800 dark:text-gray-500 font-medium">
                          {order.ticketInfos?.at(index)?.name}
                        </td>
                        <td className="py-4 px-4 text-center text-secondary-700 dark:text-gray-500 font-medium">
                          {ticketOfOrder.quantity}
                        </td>
                        <td className="py-4 px-4 text-right font-bold text-secondary-800 dark:text-gray-500">
                          {(
                            ticketOfOrder.quantity *
                            order.ticketInfos?.at(index)?.price
                          )?.toLocaleString("vi-VN")}{" "}
                          đ
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <span className="text-secondary-600 dark:text-gray-300">
                  Total Tickets:
                </span>
                <span className="font-semibold text-secondary-700 dark:text-white">
                  {totalTickets}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-secondary-700 dark:text-white">
                  Total Amount:
                </span>
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {totalAmount?.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default DetailOrder;