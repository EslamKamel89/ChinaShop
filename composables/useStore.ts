import type { APIError } from "~/types";

type StateType = {
  isLoading: boolean;
  appError: APIError | null;
};
const state = reactive<StateType>({
  isLoading: false,
  appError: null,
});

export default () => {
  const { isLoading, appError } = toRefs(state);
  const toggleLoading = (v: boolean) => {
    state.isLoading = v;
  };
  const toggleError = (error: APIError | null) => {
    state.appError = error;
  };
  return {
    isLoading,
    appError,
    toggleLoading,
    toggleError,
  };
};
