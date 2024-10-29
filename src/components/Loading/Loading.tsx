interface ILoadingProps {
  hScreen?: boolean;
}

function Loading({ hScreen }: ILoadingProps) {
  return (
    <div
      className={` ${
        hScreen ? "h-screen" : ""
      } flex items-center justify-center bg-slate-500`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white-500 border-solid"></div>
    </div>
  );
}

export default Loading;
