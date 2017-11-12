export const config = {
    city: {
        width: 60,
        height: 30,
        streetCoverage: 1 / 4,
        densityRadius: 0,
    },
    square: {
        chance: {
            single: 1,
            intersection: 3,
        },
        densityBase: {
            single: 1,
            intersection: 0.5,
        },
    },
    general: {
        buildLive: true,
        tickDuration: 1,
    },
};
