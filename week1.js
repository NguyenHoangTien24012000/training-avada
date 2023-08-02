function getDataUsers() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function getDataComments() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function getDataPosts() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function getDataPostWithId(postId) {
  return new Promise((resolve, reject) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function getDataCommentWithPostId(postId) {
  return new Promise((resolve, reject) => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}



(async () => {
  //Step2: Get 10 user
  const data = await getDataUsers();
  console.log(data);

  //Step3: Get all the posts and comments. Map data with the user array
  await Promise.all([getDataUsers(), getDataComments(), getDataPosts()])
    .then((allData) => {
      const dataUsers = allData[0];
      const dataComments = allData[1];
      const dataPosts = allData[2];

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
      console.log("objMapUserWithPost", objMapUserWithPost);
      //data map user with comment
      dataComments.forEach((element) => {
        objMapUserWithComment[element.email]?.push(element);
      });
      console.log("objMapUserWithComment", objMapUserWithComment);

      //Data map with users, posts, comments
      const newDataUser = dataUsers.map((user) => {
        let { address, company, ...newObj } = user;
        newObj["comments"] = objMapUserWithComment[user.email];
        newObj["posts"] = objMapUserWithPost[user.id];
        return newObj;
      });
      console.log("Data: ", newDataUser);

      // Step4: Filter only users with more than 3 comments.
      const dataUserFilter = newDataUser.filter(
        (user) => user.comments.length > 3
      );
      console.log("User with more than 3 comments", dataUserFilter);

      // Step5: Reformat the data with the count of comments and posts.
      const dataUserReformat = newDataUser.map((user) => {
        let { comments, posts, ...objUser } = user;
        objUser["commentsCount"] = comments.length;
        objUser["postsCount"] = posts.length;
        return objUser;
      });
      console.log(
        "Data with the count of comments and posts",
        dataUserReformat
      );
      // Step6: Who is the user with the most comments/posts
      let mostPost = -1;
      let userMostPost;
      dataUserReformat.forEach((user) => {
        if (user.postsCount > mostPost) {
          mostPost = user.postsCount;
          userMostPost = user;
        }
      });
      console.log("User most post: ", userMostPost);
      // Step7: Sort the list of users by the postsCount value descending?
      dataUserReformat.sort(
        (userPrev, userNext) => userNext.postsCount - userPrev.postsCount
      );
      console.log("The postsCount value descending ", dataUserReformat);
    })
    .catch((error) => {
      console.log(error);
    });

  // Step8: Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request
  await Promise.all([getDataPostWithId(1), getDataCommentWithPostId(1)])
    .then((allData) => {
      const dataPost = allData[0];
      const dataComments = allData[1];
      dataPost["comments"] = dataComments;
      console.log("Post with ID of 1 and comments postID of 1: ", dataPost);
    })
    .catch((error) => {
      console.log(error);
    });
})();
