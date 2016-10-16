$(function() {
    const N = 2048;
    const Length = N * 2;

    var $field_fourth_b1 = $('#fourth-b1');
    var $field_fourth_b2 = $('#fourth-b2');
    var $field_fourth_button = $("#fourth-button");

    var chart = new CanvasJS.Chart("fourth-work", {
        zoomEnabled: true,
        animationEnabled: true,
        data: [{
            type: "spline",
            dataPoints: [{ x: 0, y: 0 }],
        }],
        legend: {
            cursor: "pointer",
            itemclick: function(e) {
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                chart.render();
            }
        }
    });
    chart.render();

    function drawGraph(data, number) {
        chart.options.data[number] = data;
        chart.render();
    };

    function clearGraph() {
        chart.options.data = [{
            type: "spline",
            dataPoints: [{ x: 0, y: 0 }],
        }];
        chart.render();
    };

    function random(min, max) {
        return Math.floor((Math.random() * max) + min);
    };

    function calculateFunction(B1, B2) {
        var result = [];
        for (var n = 0; n < Length; n++) {
            result[n] = {};
            result[n].x = n;
            result[n].y = B1 * Math.sin(2 * Math.PI * n / N) + calclateInterferenceFunction(n, B2);
        }
        return result;
    };

    function calclateInterferenceFunction(n, B2) {
        var result = 0;
        for (var j = 50; j < 70; j++) {
            result += Math.pow(-1, random(1, 2) - 1) * B2 * Math.sin(2 * Math.PI * n * j / N);
        }
        return result;
    };

    function MovingAverageSmoothing(array, K) {
        var middle = Math.floor(K / 2);
        result = [];
        for (var n = 0; n < middle; n++) {
            result[n] = array[n];
            result[Length - 1 - n] = array[Length - 1 - n];
        }
        for (var n = middle; n < Length - middle; n++) {
            var tempArr = array.slice(n, n + K);
            tempArr.sort(function(a, b) { return a.y - b.y; });
            var length = tempArr.length - 1;
            tempArr = tempArr.slice(1, length);
            result[n] = {
                x: n,
                y: Average(tempArr)
            };
        }
        return result;
    }

    function Average(array) {
        var result = 0;
        for (var n = 0; n < array.length; n++) {
            result += array[n].y;
        }
        return result / array.length;
    }

    function MedianFilteringSmoothing(array, K) {
        var middle = Math.floor(K / 2);
        result = [];
        for (var n = 0; n < middle; n++) {
            result[n] = array[n];
            result[Length - 1 - n] = array[Length - 1 - n];
        }
        for (var n = middle; n < Length - middle; n++) {
            var tempArr = array.slice(n, n + K);
            tempArr.sort(function(a, b) { return a.y - b.y; });
            result[n] = tempArr[middle];
        }
        return result;
    }

    function FourthDegreeParabolaSmoothing(array) {
        var result = [];
        for (var n = 0; n < 3; n++) {
            result[n] = array[n];
            result[Length - 1 - n] = array[Length - 1 - n];
        }
        for (var n = 3; n < Length - 3; n++) {
            result[n] = {};
            result[n].x = n;
            result[n].y = 1 / 231 * (5 * array[n - 3].y -
                30 * array[n - 2].y + 75 * array[n - 1].y +
                131 * array[n].y + 75 * array[n + 1].y -
                30 * array[n + 2].y + 5 * array[n + 3].y);
        }
        return result;
    }

    //Вычисление спектра
    const j = 1;

    function CalculateCosComponent(array) {
        var result = 0;
        for (var n = 0; n < Length; n++) {
            result += array[n].y * Math.cos(2 * Math.PI * j * n / N);
        }
        return 2 / N * result;
    }

    function CalculateSinComponent(array) {
        var result = 0;
        for (var n = 0; n < Length; n++) {
            result += array[n].y * Math.sin(2 * Math.PI * j * n / N);
        }
        return 2 / N * result;
    }

    function CalculateAmplitudeSpectrum(ACos, ASin) {
        return Math.sqrt(Math.pow(ACos, 2) + Math.pow(ASin, 2));
    }

    function CalculatePhaseSpectrum(ACos, Asin) {
        return Math.atan(Asin / ACos);
    }

    function Draw(id, points, name) {
        result = {
            dataPoints: points,
            type: "spline",
            showInLegend: true,
            name: name,
        };
        drawGraph(result, id);
    }

    function GetSpectrum(array) {
        var ASin = CalculateSinComponent(array);
        var ACos = CalculateCosComponent(array);
        return "Spectrum: A= " + CalculateAmplitudeSpectrum(ACos, ASin) +
            ", fi=" + CalculatePhaseSpectrum(ACos, ASin);
    }

    $field_fourth_button.click(function() {
        clearGraph();
        var b1 = +$field_fourth_b1.val();
        var b2 = +$field_fourth_b2.val();
        var baseFunction = calculateFunction(b1, b2);
        Draw(1, baseFunction, "Base function. " + GetSpectrum(baseFunction));
        var movingAverage = MovingAverageSmoothing(baseFunction, 7);
        Draw(2, movingAverage, "Moving average. " + GetSpectrum(movingAverage));
        var medianFiltering = MedianFilteringSmoothing(baseFunction, 7);
        Draw(3, medianFiltering, "Median filtering. " + GetSpectrum(medianFiltering));
        var fourthParabola = FourthDegreeParabolaSmoothing(baseFunction);
        Draw(4, fourthParabola, "Fourth Degree Parabola. " + GetSpectrum(fourthParabola));
    });
});