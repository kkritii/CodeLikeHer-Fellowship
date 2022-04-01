import Boom from "@hapi/boom";

import Post from "../models/Post.js";
import logger from "../utils/logger.js";

/**
 * Create a new post.
 *
 * @param {Object} params
 * @return {Object}
 */
export async function createPost(params,user) {
  // console.log(params);

  const { postTitle, postDescription, targetAmount, category, endDate } = params;
  const ownerUserId = user.id;

  const [insertedData] = await new Post().save({
    postTitle, postDescription, ownerUserId,targetAmount, category, endDate,
  });

  return {
    data: insertedData,
    message: "Added post successfully",
  };
}

/**
 * Get list of posts
 *
 * @return {Object}
 */
export async function getAllPosts() {
  logger.info("Fetching list of posts");

  const data = await new Post().getAll();

  return {
    data,
    message: "List of posts",
  };
}

