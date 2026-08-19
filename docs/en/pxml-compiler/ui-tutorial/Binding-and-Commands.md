# Bindings, commands, and events

PXML separates state reads from side effects: bindings are pure reads/computation, commands represent business actions, and events enter only the low-level UI behavior layer.

## Bindings

```xml
<Text Text="{bind User.Profile.DisplayName}" />
<Text Text="{bind Download.Progress >= 1 ? 'Complete' : 'Downloading'}" />
```

Bindings support paths, static indexes, arithmetic, comparison, logic, null coalescing, and conditional expressions. The compiler records the target property, dependency set, and typed program so only affected bindings reevaluate.

Built-in pure functions include formatting, clamping, min/max, rounding, string case/trim, and color construction. Host extensions must be explicitly whitelisted.

Bindings cannot perform I/O, call services, allocate arbitrary objects, await, throw, use reflection, or mutate state. `{bind Danger()}` is a compile-time error.

## Commands

```xml
<Button
  Text="Launch"
  Command="{cmd Launcher.Start}"
  CommandParameter="{bind SelectedInstance.Id}" />
```

The compiler emits a stable `UiCommandId` and typed argument program. Runtime queues the command for the application layer. PXML never invokes a C# method by name.

## UI events

```xml
<Node
  OnPointerDown="{event Drag.Begin}"
  OnPointerUp="{event Drag.Finish}" />
```

Events belong to a UI scope and obey entity/scope generations. Business changes still flow through an explicit command or state patch.

NativeHost writes follow `platform event → generation validation → command/state patch → next binding evaluation`; they do not directly mutate Presentation Store.

Troubleshoot stale bindings by checking dependency publication, command registration, effective Disabled/Visible state, overlay barriers, and template locals.

Next: [Conditions, lists, and virtualization](./Structure-and-Lists).
