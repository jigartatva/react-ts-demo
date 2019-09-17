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
          <Form.Item label="First Name">
            {getFieldDecorator("first_name", {
              initialValue: !_.isNull(values) ? values.first_name : "",
              rules: [{ required: true, message: "Please enter first name" }],
              
            })(<Input maxLength={30} placeholder="" />)}
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="Last Name">
            {getFieldDecorator("last_name", {
              initialValue:  !_.isNull(values) ? values.last_name : "",
              rules: [{ required: true, message: "Please enter last name" }]
            })(<Input maxLength={30}  placeholder="" />)}
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Form.Item label="Email">
            {getFieldDecorator("email", {
              initialValue:  !_.isNull(values) ? values.email : "",
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
            })(<Input  maxLength={100} placeholder="" />)}
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="DOB">
            {getFieldDecorator("dob", {
              initialValue:  !_.isNull(values) ? values.dob : null,
              rules: [{ required: true, message: "Please select dob" }]
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
          <Form.Item label="Gender">
            {getFieldDecorator("gender", {
              initialValue:  !_.isNull(values) ? values.gender : "M"
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
              initialValue:  !_.isNull(values) ? values.address : "",
              rules: [
                {
                  required: true,
                  message: "please enter address"
                }
              ]
            })(<Input  maxLength={100} placeholder="" />)}
          </Form.Item>
        </div>

        <div className="col-md-12">
          <Form.Item label="Bio">
            {getFieldDecorator("bio", {
              initialValue:  !_.isNull(values) ? values.bio : "",
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
              initialValue:  !_.isNull(values) ? values.id : ""
            })(<Input placeholder="" />)
          : ""}
      </div>
    </>
  );
};

export default UserForm;
