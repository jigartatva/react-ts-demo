import React from "react";
import _ from "lodash";
import { User } from "../../../models/users";

interface UserDetailsProps {
    data: User;
}

const UserDetails = (props: UserDetailsProps) => {
    const { data } = props;
    const gender = _.isNull(data) ? 'M' : data.gender;
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <div className="info-block">
                        <span className="info-label">First Name</span>
                        <span className="info-value">{!_.isNull(data) ? data.first_name : ""}</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="info-block">
                        <span className="info-label">Last Name</span>
                        <span className="info-value">{!_.isNull(data) ? data.last_name : ""}</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="info-block">
                        <span className="info-label">Email</span>
                        <span className="info-value">{!_.isNull(data) ? data.email : ""}</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="info-block">
                        <span className="info-label">DOB</span>
                        <span className="info-value">{!_.isNull(data) ? data.dob : ""}</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="info-block">
                        <span className="info-label">Gender</span>
                        <span className="info-value">{gender === "M" ? "Male" : "Female"}</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="info-block">
                        <span className="info-label">Address</span>
                        <span className="info-value">{!_.isNull(data) ? data.address : ""}</span>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="info-block">
                        <span className="info-label">Bio</span>
                        <span className="info-value">{!_.isNull(data) ? data.bio : ""}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDetails;
