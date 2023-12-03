import { create } from "zustand";

const useCommentStore = create((set) => ({
  comments: {}, // state to store comments by postId

  setComment: (postId, comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: [...(state.comments[postId] || []), comment],
      },
    })),
}));

export default useCommentStore;
