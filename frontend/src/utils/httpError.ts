import axios from 'axios';

type ErrorPayload = {
  message?: string;
  error?: string;
};

export const getAxiosErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as ErrorPayload | undefined;
    return payload?.message ?? payload?.error ?? fallbackMessage;
  }

  return fallbackMessage;
};

