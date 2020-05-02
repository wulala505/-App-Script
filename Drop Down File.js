var mainWsName = "Master";
var optionsWsName = "Data"
var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(mainWsName);
var wsData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(optionsWsName);
var options = wsData.getRange(3, 1,wsData.getLastRow()-1,4).getValues();
var firstLevelColumn = 1;
var secondLevelColumn = 2;
var thirdLevelColumn = 3;
var forthLevelColumn = 4;

function onEdit(e){
  var activeCell = e.range;
  var val = activeCell.getValue(); 
  var r = activeCell.getRow();
  var c = activeCell.getColumn();
  var wsName = activeCell.getSheet().getName()
  if(wsName == mainWsName && c === firstLevelColumn && r>1){
    applyFirstLevelValidation(val,r);
  } else if(wsName == mainWsName && c === secondLevelColumn && r>1){
    applySecondLevelValidation(val,r);
  } else if(wsName == mainWsName && c === thirdLevelColumn && r>1){
    applythirdLevelValidation(val,r);
  } 
  
  
  
}//end on Edit

function applyFirstLevelValidation(val,r){
    if(val === ""){
      ws.getRange(r, secondLevelColumn).clearContent();
      ws.getRange(r, secondLevelColumn).clearDataValidations();
      ws.getRange(r, thirdLevelColumn).clearContent();
      ws.getRange(r, thirdLevelColumn).clearDataValidations();
      ws.getRange(r, forthLevelColumn).clearContent();
      ws.getRange(r, forthLevelColumn).clearDataValidations();
    } else {
    ws.getRange(r, secondLevelColumn).clearContent();
    ws.getRange(r, thirdLevelColumn).clearContent();
    ws.getRange(r, forthLevelColumn).clearContent();
    var filterOptions = options.filter(function(o){ return o[0] === val });
    var listToApply = filterOptions.map(function(o){ return o[1] });
    var cell = ws.getRange(r, secondLevelColumn)
    applyValidationToCell(listToApply,cell);
    }
}


function applySecondLevelValidation(val,r){
    if(val === ""){
      ws.getRange(r, thirdLevelColumn).clearContent();
      ws.getRange(r, thirdLevelColumn).clearDataValidations();
      ws.getRange(r, forthLevelColumn).clearContent();
      ws.getRange(r, forthLevelColumn).clearDataValidations();
    } else {
    ws.getRange(r, thirdLevelColumn).clearContent();
    var firstLevelColValue = ws.getRange(r, firstLevelColumn).getValue();
    var filterOptions = options.filter(function(o){ return o[0] === firstLevelColValue && o[1] === val });
    var listToApply = filterOptions.map(function(o){ return o[2] });
    var cell = ws.getRange(r, thirdLevelColumn);
    applyValidationToCell(listToApply,cell);
    }

}

function applythirdLevelValidation(val,r){
    if(val === ""){
      ws.getRange(r, forthLevelColumn).clearContent();
      ws.getRange(r, forthLevelColumn).clearDataValidations();
    } else {
    ws.getRange(r, forthLevelColumn).clearContent();
    var firstLevelColValue = ws.getRange(r, firstLevelColumn).getValue();
    var filterOptions = options.filter(function(o){ return o[0] === firstLevelColValue && o[2] === val });
    var listToApply = filterOptions.map(function(o){ return o[3] });
    var cell = ws.getRange(r, forthLevelColumn);
    applyValidationToCell(listToApply,cell);
    }

}



function applyValidationToCell(list,cell){
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Master");

  var rule = SpreadsheetApp
  .newDataValidation()
  .requireValueInList(list)
  .setAllowInvalid(false)
  .build();
  
  cell.setDataValidation(rule);
  

}