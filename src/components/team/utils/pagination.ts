export const paginateArray = <T>(array: T[], page: number, pageSize: number) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
};

export const getTotalPages = (totalItems: number, pageSize: number) => {
  return Math.ceil(totalItems / pageSize);
};