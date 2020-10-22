/// <reference types="react-scripts" />

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module 'three-orbitcontrols' {
  const orbitcontrols: { 'three-orbitcontrols' };
  export default orbitcontrols;
}
