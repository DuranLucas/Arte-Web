////// Variables
const nombre = document.getElementById('formNombre');
/* const apellido = document.getElementById('formApellido'); */
const email = document.getElementById('formEmail');
const consulta = document.getElementById('formConsulta')

////// Eventos
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (nombre.value != '' && email.value != '' && consulta.value != '') {
    window.onbeforeunload = () => {
      for (const form of document.getElementsByTagName('form')) {
        form.reset();
      }
    }
    Swal.fire({
      toast: true,
      position: 'top-end',
      timer: 3000,
      timerProgressBar: true,
      icon: 'success',
      title: 'Tu consulta fue enviada exitosamente!',
      confirmButtonText: 'Entendido'
    }).then(() => {
      setTimeout(() => { window.location.href = "../index.html"; }, 200);
    })
  }

  else {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      icon: 'warning',
      title: 'Debes completar todos los campos correctamente para enviar la consulta'
    })
    return;
  }
});
