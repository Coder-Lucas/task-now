import Vitals from "eslint-config-next/core-web-vitals";
import Typescript from "eslint-config-next/typescript";
import Prettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";

const config = defineConfig([...Vitals, ...Typescript, Prettier]);

export default config;
