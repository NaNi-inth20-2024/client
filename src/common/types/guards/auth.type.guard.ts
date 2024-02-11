type DataContainingResponseType<T> = { data: T };

const isSuccessfulResponseDto = <T>(
    obj: object,
): obj is DataContainingResponseType<T> =>
    Boolean((obj as DataContainingResponseType<T>).data);

export { isSuccessfulResponseDto };
