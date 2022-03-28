## Slices

A "slice" is the terminology used by Redux Toolkit to control state. It provides the actions and defaults for each of your states. In this app these slices are stored in `app/webpack/slices`.

### Actions

For example, on the rubric state, the only actions needed are `setRubricScore`, `setRubricComment`, and `resetRubric`. These are provided and easily seen in the `rubricSlice` file. These can be accessed by importing them and using the `useAppDispatch` hook from `hooks/hooks.ts`.

```ts
import { useAppDispatch } from "hooks/hooks";
import { resetFormInfo } from "slices/formInfoSlice";

const Component = () => {
  const dispatch = useAppDispatch();
  dispatch(resetFormInfo());
  ...
}

```

### Initial State

However, slices also allow granular control of the initial state of the application, as also seen in the rubric slice. The initial state is not known at the beginning; instead it generates the initial state via `getInitialState` which loops over the rubric and creates an object representing it.

## Store

Stores, as their name suggests, are what actually hold the state. This app's store `store.ts` imports each of the slices and saves them to the store. Then, state can be accessed by importing the `useAppSelector` in `hooks/hooks.ts` and a slice's selector like the example shown.

```ts
import { useAppSelector } from "hooks/hooks";
import { selectFormInfo } from "slices/formInfoSlice";

const Component = () => {
  const formInfo = useAppSelector(selectFormInfo);
  ...
}

```

Note that [redux-persist](https://github.com/rt2zz/redux-persist) is used in`store.ts` to ensure data is saved between sessions. This also allows each form to have its own storage via the `key: currentForm` config parameter so multiple forms can be opened at once without overwriting each other.
