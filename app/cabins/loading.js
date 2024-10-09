import Spinner from "@/app/_components/Spinner";

function loading() {
  return (
    <span className="flex items-center flex-col justify-center gap-3 text-primary-200 text-center">
      <Spinner />
      Loading Your Cabin...
    </span>
  );
}

export default loading;
