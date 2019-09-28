let filterYear = '2018';
$(document).ready(async () => {

    const birthdatyRequest = await fetch('birthdaty.json');
    const birthdaty = await birthdatyRequest.json();

    $('#fullpage').fullpage({
        anchors: ['block1', 'block2','block3', 'block4'],
        menu: '#menu',
        css3: true,
        scrollingSpeed: 1000
    });

    $('#ranger-yers-section-2').jRange({
        from: 2007,
        to: 2018,
        step: 1,
        scale: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
        format: '%s',
        width: 1000,
        showLabels: true,
        snap: true,
        onstatechange: (value) => {
            onChangeYear('map-section-2', value)
        }
    });

    onChangeYear('map-section-2', filterYear);

    $('#map-section-2 path').on('click', () => {
        const region = $(this).attr('title');
        goToChart(region);
    })
})

const setMapFillOpacity = (id) => {
    $(`#${id}`).find('svg').find('path').each((index, path) => {
        $(path).attr('fill-opacity', 0.01 * index);
    })

};

const goToChart = (region) => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgba(255,215,209, 0.6)',
                borderColor: '#000',
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0,
                data: [0, 10, 5, 2, 20, 30, 45]
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


//
// ymaps.ready(init);
//
// async function init() {
//
//     const perinatalsRequest = await fetch('perinatals.json');
//     const perinatals = await perinatalsRequest.json();
//
//     // Создание карты.
//     var myMap = new ymaps.Map("map-section-2", {
//         center: [69.642513,105.386271],
//         zoom: 3,
//         behaviors: ['default', 'scrollZoom']
//         },{
//             restrictMapArea: [[100, -10], [40,260]],
//             scrollZoomSpeed: 0,
//             dblClickZoomDuration: 0
//         }
//     );
//
//     let selectedRegionId = '';
//     let regions = new ymaps.ObjectManager();
//
//     const addRegions = (geojson) => {
//         if (regions) {
//             myMap.geoObjects.remove(regions);
//         }
//         const {features} = geojson;
//         regions = new ymaps.ObjectManager();
//         regions.add(features.map(feature => {
//             feature.id = feature.properties.iso3166;
//             feature.options = {
//                 strokeColor: '#ffffff',
//                 strokeOpacity: 0.3,
//                 fillColor: '#6961b0',
//                 fillOpacity: 0.8,
//                 hintCloseTimeout: 0,
//                 hintOpenTimeout: 0
//             };
//             return feature;
//         }));
//         myMap.geoObjects.add(regions);
//
//         regions.events
//             .add('mouseenter', function (e) {
//                 var id = e.get('objectId');
//                 regions.objects.setObjectOptions(id, {strokeWidth: 2});
//             }, this)
//             .add('mouseleave', function (e) {
//                 var id = e.get('objectId');
//                 if (selectedRegionId !== id) {
//                     regions.objects.setObjectOptions(id, {strokeWidth: 1});
//                 }
//             }, this)
//             .add('click', function (e) {
//                 var id = e.get('objectId');
//                 if (selectedRegionId) {
//                     regions.objects.setObjectOptions(selectedRegionId, {
//                         strokeWidth: 1,
//                         fillColor: '#6961b0'
//                     });
//                 }
//                 regions.objects.setObjectOptions(id, {strokeWidth: 2, fillColor: '#3B3781'});
//                 selectedRegionId = id;
//             }, this);
//     }
//
//     ymaps.borders.load('RU').then(addRegions);
//
//     // Загрузим регионы.
//     // ymaps.borders.load('001', {
//     //     //     lang: 'ru',
//     //     //     quality: 2
//     //     // }).then(function (result) {
//     //     //
//     //     //     // Создадим многоугольник, который будет скрывать весь мир, кроме заданной страны.
//     //     //     var background = new ymaps.Polygon([
//     //     //         [
//     //     //             [100, -10],
//     //     //             [40, -10],
//     //     //             [40,260],
//     //     //             [100,260],
//     //     //         ]
//     //     //     ], {}, {
//     //     //         fillColor: '#fff',
//     //     //         strokeWidth: 0,
//     //     //         // Для того чтобы полигон отобразился на весь мир, нам нужно поменять
//     //     //         // алгоритм пересчета координат геометрии в пиксельные координаты.
//     //     //         coordRendering: 'shortestPath'
//     //     //     });
//     //     //
//     //     //     // Найдём страну по её iso коду.
//     //     //     var region = result.features.filter(function (feature) { return feature.properties.iso3166 == 'RU'; })[0];
//     //     //
//     //     //     // Добавим координаты этой страны в полигон, который накрывает весь мир.
//     //     //     // В полигоне образуется полость, через которую будет видно заданную страну.
//     //     //     var masks = region.geometry.coordinates;
//     //     //     masks.forEach(function(mask){
//     //     //         background.geometry.insert(1, mask);
//     //     //     });
//     //     //
//     //     //     // Добавим многоугольник на карту.
//     //     //     myMap.geoObjects.add(background);
//     //     // })
//
//     let perinatalsObjects = null;
//     const addObjectsToMap = () => {
//
//         if (perinatalsObjects) {
//             myMap.geoObjects.remove(perinatalsObjects);
//         }
//
//         perinatalsObjects = new ymaps.ObjectManager();
//         const startTime = new Date(filterYear).getTime() / 1000;
//         if (perinatals) {
//
//             const objects = {
//                 type: "FeatureCollection",
//                 features: [],
//             }
//
//             perinatals.filter(perinatal => {
//                 const {start} = perinatal;
//                 return start <= startTime;
//             }).forEach((perinatal, index) => {
//                 const {latitude, longitude, name, address, end, start} = perinatal;
//
//                 objects.features.push({
//                     type: "Feature",
//                     id: index,
//                     geometry: {"type": "Point", "coordinates": [longitude, latitude]},
//                     properties: {
//                         balloonContent: `${name} - ${address}`,
//                         // "balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>",
//                         // "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>",
//                         // "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>",
//                         // "clusterCaption": "<strong><s>Еще</s> одна</strong> метка",
//                         // "hintContent": "<strong>Текст  <s>подсказки</s></strong>"
//                     }
//                 })
//             });
//
//             myMap.geoObjects.add(perinatalsObjects);
//             perinatalsObjects.add(objects);
//         }
//     }
//     $('.ymaps-2-1-74-controls__control, .ymaps-2-1-74-controls__toolbar, .ymaps-2-1-74-copyright, iframe').remove();
//     $('#ranger-yers-section-2').jRange({
//         from: 2007,
//         to: 2018,
//         step: 1,
//         scale: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
//         format: '%s',
//         width: 1000,
//         showLabels: true,
//         snap: true,
//         onstatechange: (value) => {
//             filterYear = value;
//             addObjectsToMap();
//         }
//     });
//     addObjectsToMap();
// }


