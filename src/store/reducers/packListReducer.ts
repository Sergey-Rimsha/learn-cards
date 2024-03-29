import {AppThunkType} from '../store';
import {apiPack, NewCardsPack, PutParamsPackNameType} from '../../api/Api';

import {setLoadingStatus} from './appReducer';

export type CardPacksType = {
	cardsCount: number
	created: string
	deckCover: string
	grade: number
	more_id: string
	name: string
	path: string
	private: boolean
	rating: number
	shots: number
	type: string
	updated: string
	user_id: string
	user_name: string
	__v: number
	_id: string
}

export type PackStateType = {
	cardPacks: Array<CardPacksType>
	cardPacksTotalCount: number
	maxCardsCount: number
	minCardsCount: number
	page: number
	pageCount: number
	token: string
	tokenDeathTime: number
	params: PackListParamsType
};

export type PackListParamsType = {
	userId: string
	max: number
	min: number
	packName: string
}

export type PackListActionType = ReturnType<typeof setPackList>
	| ReturnType<typeof setParamsPage>
	| ReturnType<typeof setParamsUserId>
	| ReturnType<typeof setParamsCardsCount>
	| ReturnType<typeof setParamsSearchPackName>

const initialState: PackStateType = {
	cardPacks: [{
		cardsCount: 0,
		created: '2022-06-06T19:47:45.032Z',
		deckCover: 'url or base64',
		grade: 0,
		more_id: '62990963ddc3d312d8d3a864',
		name: 'NEW PACK NAME',
		path: '/def',
		private: false,
		rating: 0,
		shots: 0,
		type: 'pack',
		updated: '2022-06-06T19:47:49.718Z',
		user_id: '62990963ddc3d312d8d3a864',
		user_name: 'qwerty1044@mail.ru',
		__v: 0,
		_id: '629e59e17cbffe0004d99dd4',
	}],
	cardPacksTotalCount: 5087,
	maxCardsCount: 103,
	minCardsCount: 0,
	page: 1,
	pageCount: 8,
	token: '27777e20-e5d5-11ec-a71b-af6a6d5de3fe',
	tokenDeathTime: 1655151219458,
	params: {
		userId: '',
		max: 110,
		min: 0,
		packName: '',
	},
};

export const packListReducer = (state = initialState, acton: PackListActionType): PackStateType => {
	switch (acton.type) {
		case 'PACK/SET-PACK_LIST': {
			return {
				...state,
				...acton.data,
			};
		}
		case 'PACK/SET-PARAMS_PAGE': {
			return  {
				...state,
				page: acton.page,
				pageCount: acton.pageCount,
			};
		}
		case 'PACK/SET-PARAMS_USERID': {
			return {
				...state,
				params: {
					...state.params,
					userId: acton.userId,
				},
			};
		}
		case 'PACK/SET-PARAMS_CARDS-COUNT': {
			return {
				...state,
				params: {
					...state.params,
					max: acton.max,
					min: acton.min,
				},
			};
		}
		case 'PACK/SET-PARAMS_SEARCH-PACK_NAME': {
			return {
				...state,
				params: {
					...state.params,
					packName: acton.packName,
				},
			};
		}

		default: return state;
	}
};

// action creator
export const setPackList = (data: PackStateType) => {
	return {
		type: 'PACK/SET-PACK_LIST',
		data,
	} as const;
};

// change params Pagination CurrentPage and PageCount
export const setParamsPage = (pageCount: number, page: number) => {
	return {
		type: 'PACK/SET-PARAMS_PAGE',
		pageCount,
		page,
	} as const;
};

export const setParamsUserId = (userId: string) => {
	return {
		type: 'PACK/SET-PARAMS_USERID',
		userId,
	} as const;
};

export const setParamsCardsCount = (min: number, max: number) => {
	return {
		type: 'PACK/SET-PARAMS_CARDS-COUNT',
		min,
		max,
	} as const;
};

export const setParamsSearchPackName = (packName: string) => {
	return {
		type: 'PACK/SET-PARAMS_SEARCH-PACK_NAME',
		packName,
	} as const;
};

// thunk creators!!!
export const getCardsPacks = ():AppThunkType => (dispatch, getState) => {
	dispatch(setLoadingStatus('loading'));

	const user_id = getState().packList.params.userId;
	const {pageCount, page} = getState().packList;
	const {min, max, packName} = getState().packList.params;

	const params = {
		user_id, pageCount, page, max, min, packName,
	};

	apiPack.getCards(params)
		.then(res => {
			// console.log(res.data);
			dispatch(setPackList(res.data));
		})
		.catch(err => {
			// console.log(err);
		})
		.finally(() => {
			dispatch(setLoadingStatus('idle'));
		});
};

export const addedPackTC = (data: NewCardsPack): AppThunkType => (dispatch) => {
	dispatch(setLoadingStatus('loading'));
	apiPack.postCards(data)
	.then(res => {
		// console.log(res);
		dispatch(getCardsPacks());
	})
	.catch(err => {
		// console.log(err);
	})
	.finally(() => {
		dispatch(setLoadingStatus('idle'));
	});
};

export const delCardsPack = (id: string):AppThunkType => (dispatch) => {

	dispatch(setLoadingStatus('loading'));

	apiPack.deletePack(id)
		.then((res) => {
			dispatch(getCardsPacks());
		})
		.catch((err) => {
			// console.log(err);
		})
		.finally(() => {
			dispatch(setLoadingStatus('idle'));
		});
};

export const editePackName = (params: PutParamsPackNameType):AppThunkType => (dispatch) => {
	dispatch(setLoadingStatus('loading'));

	apiPack.putPackName(params)
		.then(res => {
			dispatch(getCardsPacks());
		})
		.catch(err => {
			console.log(err);
		})
		.finally(() => {
			dispatch(setLoadingStatus('idle'));
		});
};