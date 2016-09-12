window.onload = function () {
	var N = 512;
	var fields_first_2a_fi = ["#first-2a-fi1","#first-2a-fi2","#first-2a-fi3","#first-2a-fi4","#first-2a-fi5"];
	var field_first_2a_A = "#first-2a-A";
	var field_first_2a_f = "#first-2a-f";
	var first_2a_button = "#first-2a-button";

	var field_first_2b_fi = "#first-2b-fi";
	var field_first_2b_A = "#first-2b-A";
	var fields_first_2b_f = ["#first-2b-f1","#first-2b-f2","#first-2b-f3","#first-2b-f4","#first-2b-f5"];
	var first_2b_button = "#first-2b-button";

	var field_first_2c_fi = "#first-2c-fi";
	var fields_first_2c_A = ["#first-2c-A1","#first-2c-A2","#first-2c-A3","#first-2c-A4","#first-2c-A5"];
	var field_first_2c_f = "#first-2c-f";
	var first_2c_button = "#first-2c-button";

	var fields_first_2d_fi = ["#first-2d-fi1","#first-2d-fi2","#first-2d-fi3","#first-2d-fi4","#first-2d-fi5"];
	var field_first_2d_A = "#first-2d-A";
	var field_first_2d_f = "#first-2d-f";
	var first_2d_button = "#first-2d-button";

	var chart = new CanvasJS.Chart("first-work", {
		zoomEnabled: true,
		animationEnabled: true,
		data: [ { 
			type: "spline", 
			dataPoints: [ { x: 0, y: 0 } ] ,
		}],
		legend: 
		{
			cursor: "pointer",
			itemclick: function (e) {
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

	function drawGraph (data, number)
	{
		chart.options.data[number] = data;
		chart.render();
    }

	function calculateFunction2(a, fi, f)
	{
		var result = [];
		for(var n = 0; n < N - 1; n++)
		{
			result[n] = {};
			result[n].x = n;
			result[n].y = a * Math.sin(((2 * Math.PI * f * n) / N) + fi * Math.PI);
		}
		return result;
	}

	$(first_2a_button).click(function()
	{
		for(var i = 0; i < fields_first_2a_fi.length; i++)
		{
			var result = {};
			var text = $(fields_first_2a_fi[i]).val();
			result.dataPoints = calculateFunction2($(field_first_2a_A).val(), text , $(field_first_2a_f).val());
			result.type = "spline";
			result.showInLegend = true;
			result.name = text;  
			drawGraph(result, i + 1);
		}
	});

	$(first_2b_button).click(function()
	{
		for(var i = 0; i < fields_first_2b_f.length; i++)
		{
			var result = {};
			var text = $(fields_first_2b_f[i]).val();
			result.dataPoints = calculateFunction2($(field_first_2b_A).val(), $(field_first_2b_fi).val(), text);
			result.type = "spline";
			result.showInLegend = true;
			result.name = text; 
			drawGraph(result, i + 1);
		}
	});
}
