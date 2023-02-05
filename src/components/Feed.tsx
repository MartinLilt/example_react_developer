import { Box, Stack } from "@mui/material";
import React from "react";
import FileType from "./FileType";
import FileUpload from "./FileUpload";
import { IModalInstance } from "../models";

const Feed = ({ toggleModal, modalTypes }: IModalInstance) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "100vh",

        background: "linear-gradient(90deg, #ffffff -30%, #e9cee8 100%)",
      }}
    >
      <Box
        height="80vh"
        component="section"
        sx={{
          margin: "7.4rem 2rem auto 2rem",
          p: "1rem",
          borderRadius: "15px",
          background: "#fff",
          boxShadow: "0px 2px 4px -2px rgb(0 0 0 / 25%)",
        }}
      >
        <Stack direction="row" spacing={3}>
          <FileType toggleModal={toggleModal} modalTypes={modalTypes} />
          <FileUpload toggleModal={toggleModal} modalTypes={modalTypes} />
        </Stack>
      </Box>
    </Box>
  );
};

export default React.memo(Feed);
