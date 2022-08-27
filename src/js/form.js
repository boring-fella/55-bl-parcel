import storageAPI from './storage';

const form = document.querySelector('.contact-form');
initPage();

function handleInput(event) {
  const { name, value } = event.target;

  let savedData = storageAPI.load('formKey');
  savedData = savedData ? savedData : {};
  savedData[name] = value;
  storageAPI.save('formKey', savedData);

}

form.addEventListener('input', handleInput);

function initPage() {
  const savedData = storageAPI.load('formKey');
  if (!savedData) {
    return;
  }
  Object.entries(savedData).forEach(([name, value]) => {
    form.elements[name].value = value;
  });
}

form.addEventListener('submit', handleSubmit);

function handleSubmit (event) {
  event.preventDefault();
  const {
    elements: { name, email, message }
  } = event.currentTarget;
  console.log({name: name.value, email: email.value, message: message.value});
  event.currentTarget.reset();
  storageAPI.remove('formKey')
}
