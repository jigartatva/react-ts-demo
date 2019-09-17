import React from "react";
import { Form, Button } from "antd";
import _ from "lodash";
import moment from "moment";
import { FormComponentProps } from "antd/lib/form";
import { withTranslation, WithTranslation } from "react-i18next";

import { User } from "../../../models/users";
import { DATE_FORMATE } from "../../../constants/appConfig";
import UserForm from "../../Admin/Users/UserForm";

interface AddEditUserProps extends FormComponentProps, WithTranslation {
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

  onClose = (): void => {
    this.props.onClose();
  };

  componentDidUpdate(prevProps): void {
    if (!_.isEmpty(this.props.editUserData)) {
      if (
        this.props.editUserData.id !== _.get(prevProps.editUserData, "id", "")
      ) {
        let values = {
          ...this.props.editUserData,
          dob: moment(
            _.get(this.props, "editUserData.dob", moment(DATE_FORMATE)),
            DATE_FORMATE
          )
        };
        this.props.form.setFieldsValue(values);
      }
    } else if (
      _.get(this.props.editUserData, "id", "") !==
        _.get(prevProps.editUserData, "id", "") &&
      !this.props.visible
    ) {
      this.props.form.resetFields();
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <Form layout="vertical" hideRequiredMark>
          <UserForm {...this.props} />
        </Form>
        <div className="float-right">
          <Button onClick={this.onClose} style={{ marginRight: 8 }}>
            {t("actions.cancel")}
          </Button>
          <Button onClick={this.handleSubmit} type="primary">
            {t("actions.submit")}
          </Button>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Form.create<AddEditUserProps>()(AddEditUser));
