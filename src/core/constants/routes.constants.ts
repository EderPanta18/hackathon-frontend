// src/core/constants/routes.constants.ts

export const ROUTES = {
    public: {
        root: "/",
        login: "/login",
        demo: "/demo",
    },
    shared: {
        accessDenied: "/acceso-denegado",
    },
    comuna: {
        root: "/comuna",
    },
    ong: {
        root: "/ong",
    },
    brigada: {
        root: "/brigada",
    },
    defensaCivil: {
        root: "/defensa-civil",
    },
} as const;
