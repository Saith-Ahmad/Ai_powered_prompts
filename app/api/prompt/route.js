// // import Prompt from "@models/prompt";
// // import { connectionToDB } from "@utils/database";

// // export const GET = async (request) => {
// //     try {
// //         await connectionToDB()

// //         const prompts = await Prompt.find({})
// //         console.log(prompts)

// //         return new Response(JSON.stringify(prompts), { status: 200 })
// //     } catch (error) {
// //         return new Response(`Failed to fetch all prompts ${error}`, { status: 500 })
// //     }
// // } 

// import Prompt from "@models/prompt";
// import User from "@models/user";
// import { connectionToDB } from "@utils/database";

// export const GET = async (request) => {
//   try {
//     await connectionToDB();

//     const prompts = await Prompt.find({});
//     const populatedPrompts = await Promise.all(prompts.map(async (prompt) => {
//       const user = await User.findById(prompt.creator);
//       return {
//         ...prompt.toObject(),
//         creator: user,
//       };
//     }));
//     console.log("data", populatedPrompts)
//     return new Response(JSON.stringify(populatedPrompts), {
//       status: 200,
//       headers: {
//         'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': '0',
//         'Surrogate-Control': 'no-store',
//       },
//     });
//   } catch (error) {
//     return new Response(`Failed to fetch all prompts: ${error.message}`, { status: 500 });
//   }
// };
