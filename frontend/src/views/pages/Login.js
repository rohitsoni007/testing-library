import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormikTextField from "../../components/Loadable/Form/FormikTextField";
import { login } from "../../utils/service";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setToken } from "../../utils/session";


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
});

export default function Login() {
    const navigate = useNavigate();
    const initialValues={
        email: "",
        password: "",
    };

  

    return (
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
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitializeR
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            let resp = await login(values);
                            console.log("~ resp", resp);
                            if (resp?.data?.success) {
                                setToken(resp?.data?.data?.token);
                                // showNotification('success',resp.data.message)
                                navigate("/");
                            } else {
                                console.log(
                                    "~ error msg",
                                    resp?.response?.data?.message
                                );
                                alert(resp?.response?.data?.message)
                            }
                        } catch (error) {
                            console.log("error", error);
                        }
                    }}
                >
                    {({
                        submitForm,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <Box sx={{ mt: 1 }}>
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormikTextField
                                            name="email"
                                            label="Email"
                                            placeholder="Email"
                                            role="email"
                                            
                                        />
                                        {/* <input type="text" 
                                        className="test-dummy"
                                        name="dummy-email"
                                        placeholder="dummy-email"
                                        /> */}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormikTextField
                                            name="password"
                                            label="Password"
                                            type="password"
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    data-testid="sign-in"
                                    sx={{ mt: 3, mb: 2 }}
                                    title="submit"
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        
                                    </Grid>
                                    <Grid item>
                                        <Link to="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}
