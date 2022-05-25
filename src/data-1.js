function indexState(currState, currArray){
  currArray.push(currState);
  // console.log('array current length: ' + currArray.length) // DEBUGGING PURPOSES
}


function createState(name){
  let currState = new state(name);
  indexState(currState, stateArray)
}

function loopStates(n){
  for(let i=0; i<n; i++){
    var stateName = "S" + (parseInt(i+1));
    createState(stateName);
  }
}

function indexFstValue(fstValue, currArray){
  currArray.push(fstValue);
  // console.log('array current length: ' + currArray.length) // DEBUGGING PURPOSES
}

function createFstValue(name, type){
  let currFstValue = new fstValue(name, type);
  if(type == 0){
    indexFstValue(currFstValue, inputArray);
  }else{
    indexFstValue(currFstValue, outputArray);
  }
}

function loopInputs(n){
  for(let i=0; i<n; i++){
    var valueName = i;
    var valueType = 0;
    createFstValue(valueName, valueType);
  }
}

function loopOutputs(n){
  for(let i=0; i<n; i++){
    var valueName = String.fromCharCode(97+i);
    var valueType = 1;
    createFstValue(valueName, valueType);
  }
}
/**
 * Actual function that gathers the data the second time, gets called from onclick from secondBtn
 */
function getData2(){
  let dataArray2 = Array.from(document.querySelectorAll('#registrationForm2 select'))
  // num of states * num of inputs = num of needed iterations/2
  // we need to iterate on the array for each state, to gather the outputs, then to gather the states, FOR EACH INPUT
  // the way we're going to do this is: see how many states (let's say 3), 
  //divide the length of array by 3, (let's say inputs are 2), we get 12/3 = 4, we save that number in a temp value (delim)
  let delim = dataArray2.length/stateArray.length;
  let stateNum = -1;
  let inputNum = 0;
  // we go thru a for loop from 0 to delim, scanning the array (effictively 0,1,2,3) for output then state then output then state, we save the data by iterating the transition array in each state
  // once we're done with the first state we need to traverse 4,5,6,7 for the next state and so on
  for(let i=0; i<dataArray2.length; i+=2){
    if(i%delim==0){
      stateNum++;
      inputNum = 0;
    }

    stateArray[stateNum].transitions.push(new transition(inputArray[inputNum], outputArray[dataArray2[i].value], stateArray[dataArray2[i+1].value]))
    inputNum++;
  }
  // var tempObj = new Object();
  // var a = "0";
  // tempObj[a] = "loading";
  // console.log(tempObj);
  // look above code
  // this is how to create the named variable property 
  // satr 70
  // why is (on) not an obj? like we did on states 
  // it is an obj we just need to figure out its parent before it
  // basically:

  var machineObj = new Object();
  machineObj.id = "ourMachine";
  machineObj.initial = "S1";
  machineObj.states = new Object();

  for (let i = 0; i<stateArray.length; i++){
    var tempCurrState = 'S' + parseInt(i+1); // if i = 0, this will ="S1"
    machineObj.states[tempCurrState] = new Object();
    // above line creates the S1: {} obj
    // then we need to create the on: {}
    machineObj.states[tempCurrState].on = new Object();
    // works because on never changes ig

    for(let j = 0; j<inputArray.length; j++){
      var tempCurrInput = String(j+1) + '/' + String(stateArray[i].transitions[j].oObj.name);
      machineObj.states[tempCurrState].on[tempCurrInput] = "S" + String(parseInt(parseInt(stateArray[i].transitions[j].nstate) + 1))
      console.log(parseInt(parseInt(stateArray[i].transitions[j].nstate) + 1))
    }
  }
  let jsonMachineObj = (JSON.stringify(machineObj));
  sessionStorage.setItem("machineObjKey", jsonMachineObj);
  
  //JSON IS PERFECT
  // we need to move this object to your js file NOW.
  window.open("../FSMsim.html", '_blank');
  var bckBtn2 = document.getElementById("back");
  bckBtn2.innerText = "Make another FST";
  document.getElementById("secondData").remove()
}
/**
 * End of second gathering
 */

/**
 * Actual function that gathers the data the first time, gets called from onclick from firstBtn
 */
function getData1(){
  let dataArray = Array.from(document.querySelectorAll('#registrationForm input'))
  loopStates(dataArray[0].value);
  loopInputs(dataArray[1].value);
  loopOutputs(dataArray[2].value);
  // console.log(stateArray);
  // console.log(inputArray);
  // console.log(outputArray);

  document.getElementById("registrationForm").remove();

  const form2 = document.createElement("form");
  form2.setAttribute('id', 'registrationForm2')

  for(let i=0; i<stateArray.length; i++){
    var tempLegend = document.createElement("legend");
    tempLegend.innerText = "State(" + parseInt(i+1) + ")";
    tempLegend.style.cssText = "color: #2BC0E4 ; font-size: 25px;"
    var tempFS = document.createElement("fieldset");
    tempFS.style.cssText = " margin-top: 60;"
    tempFS.setAttribute('id', 'State' + parseInt(i+1));
    tempFS.appendChild(tempLegend);
    
    
    for(let j=0; j<inputArray.length; j++){
      var tempDiv = document.createElement('div');
      var tempLabel = document.createElement("label")
      tempLabel.innerHTML = "Input(" + parseInt(j+1) + ")";
      var tempSel1Label = document.createElement("label");
      tempSel1Label.innerHTML = `&nbsp&nbsp&nbsp&nbsp&nbsp Choose an output:`
      tempSel1Label.setAttribute('for', 'outputSelector');
      var tempSel1 = document.createElement("select")
      tempSel1.setAttribute('name', 'outputSelector');
      tempSel1.setAttribute('id', "OS" + parseInt(j+1) + 'S' + parseInt(i+1));
      for(let k=0; k<outputArray.length; k++){
        var tempOption = document.createElement("option");
        tempOption.setAttribute('value', outputArray[k].index)
        tempOption.innerText = outputArray[k].name;
        tempSel1.appendChild(tempOption);
        // console.log(`I'm here in outputs`)
      }
      var tempSel2Label = document.createElement("label");
      tempSel2Label.innerHTML = `&nbsp&nbsp&nbsp&nbsp&nbsp Choose a state:`
      tempSel2Label.setAttribute('for', 'stateSelector');
      var tempSel2 = document.createElement("select")
      tempSel2.setAttribute('name', 'stateSelector');
      tempSel2.setAttribute('id', "SS" + parseInt(j+1) + 'S' + parseInt(i+1));
      for(let k=0; k<stateArray.length; k++){
        var tempOption = document.createElement("option");
        tempOption.setAttribute('value', stateArray[k].index)
        tempOption.innerText = stateArray[k].name;
        tempSel2.appendChild(tempOption);
        // console.log(`I'm here in inner states`)
      }
      tempDiv.appendChild(tempLabel);
      tempDiv.appendChild(tempSel1Label);
      tempDiv.appendChild(tempSel1);
      tempDiv.appendChild(tempSel2Label);
      tempDiv.appendChild(tempSel2);

      tempFS.appendChild(tempDiv);
      
      // console.log(`I'm here in inputs`)
    }

    
    form2.appendChild(tempFS);
    
    // console.log(`I'm here in states`)
  }
  var tempSbmtButton = document.createElement ('button');
  tempSbmtButton.style.cssText = "text-decoration: none;";
  tempSbmtButton.setAttribute('class', 'button button-1');
  tempSbmtButton.setAttribute('id', 'secondData');
  tempSbmtButton.innerText = "Draw FST";
  tempSbmtButton.setAttribute('onClick', 'newFunc()');
  form2.appendChild(tempSbmtButton)

  document.getElementById("ourDiv").appendChild(form2);


  var tempSbmtButton1 = document.createElement ('button');
  tempSbmtButton1.style.cssText = "text-decoration: none;";
  tempSbmtButton1.setAttribute('class', 'button button-1');
  tempSbmtButton1.setAttribute('id', 'back');
  tempSbmtButton1.innerText = "Back";
  tempSbmtButton1.setAttribute('onClick', 'newFunc()');
  form2.appendChild(tempSbmtButton1)

  document.getElementById("ourDiv").appendChild(form2);

  var thirdBtn = document.getElementById("back");
  thirdBtn.onclick = function(e){
    window.location.reload();
}
  /**
   * START OF SECOND GATHERING OF DATA
   */
  var secondBtn = document.getElementById("secondData");
    secondBtn.onclick = function(e){
    e.preventDefault();
    getData2();
  }
  /**
   * END OF SECOND GATHERING OF DATA
   */

}
/**
 * End of first gathering
 */


/**
 * MAIN CODE START
 */
let stateArray = new Array();
let inputArray = new Array();
let outputArray = new Array();
var firstBtn = document.getElementById("firstData");
firstBtn.onclick = function(){
  event.preventDefault();
  getData1();
}
/**
 * MAIN CODE END
 */