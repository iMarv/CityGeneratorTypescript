export const config = {
    city: {
        width: 30,
        height: 15,
        streetCoverage: 1 / 3,
        densityRadius: 2,
    },
    square: {
        chance: {
            single: 10,
            intersection: 30,
        },
        densityBase: {
            single: 1,
            intersection: 0.5,
        },
    },
    general: {
        buildLive: true,
        tickDuration: 50,
    },
};
