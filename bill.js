var json = {
    "option": [
        { "selected": true, "text": "主题1", "value": "主题1" },
        { "selected": false, "text": "主题2", "value": "主题2" },
        { "selected": false, "text": "主题3", "value": "主题3" },
        { "selected": false, "text": "主题4", "value": "主题4" }

    ]
};

$.each(json, function(i, item) {
    $('<option></option>').val(json[i].option.value).text(json[i].option.text).appendTo($('#subjectSort'));
});
selectpicker 


			if (row.Importance != 0) {
			    var importanceText = ['一般', '重要', '非常重要'];
			    if (row.Importance == 1) {
			        document.getElementById("importance").value = importanceText[0];
			    } else if (row.Importance == 2) {
			        document.getElementById("importance").value = importanceText[1];
			    } else if (row.Importance == 3) {
			        document.getElementById("importance").value = importanceText[2];
			    }
			}
