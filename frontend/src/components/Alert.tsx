import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SwalWithReactContent = withReactContent(Swal);

type AlertProps = {
  title: string;
  text?: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
  confirmButtonText?: string;
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
