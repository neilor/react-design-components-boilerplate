/** Global definitions for developement **/

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

// for style loader
declare module '*.scss' {
  const styles: any;
  export = styles;
}

// for JSON import support
declare module "*.json" {
  const value: any;
  export default value;
}
declare module "json!*" {
  const value: any;
  export default value;
}
