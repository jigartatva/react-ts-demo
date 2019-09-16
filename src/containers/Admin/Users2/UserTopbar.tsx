import React from "react";
import { User } from "../../../models/users";
import { Button, Icon } from "antd";
import MenuIcon from "mdi-react/MenuIcon";
interface UserTopbarProps {
  onClick: () => void;
  onClose: () => void;
  onDelete?: any;
  editUserData: User;
}

const UserTopbar = ({
  onClick,
  onClose,
  onDelete,
  editUserData
}: UserTopbarProps) => (
  <div className="chat__topbar">
    <button
      className="chat__topbar-button chat__topbar-button--menu"
      type="button"
      onClick={onClick}
    >
      <MenuIcon className="chat__topbar-button-icon" />
    </button>
    {editUserData && (
      <div className="chat__topbar-contact">
        <p className="chat__topbar-contact-name">
          {editUserData.first_name} {editUserData.last_name}
        </p>
        <p className="chat__topbar-contact-post">{editUserData.email}</p>
      </div>
    )}
    <div className="chat__topbar-right text-right">
      {editUserData && (
        <Button
          className="mr-2"
          type="danger"
          shape="circle"
          icon="delete"
          size={"default"}
          onClick={e => onDelete(editUserData.id)}
        />
      )}
      <Button
        className=""
        type="default"
        shape="circle"
        icon="plus"
        size={"default"}
        onClick={e => onClose()}
      />
    </div>
  </div>
);

export default UserTopbar;
