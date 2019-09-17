import React from 'react';
import { User } from '../../../models/users';
import { Button, Icon } from 'antd';
import MenuIcon from 'mdi-react/MenuIcon';
interface UserTopbarProps {
    onClick: () => void,
    onClose: () => void,
    onDelete?: (id : number) => void,
    onEdit: () => void,
    editUserData: User;
}

const UserTopbar = ({ onClick, onClose, onDelete, editUserData, onEdit }: UserTopbarProps) => (
    <div className="chat__topbar">
        <button className="chat__topbar-button chat__topbar-button--menu" type="button" onClick={onClick}>
            <MenuIcon className="chat__topbar-button-icon" />
        </button>
        {editUserData
            && (
                <div className="chat__topbar-contact">
                    <p className="chat__topbar-contact-name">{editUserData.first_name}{" "}{editUserData.last_name}</p>
                    <p className="chat__topbar-contact-post">{editUserData.email}</p>
                </div>
            )}
        <div className="chat__topbar-right text-right">
            {editUserData && <Button className="mr-2" type="danger" shape="circle" icon="delete" size={'default'} onClick={(e) => onDelete(editUserData.id)} />}
            {editUserData && <Button className="mr-2" type="default" shape="circle" icon="edit" size={'default'} onClick={(e) => onEdit()} />}
            <Button className="" type="default" shape="circle" icon="plus" size={'default'} onClick={(e) => onClose()} />
        </div>
    </div>
);

export default UserTopbar;
