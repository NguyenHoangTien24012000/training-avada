const URL_BASE = "https://jsonplaceholder.typicode.com";
const USER_RESOURCE = "/users";
const POST_RESOURCE = "/posts";
const COMMENT_RESOURCE = "/comments";

const fetchData = async (resource) => {
  try {
    const response = await fetch(URL_BASE + resource);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const getDataUsers = () => {
  return fetchData(USER_RESOURCE);
};

const getDataComments = () => {
  return fetchData(COMMENT_RESOURCE);
};

const getDataPosts = () => {
  return fetchData(POST_RESOURCE);
};

const getDataPostWithId = (postId) => {
  return fetchData(POST_RESOURCE + "/" + postId);
};

const getDataCommentWithPostId = (postId) => {
  return fetchData(COMMENT_RESOURCE + "?postId=" + postId);
};

(async () => {
  try {
    //Step2: Get 10 user
    const dataUsers = await getDataUsers();
    console.log("Data user: ", dataUsers);

    //step3: Get all the posts and comments. Map data with the user array
    const [dataComments, dataPosts] = await Promise.all([
      getDataComments(),
      getDataPosts(),
    ]);
    const dataUsersMapWithPostsComments = dataUsers.map((user) => {
      const { address, company, ...newUser } = user;
      return {
        ...newUser,
        comments: dataComments.filter((comment) => comment.email === user.email),
        posts: dataPosts.filter((post) => post.userId === user.id),
      };
    });
    console.log(
      "Data users map with comments, posts",
      dataUsersMapWithPostsComments
    );

    //step4: Filter only users with more than 3 comments.
    const dataUserMoreComments = dataUsersMapWithPostsComments.filter(
      (user) => user.comments.length > 3
    );
    console.log("users with more than 3 comments", dataUserMoreComments);

    //step5: Reformat the data with the count of comments and posts
    const dataUserReformat = dataUsersMapWithPostsComments.map((user) => {
      const { comments, posts, ...objUser } = user;
      return {
        ...objUser,
        commentsCount: comments.length,
        postsCount: posts.length,
      };
    });
    console.log(
      " Reformat the data with the count of comments and posts",
      dataUserReformat
    );
    //step6: Who is the user with the most comments/posts?
    const userMostPosts = dataUserReformat.reduce((prevUser, currentUser) =>
      prevUser.postsCount > currentUser.postsCount ? prevUser : currentUser
    );
    console.log("The user with the most posts", userMostPosts);
    const userMostComments = dataUserReformat.reduce((prevUser, currentUser) =>
      prevUser.commentsCount > currentUser.commentsCount
        ? prevUser
        : currentUser
    );
    console.log("The user with the most comments", userMostComments);

    // Step7: Sort the list of users by the postsCount value descending?
    dataUserReformat.sort(
      (userPrev, userNext) => userNext.postsCount - userPrev.postsCount
    );
    console.log("The postsCount value descending ", dataUserReformat);

    //Step8: Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request
    const [dataPostWithId, dataCommentsWithPostId] = await Promise.all([
      getDataPostWithId(1),
      getDataCommentWithPostId(1),
    ]);
    dataPostWithId["comments"] = dataCommentsWithPostId;
    console.log("Post with ID of 1 and comments postID of 1: ", dataPostWithId);
    //----------------------END------------------------



    //Step3: another solution (không dùng 2 vòng lặp);
    const objMapUserWithPost = {};
    const objMapUserWithComment = {};
    dataUsers.forEach((user) => {
      objMapUserWithPost[user.id] = [];
      objMapUserWithComment[user.email] = [];
    });
    //data map user with post
    dataPosts.forEach((post) => {
      let { userId, ...obj } = post;
      objMapUserWithPost[userId]?.push(obj);
    });
    //data map user with comment
    dataComments.forEach((element) => {
      objMapUserWithComment[element.email]?.push(element);
    });
    //Data map with users, posts, comments
    const newDataUser = dataUsers.map((user) => {
      let { address, company, ...newObj } = user;
      return {...newObj,
        "comments" : objMapUserWithComment[user.email],
        "posts" : objMapUserWithPost[user.id]
      };
    });
    console.log("Data: ", newDataUser);
  } catch (error) {
    console.log(error);
  }
})();