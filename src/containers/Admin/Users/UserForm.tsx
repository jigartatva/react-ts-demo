import React from "react";
import { Form, Radio, Input, DatePicker } from "antd";
import { FormComponentProps } from "antd/lib/form";
import _ from "lodash";
import moment from "moment";
import { DATE_FORMATE } from "../../../constants/appConfig";
import { User } from "../../../models/users";

interface UserFormProps extends FormComponentProps {
  editUserData: User;
}

const UserForm = (props: UserFormProps) => {
  const { getFieldDecorator } = props.form;
  const { editUserData } = props;
  let values: any = {};
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
          <Form.Item label="First Name">
            {getFieldDecorator("first_name", {
              initialValue: values.first_name ? values.first_name : "",
              rules: [{ required: true, message: "Please enter first name" }]
            })(<Input placeholder="" />)}
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="Last Name">
            {getFieldDecorator("last_name", {
              initialValue: values.last_name ? values.last_name : "",
              rules: [{ required: true, message: "Please enter last name" }]
            })(<Input placeholder="" />)}
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Form.Item label="Email">
            {getFieldDecorator("email", {
              initialValue: values.email ? values.email : "",
              rules: [
                {
                  type: "email",
                  message: "The input is not valid email"
                },
                {
                  required: true,
                  message: "Please input youremail"
                }
              ]
            })(<Input placeholder="" />)}
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="DOB">
            {getFieldDecorator("dob", {
              initialValue: values.dob ? values.dob : null,
              rules: [{ required: true, message: "Please select dob" }]
            })(
              <DatePicker
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
          <Form.Item label="Gender">
            {getFieldDecorator("gender", {
              initialValue: values.gender ? values.gender : "M"
            })(
              <Radio.Group>
                <Radio value="M">Male</Radio>
                <Radio value="F">Female</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="Address">
            {getFieldDecorator("address", {
              initialValue: values.address ? values.address : "",
              rules: [
                {
                  required: true,
                  message: "please enter address"
                }
              ]
            })(<Input placeholder="" />)}
          </Form.Item>
        </div>

        <div className="col-md-12">
          <Form.Item label="Bio">
            {getFieldDecorator("bio", {
              initialValue: values.bio ? values.bio : "",
              rules: [
                {
                  required: true,
                  message: "please enter bio"
                }
              ]
            })(<Input.TextArea rows={2} placeholder="" />)}
          </Form.Item>
        </div>
      </div>
      <div style={{ display: "none" }}>
        {!_.isEmpty(editUserData)
          ? getFieldDecorator("id", {
              initialValue: values.id ? values.id : ""
            })(<Input placeholder="" />)
          : ""}
      </div>
    </>
  );
};

export default UserForm;
