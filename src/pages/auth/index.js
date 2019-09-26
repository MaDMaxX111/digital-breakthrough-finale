import React, { useEffect } from 'react';
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
import { login } from '../../api';

const { loginSuccess } = authActions

const AuthPage = ({isLogged = false, form, loginSuccess}) => {

    const { getFieldDecorator, getFieldsError, validateFieldsAndScroll, validateFields } = form;

    useEffect(() => {
        validateFields();
    }, [validateFields]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const result = await login(values);
                if (result) {
                    loginSuccess();
                }
            }
        });
    }

    return isLogged ? <Redirect to={INDEX_URL} /> :
        <AuthStyledWrapper className="isoSignInPage">
            <div className="isoLoginContentWrapper">
                <div className="isoLoginContent">
                    <div className="isoLogoWrapper">
                        {'Войти'}
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
                        <Form.Item className={'isoInputWrapper'} {...getFieldOption('password', form)}>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: 'Укажите Ваш пароль!'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="Пароль"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item className={'isoInputWrapper isoLeftRightComponent'}>
                            <Button type="primary" htmlType="submit" disabled={formHasErrors(getFieldsError())}>
                                {'Войти'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </AuthStyledWrapper>
}

const AuthPageForm = Form.create()(AuthPage);

export default connect(
    state => {
        const {Auth} = state;
        return {
            ...Auth
        }
    }, {
        loginSuccess,
    }
)(AuthPageForm);
