import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WithoutNav from "./routes/WithoutNav";
import WithNav from "./routes/WithNav";
import NavContext from "./Context/NavContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/protected-routes/ProtectedRoute";
import Payments from "./pages/Payments/Payments";
import PageNotFound from "./pages/PageNotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { requestFirebaseNotificationPermission } from './firebaseInit'
function App() {
  const [nav, setNav] = useState(true);
  const [token, setToken] = useState();
  const value = { nav, setNav };
  requestFirebaseNotificationPermission()
  .then((firebaseToken) => {
    // eslint-disable-next-line no-console
    console.log("token ",firebaseToken);
    localStorage.setItem("fcmToken", firebaseToken);
    setToken(firebaseToken);
    var data = JSON.stringify({
      token:firebaseToken
    })
   

  })
  .catch((err) => {
    return err;
  });
  const savetoken = () => {
   
    
      
      const promise = axios({
        url: `${process.env.REACT_APP_BASEURL}/api/v1/users/token`,
        method: "POST",
        headers: {
          // Add any auth token here
          "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
       
        data:token ,
      })
        // Handle the response from backend here
        .then((res) => {
          console.log(res);
        
        })
        // Catch errors if any
        .catch((err) => {
         
          return Promise.reject();
        });
    
    
  };



  return (
    <ErrorBoundary>
      <div className="App">
        <NavContext.Provider value={value}>
          <Toaster />

          <Routes>
            <Route element={<WithoutNav />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              {/* <Route path="/payment/complains" element={<Complains />} /> */}
            </Route>

            <Route element={<WithNav />}>
              {/* SUPERADMIN */}
              <Route
                path="/payment/*"
                element={<ProtectedRoute  />}
              >
                <Route path="my_payments" element={<Payments />} />
              </Route>

            </Route>
          </Routes>
        </NavContext.Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
