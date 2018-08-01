function ajusteDiaHabil(fecha, tipo) {
  const SATURDAY = 6;
  const SUNDAY = 0;
  let dia = 1000 * 60 * 60 * 24;
  switch (tipo) {
    case "inicio":
      if (fecha.getDay() == SATURDAY) {
        return new Date(fecha.getTime() + (dia * 2));
      } else if (fecha.getDay() == SUNDAY) {
        return new Date(fecha.getTime() + dia);
      } else {
        return fecha;
      }
      break;
    case "fin":
      if (fecha.getDay() == SATURDAY) {
        return new Date(fecha.getTime() - dia);
      } else if (fecha.getDay() == SUNDAY) {
        return new Date(fecha.getTime() - (dia * 2));
      } else {
        return fecha;
      }
      break;
  }
  return fecha;
}

function diasHabilEntreFechas(fechaInicial, fechaFinal) {
  let fecha_start = ajusteDiaHabil(fechaInicial, "inicio");
  let fecha_end = ajusteDiaHabil(fechaFinal, "fin");
  let diff = fecha_end.getTime() - fecha_start.getTime();
  let dias_diff = Math.floor(diff / (1000 * 60 * 60 * 24));
  let semanas = Math.floor(dias_diff / 7) * 2;
  let dias_habiles = (dias_diff - semanas) + 1;
  return dias_habiles;
}
//FIN *************************************

//LA OTRA***********************

function diasHabilesIterativo(fechaInicio,fechaFin){
  let dias_habiles=0;
  let dias_diff = Math.floor((fechaFin.getTime() - fechaInicio.getTime())/(1000*60*60*24));
  var currentday = fechaInicio;

  for(var x=0;x<=dias_diff;x++){
    if (currentday.getDay() != 0 && currentday.getDay() != 6 ){
      dias_habiles++;
    }
    currentday = DateAdd("day",1,currentday);
  }
  return dias_habiles;
}

function DateAdd(timeU, byMany, dateObj) {
  var millisecond = 1;
  var second = millisecond * 1000;
  var minute = second * 60;
  var minute = second * 60;
  var hour = minute * 60;
  var day = hour * 24;

  var newDate;
  var dVal = dateObj.valueOf();
  switch (timeU) {
    case "minute":
      newDate = new Date(dVal + minute * byMany);
      break;
    case "hour":
      newDate = new Date(dVal + hour * byMany);
      break;
    case "day":
      newDate = new Date(dVal + day * byMany);
      break;
  }
  return newDate;
}
//*****************************TEST */

function probarHabiles1(fecha_start, fecha_end) {
  
  var start = 0;
  var end = 0;
  var diff = 0;
  start = Date.now();
  var diasHabiles = diasHabilEntreFechas(fecha_start, fecha_end);
  end = Date.now();
  diff = end - start;
  console.log('Time: ' + diff + ' dias habiles: ' + diasHabiles);
}

function probarHabiles2Iterativo(fecha_start,fecha_end) {
  var start = 0;
  var end = 0;
  var diff = 0;
  start = Date.now();
  var diasHabiles = diasHabilesIterativo(fecha_start, fecha_end);
  end = Date.now();
  diff = end - start;
  console.log('Time: ' + diff + ' dias habiles: ' + diasHabiles);
}

function testDiff(fecha_start, fecha_end) {
  console.log('Iterativo: ');
  probarHabiles2Iterativo(fecha_start, fecha_end);
  console.log('Calculado: ');
  probarHabiles1(fecha_start, fecha_end);
}

testDiff(new Date('1990-07-01 00:00:00'), new Date('4118-07-31 00:00:00'))