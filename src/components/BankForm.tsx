import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const BankForm = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" gutterBottom>
          Bank Account Opening Form
        </Typography>

        <form>
          <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
            Personal Information
          </Typography>

          <TextField fullWidth label="Full Name" margin="normal" />
          <TextField fullWidth label="Email" type="email" margin="normal" />
          <TextField fullWidth label="Phone Number" margin="normal" />
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
            Account Details
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Account Type</InputLabel>
            <Select defaultValue="">
              <MenuItem value="Savings">Savings</MenuItem>
              <MenuItem value="Checking">Checking</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Initial Deposit"
            type="number"
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Currency</InputLabel>
            <Select defaultValue="">
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="LKR">LKR</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
            Address
          </Typography>

          <TextField fullWidth label="Street Address" margin="normal" />
          <TextField fullWidth label="City" margin="normal" />
          <TextField fullWidth label="Zip Code" margin="normal" />

          <FormControlLabel
            control={<Checkbox />}
            label="I agree to the Terms & Conditions"
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default BankForm;
