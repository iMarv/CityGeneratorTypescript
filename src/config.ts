export const config = {
    city: {
        width: 15,
        height: 15,
        streetCoverage: 1 / 3,
        densityRadius: 5,
    },
    square: {
        chance: {
            single: 10,
            intersection: 100,
        },
        densityBase: {
            single: 0.5,
            intersection: 1,
        },
    },
    general: {
        buildLive: true,
    },
};
