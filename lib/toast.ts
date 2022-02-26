import toast from "react-hot-toast";

const style = {
  borderRadius: '8px',
  background: 'var(--primary-bg-color)',
  boxShadow: '2px 2px black',
  color: 'var(--text-color)'
}

export const deleteClick = () => toast('Hold to delete', {
  style: style,
  duration: 1200
})
