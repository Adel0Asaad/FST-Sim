class state {
  static currIndex = 0;
  constructor(name){
    this.name = name;
    this.index = state.currIndex;
    this.transitions = new Array()
    state.currIndex++;
  }
  exJson(){
    var tempString;
  }
}

class fstValue {
  static currIndexInput = 0;
  static currIndexOutput = 0;
  constructor(name, type){ // type: 0 = input, 1 = output
    this.name = name
    if (type==0){
      this.index = fstValue.currIndexInput;
      fstValue.currIndexInput++;
    }else if (type==1){
      this.index = fstValue.currIndexOutput;
      fstValue.currIndexOutput++;
    }else{
      console.error('Error: unknown type value in entered fstValue!')
    }
  }
}

class transition{
  constructor(inputObj, outputObj, nstateObj){
    let input = inputObj.value;
    let output = outputObj.value;
    let nstate=nstateObj.index;
    this.iObj = inputObj;
    this.oObj = outputObj;
    this.sObj = nstateObj;
    this.input = input;
    this.output = output;
    this.nstate = nstate;
  }
}


class cState {
  constructor(transition){
    for (let i = 0; i < transition.length; i++){
      this.on[i] = {zebby : transition[i].nstate};
    }
  }
}

class cMachine {
  constructor(stateArray, transitions){
    this.id = "Our State Machine";
    this.initial = stateArray[0].name;
    for (let i = 0; i < stateArray.length; i++){
      this.states[i] = Object(stateArray[i], on= [])
    }
  }
}