[plugin:vite:import-analysis] Failed to resolve import "../services/api" from "src/pages/Signup.jsx". Does the file exist?
E:/React/urlcompany/url-shortener-frontend/src/pages/Signup.jsx:9:16
2  |  import { Link, useNavigate } from "react-router-dom";
3  |  import { Zap, CheckCircle, Eye, EyeOff } from "lucide-react";
4  |  import api from "../services/api";
   |                   ^
5  |  var _jsxFileName = "E:/React/urlcompany/url-shortener-frontend/src/pages/Signup.jsx";
6  |  import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
    at TransformPluginContext._formatLog (file:///E:/React/urlcompany/url-shortener-frontend/node_modules/vite/dist/node/chunks/node.js:30602:39)
    at TransformPluginContext.error (file:///E:/React/urlcompany/url-shortener-frontend/node_modules/vite/dist/node/chunks/node.js:30599:14)
    at normalizeUrl (file:///E:/React/urlcompany/url-shortener-frontend/node_modules/vite/dist/node/chunks/node.js:27842:18)
    at async file:///E:/React/urlcompany/url-shortener-frontend/node_modules/vite/dist/node/chunks/node.js:27905:30
    at async Promise.all (index 3)
    at async TransformPluginContext.transform (file:///E:/React/urlcompany/url-shortener-frontend/node_modules/vite/dist/node/chunks/node.js:27873:4)
    at async EnvironmentPluginContainer.transform (file:///E:/React/urlcompany/url-shortener-frontend/node_modules/vite/dist/node/chunks/node.js:30387:14)
    at async loadAndTransform (file:///E:/React/urlcompany/url-shortener-frontend/node_modules/vite/dist/node/chunks/node.js:24646:26)
Click outside, press Esc key, or fix the code to dismiss.
You can also disable this overlay by setting server.hmr.overlay to false in vite.config.js.