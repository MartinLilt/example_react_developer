import {
  Box,
  Stack,
  Accordion,
  AccordionSummary,
  Typography,
  Link,
  AccordionDetails,
  Button,
  IconButton,
  AccordionSummaryClasses,
} from "@mui/material";
import { Image } from "mui-image";
import { useDropzone } from "react-dropzone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import PreviewIcon from "@mui/icons-material/Preview";
import GetAppIcon from "@mui/icons-material/GetApp";
import { styled, SxProps, Theme } from "@mui/material/styles";
import React, { useState, useCallback, useEffect, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addFile } from "../store/reducers/fileSlice";
import { IModalInstance, IFilePreview } from "../models";

const accordionType = {
  select: "select",
  preview: "preview",
};

const FileUpload = ({ toggleModal, modalTypes }: IModalInstance) => {
  let [isOpen, setOpen] = useState<string>(accordionType.select);
  const [urlState, setUrl] = useState<{ url: string; name: string }>({
    url: "",
    name: "",
  });
  const isTypeTrue = (typeOf: string) => isOpen === typeOf;
  const dispatch = useAppDispatch();
  const { currentFile } = useAppSelector((state) => state.file);
  const isArray = currentFile.length > 0;

  useEffect(() => {
    if (isArray) {
      setOpen(accordionType.preview);
    } else {
      setOpen(accordionType.select);
      setUrl({ url: "", name: "" });
    }
  }, [currentFile, isArray]);

  const handleDownload = () => {
    if (isArray) {
      const file = currentFile[0];
      setUrl({ url: file?.preview, name: file?.name });
    }
  };

  const onDrop = useCallback(
    (acceptFiles: File[]) => {
      const files = acceptFiles.map((file) => {
        const filePreview: IFilePreview = {
          preview: URL.createObjectURL(file),
          name: file.name,
          type: file.type,
        };
        return { ...filePreview, ...file };
      });

      dispatch(addFile(files));
    },
    [dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const isHandelOpen = (type: string) => {
    setOpen(type);
  };

  return (
    <Box flex={4}>
      <Stack>
        <Accordion
          expanded={isTypeTrue(accordionType.select)}
          onChange={() => isHandelOpen(accordionType.select)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {!isTypeTrue(accordionType.select) && (
              <Typography fontWeight="bold">
                Select more files for upload
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails {...getRootProps()}>
            <input {...getInputProps()} />
            <Stack direction="column" alignItems="center">
              <Typography component="p" variant="h5" fontWeight="bold">
                Select files
              </Typography>
              <Typography margin="0 0 3rem 0">
                Drop files here or click
                <StyledButton>browse</StyledButton>
              </Typography>
              <StyledImage src="./upload.png" width="10rem" />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={isTypeTrue(accordionType.preview)}
          onChange={() => isHandelOpen(accordionType.preview)}
        >
          {isTypeTrue(accordionType.preview) && (
            <AccordionDetails>
              <Stack
                direction="row"
                justifyContent="center"
                position="relative"
              >
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
                    {isArray
                      ? currentFile.map(({ name }) => {
                          return name;
                        })
                      : "Name of the file.pdf"}
                  </Typography>
                  <IconButton>
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Stack>
                <Stack
                  position="absolute"
                  right="0"
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconButton
                    onClick={() => toggleModal(modalTypes.preview)}
                    disabled={!isArray}
                  >
                    <PreviewIcon />
                  </IconButton>
                  <IconButton disabled={!isArray} onClick={handleDownload}>
                    <Link
                      display="flex"
                      color="inherit"
                      href={urlState.url}
                      target="_blank"
                      download={urlState.name}
                    >
                      <GetAppIcon />
                    </Link>
                  </IconButton>
                </Stack>
              </Stack>
              <Box
                bgcolor="var(--sup-opacity-color)"
                height="56vh"
                borderRadius="15px"
              ></Box>
            </AccordionDetails>
          )}
          <StyledAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            transform={isTypeTrue(accordionType.preview).toString()}
          >
            {!isTypeTrue(accordionType.preview) && (
              <Typography fontWeight="bold">Preview uploaded files</Typography>
            )}
          </StyledAccordionSummary>
        </Accordion>
      </Stack>
    </Box>
  );
};

interface StyledAccordionSummaryProps {
  transform?: string;
  children?: ReactNode;
  classes?: Partial<AccordionSummaryClasses>;
  expandIcon?: ReactNode;
  sx?: SxProps<Theme>;
}

const StyledAccordionSummary = styled(
  AccordionSummary
)<StyledAccordionSummaryProps>`
  & .MuiAccordionSummary-expandIconWrapper {
    transform: ${(props) => `rotate(${props.transform && 180}deg)`};
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

const StyledImage = styled(Image)`
  padding: 0 0 6rem 0;
`;

export default React.memo(FileUpload);
