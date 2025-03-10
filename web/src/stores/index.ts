import { createStore } from "aeria-ui";

export const flowStore = createStore((context) => {
  return {
    $id: 'flow',
    state: {
      name: '',
    },
    actions: {
      changeName: (name: number) => {
        //
      }
    }
  }
})
