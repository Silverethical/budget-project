
//array for suggestion item


//varible
const rating = document.querySelectorAll('#traveltype'),
  form = document.getElementById('typeList'),
  submitsuggestion = document.getElementById('save-type'),
  elements = document.querySelectorAll('li')





//eventlistner
form.addEventListener('submit', (e) => {
  e.preventDefault();
  datalist(rating);
})











//function
function datalist(e) {
  //console.log(e)
  e = document.querySelector('#traveltype').value;


  [...elements].forEach((element) => {
    // console.log(element)
    if (e === '') {
      element.classList.remove('hidden');
    } else {
      const rating = element.dataset.;
      console.log(rating)
      if (!rating || rating < g) {
        element.classList.add('hidden');

      } else {
        element.classList.remove('hidden');
        return 
      }
    }
  });
};



