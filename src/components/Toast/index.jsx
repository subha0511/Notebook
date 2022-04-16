import React from "react";
import toast from "react-hot-toast";

export const ToastError = ({ message }) => {
  toast.custom((t) => <Alert t={t} message={message} type="error" />);
};

export const ToastSuccess = ({ message }) => {
  return toast.custom((t) => <Alert t={t} message={message} type="success" />, {
    duration: 2000,
  });
};

export const ToastInfo = ({ message }) => {
  return toast.custom((t) => <Alert t={t} message={message} type="info" />);
};

export const ToastWarning = ({ message }) => {
  return toast.custom((t) => <Alert t={t} message={message} type="warning" />);
};

export const ToastBasic = ({ message }) => {
  return toast.custom((t) => <Alert t={t} message={message} type="basic" />);
};

export const ToastLoading = ({ message }) => {
  return toast.custom((t) => <Alert t={t} message={message} type="loading" />);
};

const icons = (type) => {
  switch (type) {
    case "success":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-4 icon icon-tabler icon-tabler-circle-check"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M9 12l2 2l4 -4"></path>
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-4 icon icon-tabler icon-tabler-alert-triangle"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx="12" cy="12" r="9"></circle>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
          <polyline points="11 12 12 12 12 16 13 16"></polyline>
        </svg>
      );
  }
};

const colors = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
  basic: "text-gray-600",
};

const Alert = ({ type = "basic", message, t }) => {
  const color = colors[type];

  return (
    <div
      className="z-50 items-center bg-transparent rounded-lg cursor-pointer lg:px-20"
      onClick={() => toast.dismiss(t.id)}
    >
      <div className={` ${color} bg-white border rounded-lg shadow-xl`}>
        <div className="flex items-center justify-between py-2 pl-6 pr-2 mx-auto ">
          <div className="flex">
            <p className="pr-8 text-sm font-semibold tracking-wide">
              {message}
            </p>
          </div>
          <button
            className="transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-blueGray-600 focus:outline-none"
            type="button"
            aria-label="Close"
            aria-hidden="true"
          >
            {icons(type)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
