declare module 'crypto-js' {
    const MD5: {
      (message: string): { toString(): string };
    };
    // Add other methods and types you use here
  
    export { MD5 };
  }