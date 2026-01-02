#!/usr/bin/env bun
import { spawn } from "bun"
import { copyBinaryToSidecarFolder, getCurrentSidecar } from "./utils"
import path from "path"
import fs from "fs"

const RUST_TARGET = Bun.env.TAURI_ENV_TARGET_TRIPLE

const viteProcess = spawn(["bun", "run", "dev:vite"], {
  cwd: import.meta.dir + "/..",
  stdio: ["inherit", "inherit", "inherit"],
})

async function buildCliIfNeeded() {
  const sidecarConfig = getCurrentSidecar(RUST_TARGET)
  const binaryPath = `../opencode/dist/${sidecarConfig.ocBinary}/bin/opencode${process.platform === "win32" ? ".exe" : ""}`
  const fullBinaryPath = path.resolve(import.meta.dir, "..", binaryPath)

  if (fs.existsSync(fullBinaryPath)) {
    console.log("[dev] CLI binary exists, copying to sidecar folder...")
    await copyBinaryToSidecarFolder(binaryPath, RUST_TARGET)
    console.log("[dev] Sidecar ready!")
    return
  }

  console.log("[dev] Building CLI in background...")
  const buildProcess = spawn(["bun", "run", "build", "--single"], {
    cwd: path.resolve(import.meta.dir, "../../opencode"),
    stdio: ["inherit", "inherit", "inherit"],
  })

  await buildProcess.exited
  await copyBinaryToSidecarFolder(binaryPath, RUST_TARGET)
  console.log("[dev] CLI build complete, sidecar ready!")
}

buildCliIfNeeded().catch((err) => {
  console.error("[dev] CLI build failed:", err)
})

await viteProcess.exited
