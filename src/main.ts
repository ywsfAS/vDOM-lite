import { h, hFragment, lipsum } from "./runtime/h";
import { LEVELS, MessageComponent } from "./components/Message";
import { mountDOM } from "./core/mount-dom";

const vDOM = hFragment([h('h1', { class: 'title' }, ['My counter']), h('div', { class: 'container' },
[
    h('button', { class: 'dec-button', on: { "click": () => console.log("clicked dec button")} }, ['decrement']),
    h('span', { class : 'counter-value'}, ["10"]),
    h('button', { class : 'incr-button'  , on: {"click" : () => console.log("clicked inc button")}} , ['increment'])
    ])])

const vDOMP = lipsum(10, 'Virtual paragraphs!');
console.log(vDOM);
console.log(vDOMP);
const messageBox = MessageComponent({ type: LEVELS.WARNING, message: "this my message !" });
console.log(messageBox);
mountDOM(vDOMP, document.body);
mountDOM(vDOM, document.body);

