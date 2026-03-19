import { renderApp } from "../runtime/app";
import { reactive } from "../core/reactive";

export const state = reactive({
    count : 0 ,

}, renderApp)