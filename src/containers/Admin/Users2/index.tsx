import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import _ from "lodash";
import { Modal, Col, Row } from "antd";
import Scrollbar from "react-smooth-scrollbar";
import { withTranslation, WithTranslation } from "react-i18next";

import AddEditUser from "./AddEditUser";
import {
  fetchUsers,
  fetchUser,
  addUser,
  editUser,
  deleteUser,
  resetEditData
} from "../../../store/Users/actions";
import { RootState } from "../../../store/rootReducer";
import { User } from "../../../models/users";
import UserTopbar from "./UserTopbar";
import ContactCard from "../../../components/Card/ContactCard";
import UserDetails from "../Users/UserDetails";

const Avatar = require("../../../assets/avatar-demo.png");
const { confirm } = Modal;

interface UsersProps extends WithTranslation {
  users: User[];
  loading: boolean;
  editUserData: User;
  fetchUsers: () => void;
  fetchUser: (id: number) => void;
  addUser: (user: User) => void;
  editUser: (user: User) => void;
  deleteUser: (id: number) => void;
  resetEditData: () => void;
}

interface UsersState {
  visible: boolean;
  openContacts: boolean;
  showEditForm: boolean;
}

class Users extends React.Component<UsersProps, UsersState> {
  constructor(props: UsersProps) {
    super(props);
  }

  state: UsersState = {
    visible: false,
    openContacts: false,
    showEditForm: false
  };

  onOpenContacts = (): void => {
    this.setState(prevState => ({ openContacts: !prevState.openContacts }));
    this.onClose();
  };

  showDrawer = (): void => {
    this.setState({
      visible: true
    });
  };

  onClose = (): void => {
    this.setState({
      visible: false
    });
    this.props.resetEditData();
  };

  showConfirm = (id: number): void => {
    confirm({
      title: "Do you want to delete this user?",
      onOk: () => {
        this.props.deleteUser(id);
      },
      onCancel() { }
    });
  };

  showEditForm = (): void => {
    this.setState({
      showEditForm: true
    });
  };

  componentDidMount(): void {
    this.props.fetchUsers();
  }

  render() {
    const { users, loading, editUserData, t } = this.props;
    const { visible, openContacts, showEditForm } = this.state;
    const chatClass = classNames({
      chat: true,
      "chat--open": openContacts
    });

    const contactsClass = classNames({
      "chat__contact-list": true,
      "chat__contact-list--open": openContacts
    });

    return (
      <div className="users container">
        <Row>
          <Col md={12}>
            <h3 className="page-title">{t("users.Users")}</h3>
          </Col>
        </Row>
        <div className={chatClass + " block"}>
          <div className={contactsClass}>
            <div
              onClick={openContacts ? this.onOpenContacts : null}
              className="chat__contacts"
            >
              <Scrollbar
                className="scroll chat__contacts-scroll"
                alwaysShowTracks
              >
                {users.map((c, i) => {
                  const editId = _.get(editUserData, "id", false);
                  const contact = {
                    title: `${c.first_name} ${c.last_name}`,
                    subTitle: c.address,
                    details: c.bio,
                    avatar: Avatar
                  };

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={e => {
                        this.props.fetchUser(c.id);
                        this.setState({
                          showEditForm: false
                        });
                      }}
                    >
                      <ContactCard active={editId === c.id} contact={contact} />
                    </button>
                  );
                })}
              </Scrollbar>
            </div>
          </div>
          <div className="chat__dialog">
            <UserTopbar
              onClick={this.onOpenContacts}
              onClose={this.onClose}
              editUserData={editUserData}
              onEdit={this.showEditForm}
              onDelete={this.showConfirm}
            />
            <Scrollbar className="scroll chat__scroll" alwaysShowTracks>
              <div className="p-4">
                {!_.isEmpty(editUserData) && !showEditForm && (
                  <UserDetails data={editUserData} />
                )}
                {(_.isEmpty(editUserData) || showEditForm) && (
                  <AddEditUser
                    visible={visible}
                    editUserData={editUserData}
                    onClose={this.onClose}
                    addUser={this.props.addUser}
                    editUser={this.props.editUser}
                  />
                )}
              </div>
            </Scrollbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    users: _.get(state, "users.userList", []),
    loading: _.get(state, "users.loading", false),
    editUserData: _.get(state, "users.editUserData", {})
  };
};

export default withTranslation()(
  connect(
    mapStateToProps,
    { fetchUsers, addUser, editUser, fetchUser, deleteUser, resetEditData }
  )(Users)
);
