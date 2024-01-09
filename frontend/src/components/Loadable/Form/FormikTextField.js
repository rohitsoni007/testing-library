import { FormHelperText } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import { TextField } from "formik-mui";

export default function FormikTextField({name, label, type, ...rest}) {
    return (
        <>
            <Field
                {...rest}
                type={type ? type : 'text'}
                name={name}
                fullWidth
                label={label}
                component={TextField}
                className="test-email-fail"
            />
        </>
    );
}
