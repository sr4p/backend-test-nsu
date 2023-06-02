
function validatePincode(arr){
  const arrResult = []
  for(let i = 0; i < arr.length; i++){
      let caseLength = false
      let caseDeplicateMore = false
      let caseOrder = false
      let caseDeplicateSet = 0
      
      if(arr[i].length >= 6) caseLength = true;
      
      for(let j = 0; j < arr[i].length; j++){
          const charPc = arr[i]
          if(!charPc[j+1]) continue;
          if(charPc[j] === charPc[j+1] && charPc[j] === charPc[j+2]) caseDeplicateMore = true
          
          if(((+charPc[j])+1 === +charPc[j+1] && (+charPc[j])+2 === +charPc[j+2]) || (+charPc[j])-1 === +charPc[j+1] && (+charPc[j])-2 === +charPc[j+2]) caseOrder = true
          
          if(charPc[j] === charPc[j+1]){ caseDeplicateSet++ }
      }
      
      if(caseLength && !caseDeplicateMore && !caseOrder && caseDeplicateSet <= 2) arrResult.push(arr[i])
  }
  return arrResult
}
console.log(validatePincode(["17283","172839"])); //172839
console.log(validatePincode(["111822","112762"])); //112762
console.log(validatePincode(["123743","321895","124578"])); //124578
console.log(validatePincode(["112233","882211","887712"])); //887712