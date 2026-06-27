export class FetchError extends Error {
  info?: unknown;
  status?: number;
}

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    const error = new FetchError('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    error.info = await res.json().catch(() => null);
    error.status = res.status;
    throw error;
  }
  
  // API returns standard JSON format, we expect json.success to be true.
  // Actually, wait, let's see how our APIs return data. 
  // Previously we had:
  // const res = await fetch('/api/projects');
  // const json = await res.json();
  // if (json.success) setProjects(json.data);
  // So the fetcher should return json.data if it's our standard format.
  
  const json = await res.json();
  
  // If the API follows our standard { success: true, data: ... }
  if (json.success !== undefined) {
    if (!json.success) {
      throw new Error(json.message || 'Failed to fetch data');
    }
    return json.data;
  }
  
  // Fallback if the API returns raw data
  return json;
};
