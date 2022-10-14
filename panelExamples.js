function getPanelLayout1() {
    return [
        {
            roof: 1,
            block: 0,
            panelID: 12345,
            orientation: 'portrait',
            layout: [
                [1, 1, 1, 1],
                [1, 0, 1, 1]
            ]
        },
        {
            roof: 1,
            block: 1,
            panelID: 12345,
            orientation: 'portrait',
            layout: [
                [1, 1, 1],
                [0, 1, 1]
            ]
        },
    ];
}

module.exports = {getPanelLayout1};