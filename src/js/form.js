import storageAPI from './storage';

console.log(storageAPI);
const form = document.querySelector('.contact-form');
const formData = {};
initPage();

function handleInput(event) {
  const { name, value } = event.target;

  let savedData = storageAPI.load('formKey');
  savedData = savedData ? savedData : {};
  savedData[name] = value;
  storageAPI.save('formKey', savedData);
  // try {
  //   let savedData = localStorage.getItem('formKey');
  //   if (savedData) {
  //     savedData = JSON.parse(savedData);
  //   } else {
  //     savedData = {};
  //   }
  //   const formDataJSON = JSON.stringify(savedData);
  //   console.log(formDataJSON);
  //   localStorage.setItem('formKey', formDataJSON);
  // } catch (error) {
  //   console.log(error.message);
  // }
}

form.addEventListener('input', handleInput);

function initPage() {
  const savedData = storageAPI.load('formKey');

  if (!savedData) {
    return;
  }
  const savedDataObj = JSON.parse(savedData);
  console.log(savedDataObj);
  Object.entries(savedDataObj).forEach(([name, value]) => {
    form.elements[name].value = value;
  });
}
