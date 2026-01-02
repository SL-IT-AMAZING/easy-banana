import { createMemo, For, Show } from "solid-js"
import { useSync } from "@/context/sync"
import { useGlobalSync } from "@/context/global-sync"
import { Icon } from "@opencode-ai/ui/icon"
import { IconButton } from "@opencode-ai/ui/icon-button"
import { Spinner } from "@opencode-ai/ui/spinner"
import { Tooltip } from "@opencode-ai/ui/tooltip"
import { DateTime } from "luxon"
import type { Session } from "@opencode-ai/sdk/v2/client"

interface BackgroundTaskPanelProps {
  sessionID: string
  directory: string
}

function formatDuration(startMs: number, endMs?: number): string {
  const duration = (endMs ?? Date.now()) - startMs
  const seconds = Math.floor(duration / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  }
  return `${seconds}s`
}

function TaskStatusIcon(props: { status: string }) {
  return (
    <Show
      when={props.status === "running"}
      fallback={
        <Show
          when={props.status === "completed"}
          fallback={<Icon name="circle-x" size="small" class="text-text-error" />}
        >
          <Icon name="check" size="small" class="text-text-success" />
        </Show>
      }
    >
      <Spinner class="w-4 h-4" />
    </Show>
  )
}

function TaskItem(props: { task: Session; onCancel?: () => void }) {
  const sync = useSync()
  const status = createMemo(() => sync.data.session_status[props.task.id])
  const isRunning = createMemo(() => status()?.type !== "idle")
  const createdAt = createMemo(() => new Date(props.task.time?.created ?? Date.now()).getTime())

  return (
    <div
      data-component="background-task-item"
      class="flex items-center gap-3 px-3 py-2 rounded-md bg-background-element hover:bg-background-element-hover transition-colors"
    >
      <TaskStatusIcon status={isRunning() ? "running" : "completed"} />
      <div class="flex-1 min-w-0">
        <div class="text-13-medium text-text-strong truncate">{props.task.title || "Background Task"}</div>
        <div class="text-12-regular text-text-weak">
          {formatDuration(createdAt())}
        </div>
      </div>
      <Show when={isRunning()}>
        <Tooltip value="Cancel task">
          <IconButton
            icon="close"
            size="normal"
            variant="ghost"
            onClick={props.onCancel}
          />
        </Tooltip>
      </Show>
    </div>
  )
}

export function BackgroundTaskPanel(props: BackgroundTaskPanelProps) {
  const globalSync = useGlobalSync()
  const [store] = globalSync.child(props.directory)

  const backgroundTasks = createMemo(() => {
    const allSessions = store.session ?? []
    return allSessions.filter((s) => s.parentID === props.sessionID)
  })

  const runningTasks = createMemo(() => {
    return backgroundTasks().filter((task) => {
      const status = store.session_status[task.id]
      return status?.type !== "idle"
    })
  })

  const completedTasks = createMemo(() => {
    return backgroundTasks().filter((task) => {
      const status = store.session_status[task.id]
      return status?.type === "idle"
    })
  })

  return (
    <Show when={backgroundTasks().length > 0}>
      <div
        data-component="background-task-panel"
        class="border-t border-border-weak-base"
      >
        <div class="px-4 py-2 flex items-center justify-between border-b border-border-weak-base">
          <div class="flex items-center gap-2">
            <Icon name="task" size="small" />
            <span class="text-13-medium text-text-strong">Background Tasks</span>
            <Show when={runningTasks().length > 0}>
              <span class="text-12-regular text-text-weak">
                ({runningTasks().length} running)
              </span>
            </Show>
          </div>
        </div>
        <div class="p-2 flex flex-col gap-1 max-h-48 overflow-y-auto">
          <For each={runningTasks()}>
            {(task) => <TaskItem task={task} />}
          </For>
          <Show when={completedTasks().length > 0 && runningTasks().length > 0}>
            <div class="text-12-regular text-text-weaker px-3 py-1">Completed</div>
          </Show>
          <For each={completedTasks().slice(0, 5)}>
            {(task) => <TaskItem task={task} />}
          </For>
        </div>
      </div>
    </Show>
  )
}
