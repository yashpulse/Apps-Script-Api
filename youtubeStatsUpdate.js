var ss = SpreadsheetApp.openByUrl("");//Url Of sheets 
var sheet = ss.getSheets()[0];


function updatePoints(){


  
  var values = sheet.getRange(2, 1, sheet.getLastRow(),sheet.getLastColumn()).getValues();
  
  
  for(var i = 0;i < (values.length-1); i++){
    
    
    var id = values[i][0];
    
    var stats = YouTube.Videos.list("statistics",{id: id});
  var like = stats.items[0].statistics.likeCount;
   sheet.getRange('H'+ (i+2)).setValue(like);
  var view = stats.items[0].statistics.viewCount;
   sheet.getRange('I'+ (i+2)).setValue(view);
    var points = ((parseInt(like) * 10) + parseInt(view));
    sheet.getRange('J'+ (i+2)).setValue(points);  

  }  
}
 
