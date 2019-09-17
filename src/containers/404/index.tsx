import React from "react";
import { Link } from "react-router-dom";
import { withTranslation, WithTranslation } from "react-i18next";

const Image404 = require("../../shared/img/404/404.png");

const NotFound404 = ({ t }: WithTranslation) => (
  <div className="not-found">
    <div className="not-found__content">
      <img className="not-found__image" src={Image404} alt="404" />
      <h3 className="not-found__info">{t("404")}</h3>
      <Link className="btn btn-primary" to="/admin">
        Back Home
      </Link>
    </div>
  </div>
);

export default withTranslation()(NotFound404);
