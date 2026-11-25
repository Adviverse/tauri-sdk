# @adviverse/tauri

Adviverse ads for **Tauri v2** apps. Includes the full
[`@adviverse/desktop`](https://github.com/Adviverse/desktop-sdk) ad core
(`mountAd`, `fetchAd`, viewability-gated impressions) plus a bridge so ad clicks
open in the **system browser** through Tauri's opener plugin, instead of
navigating your app window.

Using React in your Tauri frontend? Add
[`@adviverse/desktop-react`](https://github.com/Adviverse/desktop-react-sdk) for
`<AdviverseAd/>`; it picks up the same bridge.

## Install

```sh
npm install @adviverse/tauri @tauri-apps/plugin-opener
cargo add tauri-plugin-opener   # in src-tauri/
```

## Rust side

```rust
// src-tauri/src/lib.rs
tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    // ...
```

```json
// src-tauri/capabilities/default.json → "permissions"
"opener:default"
```

## Frontend

```ts
import { installAdviverse, mountAd } from '@adviverse/tauri';

installAdviverse(); // once, at startup
const unmount = mountAd(document.getElementById('ad')!, { token: 'ts_yourtoken' });
```

`installAdviverse()` only opens `http(s)` URLs. Impressions are counted only
when the ad is actually viewable (≥50% on screen for ≥1s, window visible), and
refresh is floored at 30 seconds.
