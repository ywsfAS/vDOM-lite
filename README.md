# vDOM-lite

A minimal frontend framework written in TypeScript that implements a lightweight Virtual DOM, a runtime system, and diffing algorithms for efficient DOM updates. Designed for learning purposes to understand how modern UI libraries like React work under the hood.

## Overview

vDOM-lite demonstrates:

- How to build a virtual DOM
- How reactivity works
- How to efficiently update the real DOM
- Component-based architecture
- Array and object diffing for optimal DOM updates

This project uses TypeScript throughout to maintain type safety and clarity.

## Features

- Virtual DOM representation (`h`, `hFragment`, `hText`)
- Reactive state system (optional, can still be used)
- Automatic DOM updates using diffing algorithms
- Array and object diffing for efficient patching
- Component-based architecture with runtime support
- Event handling system
- Lightweight and easy to understand


## Project Structure

```
vDOM-lite/
│
├── src/
│   ├── core/
│   │   ├── attributes.ts       # Handles attributes and reactivity
│   │   ├── destroy-dom.ts      # Cleans up DOM nodes
│   │   ├── diff.ts             # Diffing algorithms
│   │   ├── dispatcher.ts       # Event dispatcher
│   │   ├── event.ts            # Event helpers
│   │   └── mount-dom.ts        # Mounts virtual nodes to real DOM
│   │
│   ├── runtime/
│   │   ├── app.ts              # Main app function
│   │   └── h.ts                # Functions to create virtual nodes (h, hFragment)
│   │
│   ├── types/
│   │   └── type.ts             # Type definitions (VNode, VFragment, VText, etc.)
│   │
│   ├── utils/
│   │   ├── array.ts            # Array helpers and diffing
│   │   └── object.ts           # Object helpers and diffing
│   │
│   ├── components/
│   │   └── Message.ts          # Example component
│   │
│   ├── main.ts                 # Entry point
│
├── dist/                       # Compiled JavaScript output
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


## How It Works

1. Components return **virtual DOM nodes** using `h` and `hFragment`.  
2. The **runtime** handles mounting and patching the DOM with `mountDOM` and `patchDOM`.  
3. **Diffing algorithms** (`arrayDiff` and `objectDiff`) determine the minimal set of changes needed to update the real DOM.  
4. Events are handled through a centralized dispatcher system.  
5. State can optionally be reactive, updating the DOM automatically when changed.  

## Example

```ts
import { h, hFragment, render } from "./core/h";
import { createApp } from "./core/app";

const state = {
  todos: ["Walk the dog", "Water plants"],
};

function App(state, emit) {
  return hFragment([
    h("h1", {}, ["My TODOs"]),
    h("ul", {}, state.todos.map(todo => h("li", {}, [todo])))
  ]);
}

const app = createApp({ state, view: App });
app.mount(document.getElementById("app"));

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

