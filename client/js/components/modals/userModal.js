import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserById } from '../../selectors/users';
import { getFormData, compareUserObject } from '../../utils';
import { Input, Select, Button } from '../../components/ui';
import { UsersActions } from '../../actions';

const { updateUser } = UsersActions;

class UserModal extends Component {
    constructor() {
        super();
        this.updateUser = this.updateUser.bind(this);
    }

    updateUser(id) {
        return (event) => {
            event.preventDefault();
            const data = getFormData(this.refs.form);

            if (compareUserObject(this.props.user, data)) {
                this.props.hideModal();
            } else if (data.blocked && data.role) {
                this.props.updateUser(id, data);
            }
        };
    }

    render() {
        const { user, hideModal } = this.props;
        const { id, username, email, blocked, role } = user;

        return (
            <div className="modal__in">
                <div className="modal__heading">Редактировать профиль пользователя</div>
                <form className="form" ref="form" onSubmit={ this.updateUser(id) }>
                    <Input type="text" name="username" label="Имя" value={ username } disabled />
                    <Input type="text" name="email" label="E-Mail" value={ email } disabled />
                    <Select name="blocked" label="Состояние" value={ blocked } options={[
                        { value: false, label: 'Активен' },
                        { value: true, label: 'Заблокирован' }
                    ]} />
                    <Select name="role" label="Роль" value={ role } options={[
                        { value: 'manager', label: 'Менеджер' },
                        { value: 'senior manager', label: 'Старшый менеджер' },
                        { value: 'admin', label: 'Администратор' }
                    ]} />
                    <div className="form__actions">
                        <Button icon="update" text="Обновить" />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    (state, props) => ({
        user: getUserById(state.users.list, props.userId)
    }),
    { updateUser }
)(UserModal);