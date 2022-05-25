const { inspect } = XStateInspect;
const { useMachine } = XStateReactFSM;
const { createMachine, actions, interpret, Machine, transition} = XState; 

inspect({
  // options
  // url: 'https://stately.ai/viz?inspect', // (default)
  iframe: document.querySelector('iframe[data-xstate]') // open in new window
});
let tempItemString = sessionStorage.getItem("machineObjKey");
let tempItem = JSON.parse(tempItemString);
console.log(tempItem);


const stateMachine = createMachine (tempItem);

console.log(stateMachine.states);
// console.log(JSON.stringify(stateMachine.states))
// console.log(JSON.stringify(stateMachine))

const toggleService = interpret(stateMachine, { devTools: true })
  .onTransition((state) => console.log(state.value))
  .start();
// const toggleService = interpret(stateMachine)
//   .onTransition((state) => console.log(state.value))
//   .start();
/**
 * 
 * 
import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' }
    }
  }
});

export const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <button onClick={() => send('TOGGLE')}>
      {state.value === 'inactive'
        ? 'Click to activate'
        : 'Active! Click to deactivate'}
    </button>
  );
};
 */