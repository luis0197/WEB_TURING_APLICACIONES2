import token from "./src/services/auth/jwt";


const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Acceso no autorizado. Falta el token de autenticación.",
            body: [],
        });
    }

    try {
        // Verifica el token
        const decodedToken = await token.verifyToken(token);
        
        if (!decodedToken) {
            return res.status(401).json({
                status: false,
                message: "Token de autenticación inválido o expirado.",
                body: [],
            });
        }

        // Almacena la información del usuario en el objeto de solicitud para su uso posterior
        req.user = decodedToken;

        // Continúa con la siguiente función de middleware
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Error en el servidor al verificar el token de autenticación: " + error,
            body: [],
        });
    }
};

export default authMiddleware;

