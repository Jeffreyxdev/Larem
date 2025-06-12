'use client'
import React, { useState, useEffect } from "react"; // Import useEffect
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import {
  auth,
  signInWithGoogle,
  signUpWithEmail,
  sendPhoneVerificationCode, // Renamed from signInWithPhone in firebase.ts
  confirmPhoneNumberSignIn, // New function for OTP confirmation
  setUpRecaptcha,
} from "../DB/Firebase"; // Ensure this path is correct

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { type AlertProps } from '@mui/material/Alert';

import GoogleButton from 'react-google-button';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [signUpMethod, setSignUpMethod] = useState<'email' | 'phone'>('email');

  // State for phone verification
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null); // To store the result from sendPhoneVerificationCode

  // State for MUI Snackbar (toast)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertProps['severity']>('success');

  // --- Initialize reCAPTCHA on component mount ---
  useEffect(() => {
    // Only set up reCAPTCHA once.
    // It's crucial to have a div with id="recaptcha-container" in your JSX.
    setUpRecaptcha("recaptcha-container");
  }, []); // Empty dependency array means this runs once on mount

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (signUpMethod === "email") {
        const userCredential = await signUpWithEmail(
          formData.email,
          formData.password,
          `${formData.firstName} ${formData.lastName}` // Pass name to signUpWithEmail
        );

        setSnackbarMessage(`Welcome ${formData.firstName}! Your account has been created.`);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        // setIsAuth(true); // You might want to set authentication state here
      } else {
        // --- Phone sign-up: First step, send OTP ---
        const result = await sendPhoneVerificationCode(formData.phone);
        setConfirmationResult(result); // Store for later confirmation
        setOtpSent(true); // Indicate that OTP has been sent
        setSnackbarMessage("Verification code sent to your phone!");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      setSnackbarMessage(error.message || "An error occurred during sign up.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission if this is a separate form

    if (!confirmationResult) {
      setSnackbarMessage("No verification request found. Please send OTP first.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const user = await confirmPhoneNumberSignIn(otp);
      console.log("Phone number verified. User:", user);
      setSnackbarMessage(`Welcome ${formData.firstName}! Your account has been created.`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      // setIsAuth(true);
      // Reset state for next sign up
      setOtpSent(false);
      setOtp("");
      setConfirmationResult(null);
    } catch (error: any) {
      console.error("OTP verification error:", error);
      setSnackbarMessage(error.message || "Invalid or expired OTP. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };


  const handleGoogleSignUp = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Signed in with Google:", user);
      setSnackbarMessage("Signed in with Google!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      // setIsAuth(true);
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      setSnackbarMessage(error.message || "Google sign-in failed.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-600 via-green-400 to-slate-700">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Planetary elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-white/80 to-black/10 rounded-full opacity-80 blur-sm animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-white to-purple-600 rounded-full opacity-60 blur-sm animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-white/90 to-white/95 rounded-full opacity-40 blur-sm animate-pulse"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Brand */}
          <div className="text-center md:text-left">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-wider">
              Drive with Your Terms
            </h1>
            <p className="text-xl text-white/80 font-light tracking-wide">
              Discover the infinite possibilities
            </p>
          </div>

          {/* Right side - Sign up form */}
          <div className="flex justify-center md:justify-end">
            <Box className="w-full max-w-md  "> {/* Use Box for div to leverage MUI sx prop later if needed */}
              {/* Glassmorphism card */}
              <Box className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                <Typography variant="h5" component="h2" className="text-center mb-2 font-bold text-white/70">
                  Get Started
                </Typography>
                <Typography variant="body2" className="text-center text-white/70 mb-8">
                  CREATE YOUR FREE ACCOUNT
                </Typography>

                {/* Google Sign Up Button */}
                <Box className="mb-6">
                  <GoogleButton
                    onClick={handleGoogleSignUp}
                    style={{
                      width: '99%',
                      borderRadius: '22px',
                      fontSize: '16px',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                    }}
                    className="bg-transparent "
                  />
                </Box>

                {/* Divider */}
                <Box className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <Typography variant="body2" className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-white/70">or</span>
                  </Typography>
                </Box>

                {/* Sign up method toggle */}
                <Box className="flex mb-6 bg-white/5 rounded-xl p-1">
                  <Button
                    onClick={() => { setSignUpMethod('email'); setOtpSent(false); setOtp(''); }} // Reset OTP states
                    variant={signUpMethod === 'email' ? 'contained' : 'text'}
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      py: '8px',
                      px: '16px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: 500,
                      textTransform: 'none',
                      backgroundColor: signUpMethod === 'email' ? 'rgba(255,255,255,0.2)' : 'transparent',
                      color: signUpMethod === 'email' ? 'white' : 'rgba(255,255,255,0.6)',
                      '&:hover': {
                        backgroundColor: signUpMethod === 'email' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.05)',
                        color: 'white',
                      },
                    }}
                  >
                    <MailOutlineIcon fontSize="small" />
                    Email
                  </Button>
                  <Button
                    onClick={() => { setSignUpMethod('phone'); setOtpSent(false); setOtp(''); }} // Reset OTP states
                    variant={signUpMethod === 'phone' ? 'contained' : 'text'}
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      py: '8px',
                      px: '16px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: 500,
                      textTransform: 'none',
                      backgroundColor: signUpMethod === 'phone' ? 'rgba(255,255,255,0.2)' : 'transparent',
                      color: signUpMethod === 'phone' ? 'white' : 'rgba(255,255,255,0.6)',
                      '&:hover': {
                        backgroundColor: signUpMethod === 'phone' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.05)',
                        color: 'white',
                      },
                    }}
                  >
                    <PhoneIcon fontSize="small" />
                    Phone
                  </Button>
                </Box>

                {/* Main Form */}
                <form onSubmit={signUpMethod === 'email' || !otpSent ? handleSignUp : handleVerifyOtp} className="space-y-4">
                  {/* Name fields - Always visible */}
                  <Box className="grid grid-cols-2 gap-3">
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor="firstName" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', transform: 'translate(0, -9px) scale(1)' }}>
                        First Name
                      </InputLabel>
                      <TextField
                        id="firstName"
                        placeholder="Rodriguez"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            borderRadius: '12px',
                            height: '48px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            '&.Mui-focused': { backgroundColor: 'rgba(255,255,255,0.15)', },
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)', },
                            '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.5)', opacity: 1, },
                          },
                        }}
                        sx={{ '& .MuiFilledInput-root': { border: '1px solid rgba(255,255,255,0.2)', '&:hover:not(.Mui-disabled):before': { borderBottom: 'none', }, '&:after': { borderBottom: 'none', }, '&:before': { borderBottom: 'none', } } }}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor="lastName" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', transform: 'translate(0, -9px) scale(1)' }}>
                        Last Name
                      </InputLabel>
                      <TextField
                        id="lastName"
                        placeholder="Almaroz"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            borderRadius: '12px',
                            height: '48px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            '&.Mui-focused': { backgroundColor: 'rgba(255,255,255,0.15)', },
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)', },
                            '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.5)', opacity: 1, },
                          },
                        }}
                        sx={{ '& .MuiFilledInput-root': { border: '1px solid rgba(255,255,255,0.2)', '&:hover:not(.Mui-disabled):before': { borderBottom: 'none', }, '&:after': { borderBottom: 'none', }, '&:before': { borderBottom: 'none', } } }}
                      />
                    </FormControl>
                  </Box>

                  {/* Email or Phone field */}
                  {!otpSent && ( // Only show if OTP has not been sent yet
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor="contact" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', transform: 'translate(0, -9px) scale(1)' }}>
                        {signUpMethod === 'email' ? 'Email Address' : 'Phone Number'}
                      </InputLabel>
                      <TextField
                        id="contact"
                        type={signUpMethod === 'email' ? 'email' : 'tel'}
                        placeholder={signUpMethod === 'email' ? 'RodriAlma@gmail.com' : '+1 (555) 123-4567'}
                        value={signUpMethod === 'email' ? formData.email : formData.phone}
                        onChange={(e) => handleInputChange(signUpMethod === 'email' ? 'email' : 'phone', e.target.value)}
                        required
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            borderRadius: '12px',
                            height: '48px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            '&.Mui-focused': { backgroundColor: 'rgba(255,255,255,0.15)', },
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)', },
                            '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.5)', opacity: 1, },
                          },
                        }}
                        sx={{ '& .MuiFilledInput-root': { border: '1px solid rgba(255,255,255,0.2)', '&:hover:not(.Mui-disabled):before': { borderBottom: 'none', }, '&:after': { borderBottom: 'none', }, '&:before': { borderBottom: 'none', } } }}
                      />
                    </FormControl>
                  )}

                  {/* Password field - Only for email sign-up, or if phone OTP hasn't been sent yet */}
                  {signUpMethod === 'email' && (
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor="password" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', transform: 'translate(0, -9px) scale(1)' }}>
                        Password
                      </InputLabel>
                      <TextField
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            borderRadius: '12px',
                            height: '48px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            '&.Mui-focused': { backgroundColor: 'rgba(255,255,255,0.15)', },
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)', },
                            '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.5)', opacity: 1, },
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: 'rgba(255,255,255,0.8)' } }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiFilledInput-root': { border: '1px solid rgba(255,255,255,0.2)', '&:hover:not(.Mui-disabled):before': { borderBottom: 'none', }, '&:after': { borderBottom: 'none', }, '&:before': { borderBottom: 'none', } } }}
                      />
                    </FormControl>
                  )}

                  {/* OTP input field - Only for phone sign-up AFTER OTP sent */}
                  {signUpMethod === 'phone' && otpSent && (
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor="otp" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', transform: 'translate(0, -9px) scale(1)' }}>
                        Verification Code (OTP)
                      </InputLabel>
                      <TextField
                        id="otp"
                        type="text"
                        placeholder="Enter the 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            borderRadius: '12px',
                            height: '48px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            '&.Mui-focused': { backgroundColor: 'rgba(255,255,255,0.15)', },
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)', },
                            '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.5)', opacity: 1, },
                          },
                        }}
                        sx={{ '& .MuiFilledInput-root': { border: '1px solid rgba(255,255,255,0.2)', '&:hover:not(.Mui-disabled):before': { borderBottom: 'none', }, '&:after': { borderBottom: 'none', }, '&:before': { borderBottom: 'none', } } }}
                      />
                    </FormControl>
                  )}

                  {/* Remember me checkbox - Always visible */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                        sx={{
                          color: 'rgba(255,255,255,0.3)',
                          '&.Mui-checked': { color: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(255,255,255,0.2)', },
                          '& .MuiSvgIcon-root': { borderRadius: '4px', border: '1px solid currentColor', width: '20px', height: '20px', '& path': { d: 'path("M0 0h24v24H0z")' } },
                          '& .MuiTouchRipple-root': { display: 'none' },
                          '&:hover': { backgroundColor: 'transparent', }
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" className="text-white/70 text-sm">
                        Remember Me
                      </Typography>
                    }
                    sx={{ '& .MuiFormControlLabel-label': { marginLeft: '4px' } }}
                  />

                  {/* Sign up button */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)', transform: 'scale(1.02)', },
                      '&:active': { transform: 'scale(0.98)', },
                      color: 'white',
                      fontWeight: 500,
                      py: '12px',
                      px: '16px',
                      borderRadius: '12px',
                      height: '48px',
                      transition: 'all 200ms ease',
                      textTransform: 'none',
                    }}
                  >
                    {signUpMethod === 'email' || !otpSent ? 'Sign Up' : 'Verify OTP'}
                  </Button>
                </form>

                {/* Sign in link */}
                <Typography variant="body2" className="text-center mt-6 text-white/60 text-sm">
                  Already have an account?{' '}
                  <Button
                    component="span"
                    onClick={() => console.log("Sign In clicked")}
                    sx={{
                      color: 'white',
                      '&:hover': { color: 'rgba(255,255,255,0.8)', backgroundColor: 'transparent', },
                      fontWeight: 500,
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px',
                      p: 0,
                      minWidth: 'auto',
                      textTransform: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    Sign In
                  </Button>
                  {/* Firebase Invisible reCAPTCHA container */}
                  <div id="recaptcha-container"></div>
                </Typography>
              </Box>

              {/* MUI Snackbar for notifications */}
              <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;