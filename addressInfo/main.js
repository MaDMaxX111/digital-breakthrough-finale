let filterYear = '2018';
let birthdaty = [];
let effectivnost = [];
let smertnost = [];
let currentSlide = 'birth';

const slidesTitle = {
    birth: 'Рождаемость',
    smert: 'Смертность',
    effectivnost: 'Эффективность',
}

$(document).ready(async () => {

    const birthdatyRequest = await fetch('birthdaty.json');
    const birthdatyData = await birthdatyRequest.json();
    birthdaty = Object.keys(birthdatyData).map(key => {
        return {
            ...birthdatyData[key],
        }
    })

    const effectivnostRequest = await fetch('effectivnost.json');
    const effectivnostData = await effectivnostRequest.json();
    effectivnost = Object.keys(effectivnostData).map(key => {
        return {
            ...effectivnostData[key],
        }
    })

    const smertnostRequest = await fetch('smertnost.json');
    const smertnostData = await smertnostRequest.json();
    smertnost = Object.keys(smertnostData).map(key => {
        return {
            ...smertnostData[key],
        }
    })

    $('#fullpage').fullpage({
        anchors: ['block1', 'block2', 'block3','block4'],
        menu: '#menu',
        css3: true,
        scrollingSpeed: 1000
    });

    const startYear = 2007;
    $('#ranger-yers-section-2').jRange({
        from: 2007,
        to: 2024,
        step: 1,
        scale: Array.from({length: 18}).map((index, i) => startYear + i),
        format: '%s',
        width: 1000,
        showLabels: true,
        snap: true,
        onstatechange: (value) => {
            onChangeYear('map-section-2', value)
        }
    });

    const onChangeSlide = (slide) => {
        $('.maps').attr('data-slide', slide);
        $('.maps h2').html(slidesTitle[slide]);
        $('#chart h2').html(slidesTitle[slide]);
        onChangeYear('map-section-2', filterYear);
    }


    $('[data-href]').on('click', (e) => {
        $(e.target).parent().find('.active').removeClass('active');
        $(e.target).addClass('active');
        currentSlide = $(e.target).attr('data-href');
        if (currentSlide == 'effectivnost'){
            $('#chart').hide();
        } else {
            $('#chart').show();
        }
        onChangeSlide(currentSlide);
    })

    // устанавливаем текущий слайдер
    $('[data-href="'+ currentSlide +'"]').trigger('click');

    onChangeYear('map-section-2', filterYear);

    $('#map-section-2 path').on('click', (e) => {
        if (currentSlide === 'effectivnost') return;
        const region = $(e.target).attr('title');
        goToChartBirthByYear(region);
    })

    // строим график показания эффективности
    if (effectivnost) {
        createEffectivnostChar(effectivnostData, 'сhartEffectivnost');
    }
})

const onChangeYear = (mapId, filterYear) => {
    let data = [];
    switch (currentSlide) {
        case 'birth':
            // выборка данных
            data = birthdaty;
            break;
        case 'smert':
            // выборка данных
            data = smertnost;
            break;
        case 'effectivnost':
            data = effectivnost;
            break;
        default:
            break;
    }
    let filteredData = [];
    if (currentSlide !== 'effectivnost') {
        filteredData = Object.keys(data).map(okato => {
            return {
                region: data[okato]['region'],
                data: data[okato][filterYear],
                year: filterYear,
            }
        })
    } else {
        filteredData = Object.keys(data).map(okato => {
            return {
                region: data[okato]['region'],
                data: data[okato]['efficiency'],
            }
        });

    }
    setMapFillOpacity($(`#${mapId} svg`), filteredData);
}

const setMapFillOpacity = (svgMap, data) => {
    data.sort((a,b) => {
        if (a.data < b.data) {
            return -1;
        }
        if (a.data > b.data) {
            return 1;
        }
        return 0;
    })

    const MaxData = data[data.length - 1].data; // 1
    const MinData = data[0].data; // 0.3
    const a = (MaxData - MinData) / 0.7;
    const b = MinData - 0.3*a;

    const getDataRegion = (title) => {
        const regData = data.find(region => region.region == title);
        if (regData) {
            const coefOpacity = (regData.data - b) / a;
            return coefOpacity
        }

        return null;
    }

    svgMap.find('path').each((index, path) => {
        const title = $(path).attr('title');
        const coefOpacity = getDataRegion(title);
        $(path).removeAttr('style');
        if (coefOpacity) {
            $(path).attr('fill-opacity', coefOpacity);
        } else {
            $(path).attr('fill-opacity', 1);
            $(path).css('fill', '#e3f1ff');
        }
    })

    // toolptips
    $('svg path').on('mouseenter', (e) => {
        const element = $(e.target);
        const title = element.attr('title');
        if (!$('#tooltip').length) {
            $('body').append(`<span id="tooltip" class="tooltip" style="display: none; position:fixed;">${title}</span>`);
        } else {
            $('#tooltip').html(`${title}`);
        }
        $('#tooltip').show();
    })

    $('svg path').on('mouseleave', () => {
        $('#tooltip').hide();
    })

    $('svg path').on('mousemove', (e) => {
        const {pageX, pageY} = e; // положения по оси X
        $('#tooltip').css('top', pageX);
        $('#tooltip').css('left', pageY);
    })

};

const goToChartBirthByYear = (region) => {
    let data = [];

    if (currentSlide === 'birth') {
        data = birthdaty.find(r => {
            return r && r.region == region;
        })
    }

    if (currentSlide === 'smert') {
        data = smertnost.find(r => {
            return r && r.region == region;
        })
    }
    if (!data) return;
    delete data['region'];
    delete data['code'];
    var ctx = document.getElementById('myChart').getContext('2d');

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: Object.keys(data).map(key => key),
            datasets: [{
                label: region,
                backgroundColor: 'rgba(255,215,209, 0.6)',
                borderColor: '#000',
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0,
                data: Object.keys(data).map(key => data[key] > 0 ? data[key] : 0),
            }]
        },
        // Configuration options go here
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    }
                }]
            }
        }
    });

    fullpage_api.moveTo(3);
}

const createEffectivnostChar =(data, idCanvas) => {

    var ctx = document.getElementById(idCanvas).getContext('2d');

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: data.map(d => d['region']),
            datasets: [{
                label: 'Эффективность',
                backgroundColor: data.map(d => {

                    if (d['efficiency'] > 40000) {
                         return 'rgb(178,244,198)';
                    }

                    if (d['efficiency'] < 10000) {
                        return 'rgb(227,241,255)';
                    }
                    return 'rgba(255,215,209, 0.6)';
                }),
                borderColor: '#000',
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0,
                data: data.map(d => d['efficiency']),
            }]
        },
        // Configuration options go here
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    }
                }]
            }
        }
    });
}

