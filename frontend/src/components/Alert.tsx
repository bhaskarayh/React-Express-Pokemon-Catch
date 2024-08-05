import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SwalWithReactContent = withReactContent(Swal);

type AlertProps = {
  title: string;
  text?: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
};

export const showAlert = async ({
  title,
  text,
  icon = "info",
  confirmButtonText = "OK",
}: AlertProps) => {
  await SwalWithReactContent.fire({
    title,
    text,
    icon,
    confirmButtonText,
  });
};

export const showConfirmAlert = async ({
  title,
  text,
  icon = "info",
  confirmButtonText = "OK",
  cancelButtonText = "Cancel",
  showCancelButton = false,
}: AlertProps): Promise<boolean> => {
  const result = await SwalWithReactContent.fire({
    title,
    text,
    icon,
    confirmButtonText,
    showCancelButton,
    cancelButtonText,
  });

  return result.isConfirmed;
};
