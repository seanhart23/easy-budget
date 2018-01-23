var sumPlannedIncome  = 0,
    sumActualIncome   = 0,
    sumPlannedExpense = 0,
    sumActualExpense  = 0,
    $;

$('.plannedIncomeTotal').each(function(){
    sumPlannedIncome += parseFloat($(this).text());
});

$('.actualIncomeTotal').each(function(){
    sumActualIncome += parseFloat($(this).text());
});

$('.plannedExpenseTotal').each(function(){
    sumPlannedExpense += parseFloat($(this).text());
});

$('.actualExpenseTotal').each(function(){
    sumActualExpense += parseFloat($(this).text());
});

document.getElementById('totalPlannedIncome').innerHTML = sumPlannedIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
document.getElementById('totalActualIncome').innerHTML = sumActualIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
document.getElementById('totalPlannedExpense').innerHTML = sumPlannedExpense.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
document.getElementById('totalActualExpense').innerHTML = sumActualExpense.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
document.getElementById('totalPlannedVariance').innerHTML = (sumPlannedExpense - sumPlannedIncome).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
document.getElementById('totalActualVariance').innerHTML = (sumActualExpense - sumPlannedIncome).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

function sortTable(n, name) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(name);
  switching = true;
  dir = "asc"; 
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (+x.innerHTML > +y.innerHTML) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (+x.innerHTML < +y.innerHTML) {
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++; 
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

sortTable(0, 'income');
sortTable(0, 'FixedExpense');
sortTable(0, 'VariableExpense');
sortTable(0, 'Debt');
sortTable(0, 'OtherEexpense');