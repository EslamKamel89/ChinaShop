export default function handleApiError(error: any) {
  const generalMessage = "Unexpected error occured";
  let statusCode = 500;

  return {
    message: error.response.statusText ?? generalMessage,
    statusMessage: error.response.statusText ?? generalMessage,
    statusCode: error.response.status ?? statusCode,
  };
}
