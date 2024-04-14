import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Alert,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { loadCharacterDungeonInfos } from "$/helpers/loadCharacterData";
import { characterToSearchParams } from "$/helpers/characterToSearchParams";

interface ImportCharacterModalProps {
  open: boolean;
  onClose: () => void;
}

const ImportCharacterModal: React.FC<ImportCharacterModalProps> = ({
  open,
  onClose,
}) => {
  const [region, setRegion] = useState("");
  const [regionError, setRegionError] = useState("");
  const [realm, setRealm] = useState("");
  const [realmError, setRealmError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const validateFields = () => {
    let hasError = false;

    if (!region) {
      setRegionError("Region is required");
      hasError = true;
    } else {
      setRegionError("");
    }

    if (!realm) {
      setRealmError("Realm is required");
      hasError = true;
    } else {
      setRealmError("");
    }

    if (!name) {
      setNameError("Name is required");
      hasError = true;
    } else {
      setNameError("");
    }

    return !hasError;
  };

  const handleImport = async () => {
    try {
      setLoadingError("");
      if (!validateFields()) {
        return;
      }

      setLoading(true);
      // Execute the async function and wait for the result
      const response = await loadCharacterDungeonInfos({ region, realm, name });

      const newSearchParams = characterToSearchParams(response);

      router.replace(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
      setLoading(false);
      onClose();
    } catch (error: any) {
      console.error("Error loading character dungeon info.");
      const errorJson = await error.json();
      console.error("Received error:", errorJson);
      setLoadingError("Error: " + errorJson.message);
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="import-character-modal-title"
      aria-describedby="import-character-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
          border: "2px solid #aaa",
        }}
      >
        <IconButton
          sx={{ ml: "auto", position: "absolute", right: "5px", top: "5px" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" id="import-character-modal-title" gutterBottom>
          Import Character
        </Typography>
        <Typography
          variant="body1"
          id="import-character-modal-description"
          paragraph
        >
          Enter a character&apos;s region, realm, and name to import its M+
          dungeon standings.
        </Typography>
        <TextField
          error={Boolean(regionError)}
          helperText={regionError}
          select
          label="Region"
          variant="outlined"
          fullWidth
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          onFocus={() => setRegionError("")}
          sx={{ mb: 2 }}
        >
          <MenuItem value="us">US</MenuItem>
          <MenuItem value="eu">EU</MenuItem>
          <MenuItem value="tw">TW</MenuItem>
          <MenuItem value="kr">KR</MenuItem>
          <MenuItem value="cn">CN</MenuItem>
        </TextField>
        <TextField
          error={Boolean(realmError)}
          helperText={realmError}
          label="Realm"
          variant="outlined"
          fullWidth
          value={realm}
          onChange={(e) => setRealm(e.target.value)}
          onFocus={() => setRealmError("")}
          sx={{ mb: 2 }}
        />
        <TextField
          error={Boolean(nameError)}
          helperText={nameError}
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setNameError("")}
          sx={{ mb: 2 }}
        />
        {loadingError && (
          <Alert
            variant="filled"
            severity="error"
            onClose={() => {
              setLoadingError("");
            }}
            sx={{
              marginBottom: 2,
            }}
          >
            {loadingError}.
          </Alert>
        )}
        <LoadingButton
          loading={loading}
          variant="contained"
          fullWidth
          onClick={handleImport}
        >
          Import character
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default ImportCharacterModal;
