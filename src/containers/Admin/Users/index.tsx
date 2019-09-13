import React from "react";
import { connect } from "react-redux";
import _ from 'lodash';
import DndTable from "../../../components/DndTable";
import { demoData } from "../../../constants/demoData";
import { Icon, Button, Modal } from 'antd';
import AddEditUser from "./AddEditUser";
import { fetchUsers, fetchUser, addUser, editUser, deleteUser } from '../../../store/Users/actions';
import { RootState } from '../../../store/rootReducer';
import Layout from '../../../components/Layout';
import { User } from '../../../models/users';

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
    }

    showDrawer = (): void => {
        this.setState({
            visible: true,
        });
    };

    onClose = (): void => {
        console.log("onClose");
        this.setState({
            visible: false,
        });
    };

    showConfirm = (id: number): void => {
        confirm({
            title: 'Do you want to delete this user?',
            onOk: () => {
                this.props.deleteUser(id);
            },
            onCancel() { },
        });
    }

    componentDidMount(): void {
        this.props.fetchUsers();
    }

    componentDidUpdate(prevProps): void {
        if (!_.isEmpty(this.props.editUserData) && this.props.editUserData !== prevProps.editUserData && !this.state.visible) {
            this.showDrawer();
        } else if (_.isEmpty(this.props.editUserData) && this.props.editUserData !== prevProps.editUserData && this.state.visible) {
            this.onClose();
        }
    }


    render() {
        const { users, loading, editUserData } = this.props;
        const { visible } = this.state;

        let column = [
            ...demoData.userTableColumn,
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
            <Layout>
                <div className="container__wrap">
                    <div className="users container">

                        <div className="row">
                            <div className="col-md-12">
                                <Button className="float-right m-4" type="primary" onClick={this.showDrawer}>
                                    <Icon type="plus" /> New user
                        </Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <DndTable loading={loading} data={users} columns={column} />
                            </div>
                        </div>

                        {visible && <AddEditUser visible={visible} editUserData={editUserData} onClose={this.onClose} addUser={this.props.addUser} editUser={this.props.editUser} />}
                    </div>
                </div>
            </Layout>
        );
    }


}

const mapStateToProps = (state: RootState) => {
    return {
        users: _.get(state, "users.userList", []),
        loading: _.get(state, "users.loading", false),
        editUserData: _.get(state, "users.editUserData", {}),
    };
};


export default connect(mapStateToProps, { fetchUsers, addUser, editUser, fetchUser, deleteUser })(Users);