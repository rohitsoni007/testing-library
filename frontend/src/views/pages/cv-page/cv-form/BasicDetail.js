import {
    Button,
    Grid,
    Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import FormikTextField from "../../../../components/Loadable/Form/FormikTextField";
import { useNavigate, useParams } from "react-router-dom";
import { addResume, editResume, getOneResume } from "../../../../utils/service";



export default function BasicDetail() {
    let { id } = useParams();

    console.log('~~~~~~~ id', id);
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (id) {
            const getOne = async () => {
                let resp = await getOneResume(id);
                console.log("~ resp", resp);
                let data = resp?.data?.data?.resume;
                setInitialValues((prev) => {
                    return {
                        ...prev,
                        name: data?.name || "",
                        email: data?.email || "",
                        phone: data?.phone || "",
                    };
                });
            };
            getOne();
        }
    }, [id]);

    const resumeValidationSchema = Yup.object().shape({
        name: Yup.string().max(255).required("Name is required"),
        email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        phone: Yup.string().max(255).required("Phone is required"),
    });

    return (
        <>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>{id ?'Edit'  : 'Add'}</Typography>
         

            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={resumeValidationSchema}
                onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                ) => {
                    try {
                        console.log("~ values", values);

                        if (id) {
                            let resp = await editResume(id, values);
                            if (resp) {
                                navigate("/");
                            }
                           
                        } else {
                            let resp = await addResume(values);
                            if (resp) {
                                navigate("/");
                            }
                        }
                      
                    } catch (err) {
                        console.error("~ err", err);
                        setStatus({ success: false });
                        setErrors({ submit: err?.response?.data?.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormikTextField
                                    name="name"
                                    label="Name"
                                    placeholder="Name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormikTextField
                                    name="email"
                                    label="Email"
                                    placeholder="Email"
                                    role="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormikTextField name="phone" label="Phone" />
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
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}
