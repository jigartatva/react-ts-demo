import React from "react";
import { Form, Radio, Input, DatePicker } from "antd";
import { FormComponentProps } from "antd/lib/form";
import _ from "lodash";
import moment from "moment";
import { withTranslation, WithTranslation } from "react-i18next";

import { DATE_FORMATE } from "../../../constants/appConfig";
import { User } from "../../../models/users";

interface UserFormProps extends FormComponentProps, WithTranslation {
  editUserData: User;
}

const UserForm = (props: UserFormProps) => {
  const {
    editUserData,
    t,
    form: { getFieldDecorator }
  } = props;

  let values: User = null;
  if (!_.isEmpty(props.editUserData)) {
    values = {
      ...props.editUserData,
      dob: moment(
        _.get(props, "editUserData.dob", moment(DATE_FORMATE)),
        DATE_FORMATE
      )
    };
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <Form.Item label={t("form.First Name")}>
            {getFieldDecorator("first_name", {
              initialValue: !_.isNull(values) ? values.first_name : "",
              rules: [
                { required: true, message: t("validation.required_first_name") }
              ]
            })(<Input maxLength={30} placeholder="" />)}
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label={t("form.Last Name")}>
            {getFieldDecorator("last_name", {
              initialValue: !_.isNull(values) ? values.last_name : "",
              rules: [
                { required: true, message: t("validation.required_last_name") }
              ]
            })(<Input maxLength={30} placeholder="" />)}
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Form.Item label={t("form.Email")}>
            {getFieldDecorator("email", {
              initialValue: !_.isNull(values) ? values.email : "",
              rules: [
                {
                  type: "email",
                  message: t("validation.invalid_email")
                },
                {
                  required: true,
                  message: t("validation.required_email")
                }
              ]
            })(<Input maxLength={100} placeholder="" />)}
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label={t("form.DOB")}>
            {getFieldDecorator("dob", {
              initialValue: !_.isNull(values) ? values.dob : null,
              rules: [{ required: true, message: t("validation.required_dob") }]
            })(
              <DatePicker
                showTime={false}
                size="default"
                style={{ width: "100%" }}
                format={DATE_FORMATE}
              />
            )}
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Form.Item label={t("form.Gender")}>
            {getFieldDecorator("gender", {
              initialValue: !_.isNull(values) ? values.gender : "M"
            })(
              <Radio.Group>
                <Radio value="M">{t("form.Male")}</Radio>
                <Radio value="F">{t("form.Female")}</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label={t("form.Address")}>
            {getFieldDecorator("address", {
              initialValue: !_.isNull(values) ? values.address : "",
              rules: [
                {
                  required: true,
                  message: t("validation.required_address")
                }
              ]
            })(<Input maxLength={100} placeholder="" />)}
          </Form.Item>
        </div>

        <div className="col-md-12">
          <Form.Item label={t("form.Bio")}>
            {getFieldDecorator("bio", {
              initialValue: !_.isNull(values) ? values.bio : "",
              rules: [
                {
                  required: true,
                  message: t("validation.required_bio")
                }
              ]
            })(<Input.TextArea rows={2} placeholder="" />)}
          </Form.Item>
        </div>
      </div>
      <div style={{ display: "none" }}>
        {!_.isEmpty(editUserData)
          ? getFieldDecorator("id", {
              initialValue: !_.isNull(values) ? values.id : ""
            })(<Input placeholder="" />)
          : ""}
      </div>
    </>
  );
};

export default withTranslation()(UserForm);
