var finalText;

var fillerwords = ['like', 'so', 'i mean', 'you know', 'literally', 'actually', 'sort of', 'thing', 'stuff'];

var fillerwordsUsedSoFar = {};


function startWatson() {


  fetch('/api/speech-to-text/token')
  .then(function(response) {
      return response.text();
  }).then(function (token) {

    stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
        token: token,
        outputElement: '#watson-output' // CSS selector or DOM Element
    });

    stream.on('error', function(err) {
        console.log(err);
    });

    stream.on('data', function(result){
      if (result.final)
      {
        finalText += " " + result.alternatives[0].transcript;
        countFillerWords(finalText);
      }
    });

  }).catch(function(error) {
      console.log(error);
  });
};


function countFillerWords(original) {
    
    var textArray = original.split(" ");
  
    var i;
    for (i = 0; i<textArray.length; i++)
    {
      var index = fillerwords.indexOf(textArray[i]);
      if (index > -1)
      {
        if (!fillerwordsUsedSoFar[fillerwords[i]]) {
                fillerwordsUsedSoFar[fillerwords[i]] = 1;
            } else {
                fillerwordsUsedSoFar[fillerwords[i]] = fillerwordsUsedSoFar[fillerwords[i]] + 1;
            }
      }
    }
      }




function stopWatson() {
 
   stream.stop();

   var hist = getWordHistogramFor(finalText);

   var AllWords_sortable = [];
   for (var word in hist) {
        AllWords_sortable.push([word, hist[word]]);
    }

    // sort the AllWords array
    AllWords_sortable.sort(function (a, b) {
        return b[1] - a[1]
    });

    var AllWordsHist_forChart = [];
    for (var i = 0; i < AllWords_sortable.length; i++) {
        AllWordsHist_forChart.push({
            y: AllWords_sortable[i][1],
            label: "" + AllWords_sortable[i][1],
            indexLabel: AllWords_sortable[i][0]
        });

        if (i >= 9) break; // don't keep track of words after the first 10-most used
    }

    AllWordsHist_forChart.reverse();

    $("#watson-allWordGraph").CanvasJSChart({ //Pass chart options
        title: {
            text: "Your top 10 words",
            fontFamily: 'Oswald',
            fontColor: "#555555",
            fontWeight: 300,
            fontSize: 28

        },
        animationEnabled: true,
        axisY: {
            tickThickness: 0,
            lineThickness: 0,
            valueFormatString: " ",
            gridThickness: 0
        },
        axisX: {
            tickThickness: 0,
            lineThickness: 0,
            labelFontSize: 18,
            labelFontColor: "Peru"

        },
        data: [
            {
                indexLabelFontSize: 14,
                toolTipContent: "<span style='\"'color: {color};'\"'><strong>{indexLabel}  </strong></span><span style='\"'font-size: 20px; color:peru '\"'><strong>{y}</strong></span>",

                indexLabelPlacement: "inside",
                indexLabelFontColor: "white",
                indexLabelFontWeight: 300,
                indexLabelFontFamily: "Helvetica Neue",
                color: "#999",
                type: "bar",
                dataPoints: AllWordsHist_forChart
            }
        ]

    });



    var FillerWords_sortable = [];
    for (var word in fillerwordsUsedSoFar) {
        FillerWords_sortable.push([word, fillerwordsUsedSoFar[word]]);
    }
    FillerWords_sortable.sort(function (a, b) {
        return a[1] - b[1]
    });

    var FillerWordsHist_forChart = [];
    for (var i = 0; i < FillerWords_sortable.length; i++) {
        FillerWordsHist_forChart.push({
            y: FillerWords_sortable[i][1],
            label: "" + FillerWords_sortable[i][1],
            indexLabel: FillerWords_sortable[i][0]
        });
    }

    $("#watson-fillerWordGraph").CanvasJSChart({ //Pass chart options
        title: {
            text: "Filler words you used",
            fontFamily: 'Oswald',
            fontColor: "#555555",
            fontWeight: 300,
            fontSize: 28

        },
        animationEnabled: true,
        axisY: {
            tickThickness: 0,
            lineThickness: 0,
            valueFormatString: " ",
            gridThickness: 0
        },
        axisX: {
            tickThickness: 0,
            lineThickness: 0,
            labelFontSize: 18,
            labelFontColor: "Peru"

        },
        data: [
            {
                indexLabelFontSize: 14,
                toolTipContent: "<span style='\"'color: {color};'\"'><strong>{indexLabel}  </strong></span><span style='\"'font-size: 20px; color:peru '\"'><strong>{y}</strong></span>",

                indexLabelPlacement: "inside",
                indexLabelFontColor: "white",
                indexLabelFontWeight: 300,
                indexLabelFontFamily: "Helvetica Neue",
                color: "#62C9C3",
                type: "bar",
                dataPoints: FillerWordsHist_forChart
            }
        ]

    });


    $("#watson-fillerWordGraph").show();
    $("#watson-allWordGraph").show();

};