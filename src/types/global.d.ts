// Type declarations for global modules
declare module "next/link";
declare module "next/image";

// CSS Font Loading Module declaration
declare module "css-font-loading-module" {
  interface FontFace {
    family: string;
    display: string;
    stretch: string;
    style: string;
    weight: string;
    variant: string;
    featureSettings: string;
    variationSettings: string;
    status: string;
    loaded: Promise<FontFace>;
    load(): Promise<FontFace>;
  }
}

// Ensure JSX namespace is defined
namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
