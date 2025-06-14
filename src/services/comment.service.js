const CommentService = {
    async getAllCommentsByStoryId(storyId) {
        try {
            const comments = await Comment.findAll({
                where: {
                    storyId: storyId,
                },
            });
            return comments;
        } catch (error) {
            console.error("Error get all comments:", error);
            throw error;
        }
    }
};

export default CommentService;