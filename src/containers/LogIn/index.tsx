import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "mdi-react/FacebookIcon";
import GooglePlusIcon from "mdi-react/GooglePlusIcon";
import { useTranslation } from "react-i18next";

import LogInForm from "../../components/LogInForm";

const LogIn = () => {
  const { t } = useTranslation();
  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              {t("login.welcome_to")}
              <span className="account__logo">
               {t("login.tatva")}
                <span className="account__logo-accent">{t("login.dev")}</span>
              </span>
            </h3>
            <h4 className="account__subhead subhead">
            {t("login.Start your business easily")}
            </h4>
          </div>
          <LogInForm />
          <div className="account__or">
            <p>{t("login.Or Easily Using")}</p>
          </div>
          <div className="account__social">
            <Link
              className="account__social-btn account__social-btn--facebook"
              to="/admin"
            >
              <FacebookIcon />
            </Link>
            <Link
              className="account__social-btn account__social-btn--google"
              to="/admin"
            >
              <GooglePlusIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
