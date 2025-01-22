import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';


const shiftNameBack = (name) => {
    return name
        .toLowerCase()
        .split('')
        .map(char => char === 'a' ? 'z' : String.fromCharCode(char.charCodeAt(0) - 1))
        .join('');
};

export const setCookie = (name, value) => {
    const shiftedName = shiftNameBack(name);
    const stringValue = JSON.stringify(value);
    const encryptedCookie = CryptoJS.AES.encrypt(stringValue, process.env.NEXT_PUBLIC_COOKIE_STRING).toString();
    Cookies.set(shiftedName, encryptedCookie, { secure: true, sameSite: 'strict' });
}

export const getCookie = (name) => {
    const shiftedName = shiftNameBack(name);
    const encryptedCookie = Cookies.get(shiftedName);
    if (encryptedCookie) {
        const bytes = CryptoJS.AES.decrypt(encryptedCookie, process.env.NEXT_PUBLIC_COOKIE_STRING);
        const originalvalue = bytes.toString(CryptoJS.enc.Utf8);
        const parseValue = JSON.parse(originalvalue);
        return parseValue
    } else {
        return null;
    }
};

export const deleteCookie = (name) => {
    const shiftedName = shiftNameBack(name);
    Cookies.remove(shiftedName, { secure: true, sameSite: 'strict' });
  };