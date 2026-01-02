export namespace Flag {
  // Helper to get env var with fallback from OPENCODE_* to EASYBANANA_* for backward compatibility
  function envWithFallback(newKey: string, legacyKey: string): string | undefined {
    return process.env[newKey] ?? process.env[legacyKey]
  }

  function truthyWithFallback(newKey: string, legacyKey: string): boolean {
    const value = envWithFallback(newKey, legacyKey)?.toLowerCase()
    return value === "true" || value === "1"
  }

  function numberWithFallback(newKey: string, legacyKey: string): number | undefined {
    const value = envWithFallback(newKey, legacyKey)
    if (!value) return undefined
    const parsed = Number(value)
    return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
  }

  export const OPENCODE_AUTO_SHARE = truthyWithFallback("EASYBANANA_AUTO_SHARE", "OPENCODE_AUTO_SHARE")
  export const OPENCODE_GIT_BASH_PATH = envWithFallback("EASYBANANA_GIT_BASH_PATH", "OPENCODE_GIT_BASH_PATH")
  export const OPENCODE_CONFIG = envWithFallback("EASYBANANA_CONFIG", "OPENCODE_CONFIG")
  export const OPENCODE_CONFIG_DIR = envWithFallback("EASYBANANA_CONFIG_DIR", "OPENCODE_CONFIG_DIR")
  export const OPENCODE_CONFIG_CONTENT = envWithFallback("EASYBANANA_CONFIG_CONTENT", "OPENCODE_CONFIG_CONTENT")
  export const OPENCODE_DISABLE_AUTOUPDATE = truthyWithFallback(
    "EASYBANANA_DISABLE_AUTOUPDATE",
    "OPENCODE_DISABLE_AUTOUPDATE",
  )
  export const OPENCODE_DISABLE_PRUNE = truthyWithFallback("EASYBANANA_DISABLE_PRUNE", "OPENCODE_DISABLE_PRUNE")
  export const OPENCODE_DISABLE_TERMINAL_TITLE = truthyWithFallback(
    "EASYBANANA_DISABLE_TERMINAL_TITLE",
    "OPENCODE_DISABLE_TERMINAL_TITLE",
  )
  export const OPENCODE_PERMISSION = envWithFallback("EASYBANANA_PERMISSION", "OPENCODE_PERMISSION")
  export const OPENCODE_DISABLE_DEFAULT_PLUGINS = truthyWithFallback(
    "EASYBANANA_DISABLE_DEFAULT_PLUGINS",
    "OPENCODE_DISABLE_DEFAULT_PLUGINS",
  )
  export const OPENCODE_DISABLE_LSP_DOWNLOAD = truthyWithFallback(
    "EASYBANANA_DISABLE_LSP_DOWNLOAD",
    "OPENCODE_DISABLE_LSP_DOWNLOAD",
  )
  export const OPENCODE_ENABLE_EXPERIMENTAL_MODELS = truthyWithFallback(
    "EASYBANANA_ENABLE_EXPERIMENTAL_MODELS",
    "OPENCODE_ENABLE_EXPERIMENTAL_MODELS",
  )
  export const OPENCODE_DISABLE_AUTOCOMPACT = truthyWithFallback(
    "EASYBANANA_DISABLE_AUTOCOMPACT",
    "OPENCODE_DISABLE_AUTOCOMPACT",
  )
  export const OPENCODE_DISABLE_MODELS_FETCH = truthyWithFallback(
    "EASYBANANA_DISABLE_MODELS_FETCH",
    "OPENCODE_DISABLE_MODELS_FETCH",
  )
  export const OPENCODE_FAKE_VCS = envWithFallback("EASYBANANA_FAKE_VCS", "OPENCODE_FAKE_VCS")
  export const OPENCODE_CLIENT = envWithFallback("EASYBANANA_CLIENT", "OPENCODE_CLIENT") ?? "cli"

  // Experimental
  export const OPENCODE_EXPERIMENTAL = truthyWithFallback("EASYBANANA_EXPERIMENTAL", "OPENCODE_EXPERIMENTAL")
  export const OPENCODE_EXPERIMENTAL_FILEWATCHER = truthyWithFallback(
    "EASYBANANA_EXPERIMENTAL_FILEWATCHER",
    "OPENCODE_EXPERIMENTAL_FILEWATCHER",
  )
  export const OPENCODE_EXPERIMENTAL_DISABLE_FILEWATCHER = truthyWithFallback(
    "EASYBANANA_EXPERIMENTAL_DISABLE_FILEWATCHER",
    "OPENCODE_EXPERIMENTAL_DISABLE_FILEWATCHER",
  )
  export const OPENCODE_EXPERIMENTAL_ICON_DISCOVERY =
    OPENCODE_EXPERIMENTAL ||
    truthyWithFallback("EASYBANANA_EXPERIMENTAL_ICON_DISCOVERY", "OPENCODE_EXPERIMENTAL_ICON_DISCOVERY")
  export const OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT = truthyWithFallback(
    "EASYBANANA_EXPERIMENTAL_DISABLE_COPY_ON_SELECT",
    "OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT",
  )
  export const OPENCODE_ENABLE_EXA =
    truthyWithFallback("EASYBANANA_ENABLE_EXA", "OPENCODE_ENABLE_EXA") ||
    OPENCODE_EXPERIMENTAL ||
    truthyWithFallback("EASYBANANA_EXPERIMENTAL_EXA", "OPENCODE_EXPERIMENTAL_EXA")
  export const OPENCODE_EXPERIMENTAL_BASH_MAX_OUTPUT_LENGTH = numberWithFallback(
    "EASYBANANA_EXPERIMENTAL_BASH_MAX_OUTPUT_LENGTH",
    "OPENCODE_EXPERIMENTAL_BASH_MAX_OUTPUT_LENGTH",
  )
  export const OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS = numberWithFallback(
    "EASYBANANA_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS",
    "OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS",
  )
  export const OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX = numberWithFallback(
    "EASYBANANA_EXPERIMENTAL_OUTPUT_TOKEN_MAX",
    "OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX",
  )
  export const OPENCODE_EXPERIMENTAL_OXFMT =
    OPENCODE_EXPERIMENTAL || truthyWithFallback("EASYBANANA_EXPERIMENTAL_OXFMT", "OPENCODE_EXPERIMENTAL_OXFMT")
  export const OPENCODE_EXPERIMENTAL_LSP_TY = truthyWithFallback(
    "EASYBANANA_EXPERIMENTAL_LSP_TY",
    "OPENCODE_EXPERIMENTAL_LSP_TY",
  )
  export const OPENCODE_EXPERIMENTAL_LSP_TOOL =
    OPENCODE_EXPERIMENTAL ||
    truthyWithFallback("EASYBANANA_EXPERIMENTAL_LSP_TOOL", "OPENCODE_EXPERIMENTAL_LSP_TOOL")

  function truthy(key: string) {
    const value = process.env[key]?.toLowerCase()
    return value === "true" || value === "1"
  }

  function number(key: string) {
    const value = process.env[key]
    if (!value) return undefined
    const parsed = Number(value)
    return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
  }
}
