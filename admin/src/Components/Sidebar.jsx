import React from "react";

function Sidebar() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="p-4 text-center text-2xl font-bold border-b border-blue-700">
          Admin Portal
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <a
            href="/dashboard"
            className="block px-4 py-2 rounded hover:bg-blue-600"
          >
            Dashboard
          </a>
          <a
            href="/bookings"
            className="block px-4 py-2 rounded hover:bg-blue-600"
          >
            Bookings
          </a>
          <a
            href="/hotels"
            className="block px-4 py-2 rounded hover:bg-blue-600"
          >
            Hotels
          </a>
          <a
            href="/cars"
            className="block px-4 py-2 rounded hover:bg-blue-600"
          >
            Cars
          </a>
          <a
            href="/profile"
            className="block px-4 py-2 rounded hover:bg-blue-600"
          >
            Profile
          </a>
          <a
            href="/settings"
            className="block px-4 py-2 rounded hover:bg-blue-600"
          >
            Settings
          </a>
        </nav>
        <div className="p-4 border-t border-blue-700">
          <button className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Admin Portal</h1>
        <p className="text-gray-600 mt-4">
          Select an option from the sidebar to get started.
        </p>
      </div>
    </div>
  );
}

export default Sidebar;