import enUS from 'antd/lib/locale-provider/en_US';
import esES from 'antd/lib/locale-provider/es_ES';
import zhTW from 'antd/lib/locale-provider/zh_TW';
import koKR from 'antd/lib/locale-provider/ko_KR';
import jaJP from 'antd/lib/locale-provider/ja_JP';
import trTR from 'antd/lib/locale-provider/tr_TR';

var userLang = navigator.language || navigator.userLanguage;
console.log("user language is => ", userLang);

var Lang = null;

switch (userLang) {
  case "en-US": {
    console.log("english detected");
    Lang = enUS;
    break;
  }

  case "tr-TR": {
    console.log("turkish detected");
    Lang = trTR;
    break;
  }

  case "ja-JP": {
    console.log("japanese detected");
    Lang = jaJP;
    break;
  }

  case "es-ES": {
    console.log("spanish detected");
    Lang = esES;
    break;
  }

  case "zh-TW": {
    console.log("chinese detected");
    Lang = zhTW;
    break;
  }

  case "ko-KR": {
    console.log("korean detected");
    Lang = koKR;
    break;
  }

  default: Lang = enUS;
}

export default Lang;
