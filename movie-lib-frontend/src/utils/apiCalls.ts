export const httpGet = async <T>(url: string): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const options: RequestInit = {
    headers,
    method: 'GET',
    mode: 'cors',
  };

  const response = await fetch(url, options);
  const output = response.json();

  return output;
};
