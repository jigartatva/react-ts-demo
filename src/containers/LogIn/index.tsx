import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { fetchAuth } from "../../store/Auth/actions";
import LogInForm from "../../components/LogInForm";
import { RootState } from "../../store/rootReducer";
import FacebookIcon from "mdi-react/FacebookIcon";
import GooglePlusIcon from "mdi-react/GooglePlusIcon";
import {
  useTranslation,
  withTranslation,
  WithTranslation
} from "react-i18next";

interface LoginProps extends WithTranslation {
  loading: boolean;
  fetchAuth: () => any;
}

interface LoginState {}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
  }

  render() {
    const { t, fetchAuth } = this.props;

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
            <LogInForm fetchAuth={fetchAuth} />
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
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    token: _.get(state, "auth.token", []),
    loading: _.get(state, "auth.loading", false)
  };
};

const Extended = withTranslation()(Login);

export default connect(
  mapStateToProps,
  { fetchAuth }
)(Extended);
