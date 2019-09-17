import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Icon, Button, Modal, Col, Row } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";

import DndTable from "../../../components/DndTable";
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

const { confirm } = Modal;

interface UsersProps {
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
  showDetails: boolean;
}

class Users extends React.Component<UsersProps & WithTranslation, UsersState> {
  constructor(props: UsersProps & WithTranslation) {
    super(props);
  }

  state: UsersState = {
    visible: false,
    showDetails: false
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

  showUserDetails = (e: SyntheticEvent, record: User): void => {
    this.props.fetchUser(record.id);
    this.setState({
      visible: true,
      showDetails: true
    });
  };

  onEdit = (record: User): void => {
    this.setState({
      showDetails: false
    });
    this.props.fetchUser(record.id);
  };

  componentDidMount(): void {
    const { users } = this.props;
    //fetch user only if empty
    if (_.isEmpty(users)) {
      this.props.fetchUsers();
    }
  }

  componentDidUpdate(prevProps): void {
    //show drawer edit user data present in store
    if (
      !_.isEmpty(this.props.editUserData) &&
      this.props.editUserData !== prevProps.editUserData &&
      !this.state.visible
    ) {
      this.showDrawer();
    }
  }

  render() {
    const { users, loading, editUserData, t, i18n } = this.props;
    const { visible, showDetails } = this.state;
    const column = [
      {
        title: t("form.First Name"),
        dataIndex: "first_name",
        key: "first_name",
        sorter: (a, b) => a.first_name.length - b.first_name.length
      },
      {
        title: t("form.Last Name"),
        dataIndex: "last_name",
        key: "last_name",
        sorter: (a, b) => a.last_name.length - b.last_name.length
      },
      {
        title: t("form.Email"),
        dataIndex: "email",
        key: "email"
      },
      {
        title: t("form.Gender"),
        dataIndex: "gender",
        key: "gender",
        filters: [{ text: "Male", value: "M" }, { text: "Female", value: "F" }],
        onFilter: (value, record) => record.gender.includes(value)
      },
      {
        title: t("form.Address"),
        dataIndex: "address",
        key: "address"
      },
      {
        title: t("form.DOB"),
        dataIndex: "dob",
        key: "dob",
        render: (text, record) => {
          return text;
        }
      },
      {
        title: t("actions.Action"),
        dataIndex: "",
        key: "x",
        render: (text, record) => {
          return (
            <div className="action">
              <Icon
                style={{ cursor: "pointer" }}
                key="edit"
                type="edit"
                onClick={e => {
                  e.stopPropagation();
                  this.onEdit(record);
                }}
              />{" "}
              |
              <Icon
                style={{ cursor: "pointer" }}
                key="delete"
                type="delete"
                onClick={e => {
                  e.stopPropagation();
                  this.showConfirm(record.id);
                }}
              />
            </div>
          );
        }
      }
    ];

    return (
      <div className="users container">
        <Row>
          <Col md={12}>
            <h3 className="page-title">{t("users.Users")}</h3>
          </Col>
          <Col md={12}>
            <Button
              className="float-right"
              type="primary"
              shape="circle"
              icon="plus"
              size={"large"}
              onClick={this.showDrawer}
            />
          </Col>
        </Row>
        <Row>
          <div className="block">
            <DndTable
              local={i18n.language}
              onClickRow={this.showUserDetails}
              loading={loading}
              data={users}
              columns={column}
            />
          </div>
        </Row>
        <Row>
          {visible && (
            <AddEditUser
              showDetails={showDetails}
              visible={visible}
              editUserData={editUserData}
              onClose={this.onClose}
              addUser={this.props.addUser}
              editUser={this.props.editUser}
            />
          )}
        </Row>
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

export default connect(
  mapStateToProps,
  { fetchUsers, addUser, editUser, fetchUser, deleteUser, resetEditData }
)(withTranslation()(Users));
