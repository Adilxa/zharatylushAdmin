// useRoutes.js
import { Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound/NotFound";
import AddOrEditTourPage from "../pages/ToursPage/AddOrEditTourPage";
import AddOrEditTransportPage from "../pages/ToursPage/AddOrEditTransportPage";
import TourDetailPage from "../pages/ToursPage/TourDetailPage";
import ToursPage from "../pages/ToursPage/ToursPage";
import TransportDetailPage from "../pages/ToursPage/TransportDetailPage";
import UsersPage from "../pages/UsersPage/UsersPage";
import TourApproove from "../pages/TourApproove";
import UserPage from "../pages/UserPage/UserPage";
import ErrorPage from "../pages/ErrorPage/index";
import SightsPage from "../pages/Sights";
import SightsCreate from "../pages/Sights/SightsCreate";

const useRoutes = (isAuth, isGid) => {
  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  

  return (
    <Grid container spacing={5}>
      <Grid item lg={2.5} md={2}>
        <SideBar isGid={isGid}/>
      </Grid>
      <Grid item lg={9.5} md={10}>
        <Routes>
          <Route path="/404" element={<ErrorPage />} />
          <Route path="/" element={<ToursPage />} />
          <Route path="/tour/create" element={<AddOrEditTourPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/tour/:id" element={<TourDetailPage />} />
          <Route path="/sights" element={<SightsPage/>}/>
          <Route path="/sights/create" element={<SightsCreate/>}/>

          
          <Route path="/transport/:id" element={<TransportDetailPage />} />
          <Route path="/transport/create/:tourId" element={<AddOrEditTransportPage />} />
          <Route path="/transport/edit/:tourId" element={<AddOrEditTransportPage />} />
          <Route path="/tourapprove" element={<TourApproove />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default useRoutes;
