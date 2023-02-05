import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./components/SideBar";
import Header from "./components/Header";
import Feed from "./components/Feed";
import ModalComponent from "./components/Modal";
import React, { useState } from "react";

const modalTypes = {
  preview: "preview",
  delete: "delete",
};

const App = () => {
  let [modal, setModal] = useState<string | null>(null);
  const drawerWidth = 240;

  const toggleModal = (type: string) => {
    setModal(modal === type ? null : type);
  };

  return (
    <>
      <ModalComponent
        modal={modal}
        toggleModal={toggleModal}
        modalTypes={modalTypes}
      />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header drawerWidth={drawerWidth} />
        <Sidebar drawerWidth={drawerWidth} />
        <Feed toggleModal={toggleModal} modalTypes={modalTypes} />
      </Box>
    </>
  );
};

export default React.memo(App);
