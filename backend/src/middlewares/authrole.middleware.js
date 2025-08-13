export const authorizeRoles = (...allowedrole) => {
    return (req, res, next) => {

        const role = req.user?.role;
        if (!role || !allowedrole.includes(role)) {
            return res.status(403).json({ message: "Access denied. You do not have permission." });
        }
        console.log("varify admin done");
        next();
    }

}