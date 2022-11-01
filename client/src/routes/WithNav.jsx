import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";

import { Outlet } from "react-router";
import Container from "../components/Container/Container";
import RightNavbar from "../components/RightNavbar/RightNavbar";
import NavContext from "../Context/NavContext";
import NavbarSuperVisor from "../components/Navbar/NavbarSuperVisor";
import NavbarAdmin from "../components/Navbar/NavbarAdmin";
import axios from "axios";

export default ({  }) => {
 
  return (
    <>
  
      <Container stickyNav={<RightNavbar />} content={<Outlet />} />
    </>
  );
};
