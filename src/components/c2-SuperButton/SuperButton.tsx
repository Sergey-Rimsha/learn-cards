import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';

import s from './SuperButton.module.scss';

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
	red?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
	{
		red, className,
		...restProps// все остальные пропсы попадут в объект restProps, там же будет children
	},
) => {
	// const finalClassName = `${red ? s.red : s.default} ${className}`;

	const finalClassName = `${className ? className : s.button__default} 
        ${red ? s.button__default_error : ''}`;

	return (
		<div className={s.button}>
			<button
				className={finalClassName}
				{...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
			/>
		</div>
	);
};

export default SuperButton;
