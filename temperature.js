const nameOfMaxColumn='TMPMAX';
const nameOfMinColumn='TMPMIN';
let array;
let min,max;

function PageManager() {
    $.ajax({ 
    url: 'https://knureigs.github.io/itech/lb/ITech1_Lab3/ITech1_Lab3_2_5_meteo_kh.htm',

     success: function (data) {
        array=data.split('<tr>');
        GetMinMaxTemperature(array);

        $("#minTableLable").html("Days with min temperature");
        insertIntoTable('minTable',min);

        $("#maxTableLable").html("Days with max temperature");
        insertIntoTable('maxTable',max);

        } 
    });
}

function insertIntoTable(tableId,filterValue){
    document.getElementById(`${tableId}`).innerHTML=`<tr>${array[1]}${array.filter(el=>el.includes(filterValue)).join('')}`;
}

function GetIndexOfColumn(columnName){
    return array[1].split('<th>').indexOf(`${columnName}</th>`)
}

function GetMinMaxTemperature(array){

    let maxColumnIndex=GetIndexOfColumn('TMPMAX');
    let minColumnIndex=GetIndexOfColumn('TMPMIN');
    for(let i = 0; i<array.length;i++){
        let maxp = parseFloat(array[i].split('<td>')[maxColumnIndex]);
        let minp = parseFloat(array[i].split('<td>')[minColumnIndex]);

        if(!max||max<maxp){
            max=maxp;
        }
        if(!min||min>minp){
            min=minp;
        }           
     }  
}

