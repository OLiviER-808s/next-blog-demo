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

export const ResetEmailToast = () => toast('✅ Reset Email Sent Successfully', {
  style: style,
  duration: 1000
})
