import { Skeleton } from "@/components/Skeleton";
import Spinner from "@/components/Spinner";

export default function loading() {
  return (
    <div className=" flex justify-center">
      <Spinner />
    </div>
  );
}
