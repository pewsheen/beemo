# Beemo

A ChatGPT translator.

This project is using [Tauri](https://tauri.app) to build a universal application for Windows, Linux, MacOS and iOS.

## Getting Started

### Prerequisites

- NodeJS v16+
- pnpm

### Install tauri-cli next branch

```sh
cargo install --git https://github.com/tauri-apps/tauri --branch next tauri-cli
```

### Install node modules for the Beemo

```sh
cd beemo
pnpm install
```

## Run dev on local

```sh
pnpm dev
```

## Run dev on iOS

### Init ios project at first time

```sh
pnpm tauri ios init
```

### Run dev on iOS (support hot reload)

```sh
pnpm tauri ios dev
```

### Open project in Xcode

```sh
pnpm tauri ios open
```

### Build iOS ipa

```sh
pnpm tauri ios build
```
