import axios from 'axios';

import {PackStateType} from '../store/reducers/packListReducer';

export type LoginDataType = {
	email: string,
	password: string,
	rememberMe: boolean
}

export type AuthResponseType = {
	_id: string;
	email: string;
	name: string;
	avatar?: string;
	publicCardPacksCount: number;
// количество колод
	created: '';
	updated: '';
	isAdmin: boolean;
	verified: boolean; // подтвердил ли почту
	rememberMe: boolean;
	error?: string;
}

export type AuthResponseError = {
	emailRegExp: {}
	error: string
	in: string
	isEmailValid: boolean
	isPassValid: boolean
	passwordRegExp: string
}

export type ChangeProfileType = {
	name?: string
	avatar?: string
}

export type GetParamsType = {
	packName?: string
	min?: number
	max?: number
	sortPacks?: string
	page?: number
	pageCount?: number
	user_id?: string
}

export type NewCardsPack = {
	name?: string
	deckCover?: string
	private?: boolean
}


export type PutResponseType = {
	token: '1a50f000-fe30-11ec-a794-9994a5d7f3bf'
	tokenDeathTime: 1657829109504
	updatedUser: AuthResponseType
}

export type PutParamsPackNameType = {
	_id: string
	name: string
}

const instance = axios.create({
	// process.env.REACT_APP_BACK_URL || для gh-page
	// https://neko-back.herokuapp.com/2.0/ для gh-page
	// baseURL: 'http://localhost:7542/2.0/',
	baseURL: 'https://neko-back.herokuapp.com/2.0/',
	withCredentials: true,
});



export const API = {

	login(data: LoginDataType) {
		return instance.post<AuthResponseType>('auth/login', data);
	},
	register(data: {email: string, password: string}) {
		return instance.post<AuthResponseType>('auth/register', data);
	},
	me() {
		return instance.post<AuthResponseType>('auth/me', {});
	},
	changeProfile(data: ChangeProfileType) {
		return instance.put<PutResponseType>('auth/me', data);
	},
	logOut() {
		return instance.delete('auth/me');
	},
};


export const apiPack = {
	getCards(params?: GetParamsType) {
		return instance.get<PackStateType>('cards/pack', {params});
	},

	postCards(cardsPack: NewCardsPack) {
		return instance.post<PackStateType>('cards/pack', {cardsPack});
	},

	deletePack(idPack: string) {
		return instance.delete<PackStateType>('cards/pack', {params:{id: idPack}});
	},
	putPackName(cardsPack: PutParamsPackNameType) {
		return instance.put('cards/pack', {cardsPack});
	},
};

export type GetCardsCardParamsType = {
	cardAnswer?: string
	cardQuestion?: string
	cardsPack_id?: string
	min?: number
	max?: number
	sortCards?: string
	page?: number
	pageCount?: number
}

export type GetCardsCardType = {
	cards: Array<CardsType>
	cardsTotalCount: number
	maxGrade: number
	minGrade: number
	page: number
	pageCount: number
	packUserId: string
}

export type CardsType = {
	answer: string
	answerImg: string
	answerVideo: string
	cardsPack_id: string
	comments: string
	created: string
	grade: number
	more_id: string
	question: string
	questionImg: string
	questionVideo: string
	rating: number
	shots: number
	type: string
	updated: string
	user_id: string
	__v: number
	_id: string
}


export type PostCardParamsType = {
	cardsPack_id: string
	_id?: string
	question?: string
	answer?: string
	grade?: number
	shots?: number
	answerImg?: string
	questionImg?: string
	questionVideo?: string
	answerVideo?: string
}

export const apiCard = {
	getCardsPack(params?: GetCardsCardParamsType) {
		return instance.get<GetCardsCardType>('cards/card', {params});
	},
	postNewCard(params: PostCardParamsType) {
		return instance.post<CardsType>('cards/card', {card: params});
	},
	removeCard(id: string) {
		return instance.delete(`cards/card?id=${id}`);
	},
	updateCard(params: PostCardParamsType) {
		return instance.put('cards/card', {card: params});
	},
};