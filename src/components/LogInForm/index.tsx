import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { useTranslation } from "react-i18next";

// Shape of form values
interface FormValues {
  email: string;
  password: string;
}

interface OtherProps {
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  const { t } = useTranslation();
  return (
    <Form className="form">
      <div className="form__form-group">
        <span className="form__form-group-label">{t("login.Email")}</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <Field type="email" name="email" />
        </div>
        {touched.email && errors.email && <div>{t(errors.email)}</div>}
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">{t("login.Password")}</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <KeyVariantIcon />
          </div>
          <Field type="password" name="password" />
        </div>
        {touched.password && errors.password && <div>{t(errors.password)}</div>}
      </div>

      <button
        className="btn btn-primary account__btn account__btn--small"
        type="submit"
      >
        {t("login.Sign In")}
      </button>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

const isValidEmail = (email: string) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Wrap our form with the using withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: props => {
    return {
      email: props.initialEmail || "",
      password: ""
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    // const { t } = useTranslation();
    let errors: FormikErrors<FormValues> = {
      email: "",
      password: ""
    };
    // console.log('test',t);
    if (!values.email) {
      errors.email = "validation.required_email";
    } else if (!isValidEmail(values.email)) {
      errors.email = "validation.invalid_email";
    }
    if (!values.password) {
      errors.password = "validation.required_password";
    }
    return errors;
  },

  handleSubmit: values => {
    // do submitting things
    console.log("values", values);
  }
})(InnerForm);

const LogInForm = () => (
  <div>
    <MyForm message="Sign up" />
  </div>
);

export default LogInForm;
