'use strict';

$(document).ready(function () {
	var fileIsDownloaded = false,
	    //file download flag
	skillField = [],
	    // Array of possible values for a field Skill
	subAreaField = [],
	    // Array of possible values for a field Area
	educationField_mb = [{ name: 'phd', value: 1 }, { name: 'master', value: 2 }, { name: 'magistrale', value: 3 }, { name: 'triennale', value: 4 }, { name: 'diploma', value: 5 }],
	    //Array of Education field values in ascending order
	educationField = [],
	    //Array of field values Education
	fileType = void 0,
	    // Type of the loaded file is the first or second
	workdata = [],
	    //Array of data from the downloaded file
	rezult_field = [],
	    //Field headers with their indexes, by which filtering is performed
	rezult_array = []; //Data array after filtering

	//Сustomize the appearance of sliders
	$("#experience").slider({});

	$("#analytics").slider();
	$("#analytics").on('slide', function (slideEvt) {
		$("#analyticsSliderVal").text(slideEvt.value);
	});

	$("#softwarebl").slider();
	$("#softwarebl").on('slide', function (slideEvt) {
		$("#softwareblSliderVal").text(slideEvt.value);
	});

	$("#datamgmt").slider();
	$("#datamgmt").on('slide', function (slideEvt) {
		$("#datamgmtSliderVal").text(slideEvt.value);
	});

	$("#programming").slider();
	$("#programming").on('slide', function (slideEvt) {
		$("#programmingSliderVal").text(slideEvt.value);
	});

	$("#itsystem").slider();
	$("#itsystem").on('slide', function (slideEvt) {
		$("#itsystemSliderVal").text(slideEvt.value);
	});
	$("#softskills").slider();
	$("#softskills").on('slide', function (slideEvt) {
		$("#softskillsSliderVal").text(slideEvt.value);
	});

	$("#risk").slider();
	$("#risk").on('slide', function (slideEvt) {
		$("#riskSliderVal").text(slideEvt.value);
	});

	$("#education").slider();
	$("#education").on('slide', function (slideEvt) {
		$("#educationSliderVal").text(slideEvt.value);
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
		if (this.files[0]) {
			Papa.parse(this.files[0], {
				complete: function complete(results) {
					fileIsDownloaded = false;
					fileType = determineFile(results);
					clearFields();
					if (fileType === "first") {
						fillInFields(results);
					} else if (fileType === "second") {
						console.log("second type");
					}
					workdata = results.data;
					fileIsDownloaded = true;
				}
			});
		}
	});

	//Behavior of the Plus button
	$('.form-fieldset .plus-button').click(function () {
		var div = void 0;
		if ($(this).parent().hasClass('form-prima_skill')) {
			div = $('<div>', {
				class: "form-seconda_skill",
				html: '<p class="col-lg-6 form-label_infieldset">Skill:</p>\n\t\t\t\t\t\t<select class="form-control col-lg-6 form-select_skill">\n\t\t\t\t\t\t\t<option value="---">---</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t\t<span class="button basket-button">&#128465;</span>'
			});
			$(div).insertAfter($(this).parent());
			fillField(skillField, "form-select_skill");
		} else if ($(this).parent().hasClass('form-macro_area')) {
			div = $('<div>', {
				class: "form-macro_area",
				html: '<p class="col-lg-6 form-label_infieldset">Sub Area:</p>\n\t\t\t\t\t\t<select class="form-control col-lg-6 form-select_area">\n\t\t\t\t\t\t\t<option value="---">---</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t\t<span class="button basket-button">&#128465;</span>'
			});
			$(div).insertAfter($(this).parent());
			fillField(subAreaField, "form-select_area");
		}
		$('.form-fieldset .basket-button').click(function () {
			$(this).parent().remove();
		});
	});

	//Determine the file type
	var determineFile = function determineFile(file) {
		var headers = file.data[0];
		var localtype = void 0,
		    firstcount = 0,
		    secondcount = 0;
		for (var i = 0; i < headers.length; i++) {
			if (headers[i].toLowerCase() === 'area' || headers[i].toLowerCase() === 'sub area' || headers[i].toLowerCase() === 'skill' || headers[i].toLowerCase() === 'expertise') firstcount++;else if (headers[i].toLowerCase() === 'appeal' || headers[i].toLowerCase() === 'experience' || headers[i].toLowerCase() === 'analytics' || headers[i].toLowerCase() === 'software bl' || headers[i].toLowerCase() === 'data mgmt' || headers[i].toLowerCase() === 'programming' || headers[i].toLowerCase() === 'it system' || headers[i].toLowerCase() === 'soft skills' || headers[i].toLowerCase() === 'risk' || headers[i].toLowerCase() === 'education') secondcount++;
		}
		if (firstcount > secondcount) return "first";else if (firstcount < secondcount) return "second";else return "error";
	};

	//Filling in the fields of the filters block
	var fillInFields = function fillInFields(rezults) {

		//Obtaining the necessary numbers of columns
		var rezult_headers = rezults.data[0];
		for (var i = 0; i < rezult_headers.length; i++) {
			if (rezult_headers[i].toLowerCase() === 'skill') {
				rezult_field[0] = { id: i, value: 'skill' };
			} else if (rezult_headers[i].toLowerCase() === 'area') {
				rezult_field[1] = { id: i, value: 'area' };
			}
			// else if (rezult_headers[i].toLowerCase() === 'education' && !Number(rezults.data[1][i])) {
			// 	rezult_field[2] = {id: i, value: 'education'};
			// }
		}

		//Get arrays of possible values of the desired columns and sort them
		for (var _i = 1; _i < rezults.data.length - 1; _i++) {
			for (var j = 0; j < rezults.data[_i].length; j++) {
				for (var k = 0; k < rezult_field.length; k++) {
					if (rezult_field[k].id === j) {
						if (rezult_field[k].value === 'skill') {
							var count = 0;
							for (var l = 0; l < skillField.length; l++) {
								if (rezults.data[_i][j].toLowerCase() === skillField[l].toLowerCase()) count++;
							}
							if (count === 0) skillField.push(rezults.data[_i][j].charAt(0).toUpperCase() + rezults.data[_i][j].substr(1).toLowerCase());
						} else if (rezult_field[k].value === 'area') {
							var _count = 0;
							for (var _l = 0; _l < subAreaField.length; _l++) {
								if (rezults.data[_i][j].toLowerCase() === subAreaField[_l].toLowerCase()) _count++;
							}
							if (_count === 0) subAreaField.push(rezults.data[_i][j].charAt(0).toUpperCase() + rezults.data[_i][j].substr(1).toLowerCase());
						}
						// else if (rezult_field[k].value === 'education') {
						// 	let count = 0;
						// 	for (let l=0; l<educationField.length; l++) {
						// 		if (rezults.data[i][j].toLowerCase() === educationField[l].toLowerCase()) count++;
						// 	}
						// 	if (count === 0) educationField.push(rezults.data[i][j].charAt(0).toUpperCase() + rezults.data[i][j].substr(1).toLowerCase());
						// }
					}
				}
			}
		}
		skillField.sort();
		subAreaField.sort();
		// educationField = sortEducationField(educationField_mb, educationField);

		fillField(skillField, "form-select_skill");
		fillField(subAreaField, "form-select_area");
		// fillField(educationField, "form-select-education");
	};

	//Sort Education field
	var sortEducationField = function sortEducationField(sampArr, workArr) {
		var localArray = [],
		    count = 0;
		for (var i = 0; i < sampArr.length; i++) {
			for (var j = 0; j < workArr.length; j++) {
				if (sampArr[i].name.toLowerCase() === workArr[j].toLowerCase()) {
					localArray[count] = { value: count, name: workArr[j].charAt(0).toUpperCase() + workArr[j].substr(1).toLowerCase() };
					count++;
				}
			}
		}
		return localArray;
	};

	//Fill in the fields
	var fillField = function fillField(skillArr, className) {
		var htmlArr = [],
		    valueArr = [];
		// if (typeof skillArr[0] != "object") {
		htmlArr = skillArr;
		valueArr = skillArr;
		// }
		// else {
		// 	for (let i=0; i<skillArr.length; i++) {
		// 		htmlArr[i] = skillArr[i].name;
		// 		valueArr[i] = skillArr[i].value;
		// 	}
		// }
		for (var i = 0; i < $("." + className).length; i++) {
			if ($("." + className)[i].children.length <= 1) {
				for (var j = 0; j < htmlArr.length; j++) {
					var option = document.createElement('option');
					option.innerHTML = htmlArr[j];
					option.setAttribute('value', valueArr[j]);
					$("." + className)[i].appendChild(option);
				}
			}
		}
	};

	//Clear value of Skill and Sub Area fields
	var clearFields = function clearFields() {

		$('.form-select_skill').children().remove();
		var option = $('<option>', {
			value: '---',
			html: '---'
		});
		$('.form-select_skill').append(option);

		$('.form-select_area').children().remove();
		option = $('<option>', {
			value: '---',
			html: '---'
		});
		$('.form-select_area').append(option);
		// $('.form-select-education').children().remove();
		// option = $('<option>', {
		// 	value: '---',
		// 	html: '---'
		// });
		// $('.form-select-education').append(option);
		skillField = [];
		subAreaField = [];
		// educationField =[];
	};

	//Behavior of button Load from Model
	$('#load-from-model').on('click', function () {
		alert('The event is not assigned to this button');
	});

	//Behavior of button GO
	$('#go').on('click', function () {
		if (fileIsDownloaded) {
			if (fileType === "first") {
				//Creating a value object for a filter
				var filter_values = {},
				    localvalue = [];
				for (var i = 0; i < $('.form-select_skill').length; i++) {
					if ($('.form-select_skill')[i].value != "---") {
						localvalue.push($('.form-select_skill')[i].value);
					}
				}
				if (localvalue.length != 0) {
					filter_values.skill = localvalue;
				} else if (filter_values.skill) delete filter_values.skill;

				localvalue = [];
				for (var _i2 = 0; _i2 < $('.form-select_area').length; _i2++) {
					if ($('.form-select_area')[_i2].value != "---") {
						localvalue.push($('.form-select_area')[_i2].value);
					}
				}
				if (localvalue.length != 0) {
					filter_values.area = localvalue;
				} else if (filter_values.area) delete filter_values.area;

				//Creating a filtered array
				rezult_array = [];
				var is_suitable_skill = false,
				    is_suitable_area = false;
				for (var _i3 = 1; _i3 < workdata.length - 1; _i3++) {
					for (var j = 0; j < workdata[_i3].length; j++) {
						for (var k = 0; k < rezult_field.length; k++) {
							if (rezult_field[k].id === j) {
								if (rezult_field[k].value === 'skill') {
									if (filter_values.skill) {
										for (var n = 0; n < filter_values.skill.length; n++) {
											if (workdata[_i3][j].toLowerCase() === filter_values.skill[n].toLowerCase()) {
												is_suitable_skill = true;
											}
										}
									} else is_suitable_skill = true;
								} else if (rezult_field[k].value === 'area') {
									if (filter_values.area) {
										for (var _n = 0; _n < filter_values.area.length; _n++) {
											if (workdata[_i3][j].toLowerCase() === filter_values.area[_n].toLowerCase()) {
												is_suitable_area = true;
											}
										}
									} else is_suitable_area = true;
								}
							}
						}
					}
					if (is_suitable_skill && is_suitable_area) rezult_array.push(workdata[_i3]);
					is_suitable_skill = false;
					is_suitable_area = false;
				}
				rezult_array.unshift(workdata[0]);
				renderTable(rezult_array, "table-go");
			}
		} else {
			alert("Please download the file first! Or wait, it hasn't loaded yet!");
		}
	});

	//Behavior of button Search
	$('#search').on('click', function () {
		if ($('#table-go').children().length != 0) {
			if ($('#search-input').val() === "") alert('Enter a name for the search');else {
				var query = $('#search-input').val().toLowerCase(),
				    n = void 0,
				    search_rezult = [];
				for (var i = 0; i < rezult_array[0].length; i++) {
					if (rezult_array[0][i].toLowerCase() === 'name') n = i;
				}
				for (var _i4 = 1; _i4 < rezult_array.length; _i4++) {
					if (rezult_array[_i4][n].toLowerCase().indexOf(query) != -1) search_rezult.push(rezult_array[_i4]);
				}
				search_rezult.unshift(rezult_array[0]);
				renderTable(search_rezult, "table-search");
			}
		} else alert('Missing search fields');
	});

	//Render the table
	var renderTable = function renderTable(workarray, id) {
		var thead = '<thead>',
		    tbody = '<tbody>';
		for (var i = 0; i < workarray.length; i++) {
			if (i === 0) thead += '<tr>';else tbody += '<tr>';
			for (var j = 0; j < workarray[i].length; j++) {
				if (i === 0) {
					thead += '<th>' + (workarray[i][j].charAt(0).toUpperCase() + workarray[i][j].substr(1).toLowerCase()) + '</th>';
				} else {
					tbody += '<td>' + workarray[i][j] + '</td>';
				}
			}
			if (i === 0) thead += '</tr>';else tbody += '</tr>';
		}
		thead += '</thead>';
		tbody += '</tbody>';
		if ($('#' + id).children() != 0) $('#' + id).children().remove();
		$('#' + id).html(thead + tbody);
	};
});