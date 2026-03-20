import { h, hFragment, lipsum } from "./runtime/h";
import { LEVELS, MessageComponent } from "./components/Message";

const vDOM = hFragment([h('h1', { class: 'title' }, ['My counter']), h('div', { class: 'container' },
[
    h('button', { class: 'dec-button' }, ['decrement']),
    h('span', { class : 'counter-value'}, ['0']),
    h('button', { class : 'incr-button' } , ['increment'])
    ])])

const vDOMP = lipsum(10, 'Virtual paragraphs!');
console.log(vDOM);
console.log(vDOMP);
const messageBox = MessageComponent({ type: LEVELS.WARNING, message: "this my message !" });
console.log(messageBox);
