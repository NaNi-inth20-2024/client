import { ChangeEvent, Dispatch, SetStateAction, FormEvent } from "react";

const getFormDataChangeHandler =
    <T>(setValue: Dispatch<SetStateAction<T>>) =>
    (property: keyof T) =>
    (event: ChangeEvent<HTMLInputElement>) =>
        setValue((prevState) => ({
            ...prevState,
            [property]: event.target.value,
        }));

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
};

export { getFormDataChangeHandler, handleSubmit };
