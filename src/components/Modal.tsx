import { Modal, Box, Typography, IconButton, Stack } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { removeAllFiles } from "../store/reducers/fileSlice";
import { IModalComponent } from "../models";

const ModalComponent = ({
  modal,
  toggleModal,
  modalTypes,
}: IModalComponent) => {
  const isModalOpen = Boolean(modal);
  const file = useAppSelector((state) => state.file.currentFile);
  const isTypeOfModal = (type: string) => type === modal;
  const dispatch = useAppDispatch();

  const removeAllElements = () => {
    dispatch(removeAllFiles());
    toggleModal(modalTypes.delete);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        if (modal) {
          toggleModal(modal);
        }
      }}
    >
      <StyledBox
        height={!isTypeOfModal(modalTypes.preview) ? "" : "100vh"}
        margin={
          !isTypeOfModal(modalTypes.preview)
            ? "40% auto 0 35%"
            : "10% auto 0 35%"
        }
      >
        {isTypeOfModal(modalTypes.preview) && (
          <Stack
            margin="0 0 1rem 0"
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography sx={{ margin: "0 0.5rem" }}>
              {file.length > 0
                ? file.map(({ name }) => {
                    return name;
                  })
                : "Name of the file.pdf"}
            </Typography>
            <IconButton>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Stack>
        )}
        {isTypeOfModal(modalTypes.delete) && (
          <>
            <Typography width="80%" margin="0 0 2rem 0">
              Are you sure you want to delete all files? You’ll have to start
              uploading process from the very beginning.
            </Typography>
            <Stack direction="row" justifyContent="end">
              <Button
                onClick={() => toggleModal(modalTypes.delete)}
                size="large"
                variant="outlined"
                style={{ backgroundColor: "unset", borderColor: "#00AB55" }}
                sx={{
                  margin: "0 1rem 0 0",
                  color: "#00AB55",
                  textTransform: "inherit",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={removeAllElements}
                size="large"
                variant="contained"
                style={{ backgroundColor: "#00AB55" }}
                sx={{
                  textTransform: "inherit",
                }}
              >
                Confirm
              </Button>
            </Stack>
          </>
        )}
      </StyledBox>
    </Modal>
  );
};

const StyledBox = styled(Box)<{ height?: string; margin?: string }>`
  box-shadow: 0px 4px 20px 2px rgba(0, 0, 0, 0.25);
  background-color: var(--main-color);
  width: 50%;
  border-radius: 15px;
  padding: 2rem;
  height: ${(props) => props.height || "auto"};
  margin: ${(props) => props.margin};
`;

export default React.memo(ModalComponent);
