// Глобальні змінні

var charObject = {
	char: " ",
	counter: 0
};

var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", ".", ",", ";", "-", "'"];
var found_shift = 27;
var flag = 0;

function randomColor(brightness) {
	function randomChannel(brightness) {
		var r = 255 - brightness;
		var n = 0 | ((Math.random() * r) + brightness);
		var s = n.toString(16);
		return (s.length == 1) ? '0' + s : s;
	}
	var res = '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
	return res.slice(0, 7);
}

function encrypt(character, shift) {

	if (alphabet.includes(character.toUpperCase())) {
		const position = alphabet.indexOf(character.toUpperCase());
		const newPosition = (position + shift) % 32;
		return alphabet[newPosition];
	} else {
		return character;
	}
}

function getFrequencyOf1(text) {

	var freq = new Map();
	for (var i = 0; i < text.length; i++) {
		var character = text.charAt(i);
		if (freq.has(character)) {
			freq.set(character.toString(), freq.get(character) + 1);
		} else {
			freq.set(character, 1);
		}
	}
	return freq;
}

function findShift(str) {
	var result = 0;
	var max = 0;
	var res = getFrequencyOf1(str);
	var mapAsc = new Map([...res.entries()].sort((e1, e2) => e2[1] - e1[1]));
	var x = Array.from(mapAsc.keys())[0];
	var shiftNum = (32 + alphabet.indexOf(x.toUpperCase()) - 26) % 32;
	var alphabetcheck = "ABCDEFGHIJKLMNOPQRSTUVWXYZ .,;-'";
	var alphabet_area = document.getElementById("crypt_alphabet");
	var alphabet_area2 = document.getElementById("crypt_alphabet2");
	alphabet_area.innerHTML = alphabetcheck;

	document.getElementById("crypt_shift").innerHTML = x;
	document.getElementById("crypt_shift_number").innerHTML = shiftNum;

	console.log("The most repetetive char is " + x);

	return result;
}

function caesarShift(str, amount) {
	// Піднімаю кількість
	if (amount < 0) {
		return caesarShift(str, amount + 32);
	}

	// Текст результат
	var output = "";

	// Проходжусь по кожній літері
	for (var i = 0; i < str.length; i++) {
		var character = str[i];
		character = encrypt(character, amount);
		// Добавляємо в результат дану букву
		output += character;
	}
	// Вивід 
	return output.toLowerCase();
}

function getFrequencyOf2(text) {

	var freq2 = new Map();
	for (var i = 0; i < text.length; i++) {
		var character = text.charAt(i);
		var character2 = text.charAt(i + 1);

		character = character.concat("", character2);
		//		console.log(character+character2);

		if (freq2.has(character)) {
			freq2.set(character, freq2.get(character) + 1);
		} else {
			freq2.set(character, 1);
		}

	}
	return freq2;
}

function getFrequencyOf3(text) {

	let freq3 = new Map();
	for (var i = 0; i < text.length; i++) {
		var character = text.charAt(i);
		var character2 = text.charAt(i + 1);
		var character3 = text.charAt(i + 2);
		character = character.concat("", character2, character3);

		if (freq3.has(character)) {
			freq3.set(character, freq3.get(character) + 1);
		} else {
			freq3.set(character, 1);
		}

	}
	return freq3;
}

function getFrequencyOf4(text) {

	let freq4 = new Map(); // var freq4 = {}
	for (var i = 0; i < text.length; i++) {
		var character = text.charAt(i);
		var character2 = text.charAt(i + 1);
		var character3 = text.charAt(i + 2);
		var character4 = text.charAt(i + 3);
		character = character.concat("", character2, character3, character4);

		if (freq4.has(character)) {
			freq4.set(character, freq4.get(character) + 1);
		} else {
			freq4.set(character, 1);
		}

	}
	return freq4;
}

// Sorts a map alphabetically, returns an object in array. Input a map of symbol: it's frequency; output an array with 1 object from map with x: map.keys(); y: map.values(); type:'bar';
function getData(freq) {

	var mapAsc = new Map([...freq.entries()].sort());

	var data_returned = [{
		x: Array.from(mapAsc.keys()), //Object.keys(freq)  x_coords 
		y: Array.from(mapAsc.values()), //Object.values(freq) y_coords
		type: 'bar',
	}];
	console.log(mapAsc.entries());
	return data_returned;
}

// Sorts a map by frequency, returns an object in array with spliced arrays with lenght of 15. Input a map of symbol: it's frequency; output an array with 1 object from map with x: map.keys(); y: map.values(); type:'bar';
function getDataForAscendingOrder(freq) {

	var mapAsc = new Map([...freq.entries()].sort((e1, e2) => e2[1] - e1[1]));

	var data_returned = [{
		x: Array.from(mapAsc.keys()).splice(0, 14), //Object.keys(freq)  x_coords ## TODO ДОБАВИТИ ITEMS СЮДИ ЯК ДАНІ З МАСИВУ
		y: Array.from(mapAsc.values()).splice(0, 14), //Object.values(freq) y_coords
		type: 'bar',
	}];
	return data_returned;
}

// Sorts a map by frequency, returns an object in array. Input a map of symbol: it's frequency; output an array with 1 object from map with x: map.keys(); y: map.values(); type:'bar';
function getDataForAscendingOrderForFreq1(freq) {

	var mapAsc = new Map([...freq.entries()].sort((e1, e2) => e2[1] - e1[1]));
	var data_returned = [{
		x: Array.from(mapAsc.keys()), //Object.keys(freq)  x_coords 
		y: Array.from(mapAsc.values()), //Object.values(freq) y_coords
		type: 'bar',
	}];

	return data_returned;
}

// Changes a symbol, which is inserted into a #wordToChange textarea to a symbol, inserted in #wordToChangeTo textarea 
function changeSymbols(char) {
	var charToChange = document.getElementById("wordToChange").value.toLowerCase();
	var charToChangeTo = document.getElementById("wordToChangeTo").value.toLowerCase();
	if (char == " ") {
		return "_";
	} else if (char == charToChange) {
		return charToChangeTo.toUpperCase();
	}
	return char;
}

// Checks if a string is all UpperCase, used to check in analizeText2 the already formatted items
function isUpperCase(str) {
	return str === str.toUpperCase();
}

// Used to help a specialist to solve the cypher by changing 1 by 1 symbols in a text.
function analizeText2() {
	var lowered_text = document.getElementById("crypt_message2").value; // .toLowerCase()
	var no_enter_text = lowered_text.replace(/\n/g, '');
	//	var text = no_enter_text.replace(/ /g, '_');
	var text = no_enter_text;
	var output = "";

	for (var i = 0; i < text.length; i++) {
		var character = text[i];

		if (isUpperCase(character)) {
			console.log(character);
		} else {
			character = changeSymbols(character);
		}
		// Добавляємо в результат дану букву
		output += character;
	}
	document.getElementById("crypt_message2").value = output;
}

function analizeText() {


	var lowered_text = document.getElementById("crypt_message").value.toLowerCase();
	var no_enter_text = lowered_text.replace(/\n/g, '');
	var text = no_enter_text.replace(/ /g, '_');

	var freq1 = getFrequencyOf1(text);
	var freq2 = getFrequencyOf2(text);
	var freq3 = getFrequencyOf3(text);
	var freq4 = getFrequencyOf4(text);
	alphabetcheck = "ABCDEFGHIJKLMNOPQRSTUVWXYZ .,;-'";
	found_shift = findShift(text);



	caesarShift(alphabetcheck, found_shift);
	//	showAlphabet(freq1);
	var mapForColor = new Map([...freq1.entries()].sort((e1, e2) => e2[1] - e1[1]));

	for (var i = 0; i < freq1.entries().length; i++) {
		if (aphabet[i] == mapForColor.keys().next().value) {
			found_shift = (32 + i - 26) % 32;
		}
	}
	var data = [{
		x: Array.from(freq1.keys()),
		y: Array.from(freq1.values()),
		type: 'bar',
	}];

	var config = {
		displaylogo: false,
		modeBarButtonsToRemove: ['lasso2d', 'resetScale2d']
	}
	// Один символ
	var layout = {
		title: 'Гістограма для одного символу (за алфавітом):',
		showlegend: false,
		yaxis: {
			autotick: true, // false for 1st
			ticks: 'outside',
			tick0: 0,
			dtick: 5 // 50/5 for 1st lab/2nd lab
		}
	};
	Plotly.newPlot('diagram12', getData(freq1), layout, config);
	layout = {
		title: 'Гістограма для одного символу (за спаданням):',
		showlegend: false,
		yaxis: {
			autotick: true, // false for 1st
			ticks: 'outside',
			tick0: 0,
			dtick: 5 // 50/5 for 1st lab/2nd lab
		}
	};
	Plotly.newPlot('diagram13', getDataForAscendingOrderForFreq1(freq1), layout, config);

	layout = {
		title: 'Гістограма для біграм (за спаданням):',
		showlegend: false,
		yaxis: {
			autotick: false,
			ticks: 'outside',
			tick0: 0,
			dtick: 1
		}
	};
	Plotly.newPlot('diagram22', getDataForAscendingOrder(freq2), layout, config);

	layout = {
		title: 'Гістограма для триграм (за спаданням):',
		showlegend: false,
		yaxis: {
			autotick: true,
			ticks: 'outside',
			tick0: 0,
			dtick: 5
		}
	};
	Plotly.newPlot('diagram32', getDataForAscendingOrder(freq3), layout, config);

	layout = {
		title: 'Гістограма для чотириграм (за спаданням):',
		showlegend: false,
		yaxis: {
			autotick: true,
			ticks: 'outside',
			tick0: 0,
			dtick: 5
		}
	};
	Plotly.newPlot('diagram42', getDataForAscendingOrder(freq4), layout, config);
}

function performMark() {
	var markInstance = new Mark(document.getElementById("crypt_result"));
	var keywordInput = document.getElementById("keyword");
	if (keywordInput) {
		keywordInput.addEventListener("input", performMark);
	}
	// Read the keyword
	var keyword = keywordInput.value;
	markInstance.mark(keyword, options);

	// Determine selected options
	var options = {
		"element": "span",
		"className": "markIt"
	};
	// Remove previous marked elements and mark
	// the new keyword inside the context
	markInstance.unmark({
		done: function () {
			markInstance.mark(keyword, options);
		}
	});
}


function showAlphabet() {
	var alphabetString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ .,;-'";
	//	document.getElementById("crypt_alphabet2").value = alphabetString;
	//	document.getElementById("crypt_alphabet").value = alphabetString;
}

function runEncryption() {
	var shift = Number(document.getElementById("shift_number").value);
	var text = document.getElementById("crypt_message").value;
	var textToColor = caesarShift(text, shift);
	var shiftNumber = findShift(textToColor);
	var myTextFieldWords = textToColor.split(' ');
	console.log(myTextFieldWords);
	var formattedWords = myTextFieldWords.map(function (word) {
		//var color = "#ff0000"; should be
		return '<span style ="color: ' + randomColor(115) + ';">' + word + '</span>';
	});
	var result = formattedWords.join(' ');
	document.getElementById("crypt_result").innerHTML = result;
}

function runDecryption() {
	var shift = Number(document.getElementById("shift_number").value);
	var text = document.getElementById("crypt_message").value;
	var textArr = text.split(' ');
	var res = findShift(text);

	document.getElementById("crypt_result").innerHTML = caesarShift(text, 0 - shift);
}

function runEncryptionVizener() {
	var lowered_text = document.getElementById("crypt_message3").value; // .toLowerCase()
	var no_enter_text = lowered_text.replace(/\n/g, '');
	var text = no_enter_text.replace(/ /g, '_');
	var keyword = document.getElementById("keywordInput").value;
	document.getElementById("crypt_result2").innerHTML = VigenereCipher.encrypt(text, keyword);

}

// used
var VigenereCipher = {

	// or can be named tabulaRecta as in the prep for lab.
	vigenereTable: {
		a: "abcdefghijklmnopqrstuvwxyz_'-,.;",
		b: "bcdefghijklmnopqrstuvwxyz_'-,.;a",
		c: "cdefghijklmnopqrstuvwxyz_'-,.;ab",
		d: "defghijklmnopqrstuvwxyz_'-,.;abc",
		e: "efghijklmnopqrstuvwxyz_'-,.;abcd",
		f: "fghijklmnopqrstuvwxyz_'-,.;abcde",
		g: "ghijklmnopqrstuvwxyz_'-,.;abcdef",
		h: "hijklmnopqrstuvwxyz_'-,.;abcdefg",
		i: "ijklmnopqrstuvwxyz_'-,.;abcdefgh",
		j: "jklmnopqrstuvwxyz_'-,.;abcdefghi",
		k: "klmnopqrstuvwxyz_'-,.;abcdefghij",
		l: "lmnopqrstuvwxyz_'-,.;abcdefghijk",
		m: "mnopqrstuvwxyz_'-,.;abcdefghijkl",
		n: "nopqrstuvwxyz_'-,.;abcdefghijklm",
		o: "opqrstuvwxyz_'-,.;abcdefghijklmn",
		p: "pqrstuvwxyz_'-,.;abcdefghijklmno",
		q: "qrstuvwxyz_'-,.;abcdefghijklmnop",
		r: "rstuvwxyz_'-,.;abcdefghijklmnopq",
		s: "stuvwxyz_'-,.;abcdefghijklmnopqr",
		t: "tuvwxyz_'-,.;abcdefghijklmnopqrs",
		u: "uvwxyz_'-,.;abcdefghijklmnopqrst",
		v: "vwxyz_'-,.;abcdefghijklmnopqrstu",
		w: "wxyz_'-,.;abcdefghijklmnopqrstuv",
		x: "xyz_'-,.;abcdefghijklmnopqrstuvw",
		y: "yz_'-,.;abcdefghijklmnopqrstuvwx",
		z: "z_'-,.;abcdefghijklmnopqrstuvwxy",
		_: "_'-,.;abcdefghijklmnopqrstuvwxyz",
		"'": "'-,.;abcdefghijklmnopqrstuvwxyz_",
		"-": "-,.;abcdefghijklmnopqrstuvwxyz_'",
		",": ",.;abcdefghijklmnopqrstuvwxyz_'-",
		".": ".;abcdefghijklmnopqrstuvwxyz_'-,",
		";": ";abcdefghijklmnopqrstuvwxyz_'-,."
	},

	encrypt: function (plainText, keyword) {
		showAlphabet();
		if (typeof (plainText) !== "string") {
			return "invalid plainText. Must be string, not " + typeof (plainText);
		}
		if (typeof (keyword) !== "string") {
			return "invalid keyword. Must be string, not " + typeof (keyword);
		}

		plainText = plainText.toLowerCase();
		keyword = keyword.match(/[a-z]/gi).join("").toLowerCase();
		var encryptedText = "";
		var specialCharacterCount = 0;

		for (var i = 0; i < plainText.length; i++) {
			var keyLetter = (i - specialCharacterCount) % keyword.length;
			var keywordIndex = VigenereCipher.vigenereTable.a.indexOf(keyword[keyLetter]);

			if (VigenereCipher.vigenereTable[plainText[i]]) {
				encryptedText += VigenereCipher.vigenereTable[plainText[i]][keywordIndex];
			} else {
				encryptedText += plainText[i];
				specialCharacterCount++;
			}
		}

		return encryptedText;
	},

	decrypt: function (encryptedText, keyword) {
		showAlphabet();
		if (typeof (encryptedText) !== "string") {
			return "invalid encryptedText. Must be string, not " + typeof (encryptedText);
		}
		if (typeof (keyword) !== "string") {
			return "invalid keyword. Must be string, not " + typeof (keyword);
		}

		encryptedText = encryptedText.toLowerCase();
		keyword = keyword.match(/[a-z]/gi).join("").toLowerCase();
		var decryptedText = "";
		var specialCharacterCount = 0;

		for (var i = 0; i < encryptedText.length; i++) {
			var keyLetter = (i - specialCharacterCount) % keyword.length;
			var keyRow = VigenereCipher.vigenereTable[keyword[keyLetter]];

			if (keyRow.indexOf(encryptedText[i]) !== -1) {
				decryptedText += VigenereCipher.vigenereTable.a[keyRow.indexOf(encryptedText[i])];
			} else {
				decryptedText += encryptedText[i];
				specialCharacterCount++;
			}
		}
		return decryptedText;
	}

};


function getDataForAscendingOrderForFreqArdvanced(freq, data) {

	var sortingArr = data.keys();
	var mapAsc = new Map([...freq.entries()].sort(function (a, b) {
			return sortingArr.indexOf(a) - sortingArr.indexOf(b);
		}));
		var data_returned = [{
			x: Array.from(mapAsc.keys()), //Object.keys(freq)  x_coords ## TODO ДОБАВИТИ ITEMS СЮДИ ЯК ДАНІ З МАСИВУ
			y: Array.from(mapAsc.values()), //Object.values(freq) y_coords
			type: 'bar',
	}];

		return data_returned;
	}

	function showDiagram() {

		var lowered_text = document.getElementById("crypt_message3").value.toLowerCase();
		var no_enter_text = lowered_text.replace(/\n/g, '');
		var text1 = no_enter_text.replace(/ /g, '_');

		var lowered_text1 = document.getElementById("crypt_result2").innerHTML.toLowerCase();
		var no_enter_text1 = lowered_text1.replace(/\n/g, '');
		var text2 = no_enter_text1.replace(/ /g, '_');


		var freq1 = getFrequencyOf1(text1);
		var freq2 = getFrequencyOf1(text2);

		console.log(freq1);
		console.log(freq2);

		var data1 = getDataForAscendingOrderForFreq1(freq1);
		var data2 = getDataForAscendingOrderForFreqArdvanced(freq2, data1);

		console.log(data1);
		console.log(data2);
		var data = [data1, data2];
		console.log(data);
		var config = {
			displaylogo: false,
			modeBarButtonsToRemove: ['lasso2d', 'resetScale2d']
		}

		// Один символ
		var layout = {
			title: 'Гістограма для одного символу (за алфавітом):',
			showlegend: false,
			yaxis: {
				autotick: true, // false for 1st
				ticks: 'outside',
				tick0: 0,
				dtick: 5 // 50/5 for 1st lab/2nd lab
			}
		};
		Plotly.newPlot('doubleDiagram', data, layout, config);
	}

	function runDecryptionVizener() {
		var lowered_text = document.getElementById("crypt_message3").value; // .toLowerCase()
		var no_enter_text = lowered_text.replace(/\n/g, '');
		var text = no_enter_text.replace(/ /g, '_');
		var keyword = document.getElementById("keywordInput").value;
		document.getElementById("crypt_result2").innerHTML = VigenereCipher.decrypt(text, keyword);

	}
