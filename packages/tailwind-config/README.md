# EasyPoker Tailwind Config

This package contains the Tailwind CSS configuration for EasyPoker.

## Installation

```bash
yarn add @easypoker/tailwind-config
```

## Usage

```js
// tailwind.config.js
const sharedConfig = require('tailwind-config/tailwind.config.js')

module.exports = {
  presets: [sharedConfig], 
  // Your customizations here
}

```