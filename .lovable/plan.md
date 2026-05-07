Replace `src/App.tsx` entirely with the provided snippet that mounts the `Header` component over a dark navy background, wired to `INITIAL_DATA.brand` and `INITIAL_DATA.announcement`.

This removes the existing providers (`QueryClientProvider`, `TooltipProvider`, `Toaster`, `Sonner`, `BrowserRouter`/`Routes`) and the `Index`/`NotFound` routes. If you want to keep routing or the toasters, say so and I'll merge instead of replace.

```text
src/App.tsx  → overwritten with new contents (Header + dark bg only)
```