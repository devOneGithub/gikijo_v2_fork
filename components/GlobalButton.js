const GlobalButton = ({
  btnTitle = 'Button',
  btnOnClick,
  btnType = 'button',
  btnClass = 'btn btn-primary',
  btnLoading = false,
  children,
}) => {
  return (
    <button
      type={btnType}
      class={btnClass}
      onClick={btnOnClick}
      disabled={btnLoading}
    >
      {btnLoading ? (
        <span
          class="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        ></span>
      ) : null}
      {children || btnTitle}
    </button>
  );
};

export default GlobalButton;
