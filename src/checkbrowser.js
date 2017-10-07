let Browser = require('bowser');


export default function pushNotificationCheck(){
  /**
   * It's possible a browser's user agent is modified, so we do some basic feature detection to make sure initializing
   * the SDK won't fail. Promises are required to initialize the SDK.
   */
  if (typeof window.Promise === "undefined") {
      return false;
  }
  if (Browser.name === '' && Browser.version === '') {
      var browser = Browser._detect(navigator.userAgent);
  }
  else {
      var browser = Browser;
  }
  var userAgent = navigator.userAgent || '';
  if (browser.safari || browser.ios || browser.ipod || browser.iphone || browser.ipad)
      return false;
  if (browser.msedge || browser.msie)
      return false;
  // Facebook in-app browser
  if ((userAgent.indexOf("FBAN") > -1) || (userAgent.indexOf("FBAV") > -1)) {
      return false;
  }
  // Android Chrome WebView
  if (navigator.appVersion.match(/ wv/))
      return false;
  /* Firefox on Android push notifications not supported until at least 48: https://bugzilla.mozilla.org/show_bug.cgi?id=1206207#c6 */
  if (browser.firefox && Number(browser.version) < 48 && (browser.mobile || browser.tablet)) {
      return false;
  }
  if (browser.firefox && Number(browser.version) >= 44)
      return true;
  // Web push is supported in Samsung Internet for Android 4.0+
  // http://developer.samsung.com/internet/android/releases
  if (browser.samsungBrowser && Number(browser.version) >= 4) {
      return true;
  }
  if ((browser.chrome || browser.chromium) && Number(browser.version) >= 42)
      return true;
  if (browser.yandexbrowser && Number(browser.version) >= 15.12)
      return true;
  // https://www.chromestatus.com/feature/5416033485586432
  if (browser.opera && (browser.mobile || browser.tablet) && Number(browser.version) >= 37 ||
      browser.opera && Number(browser.version) >= 42)
      return true;
  // The earliest version of Vivaldi uses around Chrome 50
  if (browser.vivaldi)
      return true;

  return false;
}
