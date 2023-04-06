import toast from "react-hot-toast";

const style = {
  borderRadius: '8px',
  background: 'var(--primary-bg-color)',
  boxShadow: '2px 2px black',
  color: 'var(--text-color)'
}

export const deleteClick = () => toast('Hold the button to delete', {
  style: { ...style, 'marginBottom': '4em' },
  duration: 1100
})

export const ResetEmailToast = () => toast('✅ Reset email sent', {
  style: style,
  duration: 1500
})

export const PostCreatedToast = () => toast('✅ Post created', {
  style: style,
  duration: 1500
})

export const PostDraftedToast = () => toast('✅ Draft created', {
  style: style,
  duration: 1500
})

export const CommentAddedToast = () => toast('✅ Comment added', {
  style: style,
  duration: 1500
})

export const CommentDeletedToast = () => toast('🗑️ Comment deleted', {
  style: style,
  duration: 1500
})

export const PostDeletedToast = () => toast('🗑️ Post deleted', {
  style: style,
  duration: 1500
})

export const PostEditedToast = () => toast('✏️ Post edited', {
  style: style,
  duration: 1500
})

export const ProfileEditedToast = () => toast('✏️ Profile edited', {
  style: style,
  duration: 1500
})