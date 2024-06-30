 

import Prompt from "@models/prompt";
import User from "@models/user";
import { connectionToDB } from "@utils/database";

export const GET = async (request, {params}) => {
  try {
    await connectionToDB();
    console.log(params.id)

    const prompts = await Prompt.findById(params.id);
    console.log(prompts)
    if(!prompts){
        return new Response("Prompt Not Found", {status : 404})
    }
    // const populatedPrompts = await Promise.all(prompts.map(async (prompt) => {
    //   const user = await User.findById(prompt.creator);
    //   return {
    //     ...prompt.toObject(),
    //     creator: user,
    //   };
    // }));

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch prompt`, { status: 501 });
  }
};


export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectionToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectionToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response(`Error deleting prompt ${error}`, { status: 500 });
    }
};
