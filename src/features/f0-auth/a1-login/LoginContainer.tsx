import React, {useEffect} from 'react';

import {useNavigate} from 'react-router-dom';

// import {AppDispatch} from '../../../store/store';
import {useFormik} from 'formik';

import {AppDispatch, useAppSelector} from '../../../store/store';

import {loginUserTC, setLoginError} from '../../../store/reducers/authReducer';

import {PATH} from '../../../app/Routing/Routing';

import {Login} from './login';


export type FormikLoginErrorType = {
	email?: string
	password?: string
	loginError?: string
}

export type FormikStateType = {
	email: string
	password: string
	toggle: boolean
	loginError: string
}


export const LoginContainer = () => {

	const navigate = useNavigate();
	const dispatch = AppDispatch();

	const isAuth = useAppSelector<boolean>(state => state.app.isAuth);
	const loginError = useAppSelector<string | undefined>(state => state.auth.loginError);

	useEffect(() => {
		if (isAuth) navigate(PATH.profile);
	}, [isAuth, navigate]);

	// редирект на если забыли пароль, recovery password
	const redirectLink = () => {
		navigate(PATH.recovery);
	};

	const navigateRegistration = () => {
		navigate(PATH.register);
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			toggle: false,
			loginError: '',
		},
		validate: (values) => {
			const errors: FormikLoginErrorType = {};
			if (!values.email) {
				errors.email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}

			if (!values.password) {
				errors.password = 'Пароль обязателен';
			} else if (values.password.length < 7) {
				errors.password = 'Пароль должен быть больше 7 символов';
			}

			if (loginError) {
				formik.errors.loginError = loginError;
			}

			return errors;
		},
		onSubmit: (values) => {
			const data = {
				email: values.email,
				password: values.password,
				rememberMe: values.toggle,
			};

			// dispatch ThunkCreator
			dispatch(loginUserTC(data));
		},
	});


	useEffect(() => {
		if (loginError) {
			formik.setErrors({loginError: loginError});
		}
		if (formik.touched.email || formik.touched.password) {
			dispatch(setLoginError(''));
		}
	}, [loginError, formik, dispatch]);


	return (
		<>
			<Login
				formikValue={formik.values}
				formikErrors={formik.errors}
				formikTouched={formik.touched}
				handleChange={formik.handleChange}
				handleSubmit={formik.handleSubmit}
				redirectLink={redirectLink}
				navigateRegistration={navigateRegistration}
			/>
		</>
	);
};

