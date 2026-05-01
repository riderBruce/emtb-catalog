import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import type { Bike, BikeInput } from "./types/bike.types";
import BikeList from "./components/BikeList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BikeAddForm from "./components/BikeAddForm";
import BikeDetailPage from "./components/BikeDetailPage";
import NavBar from "./components/NavBar";
import AboutPage from "./components/AboutPage";

import bikeService from "./services/bike-service";
import { CanceledError } from "axios";
import type { RateEvent } from "./components/BikeCard";
import WeatherTab from "./components/WeatherTab";

function App() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [keyword, setKeyword] = useState("");

  // dark mode
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    const { request, cancel } = bikeService.getAll();
    request
      .then((res) => setBikes(res.data))
      .catch((error) => {
        console.error("Error on getting all: ", error.message);
        if (error instanceof CanceledError) return;
        setError(error.message);
      });
    return () => cancel();
  }, []);

  // delete
  const handleDelete = (_id: string) => {
    const originalBikes = [...bikes];
    setBikes((prev) => prev.filter((bike) => bike._id !== _id));

    bikeService.delete(_id).catch((error: any) => {
      setBikes(originalBikes);
      setError(error.message);
      console.error("Delete error: ", error.message);
    });
  };

  // add
  const handleAdd = (data: BikeInput) => {
    bikeService
      .add(data)
      .then((res) => setBikes((prev) => [...prev, res.data]))
      .catch((error) => {
        setError(error.message);
        console.error("Error on adding: ", error.message);
      });
  };

  // update
  const handleUpdate = (updatedBike: Bike) => {
    const originalBikes = [...bikes];
    setBikes((prev) =>
      prev.map((b) => (b._id !== updatedBike._id ? b : updatedBike)),
    );
    bikeService.update(updatedBike).catch((error) => {
      setBikes(originalBikes);
      setError(error.message);
      console.error("Error on updating", error.message);
    });
  };

  // filter
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "");

  const handleSearch = (value: string) => setKeyword(normalize(value));
  const visibleBikes = keyword
    ? bikes.filter((b) => {
        const searchKey = normalize(`${b.manufacturer} ${b.name} ${b.motor}`);
        return searchKey.includes(keyword);
      })
    : bikes;

  // star rating
  const handleRate = ({ _id, rating }: RateEvent) => {
    setBikes((prev) =>
      prev.map((bike) =>
        bike._id === _id ? { ...bike, rating: rating } : bike,
      ),
    );
  };

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <NavBar />
      <div className="container">
        {error && <p className="text-danger">{error}</p>}
        <Routes>
          <Route
            path="/"
            element={
              <BikeList
                bikes={visibleBikes}
                onSearch={handleSearch}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                onRate={handleRate}
              />
            }
          />
          <Route
            path="/bikes/add"
            element={<BikeAddForm onSubmit={handleAdd} />}
          />
          <Route path="/bikes/:id" element={<BikeDetailPage bikes={bikes} />} />
          <Route path="/weather" element={<WeatherTab />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
