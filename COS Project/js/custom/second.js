$(function() {
    const N = 2048;


    var $field_second_k = $('#second-k');
    var $field_second_fi = $('#second-fi');
    var $field_second_button = $("#second-button");

    var chart = new CanvasJS.Chart("second-work", {
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

    function calculateFunction(M, fi) {
        var result = [];
        for (var n = 0; n < M; n++) {
            result[n] = {};
            result[n].x = n;
            result[n].y = Math.sin(2 * Math.PI * n / N + fi);
        }
        return result;
    };

    function calculateAverageByAFunction(array) {
        var result = 0;
        for (var i = 0; i < array.length; i++) {
            result += Math.pow(array[i].y, 2);
        }
        return Math.sqrt(1 / (array.length + 1) * result);
    };

    function calculateAverageByBFunction(array) {
        var squareSum = 0;
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            squareSum += Math.pow(array[i].y, 2);
            sum += array[i].y;
        }
        sum = Math.pow(1 / (array.length + 1) * sum, 2);
        squareSum = 1 / (array.length + 1) * squareSum;
        return Math.sqrt(squareSum - sum);
    }

    const j = 1;

    function calculateCosComponent(array) {
        var result = 0;
        for (var n = 0; n < array.length; n++) {
            result += array[n].y * Math.cos(2 * Math.PI * j * n / array.length);
        }
        return 2 / array.length * result;
    }

    function calculateSinComponent(array) {
        var result = 0;
        for (var n = 0; n < array.length; n++) {
            result += array[n].y * Math.sin(2 * Math.PI * j * n / array.length);
        }
        return 2 / array.length * result;
    }

    function calculateAmplitude(array) {
        var ACos = calculateCosComponent(array);
        var ASin = calculateSinComponent(array);
        return Math.sqrt(Math.pow(ACos, 2) + Math.pow(ASin, 2));
    }

    function AverageAccuracy(value) {
        return 0.707 - value;
    }

    function AmplitudeAccuracy(value) {
        return 1 - value;
    }

    function calcualteFunctions(K, fi) {
        const intervalCount = 100;
        var result = [];
        var interval = (2 * N - K * N) / 100;
        for (var i = 0; i < intervalCount; i++) {
            var M = K * N + interval * i;
            result[i] = {
                M: M,
                values: calculateFunction(M, fi)
            };
            result[i].averageA = calculateAverageByAFunction(result[i].values);
            result[i].averageB = calculateAverageByBFunction(result[i].values);
            result[i].amplitude = calculateAmplitude(result[i].values);
            result[i].averageAAccuracy = AverageAccuracy(result[i].averageA);
            result[i].averageBAccuracy = AverageAccuracy(result[i].averageB);
            result[i].ampliudeAccuracy = AmplitudeAccuracy(result[i].amplitude);

        }
        return result;
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

    $field_second_button.click(function() {
        var K = +$field_second_k.val();
        var fi = +$field_second_fi.val();
        if (fi == null)
            fi = 0;
        var result = calcualteFunctions(K, fi);
        var avAfuncArray = result.map(function(item) {
            return { x: item.M, y: item.averageAAccuracy };
        });
        var avBfuncArray = result.map(function(item) {
            return { x: item.M, y: item.averageBAccuracy };
        });
        var avAmplArray = result.map(function(item) {
            return { x: item.M, y: item.ampliudeAccuracy };
        });
        Draw(1, avAfuncArray, "Accuracy of Average Value by A function");
        Draw(2, avBfuncArray, "Accuracy of Average Value by B function");
        Draw(3, avAmplArray, "Accuracy of Amplitude");
    });

});