import React from "react";
import { Drawer, Form, Button } from "antd";
import { User } from "../../../models/users";
import _ from "lodash";
import UserForm from "./UserForm";
import { FormComponentProps } from "antd/lib/form";

interface AddEditUserProps extends FormComponentProps {
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
    const { visible } = this.props;

    return (
      <div>
        <Drawer
          title="Create a new user"
          width={720}
          onClose={this.props.onClose}
          visible={visible}
        >
          <Form layout="vertical" hideRequiredMark>
            <UserForm {...this.props} />
          </Form>

          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default Form.create<AddEditUserProps>()(AddEditUser);
