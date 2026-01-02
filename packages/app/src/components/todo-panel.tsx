import { createMemo, For, Show } from "solid-js"
import { useSync } from "@/context/sync"
import { Icon } from "@opencode-ai/ui/icon"
import { Checkbox } from "@opencode-ai/ui/checkbox"
import { ProgressCircle } from "@opencode-ai/ui/progress-circle"
import type { Todo } from "@opencode-ai/sdk/v2/client"

interface TodoPanelProps {
  sessionID: string
}

function TodoItem(props: { todo: Todo }) {
  const isCompleted = () => props.todo.status === "completed"
  const isCancelled = () => props.todo.status === "cancelled"
  const isInProgress = () => props.todo.status === "in_progress"

  return (
    <div
      data-component="todo-item"
      classList={{
        "flex items-start gap-2 px-3 py-1.5 rounded-md transition-colors": true,
        "bg-surface-success-base/10": isCompleted(),
        "bg-surface-warning-base/10": isInProgress(),
        "opacity-50": isCancelled(),
      }}
    >
      <div class="mt-0.5">
        <Show
          when={isCompleted()}
          fallback={
            <Show
              when={isInProgress()}
              fallback={
                <div class="w-4 h-4 rounded border border-border-base" />
              }
            >
              <div class="w-4 h-4 rounded border-2 border-text-warning animate-pulse" />
            </Show>
          }
        >
          <Icon name="check" size="small" class="text-text-success" />
        </Show>
      </div>
      <div
        classList={{
          "text-13-regular flex-1": true,
          "text-text-weak line-through": isCompleted() || isCancelled(),
          "text-text-strong": isInProgress(),
          "text-text-base": !isCompleted() && !isCancelled() && !isInProgress(),
        }}
      >
        {props.todo.content}
      </div>
      <Show when={props.todo.priority === "high"}>
        <Icon name="alert-triangle" size="small" class="text-text-error" />
      </Show>
    </div>
  )
}

export function TodoPanel(props: TodoPanelProps) {
  const sync = useSync()

  const todos = createMemo(() => sync.data.todo[props.sessionID] ?? [])

  const stats = createMemo(() => {
    const all = todos()
    const completed = all.filter((t) => t.status === "completed").length
    const inProgress = all.filter((t) => t.status === "in_progress").length
    const pending = all.filter((t) => t.status === "pending").length
    const total = all.length
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0
    return { completed, inProgress, pending, total, progress }
  })

  const hasIncompleteTasks = createMemo(() => {
    return stats().pending > 0 || stats().inProgress > 0
  })

  return (
    <Show when={todos().length > 0}>
      <div
        data-component="todo-panel"
        class="border border-border-base rounded-lg bg-background-base overflow-hidden"
      >
        <div class="px-4 py-2 flex items-center justify-between border-b border-border-weak-base bg-surface-base">
          <div class="flex items-center gap-2">
            <Icon name="checklist" size="small" />
            <span class="text-13-medium text-text-strong">Tasks</span>
          </div>
          <div class="flex items-center gap-3">
            <Show when={hasIncompleteTasks()}>
              <div class="flex items-center gap-1.5 text-12-regular text-text-warning">
                <div class="w-1.5 h-1.5 rounded-full bg-text-warning animate-pulse" />
                <span>Auto-resuming...</span>
              </div>
            </Show>
            <div class="flex items-center gap-2">
              <ProgressCircle value={stats().progress} size={20} strokeWidth={3} />
              <span class="text-12-regular text-text-weak">
                {stats().completed}/{stats().total}
              </span>
            </div>
          </div>
        </div>
        <div class="p-2 flex flex-col gap-0.5 max-h-48 overflow-y-auto">
          <For each={todos()}>
            {(todo) => <TodoItem todo={todo} />}
          </For>
        </div>
      </div>
    </Show>
  )
}
