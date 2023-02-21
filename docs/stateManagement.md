## Slices

A "slice" is the terminology used by Redux Toolkit to control state. It provides the actions and defaults for each of your states and as such redux logic is stored stored in `app/webpack/slices`.

### Reading and Updating State

Use the provided `useAppSelector` and `useAppDispatch` to read and update state respectively.

### Initial State

Slices also allow granular control of the initial state of the application, as also seen in the rubric slice. The app generates the rubric initial state via `getInitialState` which loops over the rubric and creates an object representing it.

This allows for the rubric's initial state to be whichever form is selected instead a more complex structure.

## Store

Note that [redux-persist](https://github.com/rt2zz/redux-persist) is used in`store.ts` to ensure data is saved between sessions. This also allows each form to have its own storage via the `key: currentForm` config parameter so multiple forms can be opened at once without overwriting each other.

This is why the reducers are combined into a single `persistedReducer`.

## Migrations

Migrations are written in `app/webpack/migrations.ts`. These must be written manually as the data structure in LocalStorage changes in order to prevent a crash when existing users launch the app.

To write a migration, simple provide a new value to `migrations` as `[newVersion]: migrationFunction`. The `migrationFunction` is a mapping from the old state structure to the new state structure, providing default values if needed. As an example:

```typescript
[1]: (state: MigratingState): MigratingState => {
    return {
      ...state,
      notebookChecks: getNotebookCheck(Location.logan, "1"),
      formInfo: {
        ...state.formInfo,
        location: Location.logan,
        observation: "1",
      },
    };
```

See existing migrations for more examples.

Once the migration is written, bump the `persistVersion` in `app/webpack.store.ts` to `newVersion`.
