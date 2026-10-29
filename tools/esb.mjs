import * as esbuild from "esbuild";
export const loaders = { ".svg": "dataurl", ".woff2": "dataurl", ".png": "dataurl", ".jpg": "dataurl", ".webp": "dataurl", ".json": "json" };
export async function bundle(entry, outfile, extra = {}) {
  await esbuild.build({ entryPoints: [entry], bundle: true, outfile, format: "iife", loader: loaders, minify: !!extra.minify, jsx: "transform", jsxFactory: "React.createElement", jsxFragment: "React.Fragment", target: "es2020", logLevel: "warning", ...extra.opts });
}
if (process.argv[2]) await bundle(process.argv[2], process.argv[3]);
