let SuggestedEquipmentArray = [['me'],['uo'],['me '],['yo'],["67"],["56"],["e34"]]
//var

const clientchoice=document.querySelectorAll('#traveltype')
const saveType=document.getElementById('save-type')




//event

saveType.addEventListener('click',(e)=>{
    e.preventDefault()
    suggested(clientchoice)
    
})












//function
 function suggested(typetavel){
 console.log(typetavel)
 
   
 }