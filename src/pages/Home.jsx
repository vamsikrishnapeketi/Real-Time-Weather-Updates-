import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export const Home = () => {
  const apikey = "fe7dad8f6742e5561a702b37b2c91f81";
  const [theme, setTheme] = useState("light");
  const [city, setCity] = useState("");
  const [data, setData] = useState(null); // Initialize data as null

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const weatherData = await response.json();
      setData(weatherData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="w-screen flex-1 dark:bg-black">
      <div className="flex justify-end pt-6 pr-6">
        {theme === "light" ? (
          <SunIcon className="h-10 w-10 cursor-pointer" onClick={handleTheme} />
        ) : (
          <MoonIcon
            className="h-10 w-10 cursor-pointer text-white"
            onClick={handleTheme}
          />
        )}
      </div>
      <div className="flex items-center flex-col m-4 mt-[10%]">
        <h1 className="text-3xl font-bold dark:text-white">
          Determine the weather
        </h1>
        <div className="flex justify-center gap- mt-7">
          <label className="font-bold dark:text-white">City Name: </label>
          <input
            className="border-2 border-black ml-2"
            type="text"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={fetchData} // Add click handler to trigger data fetching
            className="border-black border-2 mx-2 bg-slate-500 rounded dark:text-white"
          >
            Submit
          </button>
        </div>
        {data && (
          <div>
            <h1 className="pt-5 dark:text-white">
              Weather in {data.name} is {data.weather[0].description}
            </h1>
            <h1 className="pt-3 dark:text-white">
              Temperature is {data.main.temp}°C
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
