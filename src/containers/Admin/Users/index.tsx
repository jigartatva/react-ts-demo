import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import DndTable from "../../../components/DndTable";
import { demoData } from "../../../constants/demoData";
import { Icon, Button, Modal, Col, Row } from "antd";
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
  fetchUsers: () => any;
  fetchUser: (id: number) => void;
  addUser: (user: User) => void;
  editUser: (user: User) => void;
  deleteUser: (id: number) => void;
  resetEditData: () => void;
}

interface UsersState {
  visible: boolean;
}

class Users extends React.Component<UsersProps, UsersState> {
  constructor(props: UsersProps) {
    super(props);
  }

  state: UsersState = {
    visible: false
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
      onCancel() {}
    });
  };

  componentDidMount(): void {
    this.props.fetchUsers();
  }

  componentDidUpdate(prevProps): void {
    if (
      !_.isEmpty(this.props.editUserData) &&
      this.props.editUserData !== prevProps.editUserData &&
      !this.state.visible
    ) {
      this.showDrawer();
    }
  }

  render() {
    const { users, loading, editUserData } = this.props;
    const { visible } = this.state;

    let column = [
            {
                title: 'First name',
                dataIndex: 'first_name',
                key: "first_name",
            },
            {
                title: 'Last Name',
                dataIndex: 'last_name',
                key: "last_name",
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: "email",
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                key: "gender",
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: "address",
            },
            {
                title: 'DOB',
                dataIndex: 'dob',
                key: "dob",
                render: (text, record) => {
                    
                    return  text
                },
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (text, record) => {

                    return (
                        <div className="action">
                            <Icon style={{ cursor: "pointer" }} key="edit" type="edit" onClick={(e) => this.props.fetchUser(record.id)} /> |
                            <Icon style={{ cursor: "pointer" }} key="delete" type="delete" onClick={(e) => this.showConfirm(record.id)} />
                        </div>
                    )
                },
            }

        ];

    return (
      <div className="users container">
        <Row>
          <Col md={12}>
            <h3 className="page-title">Users</h3>
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
            <DndTable loading={loading} data={users} columns={column} />
          </div>
        </Row>
        <Row>
          {visible && (
            <AddEditUser
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
)(Users);
