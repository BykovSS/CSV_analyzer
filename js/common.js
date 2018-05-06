"use strict";

$(document).ready(function () {

	//Сustomize the appearance of sliders
	$("#ex2").slider({});

	$("#ex11").slider();
	$("#ex11").on('slide', function (slideEvt) {
		$("#ex11SliderVal").text(slideEvt.value);
	});

	$("#ex21").slider();
	$("#ex21").on('slide', function (slideEvt) {
		$("#ex21SliderVal").text(slideEvt.value);
	});

	$("#ex31").slider();
	$("#ex31").on('slide', function (slideEvt) {
		$("#ex31SliderVal").text(slideEvt.value);
	});

	$("#ex41").slider();
	$("#ex41").on('slide', function (slideEvt) {
		$("#ex41SliderVal").text(slideEvt.value);
	});

	$("#ex12").slider();
	$("#ex12").on('slide', function (slideEvt) {
		$("#ex12SliderVal").text(slideEvt.value);
	});
	$("#ex22").slider();
	$("#ex22").on('slide', function (slideEvt) {
		$("#ex22SliderVal").text(slideEvt.value);
	});

	$("#ex32").slider();
	$("#ex32").on('slide', function (slideEvt) {
		$("#ex32SliderVal").text(slideEvt.value);
	});

	$("#ex42").slider();
	$("#ex42").on('slide', function (slideEvt) {
		$("#ex42SliderVal").text(slideEvt.value);
	});

	//Upload .csv file

	//Click event is passed to the hidden input element when the Browse button is clicked

	$('.browse').on('click', function () {
		$('.input-file_hidden').click();
	});

	//Behavior of the input file

	$('.input-file_hidden').change(function () {

		//Changing the placeholder visible element input

		var n = void 0;
		if ($(this).val().lastIndexOf('\\')) {
			n = $(this).val().lastIndexOf('\\') + 1;
		} else {
			n = $(this).val().lastIndexOf('/') + 1;
		}
		var fileName = $(this).val().slice(n);
		$('.file-name').attr('placeholder', fileName);

		//Parsing the selected file from csv into an object that can be analyze

		Papa.parse(this.files[0], {
			complete: function complete(results) {
				console.log(results.data[0]);
			}
		});
	});

	//Behavior of the Plus button
	$('.form-fieldset .plus-button').click(function () {
		var div = void 0;
		if ($(this).parent().hasClass('form-prima_skill')) {
			div = $('<div>', {
				class: "form-seconda_skill",
				html: "<p class=\"col-lg-6 form-label_infieldset\">Seconda skill:</p>\n\t\t\t\t\t\t<select class=\"form-control col-lg-6 form-select_skill\">\n\t\t\t\t\t\t\t<option>---</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t\t<span class=\"button basket-button\">&#128465;</span>"
			});
			$(div).insertAfter($(this).parent());
		} else if ($(this).parent().hasClass('form-macro_area')) {
			div = $('<div>', {
				class: "form-macro_area",
				html: "<p class=\"col-lg-6 form-label_infieldset\">Sub Area:</p>\n\t\t\t\t\t\t<select class=\"form-control col-lg-6 form-select_skill\">\n\t\t\t\t\t\t\t<option>---</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t\t<span class=\"button basket-button\">&#128465;</span>"
			});
			$(div).insertAfter($(this).parent());
		}
		$('.form-fieldset .basket-button').click(function () {
			$(this).parent().remove();
		});
	});
});