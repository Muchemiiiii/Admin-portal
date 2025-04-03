import React, { useState, useEffect } from "react";
import {
  Search,
  PlusCircle,
  Edit2,
  Trash2,
  Check,
  X,
  RefreshCw,
} from "lucide-react";

const CarRental = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [isEditingCar, setIsEditingCar] = useState(null);
  const [newCar, setNewCar] = useState({
    numberPlate: "",
    make: "",
    model: "",
    year: "",
    color: "",
    rentalRate: "",
    status: "available",
  });

  // Sample data - replace with actual API call
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // In a real implementation, this would be:
        // const response = await fetch('https://api.openstream.com/v1/cars', {
        //   headers: { Authorization: `Bearer ${apiKey}` }
        // });
        // const data = await response.json();

        // For demo purposes, use mock data
        setTimeout(() => {
          const mockData = [
            {
              id: 1,
              numberPlate: "KDD 123A",
              make: "Toyota",
              model: "Corolla",
              year: 2022,
              color: "White",
              rentalRate: 7500,
              status: "available",
            },
            {
              id: 2,
              numberPlate: "KCE 456B",
              make: "Honda",
              model: "Civic",
              year: 2021,
              color: "Silver",
              rentalRate: 8000,
              status: "rented",
            },
            {
              id: 3,
              numberPlate: "KBZ 789C",
              make: "Mazda",
              model: "CX-5",
              year: 2023,
              color: "Red",
              rentalRate: 12000,
              status: "maintenance",
            },
            {
              id: 4,
              numberPlate: "KDG 234D",
              make: "Nissan",
              model: "X-Trail",
              year: 2022,
              color: "Blue",
              rentalRate: 15000,
              status: "available",
            },
            {
              id: 5,
              numberPlate: "KCA 567E",
              make: "Suzuki",
              model: "Swift",
              year: 2021,
              color: "Black",
              rentalRate: 6000,
              status: "available",
            },
          ];
          setCars(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch cars data");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleAddCar = () => {
    // Validate Kenyan number plate format (KXX 123X)
    const plateRegex = /^K[A-Z]{2}\s\d{3}[A-Z]$/;
    if (!plateRegex.test(newCar.numberPlate)) {
      alert("Please enter a valid Kenyan number plate format (e.g., KDD 123A)");
      return;
    }

    // In real implementation, this would be a POST API call
    const carToAdd = {
      id: cars.length + 1,
      ...newCar,
    };

    setCars([...cars, carToAdd]);
    setIsAddingCar(false);
    setNewCar({
      numberPlate: "",
      make: "",
      model: "",
      year: "",
      color: "",
      rentalRate: "",
      status: "available",
    });
  };

  const handleEditCar = (car) => {
    setIsEditingCar(car.id);
    // Pre-fill form with car data
    setNewCar({
      numberPlate: car.numberPlate,
      make: car.make,
      model: car.model,
      year: car.year,
      color: car.color,
      rentalRate: car.rentalRate,
      status: car.status,
    });
  };

  const handleUpdateCar = () => {
    // Validate Kenyan number plate format
    const plateRegex = /^K[A-Z]{2}\s\d{3}[A-Z]$/;
    if (!plateRegex.test(newCar.numberPlate)) {
      alert("Please enter a valid Kenyan number plate format (e.g., KDD 123A)");
      return;
    }

    // In real implementation, this would be a PUT API call
    const updatedCars = cars.map((car) =>
      car.id === isEditingCar ? { ...car, ...newCar } : car
    );

    setCars(updatedCars);
    setIsEditingCar(null);
    setNewCar({
      numberPlate: "",
      make: "",
      model: "",
      year: "",
      color: "",
      rentalRate: "",
      status: "available",
    });
  };

  const handleDeleteCar = (id) => {
    // In real implementation, this would be a DELETE API call
    if (window.confirm("Are you sure you want to delete this car?")) {
      setCars(cars.filter((car) => car.id !== id));
    }
  };

  const filteredCars = cars.filter((car) => {
    return (
      car.numberPlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "rented":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="animate-spin w-8 h-8 text-blue-600" />
        <span className="ml-2 text-lg">Loading car data...</span>
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Car Rental Administration
        </h2>
        <p className="text-gray-600">Manage your fleet of rental vehicles</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search cars..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700"
          onClick={() => setIsAddingCar(true)}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Car
        </button>
      </div>

      {isAddingCar && (
        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Add New Car</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number Plate (KXX 123X)
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="KDD 123A"
                value={newCar.numberPlate}
                onChange={(e) =>
                  setNewCar({ ...newCar, numberPlate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Make
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Toyota"
                value={newCar.make}
                onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Corolla"
                value={newCar.model}
                onChange={(e) =>
                  setNewCar({ ...newCar, model: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="2023"
                value={newCar.year}
                onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="White"
                value={newCar.color}
                onChange={(e) =>
                  setNewCar({ ...newCar, color: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rental Rate (KSh/day)
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="7500"
                value={newCar.rentalRate}
                onChange={(e) =>
                  setNewCar({ ...newCar, rentalRate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newCar.status}
                onChange={(e) =>
                  setNewCar({ ...newCar, status: e.target.value })
                }
              >
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
              onClick={() => {
                setIsAddingCar(false);
                setNewCar({
                  numberPlate: "",
                  make: "",
                  model: "",
                  year: "",
                  color: "",
                  rentalRate: "",
                  status: "available",
                });
              }}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={handleAddCar}
            >
              Add Car
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number Plate
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Make/Model
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rate (KSh/day)
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50">
                {isEditingCar === car.id ? (
                  <>
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={newCar.numberPlate}
                        onChange={(e) =>
                          setNewCar({ ...newCar, numberPlate: e.target.value })
                        }
                      />
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          className="w-full p-1 border border-gray-300 rounded-md"
                          value={newCar.make}
                          onChange={(e) =>
                            setNewCar({ ...newCar, make: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="w-full p-1 border border-gray-300 rounded-md"
                          value={newCar.model}
                          onChange={(e) =>
                            setNewCar({ ...newCar, model: e.target.value })
                          }
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={newCar.year}
                        onChange={(e) =>
                          setNewCar({ ...newCar, year: e.target.value })
                        }
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={newCar.color}
                        onChange={(e) =>
                          setNewCar({ ...newCar, color: e.target.value })
                        }
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={newCar.rentalRate}
                        onChange={(e) =>
                          setNewCar({ ...newCar, rentalRate: e.target.value })
                        }
                      />
                    </td>
                    <td className="py-2 px-4">
                      <select
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={newCar.status}
                        onChange={(e) =>
                          setNewCar({ ...newCar, status: e.target.value })
                        }
                      >
                        <option value="available">Available</option>
                        <option value="rented">Rented</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                          onClick={handleUpdateCar}
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => {
                            setIsEditingCar(null);
                            setNewCar({
                              numberPlate: "",
                              make: "",
                              model: "",
                              year: "",
                              color: "",
                              rentalRate: "",
                              status: "available",
                            });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-4 px-4 font-medium">{car.numberPlate}</td>
                    <td className="py-4 px-4">
                      {car.make} {car.model}
                    </td>
                    <td className="py-4 px-4">{car.year}</td>
                    <td className="py-4 px-4">{car.color}</td>
                    <td className="py-4 px-4">
                      KSh {car.rentalRate.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          car.status
                        )}`}
                      >
                        {car.status.charAt(0).toUpperCase() +
                          car.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={() => handleEditCar(car)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleDeleteCar(car.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {filteredCars.length === 0 && (
              <tr>
                <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
                  No cars found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-gray-600 text-sm">
        <p>
          Showing {filteredCars.length} of {cars.length} vehicles
        </p>
        <p className="mt-1">
          <span className="font-semibold">Note:</span> This component uses a
          mock API for demonstration. In production, connect to OpenStreamAPI
          endpoints.
        </p>
      </div>
    </div>
  );
};

export default CarRental;
