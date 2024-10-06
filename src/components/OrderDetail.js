import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/api/order/order-detail/${id}`);
        setOrder(response.data.order);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to fetch order details.');
      }
    };
    fetchOrder();
  }, [id]);

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  if (!order) {
    return <div className="text-center">Loading...</div>;
  }

  const calculateTotal = () => {
    return order.OrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Order Receipt', 14, 22);

    const headers = [['Product ID', 'Quantity', 'Price', 'Subtotal']];
    const data = order.OrderItems.map(item => [
      item.Book.title,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${(item.price * item.quantity).toFixed(2)}`
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 30,
      theme: 'grid',
    });

    doc.text(`Total: $${calculateTotal()}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`order_${order.id}.pdf`);
  };

  return (
    <div className="w-full  flex flex-col items-center  bg-gray-100 p-5">
      <div className="w-full  max-w-3xl bg-white  p-5">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Order Receipt</h1>
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
          <p className="text-gray-600">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
          <p className="text-gray-600">Status: {order.orderStatus}</p>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 text-sm border-b">
              <th className="py-2">Book</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Price</th>
              <th className="py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.OrderItems.map(item => (
              <tr key={item.productId} className="border-b">
                <td className="py-2">{item.Book.title}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">${item.price.toFixed(2)}</td>
                <td className="py-2">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 text-right">
          <p className="text-xl font-bold">Total: ${calculateTotal()}</p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={downloadPDF}
            className="flex items-center justify-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-400 transition duration-300"
          >
            <FaFilePdf className="mr-2" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
