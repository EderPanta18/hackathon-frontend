import "server-only";

// Backend
export { getBackendApiUrl } from "./backend.server";

// Seguridad
export {
    getAccessTokenVerificationSource,
    getDevAuthVerificationSource,
    DEV_AUTH_ISSUER,
} from "./security.server";

// JWT
export { verifyAccessJwt } from "./jwt.server";
export type { JwtVerificationResult } from "./jwt.server";

// Sesión
export {
    resolveRequestSession,
    getServerSession,
    requireServerSession,
} from "./session.server";

export type { Session, SessionState, SessionStatus } from "./session.server";
