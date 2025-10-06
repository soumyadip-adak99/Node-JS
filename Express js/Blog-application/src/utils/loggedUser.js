export const getLoggedUser = (req) => {
    return req.user?.email || null;
}