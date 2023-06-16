export const handleErrorMessage = (error: any): string => {
  if (error.response) {
    return error.response.data;
  }
  return 'Something get wrong!';
};
