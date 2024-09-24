/**
 * Fetches data from a given URL and displays toast notifications for success or error.
 *
 * @template T - The type of the data expected from the fetch request.
 * @param {string} url - The URL to fetch data from.
 * @param {Object} toastOpts - Options for configuring toast notifications.
 * @param {Object} [toastOpts.successMessage] - Options for the success message toast.
 * @param {string} toastOpts.successMessage.title - The title of the success message.
 * @param {string} [toastOpts.successMessage.description] - The description of the success message.
 * @param {Function} [toastOpts.success] - Callback function to execute on success.
 * @param {Object} [toastOpts.errorMessage] - Options for the error message toast.
 * @param {string} toastOpts.errorMessage.title - The title of the error message.
 * @param {string} [toastOpts.errorMessage.description] - The description of the error message.
 * @param {Function} [toastOpts.error] - Callback function to execute on error.
 * @param {Object} [opts] - Additional options for the fetch request.
 * @param {"POST" | "PUT" | "GET"} opts.method - The HTTP method to use for the fetch request.
 * @param {string} opts.body - The body of the fetch request.
 * @returns {Promise<T>} The data fetched from the URL.
 * @throws Will throw an error if the fetch request fails.
 */
export const useFetchWithToast = async <T>(
    url: string,
    toastOpts: {
      successMessage?: {
        title: string;
        description?: string;
      };
      success?: () => void;
      errorMessage?: {
        title: string;
        description?: string;
      };
      error?: () => void;
    },
    opts?: { method: "POST" | "PUT" | "GET" | "DELETE"; body: string },
) => {
  const toast = useToast();

  try {
    // Fetch data from the given URL with the specified options
    const data = await $fetch<T>(url, {
      method: opts?.method,
      body: opts?.body,
    });

    // Display a success toast notification
    toast.add({
      title: `${toastOpts.successMessage?.title || "Succès"}`,
      description: `${toastOpts.successMessage?.description}`,
    });

    // Execute the success callback if provided
    if (toastOpts.success) toastOpts.success();

    // Return the fetched data
    return data;
  } catch (error) {
    // Display an error toast notification
    toast.add({
      title: `${toastOpts.errorMessage?.title || "Erreur"}`,
      description: `${toastOpts.errorMessage?.description}`,
      color: "red",
      ui: { title: "text-red-800", description: "text-red-500" },
    });

    // Execute the error callback if provided
    if (toastOpts.error) toastOpts.error();

    // Throw an error if the fetch request fails
    throw new Error(`Error: ${error}`);
  }
};