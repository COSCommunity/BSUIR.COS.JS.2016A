window.onload = function() {
    var N = 512;
    var $fields_first_2a_fi = $('[id ^= first-2a-fi]');
    var $field_first_2a_A = $('#first-2a-A');
    var $field_first_2a_f = $("#first-2a-f");
    var $first_2a_button = $("#first-2a-button");

    var $field_first_2b_fi = $("#first-2b-fi");
    var $field_first_2b_A = $("#first-2b-A");
    var $fields_first_2b_f = $("[id ^=first-2b-f]:not('#first-2b-fi')");
    var $first_2b_button = $("#first-2b-button");

    var $field_first_2c_fi = $('#first-2c-fi');
    var $fields_first_2c_A = $('[id ^= first-2c-A]');
    var $field_first_2c_f = $('#first-2c-f');
    var $first_2c_button = $('#first-2c-button');

    var $fields_first_3_fi = $('[id ^= first-3-fi]');
    var $field_first_3_A = $("#first-3-A");
    var $field_first_3_f = $("#first-3-f");
    var $first_3_button = $("#first-3-button");

    var chart = new CanvasJS.Chart("first-work", {
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
    }

    function clearGraph() {
        chart.options.data = [{
            type: "spline",
            dataPoints: [{ x: 0, y: 0 }],
        }];
        chart.render();
    }

    function calculateFunction2(a, fi, f) {
        var result = [];
        for (var n = 0; n < N; n++) {
            result[n] = {};
            result[n].x = n;
            result[n].y = a * Math.sin(((2 * Math.PI * f * n) / N) + fi * Math.PI);
        }
        return result;
    }

    $first_2a_button.click(function() {
        clearGraph();
        for (var i = 0; i < $fields_first_2a_fi.length; i++) {
            var result = {};
            var text = $($fields_first_2a_fi[i]).val();
            result.dataPoints = calculateFunction2($field_first_2a_A.val(), text, $field_first_2a_f.val());
            result.type = "spline";
            result.showInLegend = true;
            result.name = text;
            drawGraph(result, i + 1);
        }
    });

    $first_2b_button.click(function() {
        clearGraph();
        for (var i = 0; i < $fields_first_2b_f.length; i++) {
            var result = {};
            var text = $($fields_first_2b_f[i]).val();
            result.dataPoints = calculateFunction2($field_first_2b_A.val(), $field_first_2b_fi.val(), text);
            result.type = "spline";
            result.showInLegend = true;
            result.name = text;
            drawGraph(result, i + 1);
        }
    });

    $first_2c_button.click(function() {
        clearGraph();
        for (var i = 0; i < $fields_first_2c_A.length; i++) {
            var result = {};
            var text = $($fields_first_2c_A[i]).val();
            result.dataPoints = calculateFunction2(text, $field_first_2c_fi.val(), $field_first_2c_f.val());
            result.type = "spline";
            result.showInLegend = true;
            result.name = text;
            drawGraph(result, i + 1);
        }
    });

    $first_3_button.click(function() {
        clearGraph();
        var dataPointsArray = [];
        for (var i = 0; i < $fields_first_3_fi.length; i++) {
            var result = {};
            var text = $($fields_first_3_fi[i]).val();
            dataPointsArray[i] = calculateFunction2($field_first_3_A.val(), text, $field_first_3_f.val());
            result.dataPoints = dataPointsArray[i];
            result.type = "spline";
            result.lineDashType = "dash";
            result.showInLegend = true;
            result.name = text;
            drawGraph(result, i + 1);
        }
        var dataPoints = [];
        for (var i = 0; i < N; i++) {
            var sum = 0;
            for (var j = 0; j < dataPointsArray.length; j++) {
                sum += dataPointsArray[j][i].y;
            }
            dataPoints[i] = { x: i, y: sum };
        }
        var result = {};
        result.dataPoints = dataPoints;
        result.type = "spline";
        result.showInLegend = true;
        result.name = "Function";
        drawGraph(result, $fields_first_3_fi.length + 1);
    });
}