import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const getPromptForVisualRepresentation = async (input: string) : Promise<string | undefined> => {

  try {

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: 'system',
          content: 'you are a model that helps the user visualize the concept they entered.'
          + 'your job is to produce one VERY SIMPLE scenario for an image generation model to visualize this concept.'
        },
        {
          role: 'user',
          content: input
        }
      ],
    });
    console.log("(1) generated prompt: ", response.choices[0]?.message.content ?? undefined);
    return response.choices[0]?.message.content ?? undefined;

  } catch (error) {

    console.error(error);
    throw new Error('Error in second step of pipeline, getting prompt for visual representation');

  }
};

const getVisualRepresentation = async (prompt: string | undefined) : Promise<string | undefined> => {
  if (!prompt) {
    return undefined;
  }

  try {

    const response = await openai.images.generate({
      prompt,
      model: "dall-e-3"
    });
    console.log("(2) generated visual representation: ",  response.data[0] ? response.data[0].url : undefined);
    return response.data[0] ? response.data[0].url : undefined;

  } catch (error) {

    console.error(error);
    throw new Error('Error in third step of pipeline, getting visual representation');

  }
};

const initiatePipeline = async (input: string) : Promise<string | undefined> => {
  const prompt = await getPromptForVisualRepresentation(input);
  const visualRepresentation = await getVisualRepresentation(prompt);
  return visualRepresentation;
}

export default initiatePipeline;
