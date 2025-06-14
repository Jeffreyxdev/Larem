'use client'
import React, { useState, useEffect } from "react"; // Import useEffect


'use client'

import { Eye, EyeOff, Phone, Mail } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Label  from '@mui/material/InputLabel';
import { MuiTelInput } from 'mui-tel-input';
import  Button  from '@mui/material/Button';
import  Checkbox  from '@mui/material/Checkbox';
import GoogleIcon from '@mui/icons-material/Google';
import { toast }  from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import ice from '../assets/ban.jpeg'
import {
  auth,
  signInWithGoogle,
  signUpWithEmail,
  sendPhoneVerificationCode,
  confirmPhoneNumberSignIn,
  setUpRecaptcha,
} from '../DB/Firebase';
import Typography from "@mui/material/Typography";
import MailIcon from '@mui/icons-material/Mail';
import type{ ConfirmationResult } from 'firebase/auth';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUpMethod, setSignUpMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });

  // State for phone verification
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  

  // Initialize reCAPTCHA on component mount
  useEffect(() => {
    // reCAPTCHA will be set up when needed in sendPhoneVerificationCode
  }, []);
  const confirmPhoneNumberSignIn = async (confirmationResult: ConfirmationResult, otp: string) => {
  const result = await confirmationResult.confirm(otp);
  return result.user;
};


  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (signUpMethod === 'email') {
        if (formData.password !== formData.confirmPassword) {
         toast.error("passweord dont match!");
          return;

        }

        const user = await signUpWithEmail(
          formData.email,
          formData.password,
          `${formData.firstName} ${formData.lastName}`
        );

        toast.success(
  <div>
    <Typography variant="subtitle1" fontWeight="bold">Success!</Typography>
    <Typography variant="body2">
      Welcome {formData.firstName}! Your account has been created.
    </Typography>
  </div>
);
      } else {
        // Phone sign-up: First step, send OTP
        const result = await sendPhoneVerificationCode(`+${formData.phone}`);
        setConfirmationResult(result);
        setOtpSent(true);
        toast.success("Verification code sent to your phone!");
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error("Sign up error");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirmationResult) {
    toast.error("No verification found!");
      return;
    }

    try {
      const user = await confirmPhoneNumberSignIn( confirmationResult, otp);
      console.log('Phone number verified. User:', user);
      toast.success(
  <div>
    <Typography variant="subtitle1" fontWeight="bold">Success!</Typography>
    <Typography variant="body2">
      Welcome {formData.firstName}! Your account has been created.
    </Typography>
  </div>
);
      
      // Reset state for next sign up
      setOtpSent(false);
      setOtp('');
      setConfirmationResult(null);
    } catch (error: any) {
      console.error('OTP verification error:', error);
     toast.error("OTP verification error");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const user = await signInWithGoogle();
      console.log('Signed in with Google:', user);
     toast.success("Signed in with Google!");
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast.error(
  <div>
    <strong>Error</strong>
    <div>{error.message || "Google sign-in failed."}</div>
  </div>
);
    }
  };

  return (
    <div className=" container min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8 my-[20px]">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Create an account</h1>
          </div>

          {/* Google Sign Up Button */}
          <Button
            onClick={handleGoogleSignUp}
            variant="outlined"
            fullWidth
            sx={{
              height: '56px', // h-14
              border:'#00ac59 1px solid',
              borderRadius: '16px', // rounded-2xl
              fontSize: '1rem', // text-base
              fontWeight: 500, // font-medium
              textTransform: 'none',
              color:'black'
            }}
            startIcon={<GoogleIcon />} // optional
          >
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm mt-5">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div> 
          </div>

          {/* Sign up method toggle */}
          <div className="flex rounded-2xl p-1 gap-2 ">
                        
              <Button
                type="button"
                onClick={() => {
                  setSignUpMethod('email');
                  setOtpSent(false);
                  setOtp('');
                }}
                variant={signUpMethod === 'email' ? 'contained' : 'outlined'}
                color="primary"
                fullWidth
                sx={{
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: signUpMethod === 'email' ? 'black' : undefined,
                  border: signUpMethod === 'email' ? '1px solid #0000' : '1px solid black',
                  borderColor: signUpMethod === 'email' ? '#0000' : 'black',
                  marginRight: '8px',
                  
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textTransform: 'none',
                  color: signUpMethod === 'email' ? 'white' : 'black'
                

                }}
                startIcon={<MailIcon />}
              >
                Email
              </Button>
          <Button
            type="button"
            onClick={() => {
              setSignUpMethod('phone');
              setOtpSent(false);
              setOtp('');
            }}
            variant={signUpMethod === 'phone' ? 'contained' : 'outlined'}
            color="primary"
            fullWidth
            sx={{
              height: '48px',
              borderRadius: '12px',
              backgroundColor: signUpMethod === 'phone' ? 'black' : undefined,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'none',
              color: signUpMethod === 'phone' ? 'white' : 'black',
              border: signUpMethod === 'phone' ? '1px solid #0000' : '1px solid black',
              borderColor: signUpMethod === 'phone' ? '#0000' : 'black',

            }}
            startIcon={<Phone />}
          >
            Phone
          </Button>
          </div>
          
          <form onSubmit={signUpMethod === 'email' || !otpSent ? handleSignUp : handleVerifyOtp} className="space-y-5">
            {/* Name fields - Always visible */}
            <div className="grid grid-cols-1 gap-4 items-center w-max">
              <div className="space-y-2">
                <div className="relative">
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="h-14 w-full pl-6 pr-4 rounded-2xl bg-gray-100 border border-gray-400 focus:ring-0 focus:ring-gray-200 focus:bg-white transition-all text-base"
                    placeholder="First Name"       
                    required
                    style={{ minWidth: 280 }}
                  />
                  
                </div>
              </div>
                <div className="space-y-2">
                <div className="relative">
                  <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="h-14 w-full pl-6 pr-4 rounded-2xl bg-gray-100 border border-gray-400 focus:ring-0 focus:ring-gray-200 focus:bg-white transition-all text-base"
                  placeholder="Last Name"
                  required
                  style={{ minWidth: 280 }}
                  />
                </div>
                </div>
            </div>

            {/* Email or Phone field */}
            {!otpSent && (
              signUpMethod === 'email' ? (
                <div className="space-y-2">
                  
                  <div className="relative"></div>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-14 w-full pl-6 pr-4 rounded-2xl bg-gray-100 border border-gray-400 focus:ring-0 focus:ring-gray-200 focus:bg-white transition-all text-base"
                      placeholder="RodriAlma@gmail.com"
                      required
                      style={{ minWidth: 200 }}
                    />
                  </div>
                
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-medium text-gray-900">
                    Phone Number
                  </Label>
                  <MuiTelInput
                    id="phone"
                    value={formData.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    defaultCountry="NG"
                    fullWidth
                    forceCallingCode
                    className="rounded-2xl bg-gray-100 border-0 border-gray-400 focus:ring-2 focus:ring-gray-300 focus:bg-white transition-all text-base"
                    sx={{
                     
                      width:'full',
                      
                     
                      fontSize: '1rem',
                      
                    }}
                    placeholder="e.g. 8123456789"
                    required
                    TextFieldProps={{
                      InputProps: {
                        startAdornment: (
                          <Phone className="w-5 h-5 mr-2 text-gray-400" />
                        ),
                        disableUnderline: true,
                      },
                    }}
                  />
                </div>
              )
            )}

            {/* Password fields - Only for email sign-up */}
            {signUpMethod === 'email' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-medium text-gray-900">
                    Password
                  </Label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="h-14 rounded-2xl bg-gray-100  border-1 border-gray-400 text-base focus:ring-2 focus:ring-gray-300 focus:bg-white transition-all "
                      placeholder="••••••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute ml-[-1.9vw] top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-base font-medium text-gray-900">
                    Confirm Password
                  </Label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="h-14 rounded-2xl bg-gray-100  border-1 border-gray-400 text-base focus:ring-2 focus:ring-gray-300 focus:bg-white transition-all"
                    placeholder="••••••••••••"
                    required
                  />
                </div>
              </>
            )}

            {/* OTP input field - Only for phone sign-up AFTER OTP sent */}
            {signUpMethod === 'phone' && otpSent && (
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-base font-medium text-gray-900">
                  Verification Code (OTP)
                </Label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter the 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-14 rounded-2xl bg-gray-100 border-1 border-gray-400 text-base focus:ring-2 focus:ring-black focus:bg-white transition-all"
                  required
                />
              </div>
            )}

            <div className="flex items-center space-x-3">
             <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  className="mr-2"
                />
              <Label htmlFor="remember" className="text-base font-medium text-gray-900 cursor-pointer">
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl bg-black hover:bg-gray-800 text-white text-base font-medium transition-all duration-200"
            >
              {signUpMethod === 'email' || !otpSent ? 'Sign Up' : 'Verify OTP'}
            </Button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <button className="text-black hover:underline font-medium">
              Sign In
            </button>
          </p>

          {/* Firebase Invisible reCAPTCHA container */}
          <div id="recaptcha-container"></div>
        </div>
      </div>

      {/* Right side - Background Image with Blur */}
      <div className="flex-1 relative flex items-center-safe overflow-hidden rounded-r-3xl">
        <img
          src={ice}
          alt="banner"
          className="w-[80%] h-[70%] top-12 rounded-2xl bg-background object-cover absolute inset-0 filter blur-[1px]"
          
          draggable="false"
        

        />
        {/* Overlay text */}
        <div className="absolute top-20 ml-[-4.5vw] w-full flex items-start justify-center">
          <span className="text-white text-4xl font-bold drop-shadow-lg">
            Drive with your Terms
          </span>
        </div>
        <div className="absolute inset-0" />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Signup;
