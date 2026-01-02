import { createMemo, For, Show } from "solid-js"
import { useSync } from "@/context/sync"
import { useLocal } from "@/context/local"
import { Icon, type IconProps } from "@opencode-ai/ui/icon"
import { Tooltip } from "@opencode-ai/ui/tooltip"
import type { Agent } from "@opencode-ai/sdk/v2/client"

const AGENT_ICONS: Record<string, IconProps["name"]> = {
  sisyphus: "console",
  oracle: "brain",
  librarian: "folder",
  explore: "magnifying-glass",
  "frontend-ui-ux-engineer": "code",
  "document-writer": "pencil-line",
  "multimodal-looker": "photo",
  build: "settings-gear",
  general: "bubble-5",
  plan: "checklist",
}

const AGENT_DESCRIPTIONS: Record<string, string> = {
  sisyphus: "Primary orchestrator - keeps rolling until done",
  oracle: "Strategic advisor for design and debugging",
  librarian: "Multi-repo analysis and documentation lookup",
  explore: "Blazing-fast codebase exploration",
  "frontend-ui-ux-engineer": "Frontend development specialist",
  "document-writer": "Technical documentation generation",
  "multimodal-looker": "PDF and image analysis",
  build: "Build and deployment tasks",
  general: "General purpose agent",
  plan: "Planning and task breakdown",
}

function AgentCard(props: { agent: Agent; isActive: boolean; onClick: () => void }) {
  const iconName = () => AGENT_ICONS[props.agent.name] ?? "user"
  const description = () => AGENT_DESCRIPTIONS[props.agent.name] ?? props.agent.description ?? ""

  return (
    <Tooltip value={description()}>
      <button
        type="button"
        onClick={props.onClick}
        classList={{
          "flex items-center gap-2 px-3 py-2 rounded-md transition-all": true,
          "bg-surface-info-base text-text-on-info ring-2 ring-border-info": props.isActive,
          "bg-surface-base hover:bg-surface-raised-base-hover text-text-base": !props.isActive,
        }}
      >
        <Icon name={iconName()} size="small" />
        <span class="text-13-medium capitalize">{props.agent.name}</span>
        <Show when={props.agent.mode === "subagent"}>
          <span class="text-11-regular opacity-60">(sub)</span>
        </Show>
      </button>
    </Tooltip>
  )
}

export function AgentDashboard() {
  const sync = useSync()
  const local = useLocal()

  const agents = createMemo(() => sync.data.agent ?? [])
  const primaryAgents = createMemo(() => agents().filter((a) => a.mode !== "subagent" && !a.hidden))
  const subAgents = createMemo(() => agents().filter((a) => a.mode === "subagent" && !a.hidden))
  const currentAgent = createMemo(() => local.agent.current())

  return (
    <div data-component="agent-dashboard" class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <Icon name="bubble-5" size="small" class="text-text-weak" />
        <span class="text-12-medium text-text-weak">Agents</span>
      </div>

      <div class="flex flex-wrap gap-2">
        <For each={primaryAgents()}>
          {(agent) => (
            <AgentCard
              agent={agent}
              isActive={currentAgent()?.name === agent.name}
              onClick={() => local.agent.set(agent.name)}
            />
          )}
        </For>
      </div>

      <Show when={subAgents().length > 0}>
        <div class="flex items-center gap-2 mt-2">
          <span class="text-11-regular text-text-weaker">Subagents</span>
          <div class="flex-1 h-px bg-border-weak-base" />
        </div>
        <div class="flex flex-wrap gap-2">
          <For each={subAgents()}>
            {(agent) => (
              <AgentCard
                agent={agent}
                isActive={false}
                onClick={() => {}}
              />
            )}
          </For>
        </div>
      </Show>

      <Show when={currentAgent()}>
        <div class="mt-2 p-3 rounded-md bg-surface-base border border-border-weak-base">
          <div class="flex items-center gap-2 mb-2">
            <Icon name={AGENT_ICONS[currentAgent()!.name] ?? "user"} size="small" />
            <span class="text-14-medium text-text-strong capitalize">{currentAgent()!.name}</span>
          </div>
          <Show when={currentAgent()!.description}>
            <p class="text-12-regular text-text-weak">{currentAgent()!.description}</p>
          </Show>
        </div>
      </Show>
    </div>
  )
}
