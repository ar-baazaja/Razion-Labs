export const THEME_KEY = "rl-theme";

/**
 * Runs in <head> before paint: applies a saved choice so there is no flash.
 * With no saved choice the site follows the device setting (CSS media query).
 */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
