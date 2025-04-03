import React, { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp, Clock, Filter, ChevronDown, ChevronUp, Download, RefreshCw } from 'lucide-react';

const Bookings= () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    cancelled: 0,
    revenue: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    sortBy: 'newest'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch bookings data from OpenStreamAPI
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would be:
        // const response = await fetch('https://api.openstream.com/v1/bookings', {
        //   headers: {
        //     'Authorization': 'Bearer YOUR_API_KEY',
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        
        // For demo purposes, using mock data
        setTimeout(() => {
          const mockData = generateMockBookings(50);
          setBookings(mockData);
          calculateStats(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch bookings data');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Generate mock bookings data
  const generateMockBookings = (count) => {
    const statuses = ['completed', 'pending', 'cancelled'];
    const cars = [
      { id: 1, make: 'Toyota', model: 'Corolla', numberPlate: 'KDD 123A', rate: 7500 },
      { id: 2, make: 'Honda', model: 'Civic', numberPlate: 'KCE 456B', rate: 8000 },
      { id: 3, make: 'Mazda', model: 'CX-5', numberPlate: 'KBZ 789C', rate: 12000 },
      { id: 4, make: 'Nissan', model: 'X-Trail', numberPlate: 'KDG 234D', rate: 15000 },
      { id: 5, make: 'Suzuki', model: 'Swift', numberPlate: 'KCA 567E', rate: 6000 },
    ];
    
    const customers = [
      { id: 1, name: 'John Kamau', email: 'john.k@example.com', phone: '+254 712 345 678' },
      { id: 2, name: 'Mary Wanjiku', email: 'mary.w@example.com', phone: '+254 723 456 789' },
      { id: 3, name: 'David Omondi', email: 'david.o@example.com', phone: '+254 734 567 890' },
      { id: 4, name: 'Esther Nyambura', email: 'esther.n@example.com', phone: '+254 745 678 901' },
      { id: 5, name: 'Michael Wafula', email: 'michael.w@example.com', phone: '+254 756 789 012' },
    ];
    
    return Array.from({ length: count }, (_, i) => {
      const car = cars[Math.floor(Math.random() * cars.length)];
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const startDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      const days = Math.floor(Math.random() * 14) + 1;
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + days);
      
      return {
        id: i + 1,
        bookingId: `BK-${1000 + i}`,
        car,
        customer,
        startDate,
        endDate,
        days,
        amount: car.rate * days,
        status,
        paymentMethod: Math.random() > 0.5 ? 'M-Pesa' : 'Credit Card',
        createdAt: new Date(startDate.getTime() - Math.random() * 10 * 24 * 60 * 60 * 1000)
      };
    });
  };

  // Calculate statistics from bookings data
  const calculateStats = (bookingsData) => {
    const total = bookingsData.length;
    const completed = bookingsData.filter(b => b.status === 'completed').length;
    const pending = bookingsData.filter(b => b.status === 'pending').length;
    const cancelled = bookingsData.filter(b => b.status === 'cancelled').length;
    const revenue = bookingsData
      .filter(b => b.status === 'completed')
      .reduce((sum, booking) => sum + booking.amount, 0);
    
    setStats({ total, completed, pending, cancelled, revenue });
  };

  // Filter bookings based on current filters
  const filterBookings = () => {
    let result = [...bookings];
    
    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(booking => booking.status === filters.status);
    }
    
    // Filter by date range
    if (filters.dateRange !== 'all') {
      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      if (filters.dateRange === 'today') {
        result = result.filter(booking => 
          booking.startDate >= startOfToday || 
          booking.endDate >= startOfToday && booking.startDate < startOfToday
        );
      } else if (filters.dateRange === 'week') {
        const startOfWeek = new Date(startOfToday);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        
        result = result.filter(booking => 
          booking.startDate >= startOfWeek || 
          booking.endDate >= startOfWeek && booking.startDate < startOfWeek
        );
      } else if (filters.dateRange === 'month') {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        
        result = result.filter(booking => 
          booking.startDate >= startOfMonth || 
          booking.endDate >= startOfMonth && booking.startDate < startOfMonth
        );
      }
    }
    
    // Sort bookings
    result.sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (filters.sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (filters.sortBy === 'highest') {
        return b.amount - a.amount;
      } else if (filters.sortBy === 'lowest') {
        return a.amount - b.amount;
      }
      return 0;
    });
    
    return result;
  };

  const filteredBookings = filterBookings();
  
  // Get current page bookings
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  // Format date to local string
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status color class
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Export bookings data as CSV
  const exportToCSV = () => {
    const headers = ['Booking ID', 'Customer', 'Car', 'Start Date', 'End Date', 'Days', 'Amount (KSh)', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredBookings.map(booking => [
        booking.bookingId,
        booking.customer.name,
        `${booking.car.make} ${booking.car.model} (${booking.car.numberPlate})`,
        formatDate(booking.startDate),
        formatDate(booking.endDate),
        booking.days,
        booking.amount,
        booking.status
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bookings_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="animate-spin w-8 h-8 text-blue-600" />
        <span className="ml-2 text-lg">Loading bookings data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-md text-red-700 mb-4">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Total Bookings</h2>
        <p className="text-gray-600">Manage and track all your car rental bookings</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-blue-700 font-medium">Total Bookings</h3>
            <Calendar className="h-5 w-5 text-blue-700" />
          </div>
          <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-green-700 font-medium">Completed</h3>
            <Users className="h-5 w-5 text-green-700" />
          </div>
          <p className="text-2xl font-bold text-green-800">{stats.completed}</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-yellow-700 font-medium">Pending</h3>
            <Clock className="h-5 w-5 text-yellow-700" />
          </div>
          <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-red-700 font-medium">Cancelled</h3>
            <Clock className="h-5 w-5 text-red-700" />
          </div>
          <p className="text-2xl font-bold text-red-800">{stats.cancelled}</p>
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-indigo-700 font-medium">Total Revenue</h3>
            <TrendingUp className="h-5 w-5 text-indigo-700" />
          </div>
          <p className="text-2xl font-bold text-indigo-800">KSh {stats.revenue.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <button 
            className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center justify-center hover:bg-gray-200"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
            {isFilterOpen ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-green-700"
            onClick={exportToCSV}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>
      
      {/* Filter Options */}
      {isFilterOpen && (
        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="py-3 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="py-3 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
              <th className="py-3 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th className="py-3 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="py-3 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentBookings.map(booking => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="py-3 px-2 md:px-4 whitespace-nowrap">{booking.bookingId}</td>
                <td className="py-3 px-2 md:px-4">
                  <div className="text-sm font-medium text-gray-900">{booking.customer.name}</div>
                  <div className="text-xs text-gray-500">{booking.customer.phone}</div>
                </td>
                <td className="py-3 px-2 md:px-4">
                  <div className="text-sm font-medium text-gray-900">{booking.car.make} {booking.car.model}</div>
                  <div className="text-xs text-gray-500">{booking.car.numberPlate}</div>
                </td>
                <td className="py-3 px-2 md:px-4">
                  <div className="text-sm text-gray-900">{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</div>
                  <div className="text-xs text-gray-500">{booking.days} days</div>
                </td>
                <td className="py-3 px-2 md:px-4 text-sm text-gray-900">KSh {booking.amount.toLocaleString()}</td>
                <td className="py-3 px-2 md:px-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
            {currentBookings.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                  No bookings found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-4 pb-2 mt-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
            <span className="font-medium">
              {indexOfLastItem > filteredBookings.length ? filteredBookings.length : indexOfLastItem}
            </span>{" "}
            of <span className="font-medium">{filteredBookings.length}</span> results
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Logic to show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;