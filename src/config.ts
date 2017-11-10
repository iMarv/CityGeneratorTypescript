export const config = {
    city: {
        width: 20,
        height: 20,
        streetCoverage: 1 / 3,
        densityRadius: 5,
    },
    square: {
        chance: {
            single: 10,
            intersection: 75,
        },
        densityBase: {
            single: 0.75,
            intersection: 1,
        },
    },
    general: {
        buildLive: true,
    },
};
