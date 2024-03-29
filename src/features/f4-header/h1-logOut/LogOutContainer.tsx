import {useEffect, useState} from 'react';

import {AppDispatch, useAppSelector} from '../../../store/store';
import {LoadingStatusType} from '../../../store/reducers/appReducer';
import {logOut} from '../../../store/reducers/authReducer';

import {LogOut} from './LogOut';

export const LogOutContainer = () => {

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const loadingStatus = useAppSelector<LoadingStatusType>(state => state.app.status);

	const dispatch = AppDispatch();

	const profilePhoto = useAppSelector<string | undefined>(state => state.profile.userData.avatar);

	const onClickHandlerLogOut = () => {
		// (!isLoading)
		// && (dispatch(setActiveMenuItem('')))
		// && (dispatch(setLogOut()));

		dispatch(logOut());
	};


	useEffect(() => {
		if (loadingStatus === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	},[loadingStatus]);	
	return (
		<>
			<LogOut
				profilePhoto={profilePhoto}
				onClickHandlerLogOut={onClickHandlerLogOut}
			/>
		</>
	);
};