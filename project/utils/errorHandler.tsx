import { toast } from "sonner";
import type { AxiosError } from "axios";
import { t } from "i18next";

interface ApiErrorResponse {
  message?: string;
  detail?: string;
}

export function handleApiError(error: unknown): string {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  const status = axiosError.response?.status;
  const data = axiosError.response?.data;

  const message =
    data?.message ||
    data?.detail ||
    axiosError.message ||
    "An unexpected error occurred.";

  switch (status) {
    case 400:
      toast.warning(message);
      break;
    case 401:
      toast.error(t("Unauthorized. Please log in again."));
      break;
    case 403:
      toast.error(t("Forbidden. You don't have access."));
      break;
    case 404:
      toast.error(t("Not found."));
      break;
    default:
      toast.error(t(message));
  }

  return message;
}
