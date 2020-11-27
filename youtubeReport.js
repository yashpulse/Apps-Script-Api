//This Script creates spreadsheet containing users channel metrics
function createReport() {
  // Retrieve info about the user's YouTube channel.
  var channels = YouTube.Channels.list('id,contentDetails', {
    mine: true
  });
  var channelId = channels.items[0].id;


  var oneMonthInMillis = 1000 * 60 * 60 * 24 * 30;
  var today = new Date();
  var lastMonth = new Date(today.getTime() - oneMonthInMillis);

  var metrics = [
    'views',
    'estimatedMinutesWatched',
    'averageViewDuration',
    'subscribersGained'
  ];
  var result = YouTubeAnalytics.Reports.query({
    ids: 'channel==' + channelId,
    startDate: formatDateString(lastMonth),
    endDate: formatDateString(today),
    metrics: metrics.join(','),
    dimensions: 'day',
    sort: 'day'
  });

  if (result.rows) {
    var spreadsheet = SpreadsheetApp.create('YouTube Analytics Report');
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = result.columnHeaders.map(function(columnHeader) {
      return formatColumnName(columnHeader.name);
    });
    sheet.appendRow(headers);

    // Append the results.
    sheet.getRange(2, 1, result.rows.length, headers.length)
        .setValues(result.rows);

    Logger.log('Report spreadsheet created: %s',
        spreadsheet.getUrl());
  } else {
    Logger.log('No rows returned.');
  }
}


function formatDateString(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}


function formatColumnName(columnName) {
  var name = columnName.replace(/([a-z])([A-Z])/g, '$1 $2');
  name = name.slice(0, 1).toUpperCase() + name.slice(1);
  return name;
}
