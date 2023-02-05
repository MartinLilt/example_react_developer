import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  MenuItem,
  Select,
  Button,
  Paper,
  ListItem,
  IconButton,
  List,
  SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { ReactNode, useState } from "react";
import { Stack } from "@mui/system";
import styled from "@emotion/styled";
import { useAppSelector } from "../hooks/redux";
import { IModalInstance } from "../models";

const FileType = ({ toggleModal, modalTypes }: IModalInstance) => {
  let [value, setValue] = useState(0);
  const { file } = useAppSelector((state) => state);
  const allFiles = file.files;
  const isArray = allFiles.length > 0;
  const currentFile = file.currentFile;

  const handleChange = (event: SelectChangeEvent<number>, child: ReactNode) => {
    setValue(event.target.value as number);
  };

  return (
    <Box flex={3}>
      <Paper variant="outlined" sx={{ padding: "1rem", mb: "1rem" }}>
        <Typography component="h2" marginBottom="0.5rem">
          Type of Document
        </Typography>
        <RadioGroup name="use-radio-group" defaultValue="first">
          <FormControlLabel
            sx={{ margin: "0 0 0.5rem 0", width: "100%" }}
            label=""
            control={
              <>
                <Radio
                  value="first"
                  sx={{
                    "&.Mui-checked": {
                      color: "#920e8e",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />
                <Paper sx={{ width: "100%" }}>
                  <FormControl
                    sx={{
                      justifyContent: "center",
                      height: "2rem",
                      borderRadius: "5px",
                      p: "0.2rem 0.7rem",
                    }}
                  >
                    {currentFile.length > 0
                      ? currentFile?.map(({ type }, id) => {
                          const validType = type
                            ?.split("/")
                            .pop()
                            .toUpperCase();
                          return <Typography key={id}>{validType}</Typography>;
                        })
                      : "PDF*"}
                  </FormControl>
                </Paper>
              </>
            }
          />
          <FormControlLabel
            label=""
            sx={{ margin: 0, width: "100%" }}
            value="second"
            control={
              <>
                <Radio
                  value="second"
                  sx={{
                    "&.Mui-checked": {
                      color: "#920e8e",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />
                <FormControl fullWidth variant="outlined">
                  <Select
                    variant="standard"
                    disableUnderline
                    value={value}
                    onChange={handleChange}
                    sx={{
                      boxShadow: "none",
                      borderRadius: "5px",
                      border: "1px solid rgba(0, 0, 0, 0.12)",
                      p: "0.2rem 0.7rem",
                      height: "2rem",
                      "& .MuiOutlinedInput-input": {
                        padding: 0,
                      },
                    }}
                  >
                    <MenuItem value={0}>Other formats</MenuItem>
                    <MenuItem value={10}>.PDF</MenuItem>
                    <MenuItem value={20}>.BAT</MenuItem>
                    <MenuItem value={30}>.TXT</MenuItem>
                  </Select>
                </FormControl>
              </>
            }
          />
        </RadioGroup>
      </Paper>
      <Paper variant="outlined" sx={{ padding: "1rem" }}>
        <Typography component="h2" marginBottom="0.5rem">
          List of uploads
        </Typography>
        <List sx={{ padding: "0 0 1rem 0" }}>
          {allFiles?.map((value, id) => {
            return (
              <StyledListItem key={id} disablePadding>
                <Paper
                  sx={{
                    padding: "0.7rem",
                    width: "80%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography color="inherit" fontWeight="bold">
                    {value.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton edge="end" aria-label="comments">
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="comments">
                      <DeleteForeverIcon />
                    </IconButton>
                  </Stack>
                </Paper>
                <Typography sx={{ margin: "0 0 0 1rem" }}>
                  Attachment
                </Typography>
              </StyledListItem>
            );
          })}
        </List>
        <Box display="flex" justifyContent="end">
          <StyledButton
            onClick={() => toggleModal(modalTypes.delete)}
            disabled={!isArray}
          >
            Clear all
          </StyledButton>
        </Box>
      </Paper>
    </Box>
  );
};

const StyledListItem = styled(ListItem)`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const StyledButton = styled(Button)`
  color: #920e8e;
  padding: 0;
  text-decoration: underline;
  text-transform: inherit;
  font-size: 1rem;
  &:hover {
    background: none;
  }
`;

export default React.memo(FileType);
