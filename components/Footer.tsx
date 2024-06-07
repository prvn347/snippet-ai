import Link from "next/link";

export function Footer() {
  return (
    <div className=" bottom-0  flex justify-center ">
      <span>
        Building in public at &nbsp;
        <Link
          className="  text-sm text-blue-500 font-semibold"
          href={"https://twitter.com/prvn347"}
        >
          @prvn347
        </Link>
      </span>
    </div>
  );
}
