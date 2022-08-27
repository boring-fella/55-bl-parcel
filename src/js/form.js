const form = document.querySelector('.contact-form');
const formData = {};
initPage();
function handleInput(event) {
  const { name, value } = event.target;
  formData[name] = value;

  try {
    const formDataJSON = JSON.stringify(formData);
    console.log(formDataJSON);
    localStorage.setItem('formKey', formDataJSON);
  } catch (error) {
    console.log(error.message);
  }
}

form.addEventListener('input', handleInput);

function initPage(arguments) {
  try {
    const savedData = localStorage.getItem('formKey');

    if (!savedData) {
      return;
    }
    const savedDataObj = JSON.parse(savedData);
    console.log(savedDataObj);
    Object.entries(savedDataObj).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  } catch (error) {
    console.log(error.message);
  }
}
