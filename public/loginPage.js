"use strict";

//Для работы с формой регистрации и авторизации
const userForm = new UserForm(); 

//Запрос на авторизацию
//data-объект, который содержит логин и пароль, и который будет передаваться внутри loginFormAction
userForm.loginFormCallback = (data) => {
   console.log('data', data);

  //попытка авторизации
   ApiConnector.login(data, (response) => {
      console.log(response);

      if(response) {
        location.reload();
      } 
      
      userForm.setLoginErrorMessage(response.error);
    });
}


//Запрос на регистрацию
userForm.registerFormCallback = (data) => {
  console.log('data', data);

   ApiConnector.register(data, (response) => {
     console.log(response);

     if(response) {
       location.reload();
     }
       
     userForm.setRegisterErrorMessage(response.error);
   });
}