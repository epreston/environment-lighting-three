// global.d.ts

/// <reference types="vite/client" />

// additional import types not included in vite/client

declare module '*.glb' {
  const src: string;
  export default src;
}

declare module '*.hdr' {
  const src: string;
  export default src;
}
