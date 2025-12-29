import typescript from "@rollup/plugin-typescript"
import nodeResolve from "@rollup/plugin-node-resolve"

const config = {
     input: "src/index.ts",
     output: {
          esModule: true,
          file: "dist/index.js",
          format: "esm",
          sourcemap: true
     },
     plugins: [
          typescript({
               tsconfig: "./tsconfig.json"
          }),
          nodeResolve({
               preferBuiltins: true,
          })
     ],
     external: ["@actions/core","@actions/github"]
}

export default config