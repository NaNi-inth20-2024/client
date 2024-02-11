const getJoinedQueryParams = (
    params: Record<string, string | number | boolean | null>,
) => {
    const paramsString = Object.entries(params)
        .filter(([, value]) => Boolean(value) && value !== "0")
        .map(([name, value]) => `${name}=${value}`)
        .join("&");

    return `?${paramsString}`;
};

export { getJoinedQueryParams };
