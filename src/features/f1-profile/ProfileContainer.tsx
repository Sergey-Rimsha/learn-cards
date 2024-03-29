import {useState} from 'react';

import {AppDispatch, useAppSelector} from '../../store/store';

import {putProfile} from '../../store/reducers/profileReducer';

import {Profile} from './Profile';

export const ProfileContainer = () => {

	const dispatch = AppDispatch();
	const userData = useAppSelector(state => state.profile.userData);

	const [editMode, setEditMode] = useState<boolean>(false);

	const onClickEditMode = (edit: boolean) => {
		setEditMode(edit);
	};

	const onChangeProfile = (name?: string, avatar?: string) => {

		dispatch(putProfile({name, avatar}));
	};

	return (
		<>
			<Profile
				userData={userData}
				editMode={editMode}
				onChangeProfile={onChangeProfile}
				onClickEditMode={onClickEditMode}

			/>
		</>
	);
};