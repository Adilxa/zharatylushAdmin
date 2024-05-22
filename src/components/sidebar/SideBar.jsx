import React from "react";
import css from "./SideBar.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import CommuteIcon from "@mui/icons-material/Commute";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";



function SideBar(
  {isGid}
) {
  const location = useLocation();

  const { logout } = useAuth()

  const onLogout = () => {
    logout()
    window.location.href = "/"
  }

  const allLinks = [
    {
      path: "/",
      title: "Туры",
      Icon: CommuteIcon,
    },
   {
      path: "/users",
      title: "Пользлватели",
      Icon: DirectionsSubwayIcon,
    },
  {
      path: "/partners",
      title: "Партнеры",
      Icon: HandshakeIcon,
    },
    {
      path: "/tourapprove",
      title: "Апрув туров",
      Icon: AddIcCallIcon,
    },
  ];

  const links = isGid ? allLinks.filter(link => ["Туры", "Апрув туров"].includes(link.title)) : allLinks;


  return (
    <div className={css.wrapper}>
      <div className={css.logo}>Zharatulylush</div>
      <List>
        {links.map(({ path, title, Icon }) => (
          <ListItem
            key={path}
            selected={path === location.pathname}
            classes={{ selected: css.selected }}
            disablePadding
            component={Link}
            to={path}
          >
            <ListItemButton>
              <ListItemIcon>
                <Icon style={path === location.pathname ? { color: '#fff' } : {}} />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
        <br />
        <br />
        <ListItem disablePadding onClick={onLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Выйти"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

export default SideBar;
