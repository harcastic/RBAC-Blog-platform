
const roleHierarchy = {
    admin: 3,
    author: 2,
    reader: 1
};

const authorizedRoles = (minimumRole) => {
    return (req, res, next) => {
        if (roleHierarchy[req.user.role] < roleHierarchy[minimumRole]) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};

export default authorizedRoles;