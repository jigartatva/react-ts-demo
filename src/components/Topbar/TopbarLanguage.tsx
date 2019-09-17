import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { Collapse } from "reactstrap";
import DownIcon from "mdi-react/ChevronDownIcon";

const gb = require(`../../assets/language/gb.png`);
const de = require(`../../assets/language/de.png`);

const GbLng = () => (
  <span className="topbar__language-btn-title">
    <img src={gb} alt="gb" />
    <span>EN</span>
  </span>
);

const DeLng = () => (
  <span className="topbar__language-btn-title">
    <img src={de} alt="de" />
    <span>DE</span>
  </span>
);

interface TopbarLanguageProps extends WithTranslation { }

interface TopbarLanguageState {
  collapse: boolean;
  mainButtonContent: JSX.Element;
}

class TopbarLanguage extends React.Component<
  TopbarLanguageProps,
  TopbarLanguageState
  > {
  state = {
    collapse: false,
    mainButtonContent: <GbLng />
  };

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };

  changeLanguage = lng => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
    switch (lng) {
      case "en":
        this.setState({ mainButtonContent: <GbLng />, collapse: false });
        break;
      case "de":
        this.setState({ mainButtonContent: <DeLng />, collapse: false });
        break;
      default:
        this.setState({ mainButtonContent: <GbLng />, collapse: false });
        break;
    }
  };

  componentDidMount(): void {
    const { i18n } = this.props;
    const lng = localStorage.getItem("lng");
    if (lng) {
      this.changeLanguage("de");
    }
  }

  render() {
    const { mainButtonContent, collapse } = this.state;

    return (
      <div className="topbar__collapse topbar__collapse--language">
        <button className="topbar__btn" type="button" onClick={this.toggle}>
          {mainButtonContent}
          <DownIcon className="topbar__icon" />
        </button>
        {collapse && (
          <button
            className="topbar__back"
            type="button"
            onClick={this.toggle}
          />
        )}
        <Collapse
          isOpen={collapse}
          className="topbar__collapse-content topbar__collapse-content--language"
        >
          <button
            className="topbar__language-btn"
            type="button"
            onClick={() => this.changeLanguage("en")}
          >
            <GbLng />
          </button>
          <button
            className="topbar__language-btn"
            type="button"
            onClick={() => this.changeLanguage("de")}
          >
            <DeLng />
          </button>
        </Collapse>
      </div>
    );
  }
}

export default withTranslation("common")(TopbarLanguage);
