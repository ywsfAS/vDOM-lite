import { counter } from "../components/counter";
export function renderApp() {
    console.log("app is rendered again !");
    const root = document.getElementById("app")!;
    root.innerHTML = "";
    root.appendChild(counter());
}