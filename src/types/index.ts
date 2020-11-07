export type Blog = {
  id: string;
  name: string
};

export type Post = {
  id: string;
  title: string;
  blogID: string;
  blog?: Blog;
  comments?;
};

export type Comment = {
  id: string;
  content: string;
  postID: string;
  post?: Post;
};

// type Blog @model {
//   id: ID!
//   name: String!
//   posts: [Post] @connection(keyName: "byBlog", fields: ["id"])
// }

// type Post @model @key(name: "byBlog", fields: ["blogID"]) {
//   id: ID!
//   title: String!
//   blogID: ID!
//   blog: Blog @connection(fields: ["blogID"])
//   comments: [Comment] @connection(keyName: "byPost", fields: ["id"])
// }

// type Comment @model @key(name: "byPost", fields: ["postID", "content"]) {
//   id: ID!
//   postID: ID!
//   post: Post @connection(fields: ["postID"])
//   content: String!
// }

// type test @model {
//   id: ID!
// }
