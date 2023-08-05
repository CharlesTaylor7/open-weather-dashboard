# Open Weather Dashboard

This is a dashboard that uses Open Weather API to display weather conditions for nearly any city in the world.

## Implementation Notes

### Import style
Javascript doesn't provide absolute imports by default.

A lot of the code in the wild imports code relatively:

```ts
// In file src/bar.ts
import foo from './foo'
```

This code works today, but if I want to move logic between files, the relative imports may become incorrect. You can make refactoring less of headache by using absolute imports everywhere.

So the project sets up a path alias, so that any prefix of `@/foo` resolves to an absolute import of `src/foo.ts`.
