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
ApiConnector.current = () => {
      console.log(response);
      if(response) {
        ProfileWidget.showProfile(response.data);
      }
};    //не показывает данные текущего пользователя в консоли, так должно быть????


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

    if(response) {
      ProfileWidget.showProfile(response.data); 
    }
      
    moneyManager.setMessage("Ошибка");
  });
}

//конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, response => {
    console.log(response);

    if(response) {
      ProfileWidget.showProfile(response.data); 
    }
          
    moneyManager.setMessage("Ошибка");
  });
}

//перевод валюты
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, response => {
    console.log(response);

    if(response) {
      ProfileWidget.showProfile(response.data); 
    }
          
    moneyManager.setMessage("Ошибка");
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
    if(response) {
      favoritesWidget.clearTable();               
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }

    favoritesWidget.setMessage("Ошибка");
  });
}

//Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, response => {
    console.log(response);
    if(response) {
      favoritesWidget.clearTable();               
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }

    favoritesWidget.setMessage("Ошибка");
  });
}