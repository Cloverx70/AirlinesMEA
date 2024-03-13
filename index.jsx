import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "react-hot-toast";
import HomePage from "./src/Pages/HomePage";
import Login from "./src/Components/Login";
import Logout from "./src/Components/Logout";
import Register from "./src/Components/Register";
import "./src/Assets/index.css";
import AuthContext from "./src/Contexts/AuthContext";
import BookWindow from "./src/Components/BookWindow";
import { Toaster } from "react-hot-toast";
import Dashboard from "./src/Pages/Dashboard";
import NavBar from "./src/Components/NavBar";
import Profile from "./src/Pages/Profile";
import Destinations from "./src/Pages/Destinations";
import Asia from "./src/Pages/Asia";
import Africa from "./src/Pages/Africa";
import Europe from "./src/Pages/Europe";
import America from "./src/Pages/America";
import Help from "./src/Pages/Help";
import Loyalty from "./src/Pages/Loyalty";

const App = () => {
  const [Flights, setFlights] = useState([]);
  const [Locations, setLocations] = useState([]);
  const [Reviews, setReviews] = useState([]);
  const [LoginWindow, setLoginWindow] = useState(false);
  const [LogoutWindow, setLogoutWindow] = useState(false);
  const [RegisterWindow, setRegisterWindow] = useState(false);
  const [ProfileWindow, setProfileWindow] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [PasswordInvalid, setPasswordInvalid] = useState(false);
  const [UserInfo, setUserInfo] = useState([]);
  const [FirstN, setFirstN] = useState(false);
  const [LastN, setLastN] = useState(false);
  const [Error, setError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [Weather, setWeather] = useState([]);
  const [BookClick, setBookClick] = useState(false);
  const [FlightId, setFlightId] = useState("");
  const [Flight, setFlight] = useState([]);
  const [EditProfileClick, setEditProfileClick] = useState(false);
  const [userFlights, setuserFlights] = useState([]);
  const [UserObj, setUserObj] = useState({
    email: "",
    password: "",
  });
  const [RUserObj, setRUserObj] = useState({
    email: "",
    password: "",
    Firstname: "",
    Lastname: "",
  });
  async function fetchReviews() {
    const response = await fetch(
      "https://localhost:7256/api/Review/get-all-reviews"
    );
    const ReviewsData = await response.json();
    setReviews(ReviewsData.data);
  }

  function CreateToast(Message) {
    toast((t) => {
      return <span className="">{Message}</span>;
    });

    return null;
  }

  async function fetchUserbyId() {
    const response = await fetch(
      `https://localhost:7256/api/Login/get-user-by-id${localStorage.getItem(
        "id"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const userData = await response.json();
    if (userData != null) {
      setUserInfo(userData.data);
    } else {
      console.log("Error name");
    }
  }

  async function fetchName() {
    const response = await fetch("https://localhost:7256/api/Login/get-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const nameData = await response.json();
    if (nameData != null) {
      localStorage.setItem("name", nameData.data);
    } else {
      console.log("Error name");
    }
  }

  async function fetchId() {
    const response = await fetch("https://localhost:7256/api/Login/get-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const IdData = await response.json();

    if (IdData != null) {
      localStorage.setItem("id", IdData.data);
    } else {
      console.log("Error name");
    }
  }

  useEffect(() => {
    async function fetchLocations() {
      const response = await fetch(
        "https://localhost:7256/api/Location/get-all-locations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const LocationData = await response.json();
      setLocations(LocationData.data);
    }
    fetchReviews();
    fetchUserbyId();
    fetchAllFlightsById();
    fetchFlights();
    fetchLocations();
  }, []);

  async function fetchFlights() {
    const response = await fetch(
      "https://localhost:7256/api/Flight/get-all-flights",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const FlightData = await response.json();
    setFlights(FlightData.data);
  }

  async function fetchRegister() {
    try {
      const response = await fetch(
        "https://localhost:7256/api/Login/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: RUserObj.email.toLowerCase(),
            password: RUserObj.password,
            firstName: RUserObj.Firstname,
            lastName: RUserObj.Lastname,
          }),
        }
      );
      const RegisterData = await response.json();
      if (RegisterData.data != null) {
        setPasswordError(false);
        setError(false);
        setRegisterWindow(false);
        CreateToast("You registered successfully...");
      } else {
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  async function fetchLogin() {
    setisLoading(true);
    try {
      const response = await fetch("https://localhost:7256/api/Login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: UserObj.email.toLowerCase(),
          password: UserObj.password,
        }),
      });
      const LoginData = await response.json();
      if (LoginData.data != null) {
        localStorage.setItem("token", LoginData.data);
        localStorage.setItem("isLoggedIn", true);
        await fetchName();
        await fetchId();
        setPasswordError(false);
        setError(false);
        setLoginWindow(false);
        CreateToast(
          `Welcome back ${localStorage.getItem("name")} long time no see`
        );
      } else {
        setPasswordError(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  }

  async function fetchUpdateFullUserById(firstname, lastname, email) {
    try {
      const response = await fetch(
        "https://localhost:7256/api/Login/update-full-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("id"),
            username: firstname + " " + lastname,
            email: email,
          }),
        }
      );
      const UpdatedData = await response.json();
      console.log(UpdatedData.data);
      if (UpdatedData.data !== null) {
        CreateToast("You have successfully updated your profile");
      } else {
        CreateToast("Error please try again later");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUpdateProfile(ticketnb, fdone, fcancle, fprice) {
    const response2 = await fetch(
      "https://localhost:7256/api/Login/update-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("id"),
          flightsBookNumber: ticketnb,
          flightsDoneNumber: fdone,
          flightsCanceledNumber: fcancle,
          flightPrice: fprice,
        }),
      }
    );
    const updateUseResponse = await response2.json();
  }

  async function fetchAllFlightsById() {
    const response = await fetch(
      `https://localhost:7256/api/UserFlights/get-all-user-flights-by-id${localStorage.getItem(
        "id"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const FlightsData = await response.json();
    console.log(FlightsData.data);
    setuserFlights(FlightsData.data);
  }

  async function fetchRemoveFlightByFlightId(flightid, price, ticketnb) {
    const response = await fetch(
      `https://localhost:7256/api/UserFlights/remove-user-flight-by-id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("id"),
          flightid: flightid,
        }),
      }
    );
    const responsedata = await response.json();
    console.log(responsedata.data);
    if (responsedata.data != null) {
      await fetchUpdateProfile(-ticketnb, 0, ticketnb, -price);
    } else {
    }
  }

  async function fetchAddReview(msg, stars) {
    const response = await fetch(
      `https://localhost:7256/api/Review/add-review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: localStorage.getItem("id"),
          userMessage: msg,
          stars: stars,
          username: localStorage.getItem("name"),
        }),
      }
    );
  }

  async function fetchFlightById() {
    console.log(FlightId);
    const response = await fetch(
      `https://localhost:7256/api/Flight/get-flight-by-id${sessionStorage.getItem(
        "flightid"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const FlightData = await response.json();
    setFlight(FlightData.data);
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          Flights,
          Locations,
          Reviews,
          LoginWindow,
          setLoginWindow,
          fetchFlightById,
          UserObj,
          setUserObj,
          fetchLogin,
          LogoutWindow,
          setLogoutWindow,
          ProfileWindow,
          setProfileWindow,
          Error,
          setError,
          PasswordError,
          setPasswordError,
          RUserObj,
          setRUserObj,
          LastN,
          setLastN,
          FirstN,
          setFirstN,
          RegisterWindow,
          setRegisterWindow,
          PasswordInvalid,
          setPasswordInvalid,
          fetchRegister,
          isLoading,
          setisLoading,
          Weather,
          setWeather,
          UserInfo,
          BookClick,
          setBookClick,
          FlightId,
          setFlightId,
          Flight,
          setFlight,
          fetchAddReview,
          CreateToast,
          fetchUpdateFullUserById,
          setEditProfileClick,
          EditProfileClick,
          userFlights,
          setuserFlights,
          fetchUpdateProfile,
          fetchRemoveFlightByFlightId,
        }}
      >
        <Toaster position="bottom-right" />
        <BookWindow />
        <Logout />
        <Register />
        <Login />
        <NavBar />
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/asia" element={<Asia />} />
          <Route path="/destinations/africa" element={<Africa />} />
          <Route path="/destinations/europe" element={<Europe />} />
          <Route path="/destinations/america" element={<America />} />
          <Route path="/help" element={<Help />} />
          <Route path="/loyalty" element={<Loyalty />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
