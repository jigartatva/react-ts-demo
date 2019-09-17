import React from "react";
import { Drawer, Form, Button } from "antd";
import { User } from "../../../models/users";
import _ from "lodash";
import moment from "moment";
import { DATE_FORMATE } from "../../../constants/appConfig";
import UserForm from "./UserForm";
import { FormComponentProps } from "antd/lib/form";
import UserDetails from './UserDetails';

interface AddEditUserProps extends FormComponentProps {
    showDetails: boolean;
    visible: boolean;
    editUserData: User;
    addUser: (user: User) => void;
    editUser: (user: User) => void;
    onClose: () => void;
}

interface AddEditUserState {}

class AddEditUser extends React.Component<AddEditUserProps, AddEditUserState> {
    constructor(props: AddEditUserProps) {
        super(props);
    }

    state: AddEditUserState = {};

    handleSubmit = (): void => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.dob = moment(values.dob).format(DATE_FORMATE);
                if (_.isUndefined(values.id)) {
                    this.props.addUser(values);
                } else {
                    this.props.editUser(values);
                }

                this.props.onClose();
            }
        });
    };

    render() {
        const { visible, showDetails, editUserData } = this.props;
        let title = "Create a new user";
        if(showDetails){
            title = "User Details";
        }else if(!_.isEmpty(editUserData)){
            title = "Update user";
        }
        return (
            <div>
                <Drawer title={title} width={720} onClose={this.props.onClose} visible={visible}>
                    {!showDetails && (
                        <>
                            <Form layout="vertical" hideRequiredMark>
                                <UserForm {...this.props} />
                            </Form>

                            <div className="drawer-form-action">
                                <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                                    Cancel
                                </Button>
                                <Button onClick={this.handleSubmit} type="primary">
                                    Submit
                                </Button>
                            </div>
                        </>
                    )}
                    {showDetails && <UserDetails data={editUserData}/>}
                </Drawer>
            </div>
        );
    }
}

export default Form.create<AddEditUserProps>()(AddEditUser);
