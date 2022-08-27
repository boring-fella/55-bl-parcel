const form = document.querySelector('.contact-form');
const formData = {};

function handleInput(event) {
  const { name, value } = event.target;
  formData[name] = value;

  const formDataJSON = JSON.stringify(formData);
  console.log(formDataJSON);
  localStorage.setItem('formKey', formDataJSON);
}

form.addEventListener('input', handleInput);
