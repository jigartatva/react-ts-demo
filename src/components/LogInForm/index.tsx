import React from "react";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { useTranslation } from "react-i18next";
// Shape of form values
interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface OtherProps {
  message: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message, values } = props;
  const { t } = useTranslation();
  let remember = values.remember ? true : false;
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
        {touched.email && errors.email && (
          <div className="has-error">{t(errors.email)}</div>
        )}
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">{t("login.Password")}</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <KeyVariantIcon />
          </div>
          <Field type="password" name="password" />
        </div>
        {touched.password && errors.password && (
          <div className="has-error">{t(errors.password)}</div>
        )}
      </div>

      <div className="form__form-group">
        <div className="form__form-group-field ">
          <div className="custom-checkbox custom-checkbox__inline">
            <Field
              onClick={e => {
                if (e.target.value) {
                  localStorage.setItem("remember", e.target.value.toString());
                } else {
                  localStorage.removeItem("remember");
                }
              }}
              type="checkbox"
              checked={remember}
              name="remember"
            />
            <label htmlFor="Remember Me">{t("login.Remember Me")}</label>
          </div>
        </div>
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
  fetchAuth: (values: object) => void;
  initialEmail?: string;
  message: string; // if this passed all the way through you might do this or make a union type,
}

const isValidEmail = (email: string) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Wrap our form with the using withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: props => {
    let email = localStorage.getItem("re_email")
      ? localStorage.getItem("re_email")
      : "";
    let password = localStorage.getItem("re_pass")
      ? localStorage.getItem("re_pass")
      : "";
    let remember = localStorage.getItem("remember") ? true : false;
    return {
      ...props,
      email: email,
      password: password,
      remember: remember
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};

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

  handleSubmit: (values, { props }) => {
    // do submitting things
    if (values.remember) {
      localStorage.setItem("re_email", values.email);
      localStorage.setItem("re_pass", values.password);
      localStorage.setItem("remember", values.remember.toString());
    } else {
      localStorage.removeItem("re_email");
      localStorage.removeItem("re_pass");
      localStorage.removeItem("remember");
    }

    props.fetchAuth(values);
  }
})(InnerForm);

// Use <MyForm /> wherevs
const LogInForm = props => (
  <div>
    <MyForm {...props} message="Sign up" />
  </div>
);

export default LogInForm;
