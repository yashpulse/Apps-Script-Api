var dropBoxId = ""; // Drive ID of 'dropbox' folder
var logSheetId = ""; // Drive ID of log spreadsheet

function doPost(e) {

  try{
  
    
    updateSheet(e);
  
   
 
  }catch(e){
  
    return HtmlService.createHtmlOutputFromFile('failed.html').setTitle('Participation Failed');
  }
     return HtmlService.createHtmlOutputFromFile('Passed.html').setTitle('Participation Successful');
  }



function updateSheet(e) {
  try {
    
      var contcateg =JSON.stringify(e.parameters.contcateg).slice(2,-2);
    var phnum =JSON.stringify(e.parameters.phnum).slice(2,-2);
    var city = JSON.stringify(e.parameters.city).slice(2,-2);
    var state = JSON.stringify(e.parameters.state).slice(2,-2);
    var name = JSON.stringify(e.parameters.name).slice(2,-2);
    var addr = JSON.stringify(e.parameters.addr).slice(2,-2);
    var pincde = JSON.stringify(e.parameters.pincde).slice(2,-2);
        var contest = JSON.stringify(e.parameters.contest).slice(2,-2);
    
    
  
  
    var ss = SpreadsheetApp.openById(logSheetId);
    var sheet = ss.getSheets()[0];
    sheet.appendRow([phnum, contest, contcateg, name, addr, city, state, pincde]);

 
  } catch (error) {
    return error.toString();
  }
}
