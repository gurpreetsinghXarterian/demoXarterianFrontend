"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/login",{

/***/ "./src/pages/login/index.js":
/*!**********************************!*\
  !*** ./src/pages/login/index.js ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! crypto-js */ \"./node_modules/crypto-js/index.js\");\n/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_3__);\n// import { useState } from \"react\";\n// import { useRouter } from \"next/router\";\n// const CryptoJS = require('crypto-js');\n// export default function Login() {\n//   const [username, setUsername] = useState(\"\");\n//   const router = useRouter();\n//   const handleLogin = () => {\n//     if (username.trim()) {\n//       // Save user to localStorage\n//       localStorage.setItem(\"user\", JSON.stringify({ username }));\n//       // Redirect to home\n//       router.push(\"/\");\n//     } else {\n//       alert(\"Please enter a username!\");\n//     }\n//   };\n//   const encrypt = (value) => {\n//       const stringValue = value.toString();\n//       const encryptedCookie = CryptoJS.AES.encrypt(stringValue, process.env.TOKEN_DECRYPTION_SECRET_KEY).toString();\n//       return encryptedCookie;\n//   }\n//   const decrypt = (value) => {\n//           const bytes = CryptoJS.AES.decrypt(value, process.env.TOKEN_DECRYPTION_SECRET_KEY);\n//           const originalvalue = bytes.toString(CryptoJS.enc.Utf8);\n//           return originalvalue;\n//   };\n//   module.exports = { encrypt, decrypt};\n//   return (\n//     <div style={{ display: \"flex\", flexDirection: \"column\", alignItems: \"center\", marginTop: \"100px\" }}>\n//       <h1>Login</h1>\n//       <input\n//         type=\"text\"\n//         placeholder=\"Enter username\"\n//         value={username}\n//         onChange={(e) => setUsername(e.target.value)}\n//         style={{ padding: \"8px\", marginBottom: \"16px\" }}\n//       />\n//       <button onClick={handleLogin} style={{ padding: \"8px 16px\", cursor: \"pointer\" }}>\n//         Login\n//       </button>\n//     </div>\n//   );\n// }\n\nvar _s = $RefreshSig$();\n\n\n\nfunction App() {\n    _s();\n    const [url, setUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"); // For URL input\n    const [shortUrl, setShortUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"); // To display shortened URL\n    const [decryptInput, setDecryptInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"); // For getting the original URL\n    const [originalUrl, setOriginalUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"); // To display original URL\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const urlMapping = {}; // A temporary object to simulate a database\n    // Function to generate a 12-character hash\n    const generateShortCode = (value)=>{\n        const hash = crypto_js__WEBPACK_IMPORTED_MODULE_3___default().SHA256(value).toString((crypto_js__WEBPACK_IMPORTED_MODULE_3___default().enc).Base64);\n        return hash.replace(/[^a-zA-Z0-9]/g, \"\").substring(0, 12); // Keep alphanumeric and truncate\n    };\n    const handleShortenUrl = ()=>{\n        if (url.trim()) {\n            const shortCode = generateShortCode(url);\n            setShortUrl(shortCode);\n        } else {\n            alert(\"Please enter a URL!\");\n        }\n    };\n    const handleRetrieveUrl = ()=>{\n        if (decryptInput.trim()) {\n            const original = urlMapping[decryptInput] || \"Not found!\";\n            setOriginalUrl(original);\n        } else {\n            alert(\"Please enter a short code!\");\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            display: \"flex\",\n            flexDirection: \"column\",\n            alignItems: \"center\",\n            marginTop: \"50px\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Shorten URL\"\n            }, void 0, false, {\n                fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n                lineNumber: 94,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"text\",\n                placeholder: \"Enter URL\",\n                value: url,\n                onChange: (e)=>setUrl(e.target.value),\n                style: {\n                    padding: \"8px\",\n                    marginBottom: \"16px\",\n                    width: \"300px\"\n                }\n            }, void 0, false, {\n                fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n                lineNumber: 95,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleShortenUrl,\n                style: {\n                    padding: \"8px 16px\",\n                    cursor: \"pointer\"\n                },\n                children: \"Shorten URL\"\n            }, void 0, false, {\n                fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n                lineNumber: 102,\n                columnNumber: 7\n            }, this),\n            shortUrl && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: {\n                    marginTop: \"20px\",\n                    wordWrap: \"break-word\",\n                    width: \"300px\",\n                    textAlign: \"center\"\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                        children: \"Shortened URL:\"\n                    }, void 0, false, {\n                        fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n                        lineNumber: 108,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: shortUrl\n                    }, void 0, false, {\n                        fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n                        lineNumber: 109,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n                lineNumber: 107,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Retrieve Original URL\"\n            }, void 0, false, {\n                fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n                lineNumber: 113,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"text\",\n                placeholder: \"Enter Short Code\",\n                value: decryptInput,\n                onChange: (e)=>setDecryptInput(e.target.value),\n                style: {\n                    padding: \"8px\",\n                    marginBottom: \"16px\",\n                    width: \"300px\"\n                }\n            }, void 0, false, {\n                fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n                lineNumber: 114,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleRetrieveUrl,\n                style: {\n                    padding: \"8px 16px\",\n                    cursor: \"pointer\"\n                },\n                children: \"Retrieve URL\"\n            }, void 0, false, {\n                fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n                lineNumber: 121,\n                columnNumber: 7\n            }, this),\n            originalUrl && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: {\n                    marginTop: \"20px\",\n                    wordWrap: \"break-word\",\n                    width: \"300px\",\n                    textAlign: \"center\"\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                        children: \"Original URL:\"\n                    }, void 0, false, {\n                        fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n                        lineNumber: 127,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: originalUrl\n                    }, void 0, false, {\n                        fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n                        lineNumber: 128,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n                lineNumber: 126,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/gurpreersingh/Desktop/my-next-app/src/pages/login/index.js\",\n        lineNumber: 93,\n        columnNumber: 5\n    }, this);\n}\n_s(App, \"i5EBROENPYLU2RwDP6Vre0mbzUc=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = App;\nvar _c;\n$RefreshReg$(_c, \"App\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDhEQUFDQztrQ0FBRzs7Ozs7O2tDQUNKLDhEQUFDQztrQ0FBRzdDOzs7Ozs7Ozs7Ozs7MEJBSVIsOERBQUM2QjswQkFBRzs7Ozs7OzBCQUNKLDhEQUFDQztnQkFDQ0MsTUFBSztnQkFDTEMsYUFBWTtnQkFDWnZCLE9BQU9QO2dCQUNQK0IsVUFBVSxDQUFDQyxJQUFNL0IsZ0JBQWdCK0IsRUFBRUMsTUFBTSxDQUFDMUIsS0FBSztnQkFDL0NlLE9BQU87b0JBQUVZLFNBQVM7b0JBQU9DLGNBQWM7b0JBQVFDLE9BQU87Z0JBQVE7Ozs7OzswQkFFaEUsOERBQUNDO2dCQUFPQyxTQUFTbkI7Z0JBQW1CRyxPQUFPO29CQUFFWSxTQUFTO29CQUFZSyxRQUFRO2dCQUFVOzBCQUFHOzs7Ozs7WUFJdEZyQyw2QkFDQyw4REFBQ21CO2dCQUFJQyxPQUFPO29CQUFFSSxXQUFXO29CQUFRYyxVQUFVO29CQUFjSixPQUFPO29CQUFTSyxXQUFXO2dCQUFTOztrQ0FDM0YsOERBQUNDO2tDQUFHOzs7Ozs7a0NBQ0osOERBQUNDO2tDQUFHekM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtkO0dBMUV3QlA7O1FBS1BGLGtEQUFTQTs7O0tBTEZFIiwic291cmNlcyI6WyIvVXNlcnMvZ3VycHJlZXJzaW5naC9EZXNrdG9wL215LW5leHQtYXBwL3NyYy9wYWdlcy9sb2dpbi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuLy8gaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG4vLyBjb25zdCBDcnlwdG9KUyA9IHJlcXVpcmUoJ2NyeXB0by1qcycpO1xuXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMb2dpbigpIHtcbi8vICAgY29uc3QgW3VzZXJuYW1lLCBzZXRVc2VybmFtZV0gPSB1c2VTdGF0ZShcIlwiKTtcbi8vICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbi8vICAgY29uc3QgaGFuZGxlTG9naW4gPSAoKSA9PiB7XG4vLyAgICAgaWYgKHVzZXJuYW1lLnRyaW0oKSkge1xuLy8gICAgICAgLy8gU2F2ZSB1c2VyIHRvIGxvY2FsU3RvcmFnZVxuLy8gICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyXCIsIEpTT04uc3RyaW5naWZ5KHsgdXNlcm5hbWUgfSkpO1xuLy8gICAgICAgLy8gUmVkaXJlY3QgdG8gaG9tZVxuLy8gICAgICAgcm91dGVyLnB1c2goXCIvXCIpO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBhIHVzZXJuYW1lIVwiKTtcbi8vICAgICB9XG4vLyAgIH07XG5cbi8vICAgY29uc3QgZW5jcnlwdCA9ICh2YWx1ZSkgPT4ge1xuLy8gICAgICAgY29uc3Qgc3RyaW5nVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuLy8gICAgICAgY29uc3QgZW5jcnlwdGVkQ29va2llID0gQ3J5cHRvSlMuQUVTLmVuY3J5cHQoc3RyaW5nVmFsdWUsIHByb2Nlc3MuZW52LlRPS0VOX0RFQ1JZUFRJT05fU0VDUkVUX0tFWSkudG9TdHJpbmcoKTtcbi8vICAgICAgIHJldHVybiBlbmNyeXB0ZWRDb29raWU7XG4vLyAgIH1cbiAgXG4vLyAgIGNvbnN0IGRlY3J5cHQgPSAodmFsdWUpID0+IHtcbi8vICAgICAgICAgICBjb25zdCBieXRlcyA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KHZhbHVlLCBwcm9jZXNzLmVudi5UT0tFTl9ERUNSWVBUSU9OX1NFQ1JFVF9LRVkpO1xuLy8gICAgICAgICAgIGNvbnN0IG9yaWdpbmFsdmFsdWUgPSBieXRlcy50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG4vLyAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsdmFsdWU7XG4vLyAgIH07XG4gIFxuLy8gICBtb2R1bGUuZXhwb3J0cyA9IHsgZW5jcnlwdCwgZGVjcnlwdH07XG4gIFxuLy8gICByZXR1cm4gKFxuLy8gICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIG1hcmdpblRvcDogXCIxMDBweFwiIH19PlxuLy8gICAgICAgPGgxPkxvZ2luPC9oMT5cbi8vICAgICAgIDxpbnB1dFxuLy8gICAgICAgICB0eXBlPVwidGV4dFwiXG4vLyAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdXNlcm5hbWVcIlxuLy8gICAgICAgICB2YWx1ZT17dXNlcm5hbWV9XG4vLyAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VXNlcm5hbWUoZS50YXJnZXQudmFsdWUpfVxuLy8gICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiBcIjhweFwiLCBtYXJnaW5Cb3R0b206IFwiMTZweFwiIH19XG4vLyAgICAgICAvPlxuLy8gICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVMb2dpbn0gc3R5bGU9e3sgcGFkZGluZzogXCI4cHggMTZweFwiLCBjdXJzb3I6IFwicG9pbnRlclwiIH19PlxuLy8gICAgICAgICBMb2dpblxuLy8gICAgICAgPC9idXR0b24+XG4vLyAgICAgPC9kaXY+XG4vLyAgICk7XG4vLyB9XG5cblxuXG5cblxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IENyeXB0b0pTIGZyb20gXCJjcnlwdG8tanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkge1xuICBjb25zdCBbdXJsLCBzZXRVcmxdID0gdXNlU3RhdGUoXCJcIik7IC8vIEZvciBVUkwgaW5wdXRcbiAgY29uc3QgW3Nob3J0VXJsLCBzZXRTaG9ydFVybF0gPSB1c2VTdGF0ZShcIlwiKTsgLy8gVG8gZGlzcGxheSBzaG9ydGVuZWQgVVJMXG4gIGNvbnN0IFtkZWNyeXB0SW5wdXQsIHNldERlY3J5cHRJbnB1dF0gPSB1c2VTdGF0ZShcIlwiKTsgLy8gRm9yIGdldHRpbmcgdGhlIG9yaWdpbmFsIFVSTFxuICBjb25zdCBbb3JpZ2luYWxVcmwsIHNldE9yaWdpbmFsVXJsXSA9IHVzZVN0YXRlKFwiXCIpOyAvLyBUbyBkaXNwbGF5IG9yaWdpbmFsIFVSTFxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICBjb25zdCB1cmxNYXBwaW5nID0ge307IC8vIEEgdGVtcG9yYXJ5IG9iamVjdCB0byBzaW11bGF0ZSBhIGRhdGFiYXNlXG5cbiAgLy8gRnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSAxMi1jaGFyYWN0ZXIgaGFzaFxuICBjb25zdCBnZW5lcmF0ZVNob3J0Q29kZSA9ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IGhhc2ggPSBDcnlwdG9KUy5TSEEyNTYodmFsdWUpLnRvU3RyaW5nKENyeXB0b0pTLmVuYy5CYXNlNjQpO1xuICAgIHJldHVybiBoYXNoLnJlcGxhY2UoL1teYS16QS1aMC05XS9nLCBcIlwiKS5zdWJzdHJpbmcoMCwgMTIpOyAvLyBLZWVwIGFscGhhbnVtZXJpYyBhbmQgdHJ1bmNhdGVcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTaG9ydGVuVXJsID0gKCkgPT4ge1xuICAgIGlmICh1cmwudHJpbSgpKSB7XG4gICAgICBjb25zdCBzaG9ydENvZGUgPSBnZW5lcmF0ZVNob3J0Q29kZSh1cmwpO1xuICAgICAgc2V0U2hvcnRVcmwoc2hvcnRDb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSBVUkwhXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZXRyaWV2ZVVybCA9ICgpID0+IHtcbiAgICBpZiAoZGVjcnlwdElucHV0LnRyaW0oKSkge1xuICAgICAgY29uc3Qgb3JpZ2luYWwgPSB1cmxNYXBwaW5nW2RlY3J5cHRJbnB1dF0gfHwgXCJOb3QgZm91bmQhXCI7XG4gICAgICBzZXRPcmlnaW5hbFVybChvcmlnaW5hbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIGEgc2hvcnQgY29kZSFcIik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgbWFyZ2luVG9wOiBcIjUwcHhcIiB9fT5cbiAgICAgIDxoMT5TaG9ydGVuIFVSTDwvaDE+XG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIFVSTFwiXG4gICAgICAgIHZhbHVlPXt1cmx9XG4gICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VXJsKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogXCI4cHhcIiwgbWFyZ2luQm90dG9tOiBcIjE2cHhcIiwgd2lkdGg6IFwiMzAwcHhcIiB9fVxuICAgICAgLz5cbiAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlU2hvcnRlblVybH0gc3R5bGU9e3sgcGFkZGluZzogXCI4cHggMTZweFwiLCBjdXJzb3I6IFwicG9pbnRlclwiIH19PlxuICAgICAgICBTaG9ydGVuIFVSTFxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIHtzaG9ydFVybCAmJiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjIwcHhcIiwgd29yZFdyYXA6IFwiYnJlYWstd29yZFwiLCB3aWR0aDogXCIzMDBweFwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgPGgzPlNob3J0ZW5lZCBVUkw6PC9oMz5cbiAgICAgICAgICA8cD57c2hvcnRVcmx9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIDxoMT5SZXRyaWV2ZSBPcmlnaW5hbCBVUkw8L2gxPlxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBTaG9ydCBDb2RlXCJcbiAgICAgICAgdmFsdWU9e2RlY3J5cHRJbnB1dH1cbiAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXREZWNyeXB0SW5wdXQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiBcIjhweFwiLCBtYXJnaW5Cb3R0b206IFwiMTZweFwiLCB3aWR0aDogXCIzMDBweFwiIH19XG4gICAgICAvPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVSZXRyaWV2ZVVybH0gc3R5bGU9e3sgcGFkZGluZzogXCI4cHggMTZweFwiLCBjdXJzb3I6IFwicG9pbnRlclwiIH19PlxuICAgICAgICBSZXRyaWV2ZSBVUkxcbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICB7b3JpZ2luYWxVcmwgJiYgKFxuICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogXCIyMHB4XCIsIHdvcmRXcmFwOiBcImJyZWFrLXdvcmRcIiwgd2lkdGg6IFwiMzAwcHhcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgIDxoMz5PcmlnaW5hbCBVUkw6PC9oMz5cbiAgICAgICAgICA8cD57b3JpZ2luYWxVcmx9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJDcnlwdG9KUyIsIkFwcCIsInVybCIsInNldFVybCIsInNob3J0VXJsIiwic2V0U2hvcnRVcmwiLCJkZWNyeXB0SW5wdXQiLCJzZXREZWNyeXB0SW5wdXQiLCJvcmlnaW5hbFVybCIsInNldE9yaWdpbmFsVXJsIiwicm91dGVyIiwidXJsTWFwcGluZyIsImdlbmVyYXRlU2hvcnRDb2RlIiwidmFsdWUiLCJoYXNoIiwiU0hBMjU2IiwidG9TdHJpbmciLCJlbmMiLCJCYXNlNjQiLCJyZXBsYWNlIiwic3Vic3RyaW5nIiwiaGFuZGxlU2hvcnRlblVybCIsInRyaW0iLCJzaG9ydENvZGUiLCJhbGVydCIsImhhbmRsZVJldHJpZXZlVXJsIiwib3JpZ2luYWwiLCJkaXYiLCJzdHlsZSIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsIm1hcmdpblRvcCIsImgxIiwiaW5wdXQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJwYWRkaW5nIiwibWFyZ2luQm90dG9tIiwid2lkdGgiLCJidXR0b24iLCJvbkNsaWNrIiwiY3Vyc29yIiwid29yZFdyYXAiLCJ0ZXh0QWxpZ24iLCJoMyIsInAiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/login/index.js\n"));

/***/ })

});