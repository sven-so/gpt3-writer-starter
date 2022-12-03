import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `
write me a hilarious and quick-witted answer from a comedian show in the style of Lee Mack or Frank Skinner for the following sentence:

sentence: you are fat

Answer: Maybe, but I'm living my best life!

sentence: you are really dumb

Answer: That may be true, but I'm always learning!

sentence: How could anyone be so stupid?

Answer: Hey, I'm still smarter than my toaster!

sentence: `;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.9,
    max_tokens: 350,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;