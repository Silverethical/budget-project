
//array for suggestion item


//varible
const rating = document.querySelectorAll('#traveltype'),
  form = document.getElementById('typeList'),
  submitsuggestion = document.getElementById('save-type'),
  elements = document.querySelectorAll('.SuggestedEquipmentHistory li')





//eventlistner
form.addEventListener('submit', (e) => {
  e.preventDefault();
  datalist();
})











//function
function datalist() {
  //console.log(e)
  const e = document.querySelector('#traveltype').value;


  elements.forEach((element) => {
   //console.log(element)
    if (e === '') {
      element.classList.remove('hidden');
    } else {
      const rating = element.dataset.rating;
     console.log('const',rating)
      if (!rating || rating < e) {
        element.classList.add('hidden');

      } else {
        element.classList.remove('hidden');
        return 
      }
    }
  });
};



