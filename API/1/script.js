
function clearTable() {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }
  

  function deleteItem(key) {
    localStorage.removeItem(key);
  }
  

  function updateTable() {
    clearTable();
    const dataFromStorage = []; 
    const tbody = document.querySelector('tbody');
  
    if (dataFromStorage.length === 0) {
      const emptyRow = document.createElement('tr');
      const emptyHeader = document.createElement('td');
      emptyHeader.textContent = 'emptyHeader';
      emptyRow.appendChild(emptyHeader);
      tbody.appendChild(emptyRow);
    } else {
      dataFromStorage.forEach(item => {
        const row = document.createElement('tr');

        Object.values(item).forEach(value => {
          const cell = document.createElement('td');
          cell.textContent = value;
          row.appendChild(cell);
        });
  
 
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'X';
        deleteButton.onclick = function() {
          deleteItem(item.key); 
        };
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
  
        tbody.appendChild(row);
      });
    }
  }
  
  window.onload = function() {
    updateTable();
  };
  

  let currentStorage;

function getStorage() {

  currentStorage = localStorage; 

  updateTable();
}


function saveItem(key, value) {
    
    currentStorage.setItem(key, value);
  
    
    updateTable();
  }
  

  function deleteItem(key) {
   
    const confirmDelete = confirm("Вы уверены, что хотите удалить эту запись?");
  
    if (confirmDelete) {

      currentStorage.removeItem(key);
  
      updateTable();
    }
  }

  function clearStorage() {
    const confirmClear = confirm("Вы уверены, что хотите полностью очистить локальное хранилище?");
    if (confirmClear) {
      currentStorage.clear();
      updateTable();
    }
  }
  
  