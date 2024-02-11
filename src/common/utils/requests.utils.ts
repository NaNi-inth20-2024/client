const getJoinedQueryParams = (
    params: Record<string, string | number | boolean | null>,
) => {
    const paramsString = Object.entries(params)
        .filter(([name, value]) => Boolean(value))
        .map(([name, value]) => `${name}=${value}`)
        .join("&");

    return `?${paramsString}`;
};

export { getJoinedQueryParams };
