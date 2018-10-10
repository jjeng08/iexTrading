
$(document).ready(function () {

	/*STARTING DATA*/
	/*Default Stock Options*/
	const stockList = ["DIS", "TSLA", "MSFT", "AAPL"];

	/*List of All IEX Stock Symbols*/
	const symbolList = [];

	function getSymbols() {
		$.ajax({
			url: "https://api.iextrading.com/1.0/ref-data/symbols",
			method: 'GET'
		}).then(function (response) {
			for (let i = 0; i < response.length; i++) {
				let newSymbol = response[i].symbol;
				symbolList.push(newSymbol);
			}
		});
	}

	getSymbols();

	/*BUTTONS*/

	/*Render Buttons*/
	function render() {
		$("#buttons").empty();
		for (let i = 0; i < stockList.length; i++) {
			let newButton = $("<button>");
			newButton.addClass("button");
			newButton.attr("data-name", stockList[i]);
			newButton.text(stockList[i]);
			$("#buttons").append(newButton);
		}
	}


	/*Create New Buttons*/
	$("#createStockBtn").on("click", createButton);
	function createButton(event) {
		event.preventDefault();
		const newStock = $("#stockInput").val().trim().toUpperCase();
			if (symbolList.indexOf(newStock) <0) {
				alert("Error: Stock symbol not found.");
			}
			else {
				stockList.push(newStock);
				$("#stockInput").val("");
				render();
			}

	}

	/*MAIN: DISPLAY*/

	$("#buttons").on("click", ".button", displayInfo);
	function displayInfo() {
		$("#infoView").empty();
		const stock = $(this).attr('data-name');

		$.ajax({
			url: `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news&range=1m&last=1`,
			method: 'GET'
		}).then(function (response) {


			/*Title, Logo, and Symbol*/
			const companyName = $("#companyName");
			companyName.empty();
			companyName.append(`${response.quote.companyName} (${response.quote.symbol})`);


			/*Stock Prices*/
			const tBody = $('tbody');
			const newRow = $('<tr>')

			tBody.empty();
			newRow.empty();

			const prevClose = $('<td>').text(response.quote.previousClose.toFixed(2));
			const openPrice = $('<td>').text(response.quote.open.toFixed(2));
			const latestPrice = $('<td>').text(response.quote.latestPrice.toFixed(2));
			const week52High = $('<td>').text(response.quote.week52High.toFixed(2));
			const week52Low = $('<td>').text(response.quote.week52Low.toFixed(2));

			newRow.append(prevClose, openPrice, latestPrice, week52High, week52Low);
			tBody.append(newRow);

		})

		$.ajax({
			url: `https://api.iextrading.com/1.0/stock/${stock}/logo`,
			method: 'GET'
		}).then(function (response) {
			const imageView = $("#imageView");
			imageView.empty();
			imageView.append(`<img src="${response.url}"/>`).addClass("logo");
		});

		$.ajax({
			url: `https://api.iextrading.com/1.0/stock/${stock}/news/last/10`,
			method: 'GET'
		}).then(function (response) { 				
			const newsGroup = $("#newsGroup");
			newsGroup.empty();
			for (let i = 0; i < response.length; i++) {
			$("#newsGroup").append(`<p><div>${response[i].datetime}: </div> <a target="_blank" href="${response[i].url}">${response[i].headline}</a></p>`).addClass("newsLink");
			}
		});
	}

	/*VALIDATION*/


	/*Initial Render*/
	render();
});