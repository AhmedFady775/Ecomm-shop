import React from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { BsBox, BsTelephone } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import {
  Divider,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemIcon,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function List({
  categoriesList,
  userInfo,
  signoutHandler,
  toggleDrawer,
}) {
  return (
    <div className="w-[80vw] h-full bg-[f7f7f7]">
      <section className="flex-col flex text-black font-medium">
        <div
          onClick={toggleDrawer(false)}
          className="absolute right-2 top-2 bg-gray-200 rounded-full flex items-center p-1"
        >
          <IoMdClose sx={{ fontSize: 20 }} />
        </div>
        <ul className="flex flex-col text-black text-sm mt-10">
          <li className="nav-item flex flex-row justify-between text-gray-400 border-b-8 border-gray-100">
            My delivery area: <span className="text-blue-500">Cairo</span>
          </li>
          {userInfo ? (
            <div>
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<RiArrowDownSLine size={22} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="flex flex-row items-center">
                    <RxPerson size={22} />
                    <span className="ml-4">Hello, {userInfo.firstName}</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails onClick={toggleDrawer(false)}>
                  <Link to="/customer/account">
                    <MenuItem sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <RxPerson size={22} />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                  </Link>
                  <Link to="/customer/myorders">
                    <MenuItem sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <AssignmentIcon fontSize="small" />
                      </ListItemIcon>
                      Orders
                    </MenuItem>
                  </Link>
                  <Link to="/customer/payments">
                    <MenuItem sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <CreditCardIcon fontSize="small" />
                      </ListItemIcon>
                      Payments
                    </MenuItem>
                  </Link>
                  <Link to="/customer/returns">
                    <MenuItem sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <AssignmentReturnIcon fontSize="small" />
                      </ListItemIcon>
                      Returns
                    </MenuItem>
                  </Link>
                  <Divider />
                  {userInfo && userInfo.isAdmin ? (
                    <Link to="/admin/dashboard">
                      <MenuItem sx={{ py: 1.5 }}>
                        <ListItemIcon>
                          <AdminPanelSettingsIcon fontSize="small" />
                        </ListItemIcon>
                        Admin
                      </MenuItem>
                    </Link>
                  ) : null}
                  <Divider />
                  <Link to="/login" onClick={signoutHandler}>
                    <MenuItem>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Link>
                </AccordionDetails>
              </Accordion>
            </div>
          ) : (
            <li className="nav-item ">
              <Link onClick={toggleDrawer(false)} to="/login">
                Sign in/ Sign up
              </Link>
            </li>
          )}
          <Link onClick={toggleDrawer(false)} to="/login">
            <li className="nav-item border-t-2 border-b-8 border-gray-100">
              <span className="mr-4">
                <BsBox size={22} />
              </span>
              Track your order
            </li>
          </Link>

          {categoriesList.map((category, i) => (
            <Link key={i} onClick={toggleDrawer(false)} to={category.link}>
              <li className="nav-item border-b-2 border-gray-100">
                {category.name}
              </li>
            </Link>
          ))}

          <li className="nav-item border-b-8 border-t-[6px] border-gray-100">
            <span className="mr-4">
              <BsTelephone size={22} />
            </span>
            Call *****
          </li>
          <li className="nav-item flex flex-row justify-between">
            Switch language <span className="text-blue-500">AR</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
