export const addComment = (newComment) => (par) => par.replies.push(newComment);

export const patchComment = (content)=> (comment)=>comment.content = content

export const removeComment = (comment)=>comment.content="[deleted]"

export const upvote = (comment)=>comment.upvotes++;

export const downvote = (comment)=>comment.upvotes--;