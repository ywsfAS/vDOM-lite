# vDOM-lite

A minimal frontend framework that implements a lightweight Virtual DOM and basic reactivity system using TypeScript.

## Overview

vDOM-lite is a learning-focused project that demonstrates how modern UI libraries like React work under the hood. It provides a simple way to create components, manage state, and automatically update the DOM when data changes.

## Features

- Virtual DOM representation
- Reactive state using Proxy
- Automatic DOM updates on state change
- Simple component-based architecture
- Lightweight and easy to understand

## Project Structure

```
vDOM-lite/
│
├── src/
│   ├── core/
│   │   ├── reactive.ts      # Handles reactivity (Proxy-based state)
│   │   ├── renderer.ts      # Converts virtual DOM to real DOM
│   │   └── vdom.ts          # Virtual DOM node structure
│   │
│   ├── components/
│   │   └── Counter.ts       # Example component
│   │
│   ├── main.ts              # Entry point
│
├── dist/                    # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

1. You create a component that returns a Virtual DOM.
2. State is wrapped using a reactive system (Proxy).
3. When the state changes, the app automatically re-renders.
4. The renderer updates the real DOM.

## Example

```ts
import { reactive } from "./core/reactive";
import { render } from "./core/renderer";

const state = reactive({
  count: 0
});

function Counter() {
  return {
    tag: "div",
    children: [
      {
        tag: "h1",
        children: [`Count: ${state.count}`]
      },
      {
        tag: "button",
        props: {
          onclick: () => state.count++
        },
        children: ["Increment"]
      }
    ]
  };
}

render(Counter, document.getElementById("app"));
```

## Setup

```bash
npm install
npm run build
```

## Development

```bash
npm run dev
```

## Goals

- Understand Virtual DOM concepts
- Learn reactivity systems
- Build a mini version of modern frameworks
- Practice TypeScript architecture

## Future Improvements

- Diffing algorithm
- Component lifecycle
- Props and state separation
- Event system improvements