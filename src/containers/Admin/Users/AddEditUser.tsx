import React from "react";
import { Drawer, Form, Button, Radio, Input, DatePicker } from 'antd';
import { User } from '../../../models/users';
import _ from 'lodash';
import moment from 'moment';
import { DATE_FORMATE } from "../../../constants/appConfig";
import { FormComponentProps } from 'antd/lib/form';

interface AddEditUserProps  extends FormComponentProps  {
    
    visible: boolean;
    editUserData: object;
    addUser: (user: User) => void;
    editUser: (user: User) => void;
    onClose: () => void;
}

interface AddEditUserState {

}

class AddEditUser extends React.Component<AddEditUserProps , AddEditUserState> {
    constructor(props: AddEditUserProps) {
        super(props);
    }

    state: AddEditUserState = {

    }

    handleSubmit = (): void => {

        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(_.isUndefined(values.id)){
                    this.props.addUser(values);
                    this.props.onClose();
                }else{
                    this.props.editUser(values);
                }
                
                
            }
        });
    }

    componentDidMount(): void {
        if (!_.isEmpty(this.props.editUserData)) {
            console.log("this.props.editUserData", this.props.editUserData);
            let values = {...this.props.editUserData, dob: moment(_.get(this.props,'editUserData.dob',moment(DATE_FORMATE)), DATE_FORMATE)}
            this.props.form.setFieldsValue(values);

        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>

                <Drawer
                    title="Create a new user"
                    width={720}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Item label="First Name">
                                    {getFieldDecorator('first_name', {
                                        rules: [{ required: true, message: 'Please enter first name' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item label="Last Name">
                                    {getFieldDecorator('last_name', {
                                        rules: [{ required: true, message: 'Please enter last name' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Item label="DOB">
                                    {getFieldDecorator('dob', {
                                        rules: [{ required: true, message: 'Please select dob' }],
                                    })(
                                        <DatePicker size="default" style={{ width: "100%" }} format={DATE_FORMATE} />
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item label="Gender">
                                    {getFieldDecorator('gender', {
                                        initialValue: "M"
                                    })(
                                        <Radio.Group>
                                            <Radio value="M">Male</Radio>
                                            <Radio value="F">Female</Radio>
                                        </Radio.Group>,
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Form.Item label="Address">
                                    {getFieldDecorator('address', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'please enter address',
                                            },
                                        ],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </div>

                            <div className="col-md-12">
                                <Form.Item label="Bio">
                                    {getFieldDecorator('bio', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'please enter bio',
                                            },
                                        ],
                                    })(<Input.TextArea rows={4} placeholder="" />)}
                                </Form.Item>
                            </div>

                        </div>
                        <div style={{display: "none"}}>
                            {!_.isEmpty(this.props.editUserData) ? (
                                getFieldDecorator('id')(<Input placeholder="" />)
                            ) : ("")
                            }
                        </div>
                        

                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
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
