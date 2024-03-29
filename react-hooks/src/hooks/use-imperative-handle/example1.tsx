import { useRef, useImperativeHandle, forwardRef } from "react";

type CommentListRef = {
    scrollToBottom: () => void;
};

type PostRef = {
    scrollAndFocusAddComment: () => void;
};

export default function App(): JSX.Element {
    const postRef = useRef<PostRef>(null);

    function handleClick(): void {
        postRef.current?.scrollAndFocusAddComment();
    }

    return (
        <div>
            <button onClick={handleClick}>Write a comment</button>
            <Post ref={postRef} />
        </div>
    );
}

const Post = forwardRef<PostRef>(function Post(_props, ref) {
    const commentsRef = useRef<CommentListRef>(null);
    const addCommentRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
        ref,
        function () {
            return {
                scrollAndFocusAddComment() {
                    commentsRef.current?.scrollToBottom();
                    addCommentRef.current?.focus();
                },
            };
        },
        []
    );

    return (
        <>
            <CommentList ref={commentsRef} />
            <AddCommentInput ref={addCommentRef} />
        </>
    );
});

const CommentList = forwardRef<CommentListRef>(function CommentList(
    _props,
    ref
) {
    const divRef = useRef<HTMLDivElement>(null);

    const comments: JSX.Element[] = [];
    for (let i = 0; i < 100; i++) {
        comments.push(<p key={i}>#{i + 1} Comment</p>);
    }

    useImperativeHandle(ref, function () {
        return {
            scrollToBottom: () => {
                divRef.current?.scrollIntoView({ behavior: "smooth" });
            },
        };
    });

    return <div ref={divRef}>{comments}</div>;
});

const AddCommentInput = forwardRef<HTMLInputElement>(function AddCommentInput(
    props,
    ref
) {
    return <input {...props} ref={ref} />;
});
