# Overlays, navigation, and NativeHost

Tooltip, Popup, Modal, and platform controls combine visual stacking with interaction permissions. ZIndex or `IsHitTestVisible` alone is not a substitute for these contracts.

## Overlays

```xml
<Button Text="Help">
  <Button.Tooltip Delay="500ms" Placement="Pointer">
    <Text Text="{loc Help.Description}" />
  </Button.Tooltip>
</Button>

<Popup Anchor="{ref MoreButton}" Placement="Auto"
       DismissOnOutsidePointer="true" DismissOnEscape="true">
  <ActionMenu />
</Popup>

<Modal DismissOnEscape="true"><ConfirmDialog /></Modal>
```

Each overlay owns a child scope. Modal supplies a dim/input barrier and focus trap; Tooltip is input pass-through. NativeHost visual occlusion is separate from interaction barriers, so a barrierless tooltip/popup still appears above intersecting native controls.

One interaction policy decides Pointer, KeyboardFocus, Accessibility, CommandInvoke, and NativeHost capabilities for the topmost barrier.

## Navigation

```xml
<NavigationHost Current="{bind Shell.Route}">
  <Page Key="Home" Cache="Pinned"><HomePage /></Page>
  <Page Key="Download" Cache="Lru"><DownloadPage /></Page>
</NavigationHost>
```

Keys are unique per host. Lifecycle completion uses an internal lossless queue, not a bounded diagnostics journal. Dormant root state propagates to focused descendants and native hosts.

## NativeHost

```xml
<NativeHost Kind="TextBox"
  Value="{bind Search.Text}"
  Placeholder="{loc Search.Placeholder}"
  AccessibleName="{loc Search.Label}" />
```

The backend creates the platform control. It inherits ancestor visibility/enabled state, uses InputRoot-scoped focus/pointer identity, obeys overlay policy and occlusion, and writes through generation-safe events. Destroyed scopes reject stale timers, animation completions, platform events, and commands.

Next: [Build, debug, and release](./Build-Debug-and-Release).
