import {useCallback, useReducer, type FormEvent} from 'react';

type ValidationMessages = Record<
	string,
	Partial<Record<keyof ValidityState, string>>
>;

type UseFormOptions = {
	validationMessages: ValidationMessages;
	onSubmit: (data: FormData) => void | Promise<unknown>;
};

type ActionType =
	| {type: 'submit'}
	| {type: 'submit-success'}
	| {type: 'submit-error'}
	| {type: 'invalid'; message: string}
	| {type: 'valid'};

const initialState = {
	isValid: false,
	isSubmitting: false,
	isSubmitted: false,
	isSubmitSuccessful: false,
	message: '',
};

type State = typeof initialState;

function reducer(state: State, action: ActionType) {
	switch (action.type) {
		case 'submit': {
			return {...state, isSubmitting: true, isValid: true};
		}

		case 'valid': {
			return {...state, isValid: true};
		}

		case 'invalid': {
			return {
				...state,
				isSubmitting: false,
				isValid: false,
				message: action.message,
			};
		}

		case 'submit-success': {
			return {...state, isSubmitting: false, isSubmitSuccessful: true};
		}

		case 'submit-error': {
			return {...state, isSubmitting: false, isSubmitSuccessful: true};
		}

		default: {
			return state;
		}
	}
}

function isInputField(
	element: unknown,
): element is HTMLInputElement | HTMLTextAreaElement {
	return (
		element instanceof HTMLInputElement ||
		element instanceof HTMLTextAreaElement
	);
}

type ValidateSuccess = {
	valid: true;
};

type ValidateError = {
	valid: false;
	inputField: HTMLInputElement | HTMLTextAreaElement;
	message: string;
};

type ValidateResult = ValidateSuccess | ValidateError;

function validateField(
	form: HTMLFormElement,
	field: string,
	messages: ValidationMessages,
): ValidateResult {
	const inputField = form.elements.namedItem(field);

	if (isInputField(inputField)) {
		let message = '';
		if (inputField.validity.valueMissing) {
			message = messages[field].valueMissing ?? '';
		}

		inputField.setCustomValidity(message);

		return {
			valid: inputField.validity.valid,
			inputField,
			message: inputField.validationMessage,
		};
	}

	return {valid: true};
}

function validateForm(
	form: HTMLFormElement,
	messages: ValidationMessages,
): ValidateResult {
	const valid = form.checkValidity();

	if (valid) {
		return {valid};
	}

	const invalidInput = Object.keys(messages).find((fieldName) => {
		const inputField = form.elements.namedItem(fieldName);

		return isInputField(inputField) && !inputField.validity.valid;
	});

	if (invalidInput) {
		return validateField(form, invalidInput, messages);
	}

	return {valid: true};
}

function useForm({onSubmit, validationMessages}: UseFormOptions) {
	const [formState, dispatch] = useReducer(reducer, initialState);

	const handleSubmit = useCallback(
		async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			dispatch({type: 'submit'});

			const result = validateForm(event.currentTarget, validationMessages);

			if (result.valid) {
				const formData = new FormData(event.currentTarget);

				try {
					await onSubmit(formData);
					dispatch({type: 'submit-success'});
				} catch (error: unknown) {
					dispatch({type: 'submit-error'});
					console.log(error);
				}
			} else {
				dispatch({type: 'invalid', message: result.message});
				result.inputField.focus();
			}
		},
		[dispatch, onSubmit, validationMessages],
	);

	const handleBlur = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			if (isInputField(event.target)) {
				const result = validateField(
					event.currentTarget,
					event.target.name,
					validationMessages,
				);

				if (result.valid) {
					dispatch({type: 'valid'});
				} else {
					dispatch({type: 'invalid', message: result.message});
				}
			}
		},
		[dispatch, validationMessages],
	);

	return {
		handleBlur,
		handleSubmit,
		formState,
	};
}

export default useForm;
