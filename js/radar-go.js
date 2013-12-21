(function(Raphael, impress) {
    var cardTypes = {
            language: 'language',
            platform: 'platform',
            technique: 'technique',
            tool: 'tool'
        },
        cardColors = {
            language: 'rgb(183,0,98)',
            platform: 'rgb(220,110,28)',
            technique: 'rgb(143,162,39)',
            tool: 'rgb(87,115,133)'
        };
    var width = 1000,
        height = 1000,
        sectorNameOffset = 100,
        sectorNameFontSize = 24,
        levelNameFontSize = 24;
    var radar = Raphael('radar', width, height);

    drawRadarBackground();
    drawRadarSectorNames();
    drawRadarLevelNames();

    drawCard('Reactive Language\nExtensions', cardTypes.language, 600, 650, 2);
    drawCard('Backend-as-a-service', cardTypes.platform, 400, 780);
    drawCard('HTML5 Storage\nInstead of Cookies', cardTypes.technique, 420, 320, 2);
    drawCard('Web Components\nStandard', cardTypes.platform, 270, 700, 2);
    drawCard('SPDY', cardTypes.platform, 200, 560);
    var golangCardElem = drawCard('Go Language', cardTypes.language, 680, 550),
        golangStepId = 'radar-go';
    document.querySelector('#radar-go')
        .addEventListener('impress:stepenter', function() {
            highlightCard(golangCardElem, golangStepId);
        });

    impress().init();


    function drawRadarBackground() {
        var radarRadius = 450,
            radarAttrs = {
                stroke: 'white',
                'stroke-width': 5,
                fill: '#f0f0f0'
            };
        radar.circle(width / 2, height / 2, radarRadius).attr(radarAttrs);
        radar.circle(width / 2, height / 2, radarRadius * 6 / 7).attr(radarAttrs);
        radar.circle(width / 2, height / 2, radarRadius * 4 / 7).attr(radarAttrs);
        radar.circle(width / 2, height / 2, radarRadius * 2 / 7).attr(radarAttrs);
        radar.path('M' + (width / 2 - radarRadius) + ' 500' + ' H' + (width / 2 + radarRadius) + 'M500 ' + (height / 2 - radarRadius) + 'V' + (height / 2 + radarRadius))
            .attr(radarAttrs);
    }

    function drawRadarSectorNames() {
        radar.text(sectorNameOffset, sectorNameOffset, 'Techniques').attr({
            fill: cardColors[cardTypes.technique],
            'font-size': sectorNameFontSize,
            'font-weight': 'bold'
        });
        radar.text(sectorNameOffset, height - sectorNameOffset, 'Platforms').attr({
            fill: cardColors[cardTypes.platform],
            'font-size': sectorNameFontSize,
            'font-weight': 'bold'
        });
        radar.text(width - sectorNameOffset, sectorNameOffset, 'Tools').attr({
            fill: cardColors[cardTypes.tool],
            'font-size': sectorNameFontSize,
            'font-weight': 'bold'
        });
        radar.text(width - sectorNameOffset, height - sectorNameOffset, 'Languages &\nFrameworks').attr({
            fill: cardColors[cardTypes.language],
            'font-size': sectorNameFontSize,
            'font-weight': 'bold'
        });
    }

    function drawRadarLevelNames() {
        var levelTextAttrs = {
            fill: '#999999',
            'font-size': levelNameFontSize,
            'font-weight': 'bold',
            'font-style': 'italic'
        };
        radar.text(790, 200, 'Hold').attr(levelTextAttrs);
        radar.text(730, 280, 'Assess').attr(levelTextAttrs);
        radar.text(630, 360, 'Trial').attr(levelTextAttrs);
        radar.text(550, 450, 'Adopt').attr(levelTextAttrs);
    }

    function drawCard(name, type, x, y, lines) {
        var color = cardColors[type];
        var fontSize = 16;
        var yOffset = 20 + fontSize * ((lines || 1)-1) / 2;
        var card= radar.set();
        var circleElem = card.circleElem = radar.circle(x, y, 10);
        var textElem = card.textElem = radar.text(x, y + yOffset, name);
        card.type = type;
        card.push(
            circleElem.attr({
                stroke: 'white',
                'stroke-width': 3,
                fill: color
            }),
            textElem.attr({
                fill: color,
                'font-size': fontSize,
                'font-weight': 'bold'
            })
        );
        return card;
    }

    function highlightCard(cardElem, stepId) {
        var duration = 1000;
        if(!document.body.classList.contains('impress-on-' + stepId)) {
            cardElem.circleElem.attr({stroke: 'white', fill: cardColors[cardElem.type]});
            return;
        }
        cardElem.circleElem.animate({stroke: 'red', fill: 'red'}, duration, 'linear', function() {
            cardElem.circleElem.animate({stroke: 'white', fill: 'yellow'}, duration, function() {
                highlightCard(cardElem, stepId);
            });
        });
    }
})(window.Raphael, window.impress);