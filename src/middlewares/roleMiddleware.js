const roleHierarchy = {
    admin: 3,
    author: 2,
    reader: 1
};

const authorizeRoles = (minimumRole) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (roleHierarchy[req.user.role] < roleHierarchy[minimumRole]) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        next();
    };
};

export default authorizeRoles;