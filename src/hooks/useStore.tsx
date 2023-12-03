import { create } from "zustand";
type userComment = {
  id: string;
  body: string;
};

interface commentStore {
  comments: Record<string, userComment[]>;
  setComment: (postId: string, comment: userComment) => void;
}
const useCommentStore = create<commentStore>()((set) => ({
  comments: {},

  setComment: (postId, comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: [...(state.comments[postId] || []), comment],
      },
    })),
}));

export default useCommentStore;
