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
    toast(error.statusCode + "", {
      description: error.message ?? error.statusMessage,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };
  const showMessage = (content: {
    title: string;
    description?: string;
    variant?: "default" | "destructive" | null | undefined;
  }) => {
    toast(content.title, {
      description: content.description,
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
    showError,
    showMessage,
  };
};
