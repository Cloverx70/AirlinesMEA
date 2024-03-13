import toast, { Toast } from "react-hot-toast";

const Toast = ({ Message }) => {
  toast((t) => {
    return <span>{Message}</span>;
  });
};

export default Toast;
