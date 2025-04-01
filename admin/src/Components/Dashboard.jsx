import React, { useState } from 'react';
import { FiHome, FiUsers, FiCreditCard, FiCalendar, FiShoppingBag, FiSettings, 
         FiLogOut, FiMenu, FiX, FiBell, FiSearch, FiPlus, FiTruck, FiHotel } from 'react-icons/fi';
import { BiBed } from 'react-icons/bi';  

const Dashboard = () => {  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data
  const recentBookings = [
    { id: 1, name: 'John Doe', type: 'Hotel', room: 'Deluxe Suite', checkIn: '2025-04-01', checkOut: '2025-04-05', amount: 1250, status: 'Confirmed' },
    { id: 2, name: 'Alice Smith', type: 'Car', vehicle: 'SUV Toyota RAV4', pickUp: '2025-04-02', dropOff: '2025-04-07', amount: 450, status: 'Pending' },
    { id: 3, name: 'Michael Brown', type: 'Hotel', room: 'Standard Double', checkIn: '2025-04-03', checkOut: '2025-04-08', amount: 780, status: 'Confirmed' },
    { id: 4, name: 'Emily Wilson', type: 'Car', vehicle: 'Sedan Honda Civic', pickUp: '2025-04-05', dropOff: '2025-04-08', amount: 320, status: 'Cancelled' },
  ];

  // Analytics Data
  const analyticsData = {
    totalRevenue: 86450,
    bookings: {
      total: 243,
      hotels: 158,
      cars: 85
    },
    occupancyRate: 78,
    avgBookingValue: 356
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold">EasyStay Admin</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md hover:bg-indigo-700">
            {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
        <nav className="mt-8">
          <div className={`flex items-center px-4 py-3 ${activeTab === 'dashboard' ? 'bg-indigo-900' : 'hover:bg-indigo-700'} cursor-pointer`}
               onClick={() => setActiveTab('dashboard')}>
            <FiHome className="w-5 h-5" />
            {sidebarOpen && <span className="ml-4">Dashboard</span>}
          </div>
          <div className={`flex items-center px-4 py-3 ${activeTab === 'hotel' ? 'bg-indigo-900' : 'hover:bg-indigo-700'} cursor-pointer`}
               onClick={() => setActiveTab('hotel')}>
            <BiBed className="w-5 h-5" />
            {sidebarOpen && <span className="ml-4">Hotel Management</span>}
          </div>
          <div className={`flex items-center px-4 py-3 ${activeTab === 'cars' ? 'bg-indigo-900' : 'hover:bg-indigo-700'} cursor-pointer`}
               onClick={() => setActiveTab('cars')}>
            <FiTruck className="w-5 h-5" />
            {sidebarOpen && <span className="ml-4">Car Rentals</span>}
          </div>
          <div className={`flex items-center px-4 py-3 ${activeTab === 'bookings' ? 'bg-indigo-900' : 'hover:bg-indigo-700'} cursor-pointer`}
               onClick={() => setActiveTab('bookings')}>
            <FiCalendar className="w-5 h-5" />
            {sidebarOpen && <span className="ml-4">Bookings</span>}
          </div>
          <div className={`flex items-center px-4 py-3 ${activeTab === 'customers' ? 'bg-indigo-900' : 'hover:bg-indigo-700'} cursor-pointer`}
               onClick={() => setActiveTab('customers')}>
            <FiUsers className="w-5 h-5" />
            {sidebarOpen && <span className="ml-4">Customers</span>}
          </div>
          <div className={`flex items-center px-4 py-3 ${activeTab === 'payments' ? 'bg-indigo-900' : 'hover:bg-indigo-700'} cursor-pointer`}
               onClick={() => setActiveTab('payments')}>
            <FiCreditCard className="w-5 h-5" />
            {sidebarOpen && <span className="ml-4">Payments</span>}
          </div>
          <div className={`flex items-center px-4 py-3 ${activeTab === 'settings' ? 'bg-indigo-900' : 'hover:bg-indigo-700'} cursor-pointer`}
               onClick={() => setActiveTab('settings')}>
            <FiSettings className="w-5 h-5" />
            {sidebarOpen && <span className="ml-4">Settings</span>}
          </div>
          <div className="flex items-center px-4 py-3 mt-8 hover:bg-indigo-700 cursor-pointer">
            <FiLogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-4">Logout</span>}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="px-4 py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="relative">
                <FiBell className="w-6 h-6 text-gray-600 cursor-pointer" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">A</div>
                {sidebarOpen && <span className="text-gray-700">Admin User</span>}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-semibold text-gray-800">${analyticsData.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-full">
                  <FiCreditCard className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600">+5.3% </span>
                <span className="text-sm text-gray-500">from last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-semibold text-gray-800">{analyticsData.bookings.total}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <FiCalendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex space-x-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Hotels: </span>
                  <span className="text-sm font-semibold text-gray-700">{analyticsData.bookings.hotels}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Cars: </span>
                  <span className="text-sm font-semibold text-gray-700">{analyticsData.bookings.cars}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                  <p className="text-2xl font-semibold text-gray-800">{analyticsData.occupancyRate}%</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <BiBed className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analyticsData.occupancyRate}%` }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Booking Value</p>
                  <p className="text-2xl font-semibold text-gray-800">${analyticsData.avgBookingValue}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <FiShoppingBag className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600">+2.1% </span>
                <span className="text-sm text-gray-500">from last month</span>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
              <button className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800">
                <span>View All</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-50 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-50 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-50 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-50 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th scope="col" className="px-50 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-50 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-50 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-50 py-5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.type === 'Hotel' ? 
                          `${booking.room} (${booking.checkIn} - ${booking.checkOut})` : 
                          `${booking.vehicle} (${booking.pickUp} - ${booking.dropOff})`
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.type === 'Hotel' ? booking.checkIn : booking.pickUp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${booking.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-indigo-50 rounded-lg flex flex-col items-center justify-center hover:bg-indigo-100">
                  <FiPlus className="w-6 h-6 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Add Hotel Room</span>
                </button>
                <button className="p-4 bg-blue-50 rounded-lg flex flex-col items-center justify-center hover:bg-blue-100">
                  <FiPlus className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Add Car</span>
                </button>
                <button className="p-4 bg-purple-50 rounded-lg flex flex-col items-center justify-center hover:bg-purple-100">
                  <FiCalendar className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">New Booking</span>
                </button>
                <button className="p-4 bg-green-50 rounded-lg flex flex-col items-center justify-center hover:bg-green-100">
                  <FiUsers className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Add Customer</span>
                </button>
              </div>
            </div>
            
            {/* Upcoming Checkouts */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Checkouts</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">John Doe - Room 302</p>
                    <p className="text-sm text-gray-500">Checkout: Today, 12:00 PM</p>
                  </div>
                  <button className="text-sm px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Details
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Alice Smith - SUV Toyota RAV4</p>
                    <p className="text-sm text-gray-500">Return: Tomorrow, 10:00 AM</p>
                  </div>
                  <button className="text-sm px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Details
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Michael Brown - Room 401</p>
                    <p className="text-sm text-gray-500">Checkout: In 2 days</p>
                  </div>
                  <button className="text-sm px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;