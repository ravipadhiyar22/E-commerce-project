export const asynchandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(
            fn(req, res, next)
        ).catch((err) => next(err))
    }
}








// export const asynchandler = (fn) => {
//     return async (req, res, next) => {
//         try {
//             await fn(req, res, next);

//         } catch (error) {
//             res.status(error.code || 500).json({
//                 message: error.message || "error in async handler",
//                 success: false
//             })
//         }
//     }

// }