window.onload = function () {
	var chart = new CanvasJS.Chart("first-work", { 
		data: [ { type: "spline", dataPoints: [ { x: 0, y: 0 } ] }] 
	});
	chart.render();	

	$("#first-button").click(function () {
		var length = chart.options.data[0].dataPoints.length;	
		chart.options.data[0].dataPoints.push({ y: 25 - Math.random() * 10});
		chart.render();
	});	

}