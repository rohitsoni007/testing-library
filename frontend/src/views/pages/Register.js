import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikTextField from "../../components/Loadable/Form/FormikTextField";
import { signUp } from "../../utils/service";
import { Link, useNavigate } from "react-router-dom";


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
    firstName: Yup.string().max(255).required("First name is required"),
    lastName: Yup.string().max(255).required("Last name is required"),
});

export default function Register() {

    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
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
                    Sign up
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={ async(values, { setSubmitting }) => {
                        try {
                            let resp = await signUp(values);
                            console.log('~ resp', resp);
                            if(resp?.data?.success){
                                navigate('/login')
                            }else{
                                console.log('~ mw', resp?.response?.data?.message);
                            }
                        } catch (error) {
                            console.log('error', error);
                        }
                    }}
                >
                    {({
                       submitForm,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <Box sx={{ mt: 3 }}>
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            name="firstName"
                                            label="First Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            name="lastName"
                                            label="Last Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormikTextField
                                            name="email"
                                            label="Email"
                                        />
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
                                    sx={{ mt: 3, mb: 2 }}
                                    data-testid = "register"
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to="/login" variant="body2">
                                            Already have an account? Sign in
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
