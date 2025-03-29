import React, { useState } from "react";
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
  Divider,
} from "@mui/material";

const formSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().length(10, "Phone Number must be exactly 10 digits"),
  dob: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear() >= 18;
  }, "You must be at least 18 years old"),
  accountType: z.enum(["Savings", "Checking"], {
    errorMap: () => ({ message: "Account Type is required" }),
  }),
  deposit: z
    .number()
    .min(100, "Initial Deposit must be at least $100")
    .or(z.string().transform((val) => parseFloat(val))),
  currency: z.enum(["USD", "EUR", "LKR"], {
    errorMap: () => ({ message: "Currency is required" }),
  }),
  street: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().length(5, "Zip Code must be exactly 5 digits"),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
});

type FormData = z.infer<typeof formSchema>;

const BankForm = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    console.log("Form Submitted", data);
    setLoading(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Bank Account Opening Form
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
            Personal Information
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            {...register("dob")}
            error={!!errors.dob}
            helperText={errors.dob?.message}
          />

          <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
            Account Details
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Account Type</InputLabel>
            <Select {...register("accountType")} defaultValue="">
              <MenuItem value="Savings">Savings</MenuItem>
              <MenuItem value="Checking">Checking</MenuItem>
            </Select>
          </FormControl>
          {errors.accountType && (
            <Typography color="error">{errors.accountType.message}</Typography>
          )}

          <TextField
            fullWidth
            label="Initial Deposit"
            type="number"
            margin="normal"
            {...register("deposit")}
            error={!!errors.deposit}
            helperText={errors.deposit?.message}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Currency</InputLabel>
            <Select {...register("currency")} defaultValue="">
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="LKR">LKR</MenuItem>
            </Select>
          </FormControl>
          {errors.currency && (
            <Typography color="error">{errors.currency.message}</Typography>
          )}

          <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
            Address Details
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <TextField
            fullWidth
            label="Street Address"
            margin="normal"
            {...register("street")}
            error={!!errors.street}
            helperText={errors.street?.message}
          />
          <TextField
            fullWidth
            label="City"
            margin="normal"
            {...register("city")}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <TextField
            fullWidth
            label="Zip Code"
            margin="normal"
            {...register("zip")}
            error={!!errors.zip}
            helperText={errors.zip?.message}
          />

          <FormControlLabel
            control={<Checkbox {...register("terms")} />}
            label="I agree to the Terms & Conditions"
          />
          {errors.terms && (
            <Typography color="error">{errors.terms.message}</Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </form>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>
            Your bank account opening form has been successfully submitted!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BankForm;
