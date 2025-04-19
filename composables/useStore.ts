import { toast } from "vue-sonner";
import type { APIError } from "~/types";
type StateType = {
  isModalVisible: boolean;
  isLoading: boolean;
  appError: APIError | null;
};
const state = reactive<StateType>({
  isModalVisible: false,
  isLoading: false,
  appError: null,
});

export default () => {
  const { isLoading, appError, isModalVisible } = toRefs(state);
  const toggleLoading = (v: boolean) => {
    state.isLoading = v;
  };
  const toggleError = (error: APIError | null) => {
    state.appError = error;
  };
  const showError = (error: APIError) => {
    toast.error(error.statusCode + "", {
      description: error.message ?? error.statusMessage,
      closeButton: true,
      duration: 5000,
      dismissible: true,
      richColors: true,
      // action: {
      //   label: "Undo",
      //   onClick: () => console.log("Undo"),
      // },
    });
  };
  const toggleModal = (v: boolean) => {
    state.isModalVisible = v;
  };
  const showMessage = (content: {
    title: string;
    description?: string;
    variant?: "default" | "destructive" | null | undefined;
  }) => {
    toast(content.title, {
      description: content.description,
      // action: {
      //   label: "Undo",
      //   onClick: () => console.log("Undo"),
      // },
    });
  };
  return {
    isLoading,
    appError,
    toggleLoading,
    toggleError,
    showError,
    showMessage,
    isModalVisible,
    toggleModal,
  };
};
