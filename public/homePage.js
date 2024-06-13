const logoutButton = new LogoutButton();

//ВЫХОД ИЗ ЛИЧНОГО КАБИНЕТА
logoutButton.action = () => {
    ApiConnector.logout(response => {
       console.log(response);
 
       if(response) {
         location.reload();
       }
     });
 }

//ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ                                    
ApiConnector.current(response => {
      console.log(response);
      if(response) {
        ProfileWidget.showProfile(response.data);
      }
});    


//ПОЛУЧЕНИЕ ТЕКУЩИХ КУРСОВ ВАЛЮТ
const ratesBoard = new RatesBoard();

func = () => {
  ApiConnector.getStocks(response => {
    if(response) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

func();

setInterval(() => func(), 60000);



//ОПЕРАЦИИ С ДЕНЬГАМИ
const moneyManager = new MoneyManager();

//пополнение баланса
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, response => {
    console.log(response);

    if(response.success) {
      ProfileWidget.showProfile(response.data); 
      moneyManager.setMessage(true, "Денежные средства зачислены на баланс");
    } else {      
      moneyManager.setMessage(false, response.error);
    }
  });
}

//конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, response => {
    console.log(response);

    if(response.success) {
      ProfileWidget.showProfile(response.data); 
      moneyManager.setMessage(true, "Валюта сконвертирована");
    } else {          
      moneyManager.setMessage(false, response.error);
    }
  });
}

//перевод валюты
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, response => {
    console.log(response);

    if(response.success) {
      ProfileWidget.showProfile(response.data); 
      moneyManager.setMessage(true, "Перевод совершен");
    } else {          
      moneyManager.setMessage(false, response.error);
    }
  });
}

//РАБОТА С ИЗБРАННЫМ
const favoritesWidget = new FavoritesWidget();

//Запрос на начальный список избранного
ApiConnector.getFavorites(response => {
  console.log(response);
  if(response) {
    favoritesWidget.clearTable();               
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

//Добавление пользователя в список избранного
favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, response => {
    console.log(response);
    if(response.success) {
      favoritesWidget.clearTable();               
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, "Пользователь добавлен в список избранного");
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
}

//Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, response => {
    console.log(response);
    if(response.success) {
      favoritesWidget.clearTable();               
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, "Пользователь удален из списка избранного");
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
}