const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"home":{"uri":"\/","methods":["GET","HEAD"]},"question":{"uri":"question","methods":["GET","HEAD"]},"login":{"uri":"auth\/login","methods":["GET","HEAD"]},"attempt":{"uri":"auth\/attempt","methods":["POST"]},"logout":{"uri":"auth\/logout","methods":["POST"]},"backoffice.index":{"uri":"backoffice","methods":["GET","HEAD"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
