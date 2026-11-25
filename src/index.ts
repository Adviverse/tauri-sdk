/**
 * @adviverse/tauri — ads for Tauri v2 apps.
 *
 *   import { installAdviverse, mountAd } from '@adviverse/tauri';
 *   installAdviverse();                       // once, at startup
 *   mountAd(document.getElementById('ad')!, { token: 'ts_yourtoken' });
 *
 * Rust side: `.plugin(tauri_plugin_opener::init())` and the `opener:default`
 * permission in your capability file (see README).
 */
import { openUrl } from '@tauri-apps/plugin-opener';

export * from '@adviverse/desktop';

/** Route ad clicks to the system browser. The desktop core calls
 *  window.adviverse.openExternal when it exists; http(s) only. */
export function installAdviverse(): void {
  const w = window as unknown as { adviverse?: { openExternal?: (url: string) => unknown } };
  w.adviverse = {
    ...w.adviverse,
    openExternal: (url: string) => (/^https?:\/\//i.test(url) ? openUrl(url) : undefined),
  };
}
