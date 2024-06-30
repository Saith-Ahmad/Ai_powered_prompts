

import Prompt from "@models/prompt";
import User from "@models/user";
import { connectionToDB } from "@utils/database";

export const GET = async (request, {params}) => {
  try {
    await connectionToDB();

    const prompts = await Prompt.find({
        creator : params.id
    });
    const populatedPrompts = await Promise.all(prompts.map(async (prompt) => {
      const user = await User.findById(prompt.creator);
      return {
        ...prompt.toObject(),
        creator: user,
      };
    }));

    return new Response(JSON.stringify(populatedPrompts), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch all prompts: ${error.message}`, { status: 500 });
  }
};
