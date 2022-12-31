///// FORMULARIO DE INGRESO Y REGISTRO
////////// Variables //////////

/* const formRegistro = document.querySelector("#formRegistro");
const userRegistro = document.querySelector("#userRegistro");
const emailRegistro = document.querySelector("#emailRegistro");
const pwRegistro = document.querySelector("#pwRegistro");
const submitRegistro = document.querySelector("#submitRegistro");

const formLogin = document.querySelector("#formLogin")
const emailLogin = document.querySelector("#emailLogin");
const pwLogin = document.querySelector("#pwLogin");
const submitLogin = document.querySelector("#submitLogin");
const error = document.querySelector ("#error");
const error2 = document.querySelector ("#error2");

const usuarios = []

class Usuario {
    constructor(usuario, email, contraseña){
        this.usuario = usuario;
        this.email = email;
        this.contraseña = contraseña;
    }
}
////////// Eventos //////////
formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    if (userRegistro.value != "" && emailRegistro != "" && pwRegistro != ""){
        let newUser = new Usuario(userRegistro.value, emailRegistro.value, pwRegistro.value);
        usuarios.push(newUser);
        console.log (usuarios);
        error2.innerHTML = `Usuario creado correctamente ${userRegistro.value}.`
    }
})

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    for (let user of usuarios){
        if (emailLogin.value == user.email && pwLogin.value == user.contraseña){
            error.innerHTML = ""
            error2.innerHTML = ""
            error.innerHTML = `<p>Ingreso exitoso, bienvenido/a!</p> <p>Usuario: ${user.usuario} </p>`
            localStorage.setItem("email", user.email)
        }
        else{
            error.innerHTML = "<p>Datos incorrectos, intente nuevamente.</p>"
        }
    }
}) */


///////// En el index.html luego del header:

/* <div id="registroLogin">
      <div class="login">
        <form action="" id="formLogin">
          <h4>Ingreso</h4>
          <label for="name">Email:</label>
          <input type="email" id="emailLogin" value="">
          <br>
          <label for="pw">Contraseña:</label>
          <input type="password" id="pwLogin" value="">
          <br>
          <input type="submit" id="submitLogin" value="Ingresar">
        </form>
        <div id="error"></div>
      </div>

      <div class="login">
        <form action="" id="formRegistro">
          <h4>Registro</h4>
          <label for="name">Nombre:</label>
          <input type="text" id="userRegistro" value="">
          <br>
          <label for="email">Email:</label>
          <input type="email" id="emailRegistro" value="">
          <br>
          <label for="pw">Contraseña:</label>
          <input type="password" id="pwRegistro" value="">
          <br>
          <input type="submit" id="submitRegistro" value="Registrarse">
        </form>
        <div id="error2"></div>
    </div>
  </div> */