import { toast } from "vue-sonner";
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
  const showError = (error: APIError) => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };
  return {
    isLoading,
    appError,
    toggleLoading,
    toggleError,
  };
};
