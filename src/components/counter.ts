import { state } from "../state/state";
export function counter() : HTMLElement {
    const container = document.createElement("div");
    const text = document.createElement("h1");
    text.textContent = `count : ${state.count}`;

    const button = document.createElement("button");
    button.textContent = "+";
    button.onclick = () => state.count++;

    container.appendChild(text);
    container.appendChild(button);

    return container;
}