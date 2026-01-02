#!/usr/bin/env bun
import { $ } from "bun"
import pkg from "../package.json"
import { Script } from "@easybanana/script"
import { fileURLToPath } from "url"

const dir = fileURLToPath(new URL("..", import.meta.url))
process.chdir(dir)

const BINARY_NAME = "easybanana"

const { binaries } = await import("./build.ts")
{
  const name = `${BINARY_NAME}-${process.platform}-${process.arch}`
  console.log(`smoke test: running dist/${name}/bin/${BINARY_NAME} --version`)
  await $`./dist/${name}/bin/${BINARY_NAME} --version`
}

await $`mkdir -p ./dist/${BINARY_NAME}`
await $`cp -r ./bin ./dist/${BINARY_NAME}/bin`
await $`cp ./script/postinstall.mjs ./dist/${BINARY_NAME}/postinstall.mjs`

await Bun.file(`./dist/${BINARY_NAME}/package.json`).write(
  JSON.stringify(
    {
      name: BINARY_NAME + "-ai",
      bin: {
        [BINARY_NAME]: `./bin/${BINARY_NAME}`,
      },
      scripts: {
        postinstall: "bun ./postinstall.mjs || node ./postinstall.mjs",
      },
      version: Script.version,
      optionalDependencies: binaries,
    },
    null,
    2,
  ),
)

const tags = [Script.channel]

const tasks = Object.entries(binaries).map(async ([name]) => {
  if (process.platform !== "win32") {
    await $`chmod -R 755 .`.cwd(`./dist/${name}`)
  }
  await $`bun pm pack`.cwd(`./dist/${name}`)
  for (const tag of tags) {
    await $`npm publish *.tgz --access public --tag ${tag}`.cwd(`./dist/${name}`)
  }
})
await Promise.all(tasks)
for (const tag of tags) {
  await $`cd ./dist/${BINARY_NAME} && bun pm pack && npm publish *.tgz --access public --tag ${tag}`
}

if (!Script.preview) {
  // Create archives for GitHub release
  for (const key of Object.keys(binaries)) {
    if (key.includes("linux")) {
      await $`tar -czf ../../${key}.tar.gz *`.cwd(`dist/${key}/bin`)
    } else {
      await $`zip -r ../../${key}.zip *`.cwd(`dist/${key}/bin`)
    }
  }

  const image = "ghcr.io/sl-it-amazing/easybanana"
  const platforms = "linux/amd64,linux/arm64"
  const tags = [`${image}:${Script.version}`, `${image}:latest`]
  const tagFlags = tags.flatMap((t) => ["-t", t])
  await $`docker buildx build --platform ${platforms} ${tagFlags} --push .`
}
