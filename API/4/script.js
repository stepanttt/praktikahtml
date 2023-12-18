
const request = indexedDB.open('myDatabase', 1);
let db;

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  
  if (!db.objectStoreNames.contains('tableName')) {
    const objectStore = db.createObjectStore('tableName', { keyPath: 'id', autoIncrement: true });
  }
};

request.onsuccess = function(event) {
  db = event.target.result;
};

request.onerror = function(event) {
  console.error('Ошибка при открытии базы данных:', event.target.errorCode);
};


function updateTable() {
    const table = document.getElementById('yourTableId'); 
    const tbody = table.getElementsByTagName('tbody')[0];
  
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  

    const transaction = db.transaction(['tableName'], 'readonly');
    const objectStore = transaction.objectStore('tableName');
    const request = objectStore.getAll();
  
    request.onsuccess = function(event) {
      const data = event.target.result;
      data.forEach(function(item) {
        const row = tbody.insertRow();
  
        const cell1 = row.insertCell(0);
        cell1.textContent = item.column1Data;
  
        const cell2 = row.insertCell(1);
        cell2.textContent = item.column2Data;
  
    
        const editCell = row.insertCell(2);
        const editSpan = document.createElement('span');
        editSpan.classList.add('action');
        editSpan.setAttribute('onclick', `updateItem("${item.key}")`);
        editSpan.textContent = 'Изменить';
        editCell.appendChild(editSpan);
  
        // Создание ячейки "Удалить"
        const deleteCell = row.insertCell(3);
        const deleteSpan = document.createElement('span');
        deleteSpan.classList.add('action');
        deleteSpan.setAttribute('onclick', `deleteItem("${item.key}")`);
        deleteSpan.textContent = 'Удалить';
        deleteCell.appendChild(deleteSpan);
  
 
        cell1.contentEditable = true;
        cell2.contentEditable = true;
      });
    };
  
    transaction.onerror = function(event) {
      console.error('Ошибка чтения из базы данных:', event.target.errorCode);
    };
  }
  

  function saveItem() {
    const value1 = document.getElementById('input1').value; 
    const value2 = document.getElementById('input2').value;
  
    const transaction = db.transaction(['tableName'], 'readwrite');
    const objectStore = transaction.objectStore('tableName');
  
   
    const newItem = {
      column1Data: value1,
      column2Data: value2
    };
  
    const request = objectStore.add(newItem);
  
    request.onsuccess = function() {
 
      updateTable();
    };
  
    request.onerror = function(event) {
      console.error('Ошибка при сохранении в базу данных:', event.target.errorCode);
    };
  }
  

  function updateItem(key) {
    const transaction = db.transaction(['tableName'], 'readwrite');
    const objectStore = transaction.objectStore('tableName');
  


    const request = objectStore.get(key);
  
    request.onsuccess = function(event) {

      const item = event.target.result;
  
      item.column1Data = 'Новое значение 1';
      item.column2Data = 'Новое значение 2';
  
   
      const updateRequest = objectStore.put(item, key);
  
      updateRequest.onsuccess = function() {
       
        updateTable();
      };
  
      updateRequest.onerror = function(event) {
        console.error('Ошибка при обновлении записи:', event.target.errorCode);
      };
    };
  
    request.onerror = function(event) {
      console.error('Ошибка при получении записи:', event.target.errorCode);
    };
  }
  

  function deleteItem(key) {
    const transaction = db.transaction(['tableName'], 'readwrite');
    const objectStore = transaction.objectStore('tableName');
  
   
    const request = objectStore.delete(key);
  
    request.onsuccess = function() {
      updateTable();
    };
  
    request.onerror = function(event) {
      console.error('Ошибка при удалении записи:', event.target.errorCode);
    };
  }
  