//downloadXLS
function downloadXLS(fileId) {

  var spreadsheet   = SpreadsheetApp.getActiveSpreadsheet();
  var spreadsheetId = spreadsheet.getId();
  
  //Copy paste value only
  var sourcesSheet = spreadsheet.getSheets()[1];
  var destination = spreadsheet.getSheets()[0]
  sourcesSheet.getRange("A2:X").copyTo(destination.getRange("A2:X"), {contentsOnly:true});
  //
  
  var file = Drive.Files.get(spreadsheetId);
  //var url = 'https://docs.google.com/spreadsheets/d/'+spreadsheetId+'/export?format=xlsx';
  // ONLY Advertisement Performance ,gid=1384053194
  var url = 'https://docs.google.com/spreadsheets/d/'+spreadsheetId+'/export?format=xlsx&gid=1384053194';
  
  var options = {
    headers: {
      Authorization:"Bearer "+ScriptApp.getOAuthToken()
    },
    muteHttpExceptions : true        /// Get failure results
  }
  
  var response = UrlFetchApp.fetch(url, options);
  var status = response.getResponseCode();
  var result = response.getContentText();
  if (status != 200) {
    // Get additional error message info, depending on format
    if (result.toUpperCase().indexOf("<HTML") !== -1) {
      var message = strip_tags(result);
    }
    else if (result.indexOf('errors') != -1) {
      message = JSON.parse(result).error.message;
    }
    throw new Error('Error (' + status + ") " + message );
  }
  
  //create file in Google Drive
  var doc = response.getBlob();
  var dir = DriveApp.getFolderById("1G3la17rmCk6Hdrm0SNd1MpW9_pxBhH0p");  
  var report = dir.createFile(doc).setName(file.title + '.xlsx');
  
  // Fetch the email address and Send Email
  var emailRange = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Email").getRange("A2:A");
  var emailAddress = emailRange.getValues();
  var message = '週報'; // Second column
  var subject = '週報自動發送 Test';
  //MailApp.sendEmail(emailAddress, subject, message);
   
  //GmailApp.sendEmail('allison@datahouse.solutions', 'Test', 'See below.', {attachments:[report]});
  GmailApp.sendEmail(emailAddress, subject, message, {attachments:[report]});
}
