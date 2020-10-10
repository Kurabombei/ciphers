// Глобальні змінні

var charObject = {
	char: " ",
	counter: 0
};



function caesarShift(str, amount) {
	// Піднімаю кількість
	if (amount < 0) {
		return caesarShift(str, amount + 26);
	}

	// Текст результат
	var output = "";

	// Проходжусь по кожній літері
	for (var i = 0; i < str.length; i++) {
		var character = str[i];

		// Якщо літера то дістаю її код з ASCII
		if (character.match(/[a-z]/i)) {
			var code = str.charCodeAt(i);

			// Великі літери
			if (code >= 65 && code <= 90) {
				character = String.fromCharCode(((code - 65 + amount) % 26) + 65);
			}

			// Маленькі літери
			else if (code >= 97 && code <= 122) {
				character = String.fromCharCode(((code - 97 + amount) % 26) + 97);
			}
		}

		// Добавляємо в результат дану букву
		output += character;
	}

	// Вивід 
	return output;
};

function getFrequencyOf1(text) {

	var freq = {};
	for (var i = 0; i < text.length; i++) {
		var character = text.charAt(i);
		//		console.log(character);
		// ######ЯКЩО БЕЗ ПРОБІЛІВ
		if (character == " ") {
			continue;
		}
		if (freq[character]) {
			freq[character]++;
		} else {
			freq[character] = 1;
		}

	}
	console.log(freq);
	return freq;
}

function getFrequencyOf2(text) {

	var freq2 = {};
	for (var i = 0; i < text.length; i++) {
		var character = text.charAt(i);
		var character2 = text.charAt(i + 1);

		// ######ЯКЩО БЕЗ ПРОБІЛІВ
		//		if(character == " " || character2 == " "){
		//			continue;
		//		}
		character = character.concat("", character2);
		//		console.log(character+character2);

		if (freq2[character]) {
			freq2[character]++;
		} else {
			freq2[character] = 1;
		}

	}
	console.log(freq2);
	return freq2;
}

function getFrequencyOf3(text) {

	var freq3 = {};
	for (var i = 0; i < text.length; i++) {
		var character = text.charAt(i);
		var character2 = text.charAt(i + 1);
		var character3 = text.charAt(i + 2);

		//		if(character == " " || character2 == " " || character3 == " "){
		//			continue;
		//		}

		character = character.concat("", character2, character3);
		//		console.log(character+character2+character3);

		if (freq3[character]) {
			freq3[character]++;
		} else {
			freq3[character] = 1;
		}

	}
	console.log(freq3);
	return freq3;
}

function getFrequencyOf4(text) {

	var freq4 = {};
	for (var i = 0; i < text.length; i++) {
		var character = text.charAt(i);
		var character2 = text.charAt(i + 1);
		var character3 = text.charAt(i + 2);
		var character4 = text.charAt(i + 3);
		//		if(character == " " || character2 == " " || character3 == " " || character4 == " "){
		//			continue;
		//		}
		character = character.concat("", character2, character3, character4);
		//		console.log(character+character2+character3);

		if (freq4[character]) {
			freq4[character]++;
		} else {
			freq4[character] = 1;
		}

	}
	console.log(freq4);
	return freq4;
}

function analizeText() {

	var lowered_text = document.getElementById("crypt_message").value.toLowerCase();
	var no_enter_text = lowered_text.replace(/\n/g, '');
	var text = no_enter_text.replace(/ /g, '_');

	var freq1 = getFrequencyOf1(text);
	var freq2 = getFrequencyOf2(text);
	var freq3 = getFrequencyOf3(text);
	var freq4 = getFrequencyOf4(text);

	var data = [{
		x: Object.keys(freq1),
		y: Object.values(freq1),
		type: 'bar',
	}];

	var config = {
		displaylogo: false,
  modeBarButtonsToAdd: [
  		{
  			name: 'Сортувати по алфавіту',
  			icon: Plotly.Icons.tooltip_basic,
  			click: function (gd) {
//  				var newColor = colors[Math.floor(3 * Math.random())]
//  				Plotly.restyle(gd, )
  			}
  		},
  		{
  			name: 'Сортувати від найбільшого',
  			icon: Plotly.Icons.tooltip_compare,
  			direction: 'up',
  			click: function (gd) {
  				alert('button1')
  			}
  		}],
  	modeBarButtonsToRemove: ['lasso2d', 'resetScale2d']
  }
  var layout = {
  	title: 'Гістограма для одного символу:',
  	showlegend: false
  };
function getData(freq) {
	console.log(freq);

//	data_to_sort.sort(function (a, b) {
//		return a.counter - b.counter;
//	});
	var items = Object.keys(freq).map(function (key) {
		return [key, freq[key]];
	});
	console.log(items);

	items.sort(function (first, second) {
		return second[1] - first[1];
	});
	console.log(items);

	var data_returned = [{
		x: Object.keys(freq),//Object.keys(freq) ## TODO ДОБАВИТИ ITEMS СЮДИ ЯК ДАНІ З МАСИВУ
		y: Object.values(freq),//Object.values(freq)
		type: 'bar',
		}];
	return data_returned;
}
	var data = getData(freq1);
	console.log(data);
	Plotly.newPlot('diagram1', data, layout, config);
	layout = {
		title: 'Гістограма для біграм:',
		showlegend: false
	};
	Plotly.newPlot('diagram2', getData(freq2), layout, config);
	layout = {
		title: 'Гістограма для трьохграм:',
		showlegend: false
	};
	Plotly.newPlot('diagram3', getData(freq3), layout, config);
	layout = {
		title: 'Гістограма для чотирьохграм:',
		showlegend: false
	};
	Plotly.newPlot('diagram4', getData(freq4), layout, config);

}


function runEncryption() {
	var shift = Number(document.getElementById("shift_number").value);
	var text = document.getElementById("crypt_message").value;
	document.getElementById("crypt_result").value = caesarShift(text, shift);
}

function runDecryption() {
	var shift = Number(document.getElementById("shift_number").value);
	var text = document.getElementById("crypt_message").value;
	document.getElementById("crypt_result").value = caesarShift(text, 0 - shift);
}