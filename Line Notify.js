// Get the Token from https://notify-bot.line.me/my/
//const LineNotifyToken = 'rkof871FyNAab14neZhWrW6AMsZqW5Ii5PPqV6Rx0dU'; // 顧問群
const LineNotifyToken = 'woRyV25gko4e97fCty5WafAhiL8uOshtpPhXTVUYfJL'; //Test
const Now = new Date();
const Today = Utilities.formatDate(new Date(), "GMT+8", "MM/dd")
//Test:woRyV25gko4e97fCty5WafAhiL8uOshtpPhXTVUYfJL
//EO0hE9P5aEYVdwwr1xN7gqlQnFUBV83mUMS7NyQgMNL

// Get Data from sheet
//function doGet(e) {
  //var url = 'https://docs.google.com/spreadsheets/d/1LL-QT0ISU0FI6Pu5EqJshh64QdBcceblxeA_KBb0jlc/edit#gid=0';
  //var name = '屁屁的逆襲'
  //var SpreadSheet = SpreadsheetApp.openByUrl(url);
  //var sheet = SpreadSheet.getSheets()[0];
  //var data = sheet.getSheetValues(2,1,1,1);
  //Logger.log(data);
//}
//EO0hE9P5aEYVdwwr1xN7gqlQnFUBV83mUMS7NyQgMNL


function SendNotify() {
  var url = 'https://docs.google.com/spreadsheets/d/1LL-QT0ISU0FI6Pu5EqJshh64QdBcceblxeA_KBb0jlc/edit#gid=0';
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  var sheet = SpreadSheet.getSheets()[0];
  var data = sheet.getSheetValues(2,1,1,1);
  var d = data[0];
  var mes = d[0];
  //var NotifyContents = data;    //新增 NotifyContents 存取通知內容
  //Logger.log(Today+mes);
  if (mes) {
    var options =
        {
          "method"  : "post",
          "payload" : {"message" :Today+' 截至目前 : '+ mes},
          "headers" : {"Authorization" : "Bearer " + LineNotifyToken}
        };
    UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
  }
}