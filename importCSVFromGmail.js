function importCSVFromGmail() {

  var threads = GmailApp.search("from:email");
  var message = threads[0].getMessages()[0];
  var attachment = message.getAttachments()[0];

  // Is the attachment a CSV file
  if (attachment.getContentType() === "text/csv") {

    var sheet = SpreadsheetApp.getActiveSheet();
    var csvData = Utilities.parseCsv(attachment.getDataAsString(), ",");

    // Remember to clear the content of the sheet before importing new data
    sheet.clearContents().clearFormats();
    sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);

  }
}