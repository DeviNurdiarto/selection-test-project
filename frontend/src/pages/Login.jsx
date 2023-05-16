import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field } from "formik";
import Axios from "axios";
import Swal from "sweetalert2";

const theme = createTheme();

export default function Login() {
  const { loggedIn, username, token, setLoggedIn, setUsername, setToken } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoginLocal = localStorage.getItem("loggedIn");

    if (isLoginLocal === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      const { email, password } = values;
      console.log("Email or Username:", email);
      console.log("Password:", password);

      const response = await Axios.post("http://localhost:8000/login", {
        usernameOrEmail: email,
        password: password,
      });

      console.log("Login Response:", response.data);

      // Perform any desired actions after successful login
      setLoggedIn(true);
      setUsername(email);
      setToken(response.data.token);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Logged in successfully",
      }).then(() => {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", email);
        navigate("/"); // Navigate to home page
      });
    } catch (err) {
      console.error("Error logging in:", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid credentials. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#4285f4" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form noValidate>
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username or Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </Button>
                    ),
                  }}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate("/register")}
                    >
                      Don't have an account? Sign up
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"© "}
            <Link color="inherit" href="https://mui.com/">
              Dave Nurdiarto
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
