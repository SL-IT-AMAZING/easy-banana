#!/usr/bin/env bun
import { $ } from "bun"

import { copyBinaryToSidecarFolder, getCurrentSidecar } from "./utils"

const sidecarConfig = getCurrentSidecar()

const dir = "src-tauri/target/easybanana-binaries"

await $`mkdir -p ${dir}`
await $`gh run download ${Bun.env.GITHUB_RUN_ID} -n easybanana-cli`.cwd(dir)

await copyBinaryToSidecarFolder(
  `${dir}/${sidecarConfig.ocBinary}/bin/easybanana${process.platform === "win32" ? ".exe" : ""}`,
)
