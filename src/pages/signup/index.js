import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, Input, Icon } from 'antd';
import 'antd/es/input/style/css';
import 'antd/es/checkbox/style/css';
import 'antd/es/button/style/css';
import 'antd/es/form/style/css';
import 'antd/es/icon/style/css';

import AuthStyledWrapper from './index.style';
import { INDEX_URL } from '../../constants/route';
import authActions from '../../redux/auth/actions';
import { formHasErrors, getFieldOption } from  '../../utils';
import { signup } from '../../api';

const { loginSuccess } = authActions

const SignupPage = ({isLogged = false, form, loginSuccess}) => {

    const { getFieldDecorator, getFieldsError, validateFieldsAndScroll, validateFields } = form;

    useEffect(() => {
        validateFields();
    }, [validateFields]);

    const [confirmDirty, setConfirmDirty] = useState(false);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const result = await signup(values);
                if (result) {
                    loginSuccess();
                }
            }
        });
    }

    const validateToNextPassword = (rule, value, callback) => {
        if (value && confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
            callback('Пароли должны совпадать!');
        } else {
            callback();
        }
    }

    const handleConfirmBlur = (e) => {
        const { value } = e.target;
        setConfirmDirty(confirmDirty || !!value)
    }

    return isLogged ? <Redirect to={INDEX_URL} /> :
        <AuthStyledWrapper className="isoSignInPage">
            <div className="isoLoginContentWrapper">
                <div className="isoLoginContent">
                    <div className="isoLogoWrapper">
                        {'Зарегистрироваться'}
                    </div>
                    <Form layout="inline" className={'isoSignInForm'} onSubmit={handleOnSubmit}>
                        <Form.Item className={'isoInputWrapper'} {...getFieldOption('email', form)}>
                            {getFieldDecorator('email', {
                                rules: [{
                                    required: true,
                                    type: 'email',
                                    message: 'Укажите Ваш E-Mail!'}],
                            })(
                                <Input
                                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="E-Mail"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item className={'isoInputWrapper'} {...getFieldOption('firstname', form)}>
                            {getFieldDecorator('firstname', {
                                rules: [{
                                    required: true,
                                    message: 'Укажите Ваше имя!',
                                }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Имя"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item className={'isoInputWrapper'} {...getFieldOption('surname', form)}>
                            {getFieldDecorator('surname', {
                                rules: [{
                                    required: true,
                                    message: 'Укажите Вашу фамилию!',
                                }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Фамилия"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item className={'isoInputWrapper'} {...getFieldOption('password', form)}>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Укажите Ваш пароль!',
                                    },
                                    {
                                        validator: validateToNextPassword,
                                    }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="Пароль"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item className={'isoInputWrapper'} {...getFieldOption('confirm', form)}>
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Пароли должны совпадать!',
                                    },
                                    {
                                        validator: compareToFirstPassword,
                                    },
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="Подтвердите пароль"
                                    onBlur={handleConfirmBlur}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item className={'isoInputWrapper isoLeftRightComponent'}>
                            <Button type="primary" htmlType="submit" disabled={formHasErrors(getFieldsError())}>
                                {'Зарегистрироваться'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </AuthStyledWrapper>
}

const SignupPageForm = Form.create()(SignupPage);

export default connect(
    state => {
        const {Auth} = state;
        return {
            ...Auth
        }
    }, {
        loginSuccess,
    }
)(SignupPageForm);
