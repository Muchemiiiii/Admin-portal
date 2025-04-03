import React, { useState } from "react";
import { Hotel, Plus, Search, ChevronUp, ChevronDown, Edit, Trash2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Initial sample hotel data with Kenyan locations
const sampleHotels = [
  {
    id: 1,
    name: "Serena Hotel",
    location: "Nairobi Central Business District",
    rooms: 142,
    status: "active",
    lat: -1.2864,
    lng: 36.8172,
  },
  {
    id: 2,
    name: "Sankara Nairobi",
    location: "Westlands, Nairobi",
    rooms: 168,
    status: "active",
    lat: -1.2664,
    lng: 36.8029,
  },
  {
    id: 3,
    name: "Diani Reef Beach Resort",
    location: "Diani Beach, Mombasa",
    rooms: 143,
    status: "active",
    lat: -4.2781,
    lng: 39.5908,
  },
  {
    id: 4,
    name: "Lake Naivasha Sopa Resort",
    location: "Naivasha, Nakuru County",
    rooms: 84,
    status: "active",
    lat: -0.7577,
    lng: 36.4168,
  },
];

function HotelManagement() {
  const navigate = useNavigate();

  // State variables
  const [hotels, setHotels] = useState(sampleHotels);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isAddHotelModalOpen, setIsAddHotelModalOpen] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    rooms: 0,
    status: "active",
    lat: 0,
    lng: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add hotel function
  const addHotel = async () => {
    if (!newHotel.name || !newHotel.location || newHotel.rooms <= 0) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      // We're keeping the API call capability but not showing map-related UI
      if (newHotel.lat === 0 && newHotel.lng === 0) {
        // Search for location coordinates using OpenStreetMap Nominatim API
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              newHotel.location + ", Kenya"
            )}&format=json&limit=1`,
            {
              headers: {
                "Accept-Language": "en",
                "User-Agent": "HotelManagementApp/1.0",
              },
            }
          );

          if (response.data && response.data.length > 0) {
            const location = response.data[0];
            setNewHotel((prev) => ({
              ...prev,
              lat: parseFloat(location.lat),
              lng: parseFloat(location.lon),
            }));
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      }

      // Creating a new hotel with a temporary ID (in real app, API would return an ID)
      const newId = Math.max(...hotels.map((h) => h.id), 0) + 1;
      const hotelToAdd = {
        ...newHotel,
        id: newId,
      };

      setHotels([...hotels, hotelToAdd]);
      setIsAddHotelModalOpen(false);
      setNewHotel({
        name: "",
        location: "",
        rooms: 0,
        status: "active",
        lat: 0,
        lng: 0,
      });
      setError(null);
    } catch (error) {
      setError("Failed to add hotel");
      console.error("Error adding hotel:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle location search using OpenStreetMap Nominatim API
  const handleLocationSearch = async (e) => {
    const location = e.target.value;
    setNewHotel({ ...newHotel, location });

    if (location.length > 3) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location + ", Kenya")}&format=json&limit=1`,
          {
            headers: {
              'Accept-Language': 'en',
              'User-Agent': 'HotelManagementApp/1.0'
            }
          }
        );

        if (response.data && response.data.length > 0) {
          const place = response.data[0];
          setNewHotel(prev => ({
            ...prev,
            location: place.display_name || prev.location,
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon)
          }));
        }
      } catch (error) {
        console.error("Error searching location:", error);
      }
    }
  };

  // Delete hotel
  const deleteHotel = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      setIsLoading(true);
      try {
        setHotels(hotels.filter((hotel) => hotel.id !== id));
      } catch (error) {
        setError("Failed to delete hotel");
        console.error("Error deleting hotel:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Toggle sorting
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter hotels based on search term
  const filteredHotels = hotels
    .filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <Hotel className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mr-2" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Hotel Management
          </h1>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center w-full sm:w-auto"
          onClick={() => setIsAddHotelModalOpen(true)}
        >
          <Plus className="h-5 w-5 mr-1" />
          Add New Hotel
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
          <span className="block sm:inline">{error}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6">
        <div className="relative mb-4 sm:mb-0 w-full sm:w-auto sm:min-w-[250px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search hotels..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Hotel Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-2 md:px-4 text-left">
                <button
                  className="flex items-center"
                  onClick={() => toggleSort("name")}
                >
                  <span className="hidden md:inline">Hotel Name</span>
                  <span className="md:hidden">Name</span>
                  {sortField === "name" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </button>
              </th>
              <th className="py-2 px-2 md:px-4 text-left">
                <button
                  className="flex items-center"
                  onClick={() => toggleSort("location")}
                >
                  Location{" "}
                  {sortField === "location" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </button>
              </th>
              <th className="py-2 px-2 md:px-4 text-left hidden sm:table-cell">
                <button
                  className="flex items-center"
                  onClick={() => toggleSort("rooms")}
                >
                  Rooms{" "}
                  {sortField === "rooms" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </button>
              </th>
              <th className="py-2 px-2 md:px-4 text-left hidden md:table-cell">
                Status
              </th>
              <th className="py-2 px-2 md:px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHotels.map((hotel) => (
              <tr key={hotel.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2 md:px-4">{hotel.name}</td>
                <td className="py-2 px-2 md:px-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="truncate max-w-xs">{hotel.location}</span>
                  </div>
                </td>
                <td className="py-2 px-2 md:px-4 hidden sm:table-cell">
                  {hotel.rooms}
                </td>
                <td className="py-2 px-2 md:px-4 hidden md:table-cell">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hotel.status === "active"
                        ? "bg-green-100 text-green-800"
                        : hotel.status === "maintenance"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {hotel.status}
                  </span>
                </td>
                <td className="py-2 px-2 md:px-4 text-right">
                  <button
                    className="text-gray-600 hover:text-blue-600 p-1"
                    onClick={() => navigate(`/hotel/${hotel.id}/edit`)}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    className="text-gray-600 hover:text-red-600 p-1 ml-1"
                    onClick={() => deleteHotel(hotel.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredHotels.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No hotels found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Hotel Modal */}
      {isAddHotelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Hotel</h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Hotel Name
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newHotel.name}
                onChange={(e) =>
                  setNewHotel({ ...newHotel, name: e.target.value })
                }
                placeholder="Enter hotel name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Location in Kenya
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newHotel.location}
                onChange={handleLocationSearch}
                placeholder="Enter location in Kenya"
              />
              {newHotel.lat !== 0 && newHotel.lng !== 0 && (
                <p className="text-xs text-green-600 mt-1">
                  Location verified in Kenya
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Number of Rooms
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newHotel.rooms}
                onChange={(e) =>
                  setNewHotel({
                    ...newHotel,
                    rooms: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Enter number of rooms"
                min="1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newHotel.status}
                onChange={(e) =>
                  setNewHotel({ ...newHotel, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex items-center justify-end mt-6">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg mr-2"
                onClick={() => setIsAddHotelModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
                onClick={addHotel}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                Add Hotel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelManagement;