'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

$(document).ready(function () {
	var fileIsDownloaded = false,
	    //file download flag
	skillField = [],
	    // Array of possible values for a field Skill
	subAreaField = [],
	    // Array of possible values for a field Area
	experienceField = 0,
	    //Maximum value of the field Experience
	analyticsField = 0,
	    //Maximum value of the field Analytics
	softwareblField = 0,
	    //Maximum value of the field Software Bl
	datamgmtField = 0,
	    //Maximum value of the field Data mgmt
	programmingField = 0,
	    //Maximum value of the field Programming
	itsystemField = 0,
	    //Maximum value of the field IT System
	softskillsField = 0,
	    //Maximum value of the field Soft skills
	riskField = 0,
	    //Maximum value of the field Risk
	educationlvField = 0,
	    //Maximum value of the field Education
	educationField_mb = [{ name: 'phd', value: 1 }, { name: 'master', value: 2 }, { name: 'magistrale', value: 3 }, { name: 'triennale', value: 4 }, { name: 'diploma', value: 5 }],
	    //Array of Education field values in ascending order
	educationField = [],
	    //Array of field values Education
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
					clearFields();
					fillInFields(results);
					results.data.pop();
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

	//Filling in the fields of the filters block
	var fillInFields = function fillInFields(rezults) {

		//Obtaining the necessary numbers of columns
		var rezult_headers = rezults.data[0],
		    count = 0;
		for (var i = 0; i < rezult_headers.length; i++) {
			if (rezult_headers[i].toLowerCase() === 'skill') {
				rezult_field[count] = { id: i, value: 'skill' };
				count++;
			} else if (rezult_headers[i].toLowerCase() === 'area') {
				rezult_field[count] = { id: i, value: 'area' };
				count++;
			} else if (rezult_headers[i].toLowerCase() === 'experience') {
				rezult_field[count] = { id: i, value: 'experience' };
				count++;
			} else if (rezult_headers[i].toLowerCase() === 'analytics') {
				rezult_field[count] = { id: i, value: 'analytics' };
				count++;
			} else if (rezult_headers[i].toLowerCase() === 'software bl') {
				rezult_field[count] = { id: i, value: 'software bl' };
				count++;
			} else if (rezult_headers[i].toLowerCase() === 'data mgmt') {
				rezult_field[count] = { id: i, value: 'data mgmt' };
				count++;
			} else if (rezult_headers[i].toLowerCase() === 'programming') {
				rezult_field[count] = { id: i, value: 'programming' };
				count++;
			} else if (rezult_headers[i].toLowerCase() === 'it system') {
				rezult_field[count] = { id: i, value: 'it system' };
				count++;
			} else if (rezult_headers[i].toLowerCase() === 'soft skills') {
				rezult_field[count] = { id: i, value: 'soft skills' };
				count++;
			} else if (rezult_headers[i].toLowerCase() === 'risk') {
				rezult_field[count] = { id: i, value: 'risk' };
				count++;
			} else if (rezult_headers[i].toLowerCase() === 'education' && !Number(rezults.data[1][i])) {
				rezult_field[count] = { id: i, value: 'education' };
				count++;
			} else if (rezult_headers[i].toLowerCase() === 'education' && Number(rezults.data[1][i])) {
				rezult_field[count] = { id: i, value: 'educationlv' };
				count++;
			}
		}

		//Get arrays of possible values of the desired columns and sort them
		for (var _i = 1; _i < rezults.data.length - 1; _i++) {
			for (var j = 0; j < rezults.data[_i].length; j++) {
				for (var k = 0; k < rezult_field.length; k++) {
					if (rezult_field[k].id === j) {
						if (rezult_field[k].value === 'skill') {
							var _count = 0;
							for (var l = 0; l < skillField.length; l++) {
								if (rezults.data[_i][j].toLowerCase() === skillField[l].toLowerCase()) _count++;
							}
							if (_count === 0) skillField.push(rezults.data[_i][j].charAt(0).toUpperCase() + rezults.data[_i][j].substr(1).toLowerCase());
						} else if (rezult_field[k].value === 'area') {
							var _count2 = 0;
							for (var _l = 0; _l < subAreaField.length; _l++) {
								if (rezults.data[_i][j].toLowerCase() === subAreaField[_l].toLowerCase()) _count2++;
							}
							if (_count2 === 0) subAreaField.push(rezults.data[_i][j].charAt(0).toUpperCase() + rezults.data[_i][j].substr(1).toLowerCase());
						} else if (rezult_field[k].value === 'experience') {
							if (rezults.data[_i][j] > experienceField) experienceField = rezults.data[_i][j];
						} else if (rezult_field[k].value === 'analytics') {
							if (rezults.data[_i][j] > analyticsField) analyticsField = rezults.data[_i][j];
						} else if (rezult_field[k].value === 'software bl') {
							if (rezults.data[_i][j] > softwareblField) softwareblField = rezults.data[_i][j];
						} else if (rezult_field[k].value === 'data mgmt') {
							if (rezults.data[_i][j] > datamgmtField) datamgmtField = rezults.data[_i][j];
						} else if (rezult_field[k].value === 'programming') {
							if (rezults.data[_i][j] > programmingField) programmingField = rezults.data[_i][j];
						} else if (rezult_field[k].value === 'it system') {
							if (rezults.data[_i][j] > itsystemField) itsystemField = rezults.data[_i][j];
						} else if (rezult_field[k].value === 'soft skills') {
							if (rezults.data[_i][j] > softskillsField) softskillsField = rezults.data[_i][j];
						} else if (rezult_field[k].value === 'risk') {
							if (rezults.data[_i][j] > riskField) riskField = rezults.data[_i][j];
						} else if (rezult_field[k].value === 'educationlv') {
							if (rezults.data[_i][j] > educationlvField) educationlvField = rezults.data[_i][j];
						} else if (rezult_field[k].value === 'education') {
							var _count3 = 0;
							for (var _l2 = 0; _l2 < educationField.length; _l2++) {
								if (_typeof(educationField[_l2]) === "object") {
									if (rezults.data[_i][j].toLowerCase() === educationField[_l2].name.toLowerCase()) _count3++;
								} else if (rezults.data[_i][j].toLowerCase() === educationField[_l2].toLowerCase()) _count3++;
							}
							if (_count3 === 0) educationField.push(rezults.data[_i][j].charAt(0).toUpperCase() + rezults.data[_i][j].substr(1).toLowerCase());
						}
					}
				}
			}
		}
		skillField.sort();
		subAreaField.sort();
		educationField = sortEducationField(educationField_mb, educationField);

		fillField(skillField, "form-select_skill");
		fillField(subAreaField, "form-select_area");
		setMaxValueField(experienceField, "experience");
		setMaxValueField(analyticsField, "analytics");
		setMaxValueField(softwareblField, "softwarebl");
		setMaxValueField(datamgmtField, "datamgmt");
		setMaxValueField(programmingField, "programming");
		setMaxValueField(itsystemField, "itsystem");
		setMaxValueField(softskillsField, "softskills");
		setMaxValueField(riskField, "risk");
		setMaxValueField(educationlvField, "education");

		fillField(educationField, "form-select-education");
	};

	//Sort Education field
	var sortEducationField = function sortEducationField(sampArr, workArr) {
		if (_typeof(workArr[0]) === "object") {
			for (var i = 0; i < workArr.length; i++) {
				var local = workArr[i].name;
				workArr[i] = local;
			}
		}
		if (workArr.length > 0) {
			var localArray = [],
			    count = 0;
			for (var _i2 = 0; _i2 < sampArr.length; _i2++) {
				for (var j = 0; j < workArr.length; j++) {

					if (sampArr[_i2].name.toLowerCase() === workArr[j].toLowerCase()) {
						localArray[count] = { value: count, name: workArr[j].charAt(0).toUpperCase() + workArr[j].substr(1).toLowerCase() };
						count++;
					}
				}
			}
			return localArray;
		} else return workArr;
	};

	//Fill in the fields
	var fillField = function fillField(work_val, className) {
		var htmlArr = [],
		    valueArr = [];
		if (typeof work_val[0] === "string") {
			htmlArr = work_val;
			valueArr = work_val;
		} else {
			for (var i = 0; i < work_val.length; i++) {
				htmlArr[i] = work_val[i].name;
				valueArr[i] = work_val[i].value;
			}
		}
		for (var _i3 = 0; _i3 < $("." + className).length; _i3++) {
			if ($("." + className)[_i3].children.length <= 1) {

				for (var j = 0; j < htmlArr.length; j++) {
					var option = document.createElement('option');
					option.innerHTML = htmlArr[j];
					option.setAttribute('value', valueArr[j]);
					$("." + className)[_i3].appendChild(option);
				}
			}
		}
	};

	//Set the maximum value of the slider
	var setMaxValueField = function setMaxValueField(work_val, id) {
		if (Number(work_val) == 0) {
			work_val = 10;
		}
		if (id === "experience") {
			var experience = $('<input>', {
				"id": "experience",
				"type": "text",
				"class": "span2",
				"value": "",
				"data-slider-min": "0",
				"data-slider-max": work_val,
				"data-slider-step": "1",
				"data-slider-value": "[0," + work_val + "]"
			});
			$("#experience").prev().remove();
			$("#experience").replaceWith(experience);
			$("#experience").slider({});
			$('#experience').next().text(work_val);
		} else {
			var element = $('<input>', {
				"id": id,
				"type": "text",
				"data-slider-min": "0",
				"data-slider-max": work_val,
				"data-slider-step": "1",
				"data-slider-value": "0"
			});
			$('#' + id).prev().remove();
			$('#' + id).replaceWith(element);
			$('#' + id).slider();
			$('#' + id).on('slide', function (slideEvt) {
				$('#' + id + 'SliderVal').text(slideEvt.value);
			});
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

		$('.form-select-education').children().remove();
		option = $('<option>', {
			value: '---',
			html: '---'
		});
		$('.form-select-education').append(option);

		rezult_field = [];
		skillField = [];
		subAreaField = [];
		experienceField = 0;
		educationField = [];
		analyticsField = 0;
		softwareblField = 0;
		datamgmtField = 0;
		programmingField = 0;
		itsystemField = 0;
		softskillsField = 0;
		riskField = 0;
		educationlvField = 0;
	};

	//Behavior of min and max Education
	$('.form-select-education_min').on('change', function () {
		if (fileIsDownloaded) {
			var local_educationField = [];

			for (var i = 0; i < educationField.length; i++) {
				if (educationField[i].value >= $(this).val()) {
					local_educationField.push(educationField[i]);
				}
			}
			var local_value = $('.form-select-education_max').val();
			$('.form-select-education_max').children().not('option[value="---"]').remove();
			fillField(local_educationField, "form-select-education_max");
			$('.form-select-education_max').val(local_value);
		}
	});

	$('.form-select-education_max').on('change', function () {
		if (fileIsDownloaded) {
			var local_educationField = [];

			for (var i = 0; i < educationField.length; i++) {
				if (educationField[i].value <= $(this).val()) {
					local_educationField.push(educationField[i]);
				}
			}
			var local_value = $('.form-select-education_min').val();
			$('.form-select-education_min').children().not('option[value="---"]').remove();
			fillField(local_educationField, "form-select-education_min");
			$('.form-select-education_min').val(local_value);
		}
	});

	//Behavior of button Load from Model
	$('#load-from-model').on('click', function () {
		alert('The event is not assigned to this button');
	});

	//Behavior of button GO
	$('#go').on('click', function () {
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
		for (var _i4 = 0; _i4 < $('.form-select_area').length; _i4++) {
			if ($('.form-select_area')[_i4].value != "---") {
				localvalue.push($('.form-select_area')[_i4].value);
			}
		}
		if (localvalue.length != 0) {
			filter_values.area = localvalue;
		} else if (filter_values.area) delete filter_values.area;

		localvalue = [];
		localvalue[0] = $('#experience').val().charAt(0);
		localvalue[1] = $('#experience').val().substring($('#experience').val().length - 1);
		filter_values.experience = localvalue;

		localvalue = [];
		filter_values.analytics = $('#analytics').val();
		filter_values.softwarebl = $('#softwarebl').val();
		filter_values.datamgmt = $('#datamgmt').val();
		filter_values.programming = $('#programming').val();
		filter_values.itsystem = $('#itsystem').val();
		filter_values.softskills = $('#softskills').val();
		filter_values.risk = $('#risk').val();
		filter_values.educationlv = $('#education').val();

		localvalue = [];
		if ($('.form-select-education_min').val() === "---") {
			localvalue[0] = { value: educationField_mb[0].value, name: educationField_mb[0].name };
		} else {
			localvalue[0] = { value: Number($('.form-select-education_min').val()), name: educationField_mb[$('.form-select-education_min').val()].name };
		}
		if ($('.form-select-education_max').val() === "---") {
			localvalue[1] = { value: educationField_mb[educationField_mb.length - 1].value, name: educationField_mb[educationField_mb.length - 1].name };
		} else {
			localvalue[1] = { value: Number($('.form-select-education_max').val()), name: educationField_mb[$('.form-select-education_max').val()].name };
		}
		filter_values.education = localvalue;
		localvalue = [];

		if (fileIsDownloaded) {
			renderTable(workdata, "table-go");
		} else {
			//Sending a request to a Python script file

			$.ajax({
				url: 'example.csv',
				type: 'get',
				data: filter_values,
				success: function success(data) {
					//Parsing the selected file from csv into an object that can be analyze
					if (data) {
						Papa.parse(data, {
							complete: function complete(results) {
								fileIsDownloaded = false;
								clearFields();
								fillInFields(results);
								results.data.pop();
								workdata = results.data;
								fileIsDownloaded = true;
								renderTable(workdata, "table-go");
							}
						});
					}
				}
			});
		}

		// //Creating a filtered array
		// rezult_array = []; 
		// let is_suitable_skill = true, 
		// 	is_suitable_area = true, 
		// 	is_suitable_education = true,
		// 	is_suitable_experience = true,
		// 	is_suitable_analytics = true,
		// 	is_suitable_softwarebl = true,
		// 	is_suitable_datamgmt = true,
		// 	is_suitable_programming = true,
		// 	is_suitable_itsystem = true,
		// 	is_suitable_softskills = true,
		// 	is_suitable_risk = true,
		// 	is_suitable_educationlv = true;

		// for (let i=1; i<workdata.length-1; i++) {
		// 	for (let j=0; j<workdata[i].length; j++) {
		// 		for (let k=0; k<rezult_field.length; k++) {
		// 			if (rezult_field[k].id === j) {
		// 				if (rezult_field[k].value === 'skill') {
		// 					is_suitable_skill = false;
		// 					if (filter_values.skill) {
		// 						for (let n=0; n<filter_values.skill.length; n++) {
		// 							if (workdata[i][j].toLowerCase() === filter_values.skill[n].toLowerCase()) {
		// 								is_suitable_skill = true;
		// 							}
		// 						}
		// 					}
		// 					else is_suitable_skill = true;
		// 				}
		// 				else if (rezult_field[k].value === 'area') {
		// 					is_suitable_area = false;
		// 					if (filter_values.area) {
		// 						for (let n=0; n<filter_values.area.length; n++) {
		// 							if (workdata[i][j].toLowerCase() === filter_values.area[n].toLowerCase()) {
		// 								is_suitable_area = true;
		// 							}
		// 						}
		// 					}
		// 					else is_suitable_area = true;
		// 				}
		// 				else if (rezult_field[k].value === 'education') {
		// 					is_suitable_education = false;
		// 					if (filter_values.education) {
		// 						for (let n=0; n<educationField_mb.length; n++) {
		// 							if (workdata[i][j].toLowerCase() === educationField_mb[n].name.toLowerCase() && educationField_mb[n].value >= filter_values.education[0] && educationField_mb[n].value <= filter_values.education[1]) {
		// 								is_suitable_education = true;
		// 							}
		// 						}
		// 					}
		// 					else is_suitable_education = true;
		// 				}
		// 				else if (rezult_field[k].value === 'experience') {
		// 					is_suitable_experience = false;
		// 					if (filter_values.experience) {
		// 						if (workdata[i][j] >= filter_values.experience[0] && workdata[i][j] <= filter_values.experience[1]) is_suitable_experience = true;
		// 					}
		// 					else is_suitable_experience = true;
		// 				}
		// 				else if (rezult_field[k].value === 'analytics') {
		// 					is_suitable_analytics = false;
		// 					if (filter_values.analytics) {
		// 						if (workdata[i][j] === filter_values.analytics) is_suitable_analytics = true;
		// 					}
		// 					else is_suitable_analytics = true;
		// 				}
		// 				else if (rezult_field[k].value === 'software bl') {
		// 					is_suitable_softwarebl = false;
		// 					if (filter_values.softwarebl) {
		// 						if (workdata[i][j] === filter_values.softwarebl) is_suitable_softwarebl = true;
		// 					}
		// 					else is_suitable_softwarebl = true;
		// 				}
		// 				else if (rezult_field[k].value === 'data mgmt') {
		// 					is_suitable_datamgmt = false;
		// 					if (filter_values.datamgmt) {
		// 						if (workdata[i][j] === filter_values.datamgmt) is_suitable_datamgmt = true;
		// 					}
		// 					else is_suitable_datamgmt = true;
		// 				}
		// 				else if (rezult_field[k].value === 'programming') {
		// 					is_suitable_programming = false;
		// 					if (filter_values.programming) {
		// 						if (workdata[i][j] === filter_values.programming) is_suitable_programming = true;
		// 					}
		// 					else is_suitable_programming = true;
		// 				}
		// 				else if (rezult_field[k].value === 'it system') {
		// 					is_suitable_itsystem = false;
		// 					if (filter_values.itsystem) {
		// 						if (workdata[i][j] === filter_values.itsystem) is_suitable_itsystem = true;
		// 					}
		// 					else is_suitable_itsystem = true;
		// 				}
		// 				else if (rezult_field[k].value === 'soft skills') {
		// 					is_suitable_softskills = false;
		// 					if (filter_values.softskills) {
		// 						if (workdata[i][j] === filter_values.softskills) is_suitable_softskills = true;
		// 					}
		// 					else is_suitable_softskills = true;
		// 				}
		// 				else if (rezult_field[k].value === 'risk') {
		// 					is_suitable_risk = false;
		// 					if (filter_values.risk) {
		// 						if (workdata[i][j] === filter_values.risk) is_suitable_risk = true;
		// 					}
		// 					else is_suitable_risk = true;
		// 				}
		// 				else if (rezult_field[k].value === 'educationlv') {
		// 					is_suitable_educationlv = false;
		// 					if (filter_values.educationlv) {
		// 						if (workdata[i][j] === filter_values.educationlv) is_suitable_educationlv = true;
		// 					}
		// 					else is_suitable_educationlv = true;
		// 				}
		// 			}
		// 		}
		// 	}
		// 	// console.log(is_suitable_experience);
		// 	if (is_suitable_skill && is_suitable_area && is_suitable_education && is_suitable_experience && is_suitable_analytics && is_suitable_softwarebl && is_suitable_datamgmt && is_suitable_programming && is_suitable_itsystem && is_suitable_softskills && is_suitable_risk && is_suitable_educationlv) rezult_array.push(workdata[i]);
		// }
		// rezult_array.unshift(workdata[0]);
		// renderTable(rezult_array, "table-go");
	});

	//Behavior of button Search
	$('#search').on('click', function () {
		if ($('#table-go').children().length != 0) {
			if ($('#search-input').val() === "") alert('Enter a name for the search');else if (workdata.length === 0) alert('Please wait, the data is not yet loaded!');else {
				var query = $('#search-input').val().toLowerCase(),
				    n = void 0,
				    search_rezult = [];
				for (var i = 0; i < workdata[0].length; i++) {
					if (workdata[0][i].toLowerCase() === 'name') n = i;
				}
				for (var _i5 = 1; _i5 < workdata.length; _i5++) {
					if (workdata[_i5][n].toLowerCase().indexOf(query) != -1) search_rezult.push(workdata[_i5]);
				}
				search_rezult.unshift(workdata[0]);
				renderTable(search_rezult, "table-search");
			}
		} else alert('Missing search fields');
	});

	//Render the table
	var renderTable = function renderTable(workarray, id) {
		if (workarray.length > 0) {
			var thead = '<thead>',
			    tbody = '<tbody>';
			for (var i = 0; i < workarray.length; i++) {
				if (i === 0) thead += '<tr>';else tbody += '<tr>';
				if (workarray[i]) {
					for (var j = 0; j < workarray[i].length; j++) {
						if (i === 0) {
							thead += '<th>' + (workarray[i][j].charAt(0).toUpperCase() + workarray[i][j].substr(1).toLowerCase()) + '</th>';
						} else {
							tbody += '<td>' + workarray[i][j] + '</td>';
						}
					}
					if (i === 0) thead += '</tr>';else tbody += '</tr>';
				}
			}
			thead += '</thead>';
			tbody += '</tbody>';
			if ($('#' + id).children() != 0) $('#' + id).children().remove();
			$('#' + id).html(thead + tbody);
		}
	};
});