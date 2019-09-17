import React from "react";
import { Drawer, Form, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import _ from "lodash";
import moment from "moment";
import { withTranslation, WithTranslation } from "react-i18next";

import { User } from "../../../models/users";
import { DATE_FORMATE } from "../../../constants/appConfig";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";

interface AddEditUserProps extends FormComponentProps, WithTranslation {
  showDetails: boolean;
  visible: boolean;
  editUserData: User;
  addUser: (user: User) => void;
  editUser: (user: User) => void;
  onClose: () => void;
}

interface AddEditUserState { }

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
    const { visible, showDetails, editUserData, t, onClose } = this.props;

    let title = t("users.Create a new user");
    if (showDetails) {
      title = t("users.User Details");
    } else if (!_.isEmpty(editUserData)) {
      title = t("users.Update user");
    }
    return (
      <div>
        <Drawer title={title} width={720} onClose={onClose} visible={visible}>
          {!showDetails && (
            <>
              <Form layout="vertical" hideRequiredMark>
                <UserForm {...this.props} />
              </Form>

              <div className="drawer-form-action">
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                  {t("actions.cancel")}
                </Button>
                <Button onClick={this.handleSubmit} type="primary">
                  {t("actions.submit")}
                </Button>
              </div>
            </>
          )}
          {showDetails && <UserDetails data={editUserData} />}
        </Drawer>
      </div>
    );
  }
}

export default withTranslation()(Form.create<AddEditUserProps>()(AddEditUser));
