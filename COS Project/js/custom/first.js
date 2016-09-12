window.onload = function () {
	var N = 512;
	var fields_first_2a_fi = ["#first-2a-fi1","#first-2a-fi2","#first-2a-fi3","#first-2a-fi4","#first-2a-fi5"];
	var field_first_2a_A = "#first-2a-A";
	var field_first_2a_f = "#first-2a-f";
	var first_2a_button = "#first-2a-button";

	var chart = new CanvasJS.Chart("first-work", {
		data: [ { type: "spline", dataPoints: [ { x: 0, y: 0 } ] }] 
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
		for(var n = 0; n < N-1; n++)
		{
			result[n].x = n;
			result[n].y = a * Math.sin(((2 * Math.pi * f * n) / N) + fi * Math.pi);
		}
		return result;
	}

	$(first_2a_button).click(function()
	{
		for(var i = 0; i < fields_first_2a_fi.Length; i++)
		{
			var result = {};
			var A =  $(field_first_2a_A).val();
			var Fi = $(fields_first_2a_fi[i]).val();
			var F = $(field_first_2a_f).val();
			result.dataPoints = calculateFunction2(A,Fi,F);
			result.type = "spline";
			drawGraph(result, i + 1);
		}
	});

}
