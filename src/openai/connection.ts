import { OpenAIApi, Configuration } from 'openai';

export function createClient(apiKey: string): OpenAIApi {
  return new OpenAIApi(new Configuration({ apiKey }));
}

export async function validateKey(client: OpenAIApi): Promise<boolean> {
  try {
    await client.listModels();
    return true;
  } catch (_) {
    return false;
  }
}